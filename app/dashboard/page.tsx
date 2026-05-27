import { DashboardEditor } from "@/components/dashboard-editor";
import { getProfileByUsername } from "@/lib/server/profiles-store";

const errorMessages: Record<string, string> = {
  "username-reserve": "username-reserve",
  "username-invalide": "username-invalide",
  "contenu-invalide": "contenu-invalide"
};

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
      initialUsername={existingProfile?.username ?? ""}
      initialContent={existingProfile?.content}
      saved={Boolean(params.saved)}
      error={params.error && errorMessages[params.error] ? params.error : params.error}
    />
  );
}
