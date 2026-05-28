"use client";

import { BrowserFrame } from "@/components/browser-frame";
import { useT } from "@/components/locale-provider";
import { Button } from "@/components/ui/button";
import type { WallPersona } from "@/lib/demo-persona";
import { ArrowRight, MapPin, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const accentGradient: Record<string, string> = {
  coral: "from-[var(--accent-soft)] to-[var(--background-elevated)]",
  lavender: "from-[var(--accent-soft-2)] to-[var(--background-elevated)]",
  honey: "from-[var(--accent-soft-3)] to-[var(--background-elevated)]",
  mint: "from-[var(--accent-soft-4)] to-[var(--background-elevated)]",
  ink: "from-[var(--surface-hover)] to-[var(--background-elevated)]"
};

export function LandingContent({
  demoUsername,
  wallPersonas
}: {
  demoUsername: string;
  wallPersonas: WallPersona[];
}) {
  const t = useT();

  const marqueeItems = Array.from({ length: 10 }, (_, i) => t(`landing.marquee.${i + 1}`));
  const steps = [1, 2, 3].map((n) => ({
    n: `0${n}`,
    title: t(`landing.steps.${n}.title`),
    text: t(`landing.steps.${n}.text`)
  }));

  return (
    <main className="relative z-10">
      {/* ---------- HERO ---------- */}
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

      {/* ---------- BROWSER FRAME EMBED ---------- */}
      <section className="relative px-4 pb-24 md:px-6 md:pb-32">
        <div className="animate-rise-in-delay-2 relative mx-auto max-w-6xl">
          <span
            className="sticker sticker--cream animate-wobble -left-2 -top-6 z-30 sm:-left-10 sm:-top-8 md:-left-16"
            style={{ ["--rot" as never]: "-6deg" }}
          >
            <span aria-hidden>🇫🇷</span> {t("landing.sticker.france")}
          </span>
          <span
            className="sticker sticker--accent animate-wobble -right-2 -top-4 z-30 sm:-right-8 md:-right-14"
            style={{ ["--rot" as never]: "7deg" }}
          >
            <span aria-hidden>✨</span> {t("landing.sticker.free")}
          </span>
          <span
            className="sticker sticker--mint animate-wobble -bottom-4 left-4 z-30 sm:-bottom-6 sm:left-12"
            style={{ ["--rot" as never]: "-4deg" }}
          >
            <span aria-hidden>⏱</span> {t("landing.sticker.live")}
          </span>

          <div
            aria-hidden
            className="absolute -inset-12 -z-10 rounded-[60px] bg-gradient-to-br from-[var(--accent)]/15 via-[var(--accent-2)]/10 to-transparent blur-3xl"
          />

          <BrowserFrame
            url={`https://profyl.io/${demoUsername}`}
            src={`/${demoUsername}?embed=1`}
            title={`Profil exemple de ${demoUsername}`}
            height={780}
            className="mx-auto"
          />

          <p className="mt-8 text-center text-sm text-[var(--muted)]">
            <span className="handwritten text-base text-[var(--foreground)]">
              {t("landing.embed.caption")}
            </span>{" "}
            {t("landing.embed.help")}
          </p>
        </div>
      </section>

      {/* ---------- MARQUEE STRIP ---------- */}
      <section className="relative border-y border-[var(--border)] bg-[var(--accent-5)] py-6 text-white">
        <div className="marquee-mask">
          <div className="marquee-track">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-3 font-[family-name:var(--font-display)] text-xl font-medium italic md:text-2xl"
              >
                <Star className="h-4 w-4 fill-[var(--accent)] text-[var(--accent)]" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- WALL OF PROFILES ---------- */}
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

      {/* ---------- HOW IT WORKS ---------- */}
      <section className="section-mint relative overflow-hidden py-24 md:py-32">
        <div className="dot-grid pointer-events-none absolute right-8 top-8 h-32 w-32 opacity-50" />

        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <p className="hero-eyebrow">{t("landing.steps.eyebrow")}</p>
            <h2 className="section-title mt-4">
              {t("landing.steps.title_1")} <em>{t("landing.steps.title_em")}</em>
            </h2>
          </div>

          <div className="mt-20 grid gap-12 md:grid-cols-3 md:gap-8">
            {steps.map((step, idx) => (
              <div key={step.n} className="relative">
                <div className="flex items-baseline gap-4">
                  <span className="step-num">{step.n}</span>
                  <Sparkles className="h-5 w-5 text-[var(--accent)]" />
                </div>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-lg text-[var(--muted-strong)] leading-relaxed">
                  {step.text}
                </p>
                {idx < steps.length - 1 && (
                  <div className="absolute right-[-24px] top-12 hidden h-px w-12 bg-gradient-to-r from-[var(--accent)] to-transparent md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA FINAL ---------- */}
      <section className="section-ink relative overflow-hidden py-24 md:py-36">
        <div className="animate-spin-slow pointer-events-none absolute right-8 top-12 opacity-20 md:right-20">
          <Star className="h-24 w-24 fill-[var(--accent)] text-[var(--accent)]" />
        </div>
        <div className="animate-spin-slow pointer-events-none absolute bottom-10 left-10 opacity-15">
          <Star className="h-16 w-16 fill-white text-white" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <span
            className="sticker sticker--accent static mb-8 inline-flex"
            style={{ ["--rot" as never]: "-3deg", position: "relative" }}
          >
            <span aria-hidden>🚀</span> {t("landing.cta_final.sticker")}
          </span>
          <h2 className="section-title mt-2 text-white">
            {t("landing.cta_final.title_1")}
            <br />
            <em className="text-[var(--accent-3)]">{t("landing.cta_final.title_em")}</em>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-lg text-white/70">
            {t("landing.cta_final.text_1")}{" "}
            <Link
              href={`/${demoUsername}`}
              className="font-medium text-white underline decoration-[var(--accent)] decoration-2 underline-offset-4 hover:text-[var(--accent-3)]"
            >
              Marie Laurent
            </Link>{" "}
            {t("landing.cta_final.text_2")}
          </p>
          <Link href="/dashboard" className="mt-10 inline-block">
            <Button variant="accent" size="lg" className="animate-pulse-coral">
              {t("landing.cta_final.button")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <p className="mt-6 text-sm text-white/50">{t("landing.cta_final.disclaimer")}</p>
        </div>
      </section>
    </main>
  );
}
