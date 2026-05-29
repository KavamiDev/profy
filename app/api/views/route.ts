import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Enregistre une vue de profil (analytics Pro, anonyme & RGPD-friendly).
 * Appelé en fire-and-forget par le beacon client sur la page publique.
 * On ne stocke jamais d'IP brute : seulement le host du referer + le pays.
 */
export async function POST(request: NextRequest) {
  let body: { username?: string; referrer?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const username = (body.username ?? "").toLowerCase().trim();
  if (!/^[a-z0-9-]{3,30}$/.test(username)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();

  // Résout l'id du profil publié (on ne track que les profils en ligne).
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .eq("status", "published")
    .maybeSingle();

  if (!profile) {
    return new NextResponse(null, { status: 204 });
  }

  // Host du referer uniquement (jamais l'URL complète).
  let refererHost: string | null = null;
  if (body.referrer) {
    try {
      const u = new URL(body.referrer);
      refererHost = u.hostname || null;
    } catch {
      refererHost = null;
    }
  }
  // Referer interne (depuis Profyl lui-même) => "direct".
  if (!refererHost || refererHost.endsWith("profyl.io")) {
    refererHost = refererHost ?? "direct";
  }

  const country = request.headers.get("x-vercel-ip-country") || null;

  await supabase.from("profile_views").insert({
    profile_id: profile.id,
    referer_host: refererHost,
    country
  });

  return new NextResponse(null, { status: 204 });
}
