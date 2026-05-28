"use client";

import { useT } from "@/components/locale-provider";
import { Logo } from "@/components/logo";

export function SiteFooter({ showLogo = true }: { showLogo?: boolean }) {
  const t = useT();
  return (
    <footer className="relative z-10 border-t border-[var(--border)] bg-[var(--background-elevated)] py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-sm text-[var(--muted)] sm:flex-row sm:justify-between">
        {showLogo ? <Logo /> : <span />}
        <p className="text-center sm:text-right">
          {t("footer.tagline")}{" "}
          <span className="handwritten text-[var(--foreground)]">{t("footer.handwritten")}</span>
        </p>
      </div>
    </footer>
  );
}
