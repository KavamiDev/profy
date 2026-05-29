"use client";

import { BrowserFrame } from "@/components/browser-frame";
import { useT } from "@/components/locale-provider";

export function LandingEmbed({ demoUsername }: { demoUsername: string }) {
  const t = useT();

  return (
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
  );
}
