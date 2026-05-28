import { FloatingEditButton } from "@/components/floating-edit-button";
import { ProfileFullView } from "@/components/profile-full-view";
import { PublicProfileFooter, PublicProfileHeader } from "@/components/public-profile-chrome";
import { getProfileByUsername } from "@/lib/server/profiles-store";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export const revalidate = 300;

export default async function PublicProfilePage({
  params,
  searchParams
}: {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ embed?: string }>;
}) {
  const [{ username }, { embed }] = await Promise.all([params, searchParams]);
  const profile = await getProfileByUsername(username);

  if (!profile) {
    notFound();
  }

  const isEmbed = embed === "1";

  let isOwner = false;
  if (!isEmbed) {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();
    isOwner = Boolean(user && profile.userId === user.id);
  }

  return (
    <div
      className={`grain relative min-h-screen bg-[var(--background)] ${isEmbed ? "embed-mode" : ""}`}
    >
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 -z-0 h-[600px] overflow-hidden"
      >
        <div
          className="absolute left-1/2 top-[-200px] h-[700px] w-[1100px] -translate-x-1/2 rounded-full opacity-70"
          style={{
            background:
              "radial-gradient(circle, rgba(255,90,60,0.10) 0%, rgba(122,108,224,0.06) 35%, transparent 70%)"
          }}
        />
      </div>

      <PublicProfileHeader />

      <div className="relative z-10">
        <ProfileFullView username={profile.username} content={profile.content} />
      </div>

      {isOwner ? <FloatingEditButton /> : null}

      <PublicProfileFooter username={profile.username} />
    </div>
  );
}
