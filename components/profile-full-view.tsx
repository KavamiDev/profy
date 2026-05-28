"use client";

import { useT } from "@/components/locale-provider";
import { cn } from "@/lib/utils";
import type { ProfileContent } from "@/types/profile";
import {
  Briefcase,
  GraduationCap,
  Globe,
  Link2,
  Mail,
  MapPin,
  Phone,
  Sparkles
} from "lucide-react";
import Image from "next/image";
import type { ComponentType, ReactNode } from "react";

/**
 * Dedup case-insensitive en conservant la première occurrence telle quelle.
 */
function dedupCaseInsensitive(items: string[]): string[] {
  const seen = new Set<string>();
  const result: string[] = [];
  for (const item of items) {
    const key = item.trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    result.push(item.trim());
  }
  return result;
}

/**
 * Page profil publique format magazine.
 *
 * Layout :
 * - Mobile : single column, stack vertical, photo au-dessus.
 * - Desktop ≥ md : 2 colonnes — sidebar sticky (photo, identité, contact)
 *   + main (résumé, expériences, projets, formation, etc.).
 *
 * Inspiré own.page : beaucoup de blanc, typo serif géante, sections
 * espacées, accents corail subtils.
 */
export function ProfileFullView({
  username,
  content,
  className
}: {
  username: string;
  content: ProfileContent;
  className?: string;
}) {
  const t = useT();
  const { hero, contact, skills, experience, education, projects, certifications, languages, extras } =
    content;
  const hasContact = contact.email || contact.phone || contact.website || contact.linkedin;
  const allSkills = dedupCaseInsensitive([...skills.core, ...skills.tools]);
  const cleanCertifications = dedupCaseInsensitive(certifications);
  const cleanInterests = dedupCaseInsensitive(extras.interests);

  return (
    <article className={cn("relative w-full", className)}>
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-12 md:grid-cols-[320px_1fr] md:gap-16 md:py-20 lg:gap-24">
        {/* ---------- SIDEBAR ---------- */}
        <aside className="md:sticky md:top-12 md:self-start">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div className="relative">
              {/* Halo derrière la photo */}
              <div
                aria-hidden
                className="absolute -inset-3 rounded-full bg-gradient-to-br from-[var(--accent-soft)] to-[var(--accent-soft-2)] blur-xl"
              />
              <div className="relative h-40 w-40 overflow-hidden rounded-full border-[5px] border-[var(--surface-solid)] shadow-[var(--shadow-lg)] md:h-48 md:w-48">
                {hero.photoUrl ? (
                  <Image
                    src={hero.photoUrl}
                    alt={hero.fullName || username}
                    fill
                    sizes="(min-width: 768px) 192px, 160px"
                    className="object-cover"
                    priority
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-[var(--accent-soft)] text-6xl font-semibold text-[var(--muted)]">
                    {(hero.fullName || username).charAt(0).toUpperCase() || "?"}
                  </div>
                )}
              </div>
            </div>

            <p className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-solid)]/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)] backdrop-blur">
              profyl.io/{username}
            </p>

            <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl font-semibold leading-[1.05] tracking-tight text-[var(--foreground)] md:text-5xl">
              {hero.fullName || t("profile.label.your_name")}
            </h1>
            {hero.title ? (
              <p className="mt-3 text-lg font-medium text-[var(--muted-strong)]">{hero.title}</p>
            ) : null}
            {hero.location ? (
              <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-[var(--muted)]">
                <MapPin className="h-4 w-4" />
                {hero.location}
              </p>
            ) : null}

            {hasContact ? (
              <div className="mt-8 grid w-full max-w-xs gap-2 md:max-w-none">
                {contact.email ? (
                  <ContactLink icon={Mail} href={`mailto:${contact.email}`} label={contact.email} />
                ) : null}
                {contact.phone ? (
                  <ContactLink icon={Phone} href={`tel:${contact.phone}`} label={contact.phone} />
                ) : null}
                {contact.website ? (
                  <ContactLink icon={Globe} href={contact.website} label={t("profile.label.website")} external />
                ) : null}
                {contact.linkedin ? (
                  <ContactLink icon={Link2} href={contact.linkedin} label="LinkedIn" external />
                ) : null}
              </div>
            ) : null}
          </div>
        </aside>

        {/* ---------- MAIN ---------- */}
        <main className="min-w-0 space-y-14 md:space-y-20">
          {hero.summary ? (
            <Section eyebrow={t("profile.section.summary.eyebrow")} title={t("profile.section.summary.title")}>
              <p className="text-lg leading-relaxed text-[var(--muted-strong)] md:text-xl md:leading-[1.65]">
                {hero.summary}
              </p>
            </Section>
          ) : null}

          {allSkills.length > 0 ? (
            <Section eyebrow={t("profile.section.skills.eyebrow")} title={t("profile.section.skills.title")} icon={Sparkles}>
              <div className="flex flex-wrap gap-2">
                {allSkills.map((skill, idx) => (
                  <span
                    key={`${skill}-${idx}`}
                    className="rounded-full border border-[var(--border)] bg-[var(--surface-solid)]px-4 py-2 text-sm font-medium text-[var(--foreground)] shadow-[var(--shadow-sm)] transition hover:border-[var(--border-strong)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Section>
          ) : null}

          {experience.length > 0 ? (
            <Section eyebrow={t("profile.section.experiences.eyebrow")} title={t("profile.section.experiences.title")} icon={Briefcase}>
              <ol className="relative space-y-8 border-l border-[var(--border)] pl-8">
                {experience.map((exp, idx) => (
                  <li key={`${exp.company}-${exp.role}-${idx}`} className="relative">
                    <span className="absolute -left-[35px] top-1.5 h-3 w-3 rounded-full border-2 border-[var(--surface-solid)] bg-[var(--accent)] shadow-[var(--shadow-sm)]" />
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                        {exp.role}
                      </h3>
                      {exp.start || exp.end ? (
                        <span className="text-sm font-medium text-[var(--muted)]">
                          {exp.start}
                          {exp.end ? ` – ${exp.end}` : ""}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-base font-medium text-[var(--muted-strong)]">{exp.company}</p>
                    {exp.description ? (
                      <p className="mt-3 leading-relaxed text-[var(--muted-strong)]">{exp.description}</p>
                    ) : null}
                  </li>
                ))}
              </ol>
            </Section>
          ) : null}

          {projects.length > 0 ? (
            <Section eyebrow={t("profile.section.projects.eyebrow")} title={t("profile.section.projects.title")} icon={Link2}>
              <div className="grid gap-5 sm:grid-cols-2">
                {projects.map((project, idx) => (
                  <div
                    key={`${project.name}-${idx}`}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--surface-solid)]p-6 shadow-[var(--shadow-sm)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-md)]"
                  >
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-baseline gap-1.5 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-[var(--foreground)] underline decoration-[var(--accent)] decoration-2 underline-offset-4 hover:text-[var(--accent)]"
                      >
                        {project.name} <span aria-hidden>↗</span>
                      </a>
                    ) : (
                      <p className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight">
                        {project.name}
                      </p>
                    )}
                    {project.description ? (
                      <p className="mt-3 text-[var(--muted-strong)]">{project.description}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </Section>
          ) : null}

          {education.length > 0 ? (
            <Section eyebrow={t("profile.section.education.eyebrow")} title={t("profile.section.education.title")} icon={GraduationCap}>
              <ul className="space-y-4">
                {education.map((edu, idx) => (
                  <li key={`${edu.school}-${edu.degree}-${idx}`} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <p className="text-lg font-semibold text-[var(--foreground)]">{edu.degree}</p>
                    <p className="text-[var(--muted-strong)]">· {edu.school}</p>
                    {edu.start || edu.end ? (
                      <span className="text-sm text-[var(--muted)]">
                        {edu.start}
                        {edu.end ? ` – ${edu.end}` : ""}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </Section>
          ) : null}

          {(cleanCertifications.length > 0 || languages.length > 0 || cleanInterests.length > 0) && (
            <Section eyebrow={t("profile.section.extras.eyebrow")} title={t("profile.section.extras.title")}>
              <div className="grid gap-6 sm:grid-cols-3">
                {cleanCertifications.length > 0 ? (
                  <FactBlock title={t("profile.label.certifications")}>
                    <ul className="space-y-1.5 text-[var(--muted-strong)]">
                      {cleanCertifications.map((c, idx) => (
                        <li key={`${c}-${idx}`}>{c}</li>
                      ))}
                    </ul>
                  </FactBlock>
                ) : null}
                {languages.length > 0 ? (
                  <FactBlock title={t("profile.label.languages")}>
                    <ul className="space-y-1.5 text-[var(--muted-strong)]">
                      {languages.map((l, idx) => (
                        <li key={`${l.name}-${idx}`}>
                          <span className="font-medium text-[var(--foreground)]">{l.name}</span>{" "}
                          <span className="text-sm text-[var(--muted)]">· {l.level}</span>
                        </li>
                      ))}
                    </ul>
                  </FactBlock>
                ) : null}
                {cleanInterests.length > 0 ? (
                  <FactBlock title={t("profile.label.interests")}>
                    <ul className="space-y-1.5 text-[var(--muted-strong)]">
                      {cleanInterests.map((i, idx) => (
                        <li key={`${i}-${idx}`}>{i}</li>
                      ))}
                    </ul>
                  </FactBlock>
                ) : null}
              </div>
            </Section>
          )}
        </main>
      </div>
    </article>
  );
}

function Section({
  eyebrow,
  title,
  icon: Icon,
  children
}: {
  eyebrow: string;
  title: string;
  icon?: ComponentType<{ className?: string }>;
  children: ReactNode;
}) {
  return (
    <section>
      <header className="mb-6">
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
          {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
          {eyebrow}
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl">
          {title}
        </h2>
      </header>
      <div>{children}</div>
    </section>
  );
}

function FactBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface-solid)]/60 p-5 backdrop-blur">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
        {title}
      </p>
      {children}
    </div>
  );
}

function ContactLink({
  icon: Icon,
  href,
  label,
  external
}: {
  icon: ComponentType<{ className?: string }>;
  href: string;
  label: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-solid)]px-4 py-3 text-sm font-medium text-[var(--foreground)] transition hover:border-[var(--border-strong)] hover:shadow-[var(--shadow-sm)]"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-hover)] text-[var(--muted)]">
        <Icon className="h-4 w-4" />
      </span>
      <span className="truncate">{label}</span>
    </a>
  );
}
