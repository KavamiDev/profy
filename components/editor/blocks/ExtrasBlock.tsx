"use client";

import { useT } from "@/components/locale-provider";
import { SectionCard } from "@/components/ui/section-card";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/editor/Field";
import { useEditorStore } from "@/lib/editor/store";

export function ExtrasBlock() {
  const t = useT();
  const buffers = useEditorStore((s) => s.buffers);
  const setBuffer = useEditorStore((s) => s.setBuffer);

  return (
    <SectionCard title={t("dashboard.section.extras.title")}>
      <Field label={t("dashboard.field.certifications")}>
        <Input
          value={buffers.certifications}
          onChange={(e) => setBuffer("certifications", e.target.value)}
          placeholder={t("dashboard.field.certifications.placeholder")}
        />
      </Field>
      <Field label={t("dashboard.field.interests")}>
        <Input
          value={buffers.interests}
          onChange={(e) => setBuffer("interests", e.target.value)}
          placeholder={t("dashboard.field.interests.placeholder")}
        />
      </Field>
    </SectionCard>
  );
}
