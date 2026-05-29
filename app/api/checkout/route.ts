import { PRO_PACKS, type ProPackKey } from "@/lib/pro";
import { getPriceId, getStripe } from "@/lib/stripe";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { type NextRequest } from "next/server";

export const runtime = "nodejs";

/**
 * Point d'entrée d'achat d'un pack Pro.
 *
 * Crée une session Stripe Checkout en paiement unique pour le price_id du pack,
 * puis redirige vers l'URL hébergée par Stripe. La pose effective de `pro_until`
 * se fait côté webhook (`/api/stripe/webhook`) sur `checkout.session.completed`,
 * jamais ici — le retour de redirection n'est pas une preuve de paiement.
 */
export async function GET(request: NextRequest) {
  const { origin } = new URL(request.url);
  const pack = request.nextUrl.searchParams.get("pack") as ProPackKey | null;
  if (!pack || !(pack in PRO_PACKS)) {
    return Response.redirect(`${origin}/pricing`, 302);
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    return Response.redirect(
      `${origin}/login?next=${encodeURIComponent(`/api/checkout?pack=${pack}`)}`,
      302
    );
  }

  const priceId = getPriceId(pack);
  if (!priceId) {
    // Stripe pas (encore) configuré : on garde l'UI fonctionnelle.
    return Response.redirect(`${origin}/pricing?status=checkout_soon`, 302);
  }

  try {
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: user.email ?? undefined,
      // Lien paiement → user/pack, relu côté webhook pour poser pro_until.
      client_reference_id: user.id,
      metadata: { userId: user.id, pack },
      payment_intent_data: { metadata: { userId: user.id, pack } },
      success_url: `${origin}/dashboard?status=pro_activated`,
      cancel_url: `${origin}/pricing?status=cancelled`
    });

    if (!session.url) {
      return Response.redirect(`${origin}/pricing?status=error`, 302);
    }
    return Response.redirect(session.url, 303);
  } catch {
    return Response.redirect(`${origin}/pricing?status=error`, 302);
  }
}
