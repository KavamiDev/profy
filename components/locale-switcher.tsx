"use client";

import { useLocale } from "@/components/locale-provider";
import { LOCALES } from "@/lib/i18n/locales";

/**
 * Switcher de langue type "pushbutton" — segmented control.
 * Extensible : ajouter une locale dans LOCALES suffit.
 */
export function LocaleSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div
      role="group"
      aria-label="Langue de l'interface"
      className="inline-flex items-center gap-0.5 rounded-full border border-[var(--border)] bg-[var(--surface-hover)] p-0.5 text-xs font-semibold"
    >
      {LOCALES.map((l) => {
        const active = locale === l.code;
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLocale(l.code)}
            aria-pressed={active}
            title={l.label}
            className={`relative inline-flex h-7 min-w-[34px] items-center justify-center rounded-full px-2.5 transition-colors ${
              active
                ? "bg-[var(--foreground)] text-[var(--background)] shadow-[var(--shadow-sm)]"
                : "text-[var(--muted)] hover:text-[var(--foreground)]"
            }`}
          >
            {l.shortLabel}
          </button>
        );
      })}
    </div>
  );
}
