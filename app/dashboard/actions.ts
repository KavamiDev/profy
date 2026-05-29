"use server";

import { saveOwnProfile } from "@/lib/server/profiles-store";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { profileContentSchema, usernameSchema } from "@/lib/validators/profile";
import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function saveProfile(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login?next=/dashboard");
  }

  const usernameRaw = String(formData.get("username") ?? "")
    .trim()
    .toLowerCase();
  const contentRaw = String(formData.get("content") ?? "");

  const usernameResult = usernameSchema.safeParse(usernameRaw);
  if (!usernameResult.success) {
    redirect("/dashboard?error=username-invalide");
  }
  const username = usernameResult.data;

  let parsed: unknown;
  try {
    parsed = JSON.parse(contentRaw);
  } catch {
    redirect("/dashboard?error=contenu-invalide");
  }

  const contentResult = profileContentSchema.safeParse(parsed);
  if (!contentResult.success) {
    redirect("/dashboard?error=contenu-invalide");
  }

  const result = await saveOwnProfile(username, contentResult.data, true);

  if (!result.ok) {
    const errorKey =
      result.reason === "taken"
        ? "username-pris"
        : result.reason === "reserved"
          ? "username-reserve"
          : result.reason === "invalid_format"
            ? "username-invalide"
            : "save-failed";
    redirect(`/dashboard?error=${errorKey}`);
  }

  revalidatePath(`/${username}`);
  revalidatePath("/");
  updateTag("landing"); // rafraîchit compteur + mur de la landing
  redirect(`/dashboard?saved=1`);
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}
