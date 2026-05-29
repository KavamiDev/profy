import { DomainPageContent } from "@/components/domain/DomainPageContent";
import { getOwnProfile } from "@/lib/server/profiles-store";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { dnsInstructions } from "@/lib/vercel";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Domaine — Profyl"
};

export default async function DomainPage({
  searchParams
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;

  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login?next=/dashboard/domain");
  }

  const profile = await getOwnProfile();
  if (!profile) {
    redirect("/dashboard");
  }

  const isPro = profile.plan === "pro";
  const dns = profile.customDomain ? dnsInstructions(profile.customDomain).record : null;

  return (
    <DomainPageContent
      isPro={isPro}
      domain={profile.customDomain}
      verified={profile.customDomainVerified}
      dns={dns}
      status={status}
    />
  );
}
