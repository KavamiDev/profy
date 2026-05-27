import { AmbientBackground } from "@/components/ambient-background";
import { Logo } from "@/components/logo";
import { PhoneFrame } from "@/components/phone-frame";
import { ProfileView } from "@/components/profile-view";
import { getProfileByUsername } from "@/lib/server/profiles-store";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 300;

export default async function PublicProfilePage({
  params
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const profile = await getProfileByUsername(username);

  if (!profile) {
    notFound();
  }

  return (
    <div className="grain relative flex min-h-screen flex-col">
      <AmbientBackground variant="subtle" />

      <header className="relative z-10 mx-auto flex h-20 w-full max-w-lg items-center justify-between px-6">
        <Logo />
        <Link href="/dashboard">
          <span className="rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--muted-strong)] transition hover:border-[var(--border-strong)] hover:text-[var(--foreground)]">
            Créer le tien
          </span>
        </Link>
      </header>

      <main className="relative z-10 mx-auto flex flex-1 flex-col items-center justify-center px-4 pb-16 pt-2">
        <PhoneFrame>
          <ProfileView username={profile.username} content={profile.content} />
        </PhoneFrame>
        <p className="mt-6 text-center text-sm text-[var(--muted)]">
          Partage ce lien :{" "}
          <span className="font-medium text-[var(--foreground)]">profyl.io/{profile.username}</span>
        </p>
      </main>
    </div>
  );
}
