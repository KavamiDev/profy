"use client";

import { useT } from "@/components/locale-provider";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Sparkles, Star, Zap } from "lucide-react";
import Link from "next/link";

type PlanDef = {
  key: "free" | "pro";
  nameKey: string;
  taglineKey: string;
  ctaKey: string;
  ctaHref: string;
  price: { monthly: string; annual?: string };
  highlight?: boolean;
  icon: typeof Zap;
  featureKeys: string[];
  notIncludedKeys?: string[];
};

const plans: PlanDef[] = [
  {
    key: "free",
    nameKey: "pricing.free.name",
    taglineKey: "pricing.free.tagline",
    ctaKey: "pricing.free.cta",
    ctaHref: "/dashboard",
    price: { monthly: "0 €" },
    icon: Sparkles,
    featureKeys: Array.from({ length: 6 }, (_, i) => `pricing.free.feature.${i + 1}`),
    notIncludedKeys: ["pricing.free.notincluded.1", "pricing.free.notincluded.2"]
  },
  {
    key: "pro",
    nameKey: "pricing.pro.name",
    taglineKey: "pricing.pro.tagline",
    ctaKey: "pricing.pro.cta",
    ctaHref: "/dashboard?upgrade=pro",
    price: { monthly: "5 €", annual: "50 €" },
    highlight: true,
    icon: Zap,
    featureKeys: Array.from({ length: 9 }, (_, i) => `pricing.pro.feature.${i + 1}`)
  }
];

