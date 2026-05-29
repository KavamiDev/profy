import { StatsPageContent } from "@/components/stats/StatsPageContent";
import { getOwnProfile } from "@/lib/server/profiles-store";
import { getViewStats } from "@/lib/server/views-store";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Statistiques — Profyl"
};

export default async function StatsPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login?next=/dashboard/stats");
  }

  const profile = await getOwnProfile();
  if (!profile) {
    redirect("/dashboard");
  }

  const isPro = profile.plan === "pro";
  const stats = isPro ? await getViewStats(profile.id) : null;

  return <StatsPageContent isPro={isPro} stats={stats} />;
}
