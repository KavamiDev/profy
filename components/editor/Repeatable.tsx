"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { ChevronDown, Lock, Plus, Trash2 } from "lucide-react";
import { useT } from "@/components/locale-provider";
import { SectionCard } from "@/components/ui/section-card";
import { canAdd, getLimit, type PlanTier, type SectionKey } from "@/lib/plan-limits";

export function RepeatableSection({
  title,
  description,
  count,
  plan,
  sectionKey,
  onAdd,
  addLabel,
  emptyLabel,
  children
}: {
  title: string;
  description?: string;
  count: number;
  plan: PlanTier;
  sectionKey: SectionKey;
  onAdd: () => void;
  addLabel: string;
  emptyLabel: string;
  children: ReactNode;
}) {
  const t = useT();
  const limit = getLimit(plan, sectionKey);
  const limitReached = !canAdd(plan, sectionKey, count);
  const limitText = limit === Infinity ? null : `${count}/${limit}`;

  return (
    <SectionCard
      title={
        <span className="flex items-center gap-2">
          {title}
          {limitText ? (
            <span className="rounded-full bg-[var(--surface-hover)] px-2 py-0.5 text-[11px] font-medium text-[var(--muted)]">
              {limitText}
            </span>
          ) : null}
        </span>
      }
      description={description}
    >
      <div className="space-y-3">
        {count === 0 ? (
          <p className="rounded-xl border border-dashed border-[var(--border)] px-4 py-6 text-center text-sm text-[var(--muted)]">
            {emptyLabel}
          </p>
        ) : (
          children
        )}

        {limitReached ? (
          <div className="flex items-center gap-3 rounded-xl border border-[var(--accent-soft-3)] bg-[var(--accent-soft-3)]/40 px-4 py-3 text-sm">
            <Lock className="h-4 w-4 shrink-0 text-[var(--accent-3)]" />
            <p className="flex-1 text-[var(--muted-strong)]">
              {t("dashboard.limit.reached", { limit })}{" "}
              <Link
                href="/pricing"
                className="font-medium text-[var(--foreground)] underline decoration-[var(--accent)] decoration-2 underline-offset-4"
              >
                {t("dashboard.limit.upgrade_link")}
              </Link>
            </p>
          </div>
        ) : (
          <button
            type="button"
            onClick={onAdd}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--surface-solid)]/50 px-4 py-3 text-sm font-medium text-[var(--muted-strong)] transition hover:border-[var(--accent)] hover:bg-[var(--surface-solid)] hover:text-[var(--accent)]"
          >
            <Plus className="h-4 w-4" />
            {addLabel}
          </button>
        )}
      </div>
    </SectionCard>
  );
}

export function RepeatItem({
  index,
  title,
  subtitle,
  onRemove,
  children
}: {
  index: number;
  title: string;
  subtitle?: string;
  onRemove: () => void;
  children: ReactNode;
}) {
  const t = useT();
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-solid)] shadow-[var(--shadow-sm)]">
      <header className="flex items-center gap-3 px-4 py-3">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="flex flex-1 items-center gap-2 text-left"
        >
          <ChevronDown
            className={`h-4 w-4 text-[var(--muted)] transition-transform ${expanded ? "" : "-rotate-90"}`}
          />
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
            #{index + 1}
          </span>
          <span className="truncate font-medium text-[var(--foreground)]">{title}</span>
          {subtitle ? (
            <span className="truncate text-sm text-[var(--muted)]">· {subtitle}</span>
          ) : null}
        </button>
        <button
          type="button"
          onClick={() => {
            if (confirm(t("common.confirm.delete"))) onRemove();
          }}
          className="rounded-lg p-1.5 text-[var(--muted)] transition hover:bg-red-50 hover:text-red-600"
          aria-label={t("dashboard.repeat.delete")}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </header>
      {expanded ? (
        <div className="space-y-4 border-t border-[var(--border)] p-4">{children}</div>
      ) : null}
    </div>
  );
}
