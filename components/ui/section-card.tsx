import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function SectionCard({
  title,
  description,
  children,
  className
}: {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-[var(--border)] bg-[var(--surface-solid)] p-5 shadow-[var(--shadow-sm)] transition hover:shadow-md",
        className
      )}
    >
      <div className="mb-4">
        <h2 className="text-base font-semibold tracking-tight">{title}</h2>
        {description ? <p className="mt-1 text-sm text-[var(--muted)]">{description}</p> : null}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
