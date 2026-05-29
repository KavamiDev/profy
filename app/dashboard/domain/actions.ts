"use server";

import { getOwnProfile } from "@/lib/server/profiles-store";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { addDomain, getDomainStatus, removeDomain } from "@/lib/vercel";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const DOMAIN_RE = /^(?!-)[a-z0-9-]{1,63}(?<!-)(\.[a-z0-9-]{1,63})+$/;

function back(status: string): never {
  redirect(`/dashboard/domain?status=${status}`);
}

async function requireProProfile() {
  const profile = await getOwnProfile();
  if (!profile) redirect("/dashboard");
  if (profile.plan !== "pro") redirect("/pricing");
  return profile;
}

export async function connectDomain(formData: FormData) {
  const profile = await requireProProfile();

  const domain = String(formData.get("domain") ?? "")
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "");

  if (!DOMAIN_RE.test(domain) || domain.endsWith("profyl.io")) {
    back("invalid");
  }

  // 1. Ajout côté Vercel (provisionne le SSL automatiquement).
  const vercel = await addDomain(domain);
  if (!vercel.ok && vercel.reason === "not_configured") {
    back("not_configured");
  }
  // api_error inclut "déjà ajouté au projet" — on tolère et on continue.

  // 2. Persiste le domaine (non vérifié tant que le DNS n'est pas posé).
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("profiles")
    .update({ custom_domain: domain, custom_domain_verified: false })
    .eq("id", profile.id);

  if (error) {
    // Conflit d'unicité = domaine déjà pris par un autre profil.
    back("taken");
  }

  back("added");
}

export async function verifyDomain() {
  const profile = await requireProProfile();
  if (!profile.customDomain) back("invalid");

  const status = await getDomainStatus(profile.customDomain);
  if (!status.ok) {
    back(status.reason === "not_configured" ? "not_configured" : "error");
  }

  if (status.data.verified && !status.data.misconfigured) {
    const supabase = await createSupabaseServerClient();
    await supabase
      .from("profiles")
      .update({ custom_domain_verified: true })
      .eq("id", profile.id);
    revalidatePath("/dashboard/domain");
    back("verified");
  }

  back("pending");
}

export async function disconnectDomain() {
  const profile = await requireProProfile();
  if (profile.customDomain) {
    await removeDomain(profile.customDomain);
  }
  const supabase = await createSupabaseServerClient();
  await supabase
    .from("profiles")
    .update({ custom_domain: null, custom_domain_verified: false })
    .eq("id", profile.id);
  back("disconnected");
}
