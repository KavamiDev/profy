"use client";

import { useT } from "@/components/locale-provider";
import { SectionCard } from "@/components/ui/section-card";
import { useEditorStore } from "@/lib/editor/store";

export function AddressBlock() {
  const t = useT();
  const username = useEditorStore((s) => s.username);
  const setUsername = useEditorStore((s) => s.setUsername);

  return (
    <SectionCard
      title={t("dashboard.section.address.title")}
      description={t("dashboard.section.address.desc")}
    >
      <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-1">
        <span className="shrink-0 text-sm text-[var(--muted)]">profyl.io/</span>
        <input
          name="username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={t("dashboard.field.username.placeholder")}
          className="h-11 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--muted)]"
        />
      </div>
    </SectionCard>
  );
}
