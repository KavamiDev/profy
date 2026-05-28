"use client";

import { useT } from "@/components/locale-provider";
import { Logo } from "@/components/logo";
import { ProfileQr } from "@/components/profile-qr";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

/**
 * Header + Footer traduisibles pour la page publique d'un profil.
 * Séparé du Server Component /[username]/page.tsx pour pouvoir consommer
 * useT() côté client (la locale est dans le contexte client).
 */
export function PublicProfileHeader() {
  const t = useT();
  return (
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
          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-solid)] px-4 py-2 text-sm font-medium text-[var(--foreground)] shadow-[var(--shadow-sm)] transition hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-md)]"
        >
          {t("publicpage.cta.create_mine")}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </header>
  );
}

export function PublicProfileFooter({ username }: { username: string }) {
  const t = useT();
  return (
    <footer className="relative z-10 border-t border-[var(--border)] bg-[var(--surface-solid)]/40 py-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-6 md:flex-row md:items-center md:justify-between">
        <div className="text-center md:text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
            {t("publicpage.share.eyebrow")}
          </p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight">
            profyl.io/{username}
          </p>
          <p className="mt-2 max-w-md text-sm text-[var(--muted)]">{t("publicpage.share.help")}</p>
        </div>
        <ProfileQr username={username} />
      </div>
      <div className="mx-auto mt-12 max-w-6xl border-t border-[var(--border)] px-6 pt-8 text-center text-sm text-[var(--muted)]">
        {t("publicpage.footer.created_with")}{" "}
        <Link
          href="/"
          className="font-medium text-[var(--foreground)] underline decoration-[var(--accent)] decoration-2 underline-offset-4 hover:text-[var(--accent)]"
        >
          Profyl
        </Link>{" "}
        {t("publicpage.footer.tagline")}
      </div>
    </footer>
  );
}
