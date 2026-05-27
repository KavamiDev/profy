"use client";

import { useT } from "@/components/locale-provider";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";

/**
 * Liens secondaires du header (Pricing, Exemple) + CTA principal.
 * Client Component → utilise useT() pour les labels traduits.
 */
export function HeaderActions({
  showPricing,
  showExample,
  demoUsername,
  isAuthed
}: {
  showPricing: boolean;
  showExample: boolean;
  demoUsername?: string;
  isAuthed: boolean;
}) {
  const t = useT();

  return (
    <>
      <div className="hidden items-center gap-3 sm:flex">
        {showPricing ? (
          <Link
            href="/pricing"
            className="text-sm text-[var(--muted)] transition hover:text-[var(--foreground)]"
          >
            {t("common.cta.pricing")}
          </Link>
        ) : null}
        {showExample && demoUsername ? (
          <Link
            href={`/${demoUsername}`}
            className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] transition hover:text-[var(--foreground)]"
          >
            {t("common.cta.example")}
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        ) : null}
      </div>
    </>
  );
}

/** CTA principal du header — variante selon auth state. */
export function HeaderCta({ isAuthed }: { isAuthed: boolean }) {
  const t = useT();
  return (
    <Link href="/dashboard">
      <Button variant={isAuthed ? "accent" : "primary"} size="sm">
        {t(isAuthed ? "common.cta.continue" : "common.cta.create")}
        {isAuthed ? <ArrowRight className="ml-1.5 h-3.5 w-3.5" /> : null}
      </Button>
    </Link>
  );
}
