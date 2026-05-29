"use client";

import { useT } from "@/components/locale-provider";
import { Button } from "@/components/ui/button";
import type { PlanDef } from "@/components/pricing/plans";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import Link from "next/link";

export function PlanCard({ plan }: { plan: PlanDef }) {
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
