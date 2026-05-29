"use client";

import { useT } from "@/components/locale-provider";
import type { WallPersona } from "@/lib/demo-persona";
import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const accentGradient: Record<string, string> = {
  coral: "from-[var(--accent-soft)] to-[var(--background-elevated)]",
  lavender: "from-[var(--accent-soft-2)] to-[var(--background-elevated)]",
  honey: "from-[var(--accent-soft-3)] to-[var(--background-elevated)]",
  mint: "from-[var(--accent-soft-4)] to-[var(--background-elevated)]",
  ink: "from-[var(--surface-hover)] to-[var(--background-elevated)]"
};

export function LandingWall({
  demoUsername,
  wallPersonas
}: {
  demoUsername: string;
  wallPersonas: WallPersona[];
}) {
  const t = useT();

  return (
    <section className="section-warm relative overflow-hidden border-b border-[var(--border)] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="hero-eyebrow">{t("landing.wall.eyebrow")}</p>
          <h2 className="section-title mt-4">
            {t("landing.wall.title_1")} <em>{t("landing.wall.title_em")}</em>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-[var(--muted-strong)]">
            {t("landing.wall.description")}
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wallPersonas.map((p) => (
            <Link
              key={p.username}
              href={p.username === demoUsername ? `/${demoUsername}` : "/dashboard"}
              className="card-mini block"
              style={{ transform: `rotate(${p.rotate}deg)` }}
            >
              <div
                className={`bg-gradient-to-b ${accentGradient[p.accent]} relative flex justify-center px-5 pb-4 pt-10`}
              >
                <div className="relative h-24 w-24 overflow-hidden rounded-full border-[4px] border-[var(--surface-solid)] shadow-[var(--shadow-md)]">
                  <Image
                    src={p.photoUrl}
                    alt={p.fullName}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              </div>
              <div className="px-5 pb-6 pt-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  profyl.io/{p.username}
                </p>
                <h3 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight">
                  {p.fullName}
                </h3>
                <p className="text-base text-[var(--muted-strong)]">{p.title}</p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="inline-flex items-center gap-1 text-xs text-[var(--muted)]">
                    <MapPin className="h-3 w-3" />
                    {p.location}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--accent)]">
                    {t("landing.wall.see")} <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-14 text-center">
          <span className="handwritten text-2xl text-[var(--foreground)]">
            {t("landing.wall.handwritten")}
          </span>
        </p>
      </div>
    </section>
  );
}
