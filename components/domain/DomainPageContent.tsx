"use client";

import { DomainSettings } from "@/components/domain/DomainSettings";
import { useT } from "@/components/locale-provider";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Globe, Lock } from "lucide-react";
import Link from "next/link";

type Dns = { kind: "A" | "CNAME"; name: string; value: string };

export function DomainPageContent({
  isPro,
  domain,
  verified,
  dns,
  status
}: {
  isPro: boolean;
  domain: string | null;
  verified: boolean;
  dns: Dns | null;
  status?: string;
}) {
  const t = useT();

  return (
    <div className="grain relative min-h-screen bg-[var(--background)]">
      <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
          <Logo />
          <Link
            href="/dashboard"
            className="text-sm text-[var(--muted)] transition hover:text-[var(--foreground)]"
          >
            {t("domain.back")}
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-10">
        <div className="flex items-center gap-3">
          <Globe className="h-6 w-6 text-[var(--accent)]" />
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight">
            {t("domain.title")}
          </h1>
        </div>
        <p className="mt-2 max-w-xl text-[var(--muted-strong)]">{t("domain.subtitle")}</p>

        <div className="mt-10">
          {isPro ? (
            <DomainSettings domain={domain} verified={verified} dns={dns} status={status} />
          ) : (
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-solid)] p-10 text-center shadow-[var(--shadow-md)]">
              <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--accent-soft)]">
                <Lock className="h-5 w-5 text-[var(--accent)]" />
              </span>
              <h2 className="mt-5 font-[family-name:var(--font-display)] text-2xl font-semibold">
                {t("domain.locked.title")}
              </h2>
              <p className="mx-auto mt-3 max-w-md text-[var(--muted-strong)]">
                {t("domain.locked.text")}
              </p>
              <Link href="/pricing" className="mt-7 inline-block">
                <Button variant="accent" size="lg">
                  {t("domain.locked.cta")}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