export function PricingContent() {
  const t = useT();

  const comparisonRows: { label: string; free: string; pro: string }[] = [
    {
      label: t("pricing.row.experiences"),
      free: "6",
      pro: t("pricing.row.value.unlimited")
    },
    { label: t("pricing.row.education"), free: "4", pro: t("pricing.row.value.unlimited") },
    { label: t("pricing.row.projects"), free: "6", pro: t("pricing.row.value.unlimited") },
    { label: t("pricing.row.skills"), free: "15", pro: t("pricing.row.value.unlimited") },
    {
      label: t("pricing.row.domain"),
      free: t("pricing.row.value.dash"),
      pro: "✓"
    },
    { label: t("pricing.row.multi"), free: "1", pro: t("pricing.row.value.up_to_5") },
    { label: t("pricing.row.pdf"), free: t("pricing.row.value.dash"), pro: "✓" },
    { label: t("pricing.row.watermark"), free: t("pricing.row.value.dash"), pro: "✓" },
    { label: t("pricing.row.video"), free: t("pricing.row.value.dash"), pro: "✓" },
    { label: t("pricing.row.og"), free: t("pricing.row.value.dash"), pro: "✓" },
    {
      label: t("pricing.row.support"),
      free: t("pricing.row.value.community"),
      pro: t("pricing.row.value.priority")
    }
  ];

  const faqs = Array.from({ length: 8 }, (_, i) => ({
    q: t(`pricing.faq.q${i + 1}`),
    a: t(`pricing.faq.a${i + 1}`)
  }));

  return (
    <main className="relative z-10">
      {/* ---------- HERO ---------- */}
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

      {/* ---------- PLANS ---------- */}
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

      {/* ---------- COMPARISON ---------- */}
      <section className="section-warm relative overflow-hidden border-y border-[var(--border)] py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center">
            <p className="hero-eyebrow">{t("pricing.comparison.eyebrow")}</p>
            <h2 className="section-title mt-3">{t("pricing.comparison.title")}</h2>
          </div>

          <div className="mt-12 overflow-x-auto rounded-3xl border border-[var(--border)] bg-[var(--surface-solid)] shadow-[var(--shadow-md)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--surface-hover)]">
                  <th className="p-4 text-left font-medium text-[var(--muted)]">
                    {t("pricing.comparison.col_limits")}
                  </th>
                  <th className="p-4 text-center font-semibold">{t("pricing.free.name")}</th>
                  <th className="p-4 text-center font-semibold text-[var(--accent)]">
                    {t("pricing.pro.name")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {comparisonRows.map((row) => (
                  <tr key={row.label}>
                    <td className="p-4 font-medium text-[var(--foreground)]">{row.label}</td>
                    <td className="p-4 text-center text-[var(--muted-strong)]">{row.free}</td>
                    <td className="bg-[var(--accent-soft)]/50 p-4 text-center font-medium text-[var(--accent-deep)]">
                      {row.pro}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="relative py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <div className="text-center">
            <p className="hero-eyebrow">{t("pricing.faq.eyebrow")}</p>
            <h2 className="section-title mt-3">
              {t("pricing.faq.title_1")} <em>{t("pricing.faq.title_em")}</em>
            </h2>
          </div>

          <div className="mt-12 space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-2xl border border-[var(--border)] bg-[var(--surface-solid)] px-5 py-4 shadow-[var(--shadow-sm)] transition open:shadow-[var(--shadow-md)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-[var(--foreground)]">
                  {faq.q}
                  <ArrowRight className="h-4 w-4 shrink-0 text-[var(--muted)] transition group-open:rotate-90 group-open:text-[var(--accent)]" />
                </summary>
                <p className="mt-3 leading-relaxed text-[var(--muted-strong)]">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- CTA FINAL ---------- */}
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
    </main>
  );
}

function PlanCard({ plan }: { plan: PlanDef }) {
  const t = useT();
  const Icon = plan.icon;
  return (
    <div
      className={`relative flex flex-col rounded-3xl border bg-[var(--surface-solid)] p-8 shadow-[var(--shadow-md)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-xl)] ${
        plan.highlight
          ? "border-[var(--accent)] ring-4 ring-[var(--accent-soft)]"
          : "border-[var(--border)]"
      }`}
    >
      {plan.highlight ? (
        <span
          className="sticker sticker--accent absolute -top-4 left-1/2 -translate-x-1/2"
          style={{ ["--rot" as never]: "-3deg" }}
        >
          <Sparkles className="h-3.5 w-3.5" /> {t("pricing.pro.recommended")}
        </span>
      ) : null}

      <div className="mb-4 flex items-center gap-2.5">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${
            plan.highlight
              ? "bg-[var(--accent)] text-white"
              : "bg-[var(--surface-hover)] text-[var(--foreground)]"
          }`}
        >
          <Icon className="h-4 w-4" />
        </span>
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight">
          {t(plan.nameKey)}
        </h2>
      </div>
      <p className="text-sm text-[var(--muted-strong)]">{t(plan.taglineKey)}</p>

      <div className="my-6 flex items-baseline gap-1.5">
        <span className="font-[family-name:var(--font-display)] text-5xl font-semibold tracking-tight">
          {plan.price.monthly}
        </span>
        <span className="text-sm text-[var(--muted)]">{t("pricing.price.per_month")}</span>
      </div>
      {plan.price.annual ? (
        <p className="-mt-3 mb-6 text-xs text-[var(--muted)]">
          {t("pricing.price.or_annual", { price: plan.price.annual })}
        </p>
      ) : null}

      <Link href={plan.ctaHref} className="mb-6 block">
        <Button variant={plan.highlight ? "accent" : "primary"} size="md" className="w-full">
          {t(plan.ctaKey)}
          <ArrowRight className="ml-2 h-3.5 w-3.5" />
        </Button>
      </Link>

      <ul className="space-y-2.5 text-sm">
        {plan.featureKeys.map((k) => (
          <li key={k} className="flex items-start gap-2.5">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
            <span className="text-[var(--muted-strong)]">{t(k)}</span>
          </li>
        ))}
      </ul>

      {plan.notIncludedKeys ? (
        <ul className="mt-5 space-y-2 border-t border-[var(--border)] pt-5 text-sm">
          {plan.notIncludedKeys.map((k) => (
            <li key={k} className="flex items-start gap-2.5 text-[var(--muted)]">
              <span className="mt-0.5 h-4 w-4 shrink-0 text-center">·</span>
              <span>{t(k)}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
