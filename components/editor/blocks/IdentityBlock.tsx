"use client";

import { AvatarUploader } from "@/components/avatar-uploader";
import { useT } from "@/components/locale-provider";
import { SectionCard } from "@/components/ui/section-card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "@/components/editor/Field";
import { useEditorStore } from "@/lib/editor/store";

export function IdentityBlock({ userId }: { userId: string }) {
  const t = useT();
  const hero = useEditorStore((s) => s.content.hero);
  const setHero = useEditorStore((s) => s.setHero);

  return (
    <SectionCard
      title={t("dashboard.section.identity.title")}
      description={t("dashboard.section.identity.desc")}
    >
      <Field label={t("dashboard.field.photo")} required>
        {userId ? (
          <AvatarUploader
            value={hero.photoUrl}
            onChange={(url) => setHero("photoUrl", url)}
            userId={userId}
          />
        ) : (
          <Input
            required
            value={hero.photoUrl}
            onChange={(e) => setHero("photoUrl", e.target.value)}
            placeholder="https://..."
          />
        )}
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t("dashboard.field.fullname")} required>
          <Input
            required
            value={hero.fullName}
            onChange={(e) => setHero("fullName", e.target.value)}
            placeholder={t("dashboard.field.fullname.placeholder")}
          />
        </Field>
        <Field label={t("dashboard.field.title")} required>
          <Input
            required
            value={hero.title}
            onChange={(e) => setHero("title", e.target.value)}
            placeholder={t("dashboard.field.title.placeholder")}
          />
        </Field>
        <Field label={t("dashboard.field.city")}>
          <Input
            value={hero.location}
            onChange={(e) => setHero("location", e.target.value)}
            placeholder={t("dashboard.field.city.placeholder")}
          />
        </Field>
      </div>
      <Field label={t("dashboard.field.summary")}>
        <Textarea
          value={hero.summary}
          onChange={(e) => setHero("summary", e.target.value)}
          placeholder={t("dashboard.field.summary.placeholder")}
        />
      </Field>
    </SectionCard>
  );
}
