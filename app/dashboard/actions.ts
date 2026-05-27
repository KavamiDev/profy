"use server";

import { saveProfileByUsername, getProfileByUsername } from "@/lib/server/profiles-store";
import { profileContentSchema, usernameSchema } from "@/lib/validators/profile";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const RESERVED = [
  "admin",
  "api",
  "www",
  "dashboard",
  "login",
  "auth",
  "pricing",
  "blog",
  "help",
  "support",
  "about",
  "contact",
  "legal",
  "privacy",
  "cgu",
  "mentions-legales",
  "confidentialite"
];

export async function saveProfile(formData: FormData) {
  const usernameRaw = String(formData.get("username") ?? "")
    .trim()
    .toLowerCase();
  const contentRaw = String(formData.get("content") ?? "");

  const usernameResult = usernameSchema.safeParse(usernameRaw);
  if (!usernameResult.success) {
    redirect("/dashboard?error=username-invalide");
  }
  const username = usernameResult.data;

  if (RESERVED.includes(username)) {
    redirect("/dashboard?error=username-reserve");
  }

  // Unicité : interdit d'écraser le profil d'un autre user.
  // Tant qu'on n'a pas d'auth, on bloque tout simplement si le username est déjà pris.
  // (l'UI fournit un edit-mode pour les profils existants via `?username=...`).
  const existing = await getProfileByUsername(username);
  const isEditMode = String(formData.get("editMode") ?? "") === "1";
  if (existing && !isEditMode) {
    redirect(`/dashboard?error=username-pris&username=${username}`);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(contentRaw);
  } catch {
    redirect(`/dashboard?error=contenu-invalide&username=${username}`);
  }

  const contentResult = profileContentSchema.safeParse(parsed);
  if (!contentResult.success) {
    redirect(`/dashboard?error=contenu-invalide&username=${username}`);
  }
  const parsedContent = contentResult.data;

  await saveProfileByUsername(username, parsedContent);

  revalidatePath(`/${username}`);
  revalidatePath("/");
  redirect(`/dashboard?saved=1&username=${username}`);
}
