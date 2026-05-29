"use client";

import { HeroClaim } from "@/components/landing/HeroClaim";
import { useT } from "@/components/locale-provider";
import type { WallPersona } from "@/lib/demo-persona";
import Image from "next/image";

export function LandingHero({
  demoUsername,
  wallPersonas,
  publishedCount
}: {
  demoUsername: string;
  wallPersonas: WallPersona[];
  publishedCount: number;
}) {
  const t = useT();

  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-12 pt-8 md:pt-20">
      <div className="animate-rise-in text-center">
        <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-solid)]/80 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted-strong)] shadow-[var(--shadow-sm)] backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
          </span>
          {t("landing.eyebrow")}
        </div>

        <h1 className="hero-title mx-auto mt-8 max-w-6xl">
          {t("landing.title_1")} <em>{t("landing.title_em_1")}</em>
          <br />
          {t("landing.title_2")} <em>{t("landing.title_em_2")}</em>
        </h1>

        <p className="mx-auto mt-10 max-w-xl text-lg leading-relaxed text-[var(--muted-strong)] md:text-xl">
          {t("landing.subtitle")}{" "}
          <span className="handwritten text-[var(--foreground)]">
            {t("landing.subtitle_handwritten")}
          </span>
        </p>

        <HeroClaim demoUsername={demoUsername} />

        <p className="mt-6 inline-flex items-center gap-2 text-sm text-[var(--muted)]">
          <span className="inline-flex -space-x-1.5">
            {wallPersonas.slice(0, 4).map((p) => (
              <span
                key={p.username}
                className="relative h-5 w-5 overflow-hidden rounded-full border-2 border-[var(--surface-solid)]"
              >
                <Image src={p.photoUrl} alt="" fill className="object-cover" unoptimized />
              </span>
            ))}
          </span>
          <span>
            {publishedCount === 0
              ? t("landing.proof_empty")
              : publishedCount === 1
                ? t("landing.proof_one")
                : t("landing.proof", { count: publishedCount })}
          </span>
        </p>
      </div>
    </section>
  );
}
