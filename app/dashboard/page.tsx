import { DashboardEditor } from "@/components/dashboard-editor";
import { getOwnProfile } from "@/lib/server/profiles-store";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage({
  searchParams
}: {
  searchParams: Promise<{ saved?: string; error?: string }>;
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

  return (
    <DashboardEditor
      initialUsername={profile?.username ?? ""}
      initialContent={profile?.content}
      plan={profile?.plan ?? "free"}
      saved={Boolean(params.saved)}
      error={params.error}
      userEmail={user.email ?? ""}
    />
  );
}
