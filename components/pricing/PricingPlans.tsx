"use client";

import { useT } from "@/components/locale-provider";
import { PlanCard } from "@/components/pricing/PlanCard";
import { plans } from "@/components/pricing/plans";
import { Check } from "lucide-react";

export function PricingHero() {
  const t = useT();
  return (
    <section className="mx-auto max-w-5xl px-6 pb-16 pt-12 text-center md:pt-20">
      <p className="hero-eyebrow">{t("pricing.eyebrow")}</p>
      <h1 className="section-title mt-4">
        {t("pricing.title_1")} <em>{t("pricing.title_em")}</em>
        <br />
        {t("pricing.title_2")}
      </h1>
      <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--muted-strong)]">
        {t("pricing.subtitle")}
      </p>
    </section>
  );
}

export function PricingPlans() {
  const t = useT();
  return (
    <section className="px-6 pb-24 md:pb-32">
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        {plans.map((plan) => (
          <PlanCard key={plan.key} plan={plan} />
        ))}
      </div>

      <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-3 text-center text-sm text-[var(--muted)] sm:flex-row sm:justify-center sm:gap-6">
        <span className="inline-flex items-center gap-2">
          <Check className="h-4 w-4 text-[var(--accent-4)]" />
          {t("pricing.reassurance.trial")}
        </span>
        <span className="inline-flex items-center gap-2">
          <Check className="h-4 w-4 text-[var(--accent-4)]" />
          {t("pricing.reassurance.no_card")}
        </span>
        <span className="inline-flex items-center gap-2">
          <Check className="h-4 w-4 text-[var(--accent-4)]" />
          {t("pricing.reassurance.cancel")}
        </span>
      </div>
    </section>
  );
}
