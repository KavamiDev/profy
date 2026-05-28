"use client";

import { useT } from "@/components/locale-provider";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/editor/Field";
import { RepeatableSection, RepeatItem } from "@/components/editor/Repeatable";
import { useEditorStore } from "@/lib/editor/store";
import { canAdd, type PlanTier } from "@/lib/plan-limits";

export function LanguagesBlock({ plan }: { plan: PlanTier }) {
  const t = useT();
  const items = useEditorStore((s) => s.content.languages);
  const addItem = useEditorStore((s) => s.addItem);
  const updateItem = useEditorStore((s) => s.updateItem);
  const removeItem = useEditorStore((s) => s.removeItem);

  return (
    <RepeatableSection
      title={t("dashboard.section.languages.title")}
      count={items.length}
      plan={plan}
      sectionKey="languages"
      onAdd={() => canAdd(plan, "languages", items.length) && addItem("languages")}
      addLabel={t("dashboard.add.language")}
      emptyLabel={t("dashboard.empty.language")}
    >
      {items.map((lang, idx) => (
        <RepeatItem
          key={idx}
          index={idx}
          title={lang.name || t("dashboard.repeat.new_language")}
          subtitle={lang.level}
          onRemove={() => removeItem("languages", idx)}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t("dashboard.field.language")}>
              <Input
                value={lang.name}
                onChange={(e) => updateItem("languages", idx, { name: e.target.value })}
                placeholder={t("dashboard.field.language.placeholder")}
              />
            </Field>
            <Field label={t("dashboard.field.language_level")}>
              <Input
                value={lang.level}
                onChange={(e) => updateItem("languages", idx, { level: e.target.value })}
                placeholder={t("dashboard.field.language_level.placeholder")}
              />
            </Field>
          </div>
        </RepeatItem>
      ))}
    </RepeatableSection>
  );
}
