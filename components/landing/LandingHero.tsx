"use client";

import { useT } from "@/components/locale-provider";
import { Button } from "@/components/ui/button";
import type { WallPersona } from "@/lib/demo-persona";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function LandingHero({
  demoUsername,
  wallPersonas
}: {
  demoUsername: string;
  wallPersonas: WallPersona[];
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

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link href="/dashboard">
            <Button variant="accent" size="lg" className="w-full animate-pulse-coral sm:w-auto">
              {t("landing.cta.primary")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href={`/${demoUsername}`}>
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              {t("landing.cta.secondary")}
            </Button>
          </Link>
        </div>

        <p className="mt-5 inline-flex items-center gap-2 text-sm text-[var(--muted)]">
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
          <span>{t("landing.proof")}</span>
        </p>
      </div>
    </section>
  );
}
