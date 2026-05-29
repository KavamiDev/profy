"use client";

import { useT } from "@/components/locale-provider";
import { PlanCard } from "@/components/pricing/PlanCard";
import { ProPlanCard } from "@/components/pricing/ProPlanCard";
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

// Statuts de retour Stripe (ou seam) → message + style de bannière.
const STATUS_BANNERS: Record<string, { key: string; tone: "info" | "error" }> = {
  checkout_soon: { key: "pricing.checkout_soon", tone: "info" },
  cancelled: { key: "pricing.cancelled", tone: "info" },
  error: { key: "pricing.error", tone: "error" }
};

export function PricingPlans({ status }: { status?: string }) {
  const t = useT();
  const banner = status ? STATUS_BANNERS[status] : undefined;
  return (
    <section className="px-6 pb-24 md:pb-32">
      {banner ? (
        <div
          className={`mx-auto mb-8 max-w-2xl rounded-xl border px-4 py-3 text-center text-sm shadow-[var(--shadow-sm)] ${
            banner.tone === "error"
              ? "border-red-200 bg-red-50 text-red-800"
              : "border-[var(--border)] bg-[var(--surface-solid)] text-[var(--foreground)]"
          }`}
        >
          {t(banner.key)}
        </div>
      ) : null}
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        {plans.map((plan) =>
          plan.key === "pro" ? (
            <ProPlanCard key={plan.key} plan={plan} />
          ) : (
            <PlanCard key={plan.key} plan={plan} />
          )
        )}
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
