"use client";

import { useT } from "@/components/locale-provider";
import { SectionCard } from "@/components/ui/section-card";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/editor/Field";
import { useEditorStore } from "@/lib/editor/store";

export function SkillsBlock() {
  const t = useT();
  const buffers = useEditorStore((s) => s.buffers);
  const setBuffer = useEditorStore((s) => s.setBuffer);

  return (
    <SectionCard
      title={t("dashboard.section.skills.title")}
      description={t("dashboard.section.skills.desc")}
    >
      <Field label={t("dashboard.field.skills_core")}>
        <Input
          value={buffers.skillsCore}
          onChange={(e) => setBuffer("skillsCore", e.target.value)}
          placeholder={t("dashboard.field.skills_core.placeholder")}
        />
      </Field>
      <Field label={t("dashboard.field.skills_tools")}>
        <Input
          value={buffers.skillsTools}
          onChange={(e) => setBuffer("skillsTools", e.target.value)}
          placeholder={t("dashboard.field.skills_tools.placeholder")}
        />
      </Field>
    </SectionCard>
  );
}
