import type { ComponentType } from "react";
import { cn } from "@/lib/utils";

/**
 * Lien de contact stylisé partagé entre la preview compact et la page full.
 * `variant="compact"` ajoute un hover bg, `variant="full"` ne change que la bordure.
 */
export function ContactLink({
  icon: Icon,
  href,
  label,
  external,
  variant = "full"
}: {
  icon: ComponentType<{ className?: string }>;
  href: string;
  label: string;
  external?: boolean;
  variant?: "compact" | "full";
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={cn(
        "flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-solid)] px-4 py-3 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-sm)]",
        variant === "compact" && "hover:bg-[var(--surface-hover)]"
      )}
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-hover)] text-[var(--muted)]">
        <Icon className="h-4 w-4" />
      </span>
      <span className="truncate">{label}</span>
    </a>
  );
}
