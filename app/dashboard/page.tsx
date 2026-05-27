import { DashboardEditor } from "@/components/dashboard-editor";
import { getProfileByUsername } from "@/lib/server/profiles-store";

export default async function DashboardPage({
  searchParams
}: {
  searchParams: Promise<{ saved?: string; error?: string; username?: string }>;
}) {
  const params = await searchParams;
  const existingProfile = params.username
    ? await getProfileByUsername(params.username)
    : null;

  return (
    <DashboardEditor
      initialUsername={existingProfile?.username ?? params.username ?? ""}
      initialContent={existingProfile?.content}
      saved={Boolean(params.saved)}
      error={params.error}
    />
  );
}
