import { DEMO_USERNAME, demoPersonaContent } from "@/lib/demo-persona";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { ProfileContent } from "@/types/profile";
import { defaultProfileContent } from "@/types/profile";

export type StoredProfile = {
  id: string;
  username: string;
  content: ProfileContent;
  plan: "free" | "pro" | "studio";
  status: "draft" | "published";
  userId: string;
  updatedAt: string;
};

/**
 * Lecture publique : retourne un profil seulement s'il est `published`.
 * Utilise le client admin pour bypass RLS quand on est sur une route
 * non authentifiée (la page publique `/[username]`). Le filtre `status`
 * applique implicitement la même règle que la policy RLS.
 */
export async function getProfileByUsername(username: string): Promise<StoredProfile | null> {
  const normalized = username.toLowerCase();

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, user_id, username, content, plan, status, updated_at")
    .eq("username", normalized)
    .eq("status", "published")
    .maybeSingle();

  if (!error && data) return rowToProfile(data);

  // Fallback démo : Marie Laurent existe toujours pour les pages d'exemple,
  // même si la DB est vide. Permet à la landing /marie-laurent et à l'iframe
  // embed de fonctionner sans seed manuel.
  if (normalized === DEMO_USERNAME) {
    return {
      id: "demo",
      userId: "demo",
      username: DEMO_USERNAME,
      content: demoPersonaContent,
      plan: "free",
      status: "published",
      updatedAt: new Date().toISOString()
    };
  }

  return null;
}

/**
 * Lecture pour le owner connecté (draft inclus).
 * Utilise le client server (RLS appliquée, n'autorise que `auth.uid() = user_id`).
 */
export async function getOwnProfile(): Promise<StoredProfile | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("id, user_id, username, content, plan, status, updated_at")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !data) return null;
  return rowToProfile(data);
}

/**
 * Save (insert or update) le profil du user connecté.
 * `publish=true` flippe le status à `published` (déclenche revalidation ISR).
 */
export async function saveOwnProfile(
  username: string,
  content: ProfileContent,
  publish: boolean = true
): Promise<{ ok: true } | { ok: false; reason: string }> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, reason: "unauthenticated" };

  const normalized = username.toLowerCase();

  // S'assurer que le user a "claim" le username via RPC atomique
  // (gère format/réservé/collision via une seule transaction).
  const { data: claim, error: claimError } = await supabase.rpc("claim_username", {
    p_username: normalized
  });
  if (claimError) {
    return { ok: false, reason: "claim_failed" };
  }
  const claimResult = claim as { ok: boolean; reason: string };
  if (!claimResult.ok) {
    return { ok: false, reason: claimResult.reason };
  }

  // Le claim a créé ou renommé. Maintenant on update le contenu + status.
  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      content,
      status: publish ? "published" : "draft"
    })
    .eq("user_id", user.id);

  if (updateError) {
    return { ok: false, reason: "update_failed" };
  }

  return { ok: true };
}

/**
 * Check de disponibilité d'un username (utilisé par la landing claim flow).
 * Lecture publique (anon key suffit, RLS sur reserved_usernames + profiles).
 */
export async function isUsernameAvailable(username: string): Promise<{
  available: boolean;
  reason?: "format" | "reserved" | "taken";
}> {
  const normalized = username.toLowerCase().trim();

  if (!/^[a-z0-9-]{3,30}$/.test(normalized)) {
    return { available: false, reason: "format" };
  }

  const supabase = await createSupabaseServerClient();

  const { data: reserved } = await supabase
    .from("reserved_usernames")
    .select("username")
    .eq("username", normalized)
    .maybeSingle();
  if (reserved) return { available: false, reason: "reserved" };

  const { data: taken } = await supabase
    .from("profiles")
    .select("username")
    .eq("username", normalized)
    .maybeSingle();
  if (taken) return { available: false, reason: "taken" };

  return { available: true };
}

function rowToProfile(row: {
  id: string;
  user_id: string;
  username: string;
  content: unknown;
  plan: string;
  status: string;
  updated_at: string;
}): StoredProfile {
  return {
    id: row.id,
    userId: row.user_id,
    username: row.username,
    content: (row.content as ProfileContent) ?? defaultProfileContent,
    plan: (row.plan as "free" | "pro" | "studio") ?? "free",
    status: (row.status as "draft" | "published") ?? "draft",
    updatedAt: row.updated_at
  };
}
