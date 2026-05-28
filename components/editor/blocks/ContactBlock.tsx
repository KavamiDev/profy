"use client";

import { useT } from "@/components/locale-provider";
import { SectionCard } from "@/components/ui/section-card";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/editor/Field";
import { useEditorStore } from "@/lib/editor/store";

export function ContactBlock() {
  const t = useT();
  const contact = useEditorStore((s) => s.content.contact);
  const setContact = useEditorStore((s) => s.setContact);

  return (
    <SectionCard title={t("dashboard.section.contact.title")}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t("dashboard.field.email")}>
          <Input
            type="email"
            value={contact.email}
            onChange={(e) => setContact("email", e.target.value)}
            placeholder={t("dashboard.field.email.placeholder")}
          />
        </Field>
        <Field label={t("dashboard.field.phone")}>
          <Input
            value={contact.phone}
            onChange={(e) => setContact("phone", e.target.value)}
            placeholder={t("dashboard.field.phone.placeholder")}
          />
        </Field>
        <Field label={t("dashboard.field.website")}>
          <Input
            value={contact.website}
            onChange={(e) => setContact("website", e.target.value)}
            placeholder={t("dashboard.field.website.placeholder")}
          />
        </Field>
        <Field label={t("dashboard.field.linkedin")}>
          <Input
            value={contact.linkedin}
            onChange={(e) => setContact("linkedin", e.target.value)}
            placeholder="https://linkedin.com/in/..."
          />
        </Field>
      </div>
    </SectionCard>
  );
}
