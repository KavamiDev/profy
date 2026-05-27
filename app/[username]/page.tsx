import { FloatingEditButton } from "@/components/floating-edit-button";
import { Logo } from "@/components/logo";
import { ProfileFullView } from "@/components/profile-full-view";
import { ProfileQr } from "@/components/profile-qr";
import { getProfileByUsername } from "@/lib/server/profiles-store";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
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

  // Check ownership : si l'user connecté possède ce profil, on lui propose
  // un bouton Modifier flottant. Pas affiché en mode embed (iframe landing).
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
      {/* Halo doux derrière le hero, fixed pour ne pas bouger au scroll */}
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

      <header className="relative z-10 mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-6">
        <Logo />
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden text-sm text-[var(--muted)] transition hover:text-[var(--foreground)] sm:inline-block"
          >
            Profyl
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--foreground)] shadow-[var(--shadow-sm)] transition hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-md)]"
          >
            Créer le mien
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </header>

      <div className="relative z-10">
        <ProfileFullView username={profile.username} content={profile.content} />
      </div>

      {isOwner ? <FloatingEditButton /> : null}

      <footer className="relative z-10 border-t border-[var(--border)] bg-white/40 py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 md:flex-row md:items-center md:justify-between">
          <div className="text-center md:text-left">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
              Partage cette page
            </p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight">
              profyl.io/{profile.username}
            </p>
            <p className="mt-2 max-w-md text-sm text-[var(--muted)]">
              Scanne le QR code pour ouvrir cette page sur un téléphone, ou
              copie le lien.
            </p>
          </div>
          <ProfileQr username={profile.username} />
        </div>
        <div className="mx-auto mt-12 max-w-6xl border-t border-[var(--border)] px-6 pt-8 text-center text-sm text-[var(--muted)]">
          Page créée avec{" "}
          <Link
            href="/"
            className="font-medium text-[var(--foreground)] underline decoration-[var(--accent)] decoration-2 underline-offset-4 hover:text-[var(--accent)]"
          >
            Profyl
          </Link>{" "}
          · ton CV en ligne, toujours à jour
        </div>
      </footer>
    </div>
  );
}
