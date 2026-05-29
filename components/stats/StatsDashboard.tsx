"use client";

import { useT } from "@/components/locale-provider";
import type { ViewStats } from "@/lib/server/views-store";

const REFERER_LABELS: Record<string, string> = {
  "linkedin.com": "LinkedIn",
  "www.linkedin.com": "LinkedIn",
  "lnkd.in": "LinkedIn",
  "google.com": "Google",
  "www.google.com": "Google",
  "github.com": "GitHub",
  "x.com": "X / Twitter",
  "t.co": "X / Twitter",
  "instagram.com": "Instagram",
  "facebook.com": "Facebook"
};

function countryFlag(code: string): string {
  if (!/^[A-Za-z]{2}$/.test(code)) return "🌍";
  return code
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-solid)] p-5 shadow-[var(--shadow-sm)]">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-[var(--muted)]">{label}</p>
      <p className="mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight">
        {value.toLocaleString("fr-FR")}
      </p>
    </div>
  );
}

export function StatsDashboard({ stats }: { stats: ViewStats }) {
  const t = useT();
  const maxDaily = Math.max(1, ...stats.daily.map((d) => d.count));
  const hasViews = stats.total > 0;

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label={t("stats.total")} value={stats.total} />
        <StatCard label={t("stats.last7")} value={stats.last7} />
        <StatCard label={t("stats.last30")} value={stats.last30} />
      </div>

      {!hasViews ? (
        <p className="rounded-2xl border border-dashed border-[var(--border-strong)] bg-[var(--surface)] px-6 py-10 text-center text-[var(--muted-strong)]">
          {t("stats.empty")}
        </p>
      ) : (
        <>
          <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface-solid)] p-6 shadow-[var(--shadow-sm)]">
            <h2 className="text-sm font-semibold text-[var(--foreground)]">
              {t("stats.daily_title")}
            </h2>
            <div className="mt-6 flex h-40 items-end gap-[3px]">
              {stats.daily.map((d) => (
                <div
                  key={d.date}
                  className="group relative flex-1"
                  style={{ height: "100%" }}
                  title={`${d.date} · ${d.count}`}
                >
                  <div className="absolute bottom-0 w-full rounded-t bg-[var(--surface-hover)]" style={{ height: "100%" }} />
                  <div
                    className="absolute bottom-0 w-full rounded-t bg-[var(--accent)] transition-all"
                    style={{ height: `${(d.count / maxDaily) * 100}%` }}
                  />
                </div>
              ))}
            </div>
          </section>

          <div className="grid gap-6 md:grid-cols-2">
            <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface-solid)] p-6 shadow-[var(--shadow-sm)]">
              <h2 className="text-sm font-semibold">{t("stats.sources_title")}</h2>
              <ul className="mt-4 space-y-3">
                {stats.topReferers.map((r) => {
                  const label =
                    r.host === "direct"
                      ? t("stats.source.direct")
                      : (REFERER_LABELS[r.host] ?? r.host);
                  const pct = Math.round((r.count / stats.last30) * 100) || 0;
                  return (
                    <li key={r.host}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-[var(--foreground)]">{label}</span>
                        <span className="text-[var(--muted)]">{r.count}</span>
                      </div>
                      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface-hover)]">
                        <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${pct}%` }} />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>

            <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface-solid)] p-6 shadow-[var(--shadow-sm)]">
              <h2 className="text-sm font-semibold">{t("stats.countries_title")}</h2>
              <ul className="mt-4 space-y-3">
                {stats.topCountries.length === 0 ? (
                  <li className="text-sm text-[var(--muted)]">{t("stats.empty_chart")}</li>
                ) : (
                  stats.topCountries.map((c) => (
                    <li key={c.country} className="flex items-center justify-between text-sm">
                      <span className="font-medium text-[var(--foreground)]">
                        {countryFlag(c.country)} {c.country}
                      </span>
                      <span className="text-[var(--muted)]">{c.count}</span>
                    </li>
                  ))
                )}
              </ul>
            </section>
          </div>
        </>
      )}
    </div>
  );
}
