"use client";

import { useT } from "@/components/locale-provider";

export function PricingComparison() {
  const t = useT();

  const comparisonRows: { label: string; free: string; pro: string }[] = [
    { label: t("pricing.row.experiences"), free: "6", pro: t("pricing.row.value.unlimited") },
    { label: t("pricing.row.education"), free: "4", pro: t("pricing.row.value.unlimited") },
    { label: t("pricing.row.projects"), free: "6", pro: t("pricing.row.value.unlimited") },
    { label: t("pricing.row.skills"), free: "15", pro: t("pricing.row.value.unlimited") },
    { label: t("pricing.row.views"), free: t("pricing.row.value.dash"), pro: "✓" },
    { label: t("pricing.row.domain"), free: t("pricing.row.value.dash"), pro: "✓" },
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

  return (
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
  );
}
