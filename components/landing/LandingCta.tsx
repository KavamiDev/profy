"use client";

import { useT } from "@/components/locale-provider";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";

export function LandingCta({ demoUsername }: { demoUsername: string }) {
  const t = useT();

  return (
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
  );
}
