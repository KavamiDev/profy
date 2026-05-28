"use client";

import { useT } from "@/components/locale-provider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/editor/Field";
import { RepeatableSection, RepeatItem } from "@/components/editor/Repeatable";
import { useEditorStore } from "@/lib/editor/store";
import { canAdd, type PlanTier } from "@/lib/plan-limits";

export function ProjectsBlock({ plan }: { plan: PlanTier }) {
  const t = useT();
  const items = useEditorStore((s) => s.content.projects);
  const addItem = useEditorStore((s) => s.addItem);
  const updateItem = useEditorStore((s) => s.updateItem);
  const removeItem = useEditorStore((s) => s.removeItem);

  return (
    <RepeatableSection
      title={t("dashboard.section.projects.title")}
      count={items.length}
      plan={plan}
      sectionKey="projects"
      onAdd={() => canAdd(plan, "projects", items.length) && addItem("projects")}
      addLabel={t("dashboard.add.project")}
      emptyLabel={t("dashboard.empty.project")}
    >
      {items.map((project, idx) => (
        <RepeatItem
          key={idx}
          index={idx}
          title={project.name || t("dashboard.repeat.new_project")}
          onRemove={() => removeItem("projects", idx)}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={t("dashboard.field.project_name")}>
              <Input
                value={project.name}
                onChange={(e) => updateItem("projects", idx, { name: e.target.value })}
              />
            </Field>
            <Field label={t("dashboard.field.project_link")}>
              <Input
                value={project.link}
                onChange={(e) => updateItem("projects", idx, { link: e.target.value })}
                placeholder="https://..."
              />
            </Field>
          </div>
          <Field label={t("dashboard.field.description")}>
            <Textarea
              value={project.description}
              onChange={(e) => updateItem("projects", idx, { description: e.target.value })}
            />
          </Field>
        </RepeatItem>
      ))}
    </RepeatableSection>
  );
}
