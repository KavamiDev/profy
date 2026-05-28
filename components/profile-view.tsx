"use client";

import { useT } from "@/components/locale-provider";
import { cn } from "@/lib/utils";
import { combinedSkills } from "@/lib/profile/dedup";
import { ContactLinks, hasAnyContact } from "@/components/profile/ContactLinks";
import type { ProfileContent } from "@/types/profile";
import type { ComponentType, ReactNode } from "react";
import { Briefcase, GraduationCap, Link2, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";

export function ProfileView({
  username,
  content,
  className,
  compact = false
}: {
  username: string;
  content: ProfileContent;
  className?: string;
  compact?: boolean;
}) {
  const t = useT();
  const { hero, contact, skills, experience, education, projects, certifications, languages, extras } =
    content;

  const hasContact = hasAnyContact(contact);
  const allSkills = combinedSkills(skills);

  return (
    <article className={cn("card-profile", compact ? "text-[13px]" : "", className)}>
      <div className="relative bg-gradient-to-b from-[var(--accent-soft)] via-[var(--accent-soft-2)] to-[var(--surface-solid)] px-6 pb-2 pt-8">
        <div className="mx-auto flex w-full max-w-[120px] flex-col items-center">
          <div
            className={cn(
              "relative overflow-hidden rounded-full border-[3px] border-[var(--surface-solid)] bg-[var(--surface-hover)] shadow-[var(--shadow-md)]",
              compact ? "h-24 w-24" : "h-28 w-28"
            )}
          >
            {hero.photoUrl ? (
              <Image
                src={hero.photoUrl}
                alt={hero.fullName || username}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[var(--accent-soft)] text-3xl font-semibold text-[var(--muted)]">
                {(hero.fullName || username).charAt(0).toUpperCase() || "?"}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-5 px-5 pb-7 pt-4">
        <header className="text-center">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-hover)] px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-[var(--muted)]">
            profyl.io/{username || t("profile.placeholder.username")}
          </p>
          <h1
            className={cn(
              "mt-3 font-[family-name:var(--font-display)] font-semibold tracking-tight text-[var(--foreground)]",
              compact ? "text-xl" : "text-2xl"
            )}
          >
            {hero.fullName || t("profile.label.your_name")}
          </h1>
          {hero.title ? (
            <p className="mt-1 text-base font-medium text-[var(--muted-strong)]">{hero.title}</p>
          ) : null}
          {hero.location ? (
            <p className="mt-2 inline-flex items-center gap-1 text-sm text-[var(--muted)]">
              <MapPin className="h-3.5 w-3.5" />
              {hero.location}
            </p>
          ) : null}
        </header>

        {hero.summary ? (
          <p className="rounded-2xl bg-[var(--surface-hover)] px-4 py-3 text-left text-sm leading-relaxed text-[var(--muted-strong)]">
            {hero.summary}
          </p>
        ) : null}

        {hasContact ? (
          <div className="grid gap-2">
            <ContactLinks contact={contact} variant="compact" />
          </div>
        ) : null}

        {allSkills.length > 0 ? (
          <ProfileBlock title={t("profile.section.skills.compact")} icon={Sparkles}>
            <div className="flex flex-wrap gap-2">
              {allSkills.map((skill, idx) => (
                <span
                  key={`${skill}-${idx}`}
                  className="rounded-full border border-[var(--border)] bg-[var(--surface-solid)] px-3 py-1 text-xs font-medium text-[var(--foreground)]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </ProfileBlock>
        ) : null}

        {experience.length > 0 ? (
          <ProfileBlock title={t("profile.section.experiences.compact")} icon={Briefcase}>
            {experience.map((exp) => (
              <div
                key={`${exp.company}-${exp.role}`}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface-hover)]/50 p-3"
              >
                <p className="font-medium">{exp.role}</p>
                <p className="text-sm text-[var(--muted)]">
                  {exp.company}
                  {exp.start || exp.end ? ` · ${exp.start}${exp.end ? ` – ${exp.end}` : ""}` : ""}
                </p>
                {exp.description ? (
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted-strong)]">
                    {exp.description}
                  </p>
                ) : null}
              </div>
            ))}
          </ProfileBlock>
        ) : null}

        {education.length > 0 ? (
          <ProfileBlock title={t("profile.section.education.compact")} icon={GraduationCap}>
            {education.map((edu) => (
              <div key={`${edu.school}-${edu.degree}`}>
                <p className="font-medium">{edu.degree}</p>
                <p className="text-sm text-[var(--muted)]">
                  {edu.school}
                  {edu.start || edu.end ? ` · ${edu.start}${edu.end ? ` – ${edu.end}` : ""}` : ""}
                </p>
              </div>
            ))}
          </ProfileBlock>
        ) : null}

        {projects.length > 0 ? (
          <ProfileBlock title={t("profile.section.projects.compact")} icon={Link2}>
            {projects.map((project) => (
              <div key={project.name}>
                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-[var(--accent)] underline decoration-[var(--border)] underline-offset-4 hover:decoration-[var(--accent)]"
                  >
                    {project.name} →
                  </a>
                ) : (
                  <p className="font-medium">{project.name}</p>
                )}
                {project.description ? (
                  <p className="mt-1 text-sm text-[var(--muted-strong)]">{project.description}</p>
                ) : null}
              </div>
            ))}
          </ProfileBlock>
        ) : null}

        {(certifications.length > 0 || languages.length > 0 || extras.interests.length > 0) && (
          <ProfileBlock title={t("profile.section.extras.compact")} icon={Sparkles}>
            {certifications.length > 0 ? (
              <p className="text-sm text-[var(--muted-strong)]">
                <span className="font-medium text-[var(--foreground)]">
                  {t("profile.extra.certifications")}
                </span>
                {certifications.join(", ")}
              </p>
            ) : null}
            {languages.length > 0 ? (
              <p className="text-sm text-[var(--muted-strong)]">
                <span className="font-medium text-[var(--foreground)]">
                  {t("profile.extra.languages")}
                </span>
                {languages.map((l) => `${l.name} (${l.level})`).join(", ")}
              </p>
            ) : null}
            {extras.interests.length > 0 ? (
              <p className="text-sm text-[var(--muted-strong)]">
                <span className="font-medium text-[var(--foreground)]">
                  {t("profile.extra.interests")}
                </span>
                {extras.interests.join(", ")}
              </p>
            ) : null}
          </ProfileBlock>
        )}
      </div>
    </article>
  );
}

function ProfileBlock({
  title,
  icon: Icon,
  children
}: {
  title: string;
  icon: ComponentType<{ className?: string }>;
  children: ReactNode;
}) {
  return (
    <section className="space-y-3 border-t border-[var(--border)] pt-5">
      <h2 className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--muted)]">
        <Icon className="h-4 w-4" />
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

