"use client";

import { useT } from "@/components/locale-provider";
import type { PlanDef } from "@/components/pricing/plans";
import { Button } from "@/components/ui/button";
import { PRO_PACKS, type ProPackKey } from "@/lib/pro";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { useState } from "react";

const PACK_ORDER: ProPackKey[] = ["m1", "m3", "m12"];

export function ProPlanCard({ plan }: { plan: PlanDef }) {
  const t = useT();
  const Icon = plan.icon;
  const [selected, setSelected] = useState<ProPackKey>("m3");
  const pack = PRO_PACKS[selected];
  const perMonth = (pack.priceEur / pack.months).toFixed(pack.months === 1 ? 0 : 2);

  return (
    <div className="relative flex flex-col rounded-3xl border border-[var(--accent)] bg-[var(--surface-solid)] p-8 shadow-[var(--shadow-md)] ring-4 ring-[var(--accent-soft)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-xl)]">
      <span
        className="sticker sticker--accent absolute -top-4 left-1/2 -translate-x-1/2"
        style={{ ["--rot" as never]: "-3deg" }}
      >
        <Sparkles className="h-3.5 w-3.5" /> {t("pricing.pro.recommended")}
      </span>

      <div className="mb-4 flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent)] text-white">
          <Icon className="h-4 w-4" />
        </span>
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight">
          {t(plan.nameKey)}
        </h2>
      </div>
      <p className="text-sm text-[var(--muted-strong)]">{t(plan.taglineKey)}</p>

      {/* Sélecteur de durée (passes, paiement unique) */}
      <p className="mt-6 text-xs font-medium uppercase tracking-[0.14em] text-[var(--muted)]">
        {t("pricing.pack.choose")}
      </p>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {PACK_ORDER.map((key) => {
          const isSel = key === selected;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelected(key)}
              className={`relative rounded-xl border px-2 py-2.5 text-center text-sm transition ${
                isSel
                  ? "border-[var(--accent)] bg-[var(--accent-soft)] font-semibold text-[var(--accent-deep)]"
                  : "border-[var(--border)] text-[var(--muted-strong)] hover:border-[var(--border-strong)]"
              }`}
            >
              {key === "m3" ? (
                <span className="absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[var(--accent)] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white">
                  {t("pricing.pack.best")}
                </span>
              ) : null}
              {t(`pricing.pack.${key}`)}
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex items-baseline gap-1.5">
        <span className="font-[family-name:var(--font-display)] text-5xl font-semibold tracking-tight">
          {pack.priceEur} €
        </span>
        {pack.months > 1 ? (
          <span className="text-sm text-[var(--muted)]">
            {t("pricing.pack.permonth", { price: perMonth })}
          </span>
        ) : null}
      </div>
      <p className="mt-1 text-xs text-[var(--muted)]">{t("pricing.pack.once")}</p>

      <a href={`/api/checkout?pack=${selected}`} className="mb-6 mt-6 block">
        <Button variant="accent" size="md" className="w-full">
          {t("pricing.pack.cta")}
          <ArrowRight className="ml-2 h-3.5 w-3.5" />
        </Button>
      </a>

      <ul className="space-y-2.5 text-sm">
        {plan.featureKeys.map((k) => (
          <li key={k} className="flex items-start gap-2.5">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
            <span className="text-[var(--muted-strong)]">{t(k)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
