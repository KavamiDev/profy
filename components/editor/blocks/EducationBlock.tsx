"use client";

import { useT } from "@/components/locale-provider";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/editor/Field";
import { RepeatableSection, RepeatItem } from "@/components/editor/Repeatable";
import { useEditorStore } from "@/lib/editor/store";
import { canAdd, type PlanTier } from "@/lib/plan-limits";

export function EducationBlock({ plan }: { plan: PlanTier }) {
  const t = useT();
  const items = useEditorStore((s) => s.content.education);
  const addItem = useEditorStore((s) => s.addItem);
  const updateItem = useEditorStore((s) => s.updateItem);
  const removeItem = useEditorStore((s) => s.removeItem);

  return (
    <RepeatableSection
      title={t("dashboard.section.education.title")}
      count={items.length}
      plan={plan}
      sectionKey="education"
      onAdd={() => canAdd(plan, "education", items.length) && addItem("education")}
      addLabel={t("dashboard.add.education")}
      emptyLabel={t("dashboard.empty.education")}
    >
      {items.map((edu, idx) => (
        <RepeatItem
          key={idx}
          index={idx}
          title={edu.degree || t("dashboard.repeat.new_education")}
          subtitle={edu.school}
          onRemove={() => removeItem("education", idx)}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t("dashboard.field.school")}>
              <Input
                value={edu.school}
                onChange={(e) => updateItem("education", idx, { school: e.target.value })}
              />
            </Field>
            <Field label={t("dashboard.field.degree")}>
              <Input
                value={edu.degree}
                onChange={(e) => updateItem("education", idx, { degree: e.target.value })}
              />
            </Field>
            <Field label={t("dashboard.field.start")}>
              <Input
                value={edu.start}
                onChange={(e) => updateItem("education", idx, { start: e.target.value })}
              />
            </Field>
            <Field label={t("dashboard.field.end")}>
              <Input
                value={edu.end}
                onChange={(e) => updateItem("education", idx, { end: e.target.value })}
              />
            </Field>
          </div>
        </RepeatItem>
      ))}
    </RepeatableSection>
  );
}
