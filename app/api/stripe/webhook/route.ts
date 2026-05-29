import { extendProUntil, PRO_PACKS, type ProPackKey } from "@/lib/pro";
import { getStripe } from "@/lib/stripe";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { type NextRequest } from "next/server";
import type Stripe from "stripe";

export const runtime = "nodejs";
// Body brut requis pour vérifier la signature : pas de cache / parsing.
export const dynamic = "force-dynamic";

/**
 * Webhook Stripe — source de vérité de l'activation Pro.
 *
 * Sur `checkout.session.completed` (et payée), on prolonge `pro_until` du user
 * de la durée du pack acheté (cumul si déjà actif, via extendProUntil).
 * La signature est vérifiée avec STRIPE_WEBHOOK_SECRET ; tout payload non signé
 * est rejeté en 400.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return new Response("webhook not configured", { status: 500 });

  const signature = request.headers.get("stripe-signature");
  if (!signature) return new Response("missing signature", { status: 400 });

  const body = await request.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, signature, secret);
  } catch (e) {
    return new Response(`invalid signature: ${(e as Error).message}`, { status: 400 });
  }

  const admin = createSupabaseAdminClient();

  // Idempotence : on "réclame" l'event.id. Si déjà présent (retry Stripe),
  // on ne rejoue pas l'effet et on renvoie 200.
  const { error: claimError } = await admin
    .from("stripe_events")
    .insert({ id: event.id, type: event.type });
  if (claimError) {
    // 23505 = unique_violation → event déjà traité. Tout autre cas = vraie erreur.
    if (claimError.code === "23505") return new Response(null, { status: 200 });
    return new Response("idempotency store error", { status: 500 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      // En mode "payment" une session complétée et payée vaut achat confirmé.
      if (session.payment_status === "paid") {
        await activatePro(admin, session.metadata?.userId, session.metadata?.pack);
      }
    }
  } catch (e) {
    // Effet non appliqué : on libère l'event.id pour que Stripe puisse retenter.
    await admin.from("stripe_events").delete().eq("id", event.id);
    return new Response(`handler error: ${(e as Error).message}`, { status: 500 });
  }

  return new Response(null, { status: 200 });
}

type AdminClient = ReturnType<typeof createSupabaseAdminClient>;

async function activatePro(admin: AdminClient, userId?: string | null, pack?: string | null) {
  if (!userId || !pack || !(pack in PRO_PACKS)) return;
  const { months } = PRO_PACKS[pack as ProPackKey];

  const { data: profile, error: readError } = await admin
    .from("profiles")
    .select("pro_until")
    .eq("user_id", userId)
    .maybeSingle();
  if (readError) throw new Error(`profile read: ${readError.message}`);

  const next = extendProUntil(profile?.pro_until ?? null, months);
  const { error: writeError } = await admin
    .from("profiles")
    .update({ pro_until: next })
    .eq("user_id", userId);
  if (writeError) throw new Error(`profile update: ${writeError.message}`);
}
