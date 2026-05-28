"use client";

import { useT } from "@/components/locale-provider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/editor/Field";
import { RepeatableSection, RepeatItem } from "@/components/editor/Repeatable";
import { useEditorStore } from "@/lib/editor/store";
import { canAdd, type PlanTier } from "@/lib/plan-limits";

export function ExperiencesBlock({ plan }: { plan: PlanTier }) {
  const t = useT();
  const items = useEditorStore((s) => s.content.experience);
  const addItem = useEditorStore((s) => s.addItem);
  const updateItem = useEditorStore((s) => s.updateItem);
  const removeItem = useEditorStore((s) => s.removeItem);

  return (
    <RepeatableSection
      title={t("dashboard.section.experiences.title")}
      description={t("dashboard.section.experiences.desc")}
      count={items.length}
      plan={plan}
      sectionKey="experiences"
      onAdd={() => canAdd(plan, "experiences", items.length) && addItem("experience")}
      addLabel={t("dashboard.add.experience")}
      emptyLabel={t("dashboard.empty.experience")}
    >
      {items.map((exp, idx) => (
        <RepeatItem
          key={idx}
          index={idx}
          title={exp.role || exp.company || t("dashboard.repeat.new_experience")}
          subtitle={exp.company}
          onRemove={() => removeItem("experience", idx)}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t("dashboard.field.company")}>
              <Input
                value={exp.company}
                onChange={(e) => updateItem("experience", idx, { company: e.target.value })}
              />
            </Field>
            <Field label={t("dashboard.field.role")}>
              <Input
                value={exp.role}
                onChange={(e) => updateItem("experience", idx, { role: e.target.value })}
              />
            </Field>
            <Field label={t("dashboard.field.start")}>
              <Input
                value={exp.start}
                onChange={(e) => updateItem("experience", idx, { start: e.target.value })}
                placeholder="2022"
              />
            </Field>
            <Field label={t("dashboard.field.end")}>
              <Input
                value={exp.end}
                onChange={(e) => updateItem("experience", idx, { end: e.target.value })}
                placeholder={t("dashboard.field.end.placeholder")}
              />
            </Field>
          </div>
          <Field label={t("dashboard.field.description")}>
            <Textarea
              value={exp.description}
              onChange={(e) => updateItem("experience", idx, { description: e.target.value })}
            />
          </Field>
        </RepeatItem>
      ))}
    </RepeatableSection>
  );
}
