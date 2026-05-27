"use client";

import { useTheme } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";

/**
 * Interrupteur thème — style "light switch" inspiré d'une vraie pièce.
 * Track sombre/clair, thumb qui glisse avec icône sun (light) ou moon (dark).
 */
export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
      title={isDark ? "Mode clair" : "Mode sombre"}
      className={`relative inline-flex h-8 w-[58px] shrink-0 items-center rounded-full border transition-colors ${
        isDark
          ? "border-[var(--border-strong)] bg-[var(--accent-5)]"
          : "border-[var(--border-strong)] bg-[var(--accent-soft-3)]"
      }`}
    >
      {/* Étoiles décoratives côté dark */}
      <span
        className={`pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 transition-opacity ${
          isDark ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden
      >
        <Moon className="h-3.5 w-3.5 text-[var(--accent-3)]" />
      </span>
      <span
        className={`pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 transition-opacity ${
          isDark ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden
      >
        <Sun className="h-3.5 w-3.5 text-[var(--accent)]" />
      </span>

      {/* Thumb (l'interrupteur qui glisse) */}
      <span
        className={`pointer-events-none absolute top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.25)] transition-all duration-300 ease-out ${
          isDark ? "translate-x-[27px]" : "translate-x-[3px]"
        }`}
      >
        {isDark ? (
          <Moon className="h-3 w-3 text-[var(--foreground)]" />
        ) : (
          <Sun className="h-3 w-3 text-[var(--accent)]" />
        )}
      </span>
    </button>
  );
}
