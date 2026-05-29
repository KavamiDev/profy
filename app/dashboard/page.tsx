import { DashboardEditor } from "@/components/dashboard-editor";
import { getOwnProfile } from "@/lib/server/profiles-store";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage({
  searchParams
}: {
  searchParams: Promise<{ saved?: string; error?: string; claim?: string; status?: string }>;
}) {
  const params = await searchParams;

  // Auth required.
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login?next=/dashboard");
  }

  const profile = await getOwnProfile();

  // Username "claimé" sur la landing (hero) → pré-rempli si pas déjà de profil.
  const claimedUsername = (params.claim ?? "").toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 30);

  return (
    <DashboardEditor
      initialUsername={profile?.username ?? claimedUsername}
      initialContent={profile?.content}
      plan={profile?.plan ?? "free"}
      saved={Boolean(params.saved)}
      error={params.error}
      proActivated={params.status === "pro_activated"}
      userEmail={user.email ?? ""}
      userId={user.id}
    />
  );
}
