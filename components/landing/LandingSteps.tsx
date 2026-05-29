"use client";

import { useT } from "@/components/locale-provider";
import { Sparkles } from "lucide-react";

export function LandingSteps() {
  const t = useT();
  const steps = [1, 2, 3].map((n) => ({
    n: `0${n}`,
    title: t(`landing.steps.${n}.title`),
    text: t(`landing.steps.${n}.text`)
  }));

  return (
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
  );
}
