"use client";

import { useT } from "@/components/locale-provider";
import { ArrowRight } from "lucide-react";

export function PricingFaq() {
  const t = useT();
  const faqs = Array.from({ length: 8 }, (_, i) => ({
    q: t(`pricing.faq.q${i + 1}`),
    a: t(`pricing.faq.a${i + 1}`)
  }));

  return (
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
  );
}
