"use client";

import { useT } from "@/components/locale-provider";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";

export function PricingCta() {
  const t = useT();
  return (
    <section className="section-ink relative overflow-hidden py-20 md:py-28">
      <div className="animate-spin-slow pointer-events-none absolute right-12 top-12 opacity-15">
        <Star className="h-20 w-20 fill-[var(--accent)] text-[var(--accent)]" />
      </div>
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <h2 className="section-title text-white">
          {t("pricing.cta_final.title_1")}{" "}
          <em className="text-[var(--accent-3)]">{t("pricing.cta_final.title_em")}</em>
          {t("pricing.cta_final.title_2")}
        </h2>
        <p className="mx-auto mt-5 max-w-md text-lg text-white/70">
          {t("pricing.cta_final.text")}
        </p>
        <Link href="/dashboard" className="mt-10 inline-block">
          <Button variant="accent" size="lg" className="animate-pulse-coral">
            {t("pricing.cta_final.button")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
