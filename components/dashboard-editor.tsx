"use client";

import { AmbientBackground } from "@/components/ambient-background";
import { AvatarUploader } from "@/components/avatar-uploader";
import { useT } from "@/components/locale-provider";
import { Logo } from "@/components/logo";
import { PhoneFrame } from "@/components/phone-frame";
import { ProfileView } from "@/components/profile-view";
import { ProfileQr } from "@/components/profile-qr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionCard } from "@/components/ui/section-card";
import { Textarea } from "@/components/ui/textarea";
import { saveProfile, signOut } from "@/app/dashboard/actions";
import { DEMO_USERNAME } from "@/lib/demo-persona";
import { canAdd, getLimit, type PlanTier, type SectionKey } from "@/lib/plan-limits";
import { defaultProfileContent } from "@/types/profile";
import type { ProfileContent } from "@/types/profile";
import { ChevronDown, ExternalLink, LogOut, Lock, Plus, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";

function splitList(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeUrl(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function draftStorageKey(userId: string): string {
  return userId ? `profyl:draft:${userId}` : "profyl:draft:anon";
}

type Experience = ProfileContent["experience"][number];
type Education = ProfileContent["education"][number];
type Project = ProfileContent["projects"][number];
type Language = ProfileContent["languages"][number];

const emptyExperience: Experience = { company: "", role: "", start: "", end: "", description: "" };
const emptyEducation: Education = { school: "", degree: "", start: "", end: "" };
const emptyProject: Project = { name: "", link: "", description: "" };
const emptyLanguage: Language = { name: "", level: "" };

type FormState = {
  username: string;
  heroFullName: string;
  heroTitle: string;
  heroLocation: string;
  heroPhotoUrl: string;
  heroSummary: string;
  contactEmail: string;
  contactPhone: string;
  contactWebsite: string;
  contactLinkedin: string;
  skillsCore: string;
  skillsTools: string;
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  languages: Language[];
  certifications: string;
  interests: string;
};

function contentToFormState(username: string, content: ProfileContent): FormState {
  return {
    username,
    heroFullName: content.hero.fullName,
    heroTitle: content.hero.title,
    heroLocation: content.hero.location,
    heroPhotoUrl: content.hero.photoUrl,
    heroSummary: content.hero.summary,
    contactEmail: content.contact.email,
    contactPhone: content.contact.phone,
    contactWebsite: content.contact.website,
    contactLinkedin: content.contact.linkedin,
    skillsCore: content.skills.core.join(", "),
    skillsTools: content.skills.tools.join(", "),
    experiences: content.experience.length > 0 ? content.experience : [],
    education: content.education.length > 0 ? content.education : [],
    projects: content.projects.length > 0 ? content.projects : [],
    languages: content.languages.length > 0 ? content.languages : [],
    certifications: content.certifications.join(", "),
    interests: content.extras.interests.join(", ")
  };
}

function buildContent(state: FormState): ProfileContent {
  return {
    hero: {
      fullName: state.heroFullName,
      title: state.heroTitle,
      location: state.heroLocation,
      photoUrl: state.heroPhotoUrl,
      summary: state.heroSummary
    },
    contact: {
      email: state.contactEmail,
      phone: state.contactPhone,
      website: state.contactWebsite,
      linkedin: state.contactLinkedin
    },
    skills: {
      core: splitList(state.skillsCore),
      tools: splitList(state.skillsTools)
    },
    experience: state.experiences.filter((e) => e.company || e.role),
    education: state.education.filter((e) => e.school || e.degree),
    projects: state.projects.filter((p) => p.name),
    languages: state.languages.filter((l) => l.name),
    certifications: splitList(state.certifications),
    extras: { interests: splitList(state.interests) }
  };
}

export function DashboardEditor({
  initialUsername = "",
  initialContent = defaultProfileContent,
  saved,
  error,
  plan = "free",
  userEmail = "",
  userId = ""
}: {
  initialUsername?: string;
  initialContent?: ProfileContent;
  saved?: boolean;
  error?: string;
  plan?: PlanTier;
  userEmail?: string;
  userId?: string;
}) {
  const t = useT();
  const [state, setState] = useState<FormState>(() =>
    contentToFormState(initialUsername, initialContent)
  );
  const [restoredFromDraft, setRestoredFromDraft] = useState(false);

  // Restore draft depuis localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const key = draftStorageKey(userId);
    try {
      const raw = window.localStorage.getItem(key);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { state: FormState; savedAt: number };
      const isFresh = Date.now() - parsed.savedAt < 60 * 60 * 1000;
      if (!isFresh) return;
      if (parsed.state.heroFullName || parsed.state.username) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setState(parsed.state);
        setRestoredFromDraft(true);
      }
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autosave
  useEffect(() => {
    if (typeof window === "undefined") return;
    const key = draftStorageKey(userId);
    const timer = setTimeout(() => {
      try {
        window.localStorage.setItem(key, JSON.stringify({ state, savedAt: Date.now() }));
      } catch {
        /* ignore */
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [state, userId]);

  // Clean draft post-publish
  useEffect(() => {
    if (saved && typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(draftStorageKey(userId));
      } catch {
        /* ignore */
      }
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRestoredFromDraft(false);
    }
  }, [saved, userId]);

  const normalizedContent = useMemo(() => {
    const base = buildContent(state);
    return {
      ...base,
      contact: {
        ...base.contact,
        website: normalizeUrl(base.contact.website),
        linkedin: normalizeUrl(base.contact.linkedin)
      },
      projects: base.projects.map((p) => ({
        ...p,
        link: p.link ? normalizeUrl(p.link) : ""
      }))
    };
  }, [state]);

  const previewContent = normalizedContent;
  const previewUsername = state.username || t("profile.placeholder.username");
  const contentJson = useMemo(() => JSON.stringify(normalizedContent), [normalizedContent]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  function updateArrayItem<T>(
    key: "experiences" | "education" | "projects" | "languages",
    idx: number,
    patch: Partial<T>
  ) {
    setState((prev) => ({
      ...prev,
      [key]: (prev[key] as T[]).map((item, i) => (i === idx ? { ...item, ...patch } : item))
    }));
  }

  function removeArrayItem(
    key: "experiences" | "education" | "projects" | "languages",
    idx: number
  ) {
    setState((prev) => {
      const arr = prev[key] as unknown[];
      return { ...prev, [key]: arr.filter((_, i) => i !== idx) } as FormState;
    });
  }

  function addExperience() {
    if (!canAdd(plan, "experiences", state.experiences.length)) return;
    setState((prev) => ({ ...prev, experiences: [...prev.experiences, { ...emptyExperience }] }));
  }
  function addEducation() {
    if (!canAdd(plan, "education", state.education.length)) return;
    setState((prev) => ({ ...prev, education: [...prev.education, { ...emptyEducation }] }));
  }
  function addProject() {
    if (!canAdd(plan, "projects", state.projects.length)) return;
    setState((prev) => ({ ...prev, projects: [...prev.projects, { ...emptyProject }] }));
  }
  function addLanguage() {
    if (!canAdd(plan, "languages", state.languages.length)) return;
    setState((prev) => ({ ...prev, languages: [...prev.languages, { ...emptyLanguage }] }));
  }

  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] lg:flex-row">
      <div className="flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-[var(--border)] bg-[var(--background)]/90 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
            <Logo />
            <div className="flex items-center gap-3">
              <Link
                href={`/dashboard?username=${DEMO_USERNAME}`}
                className="hidden text-sm text-[var(--muted)] transition hover:text-[var(--foreground)] sm:inline"
              >
                {t("dashboard.see_example")}
              </Link>
              {state.username ? (
                <Link
                  href={`/${state.username}`}
                  target="_blank"
                  className="hidden items-center gap-2 text-sm text-[var(--muted)] transition hover:text-[var(--foreground)] sm:inline-flex"
                >
                  {t("dashboard.see_page")}
                  <ExternalLink className="h-4 w-4" />
                </Link>
              ) : null}
              <Button type="submit" form="profile-form" variant="accent" size="sm">
                <Save className="mr-2 h-4 w-4" />
                {t("dashboard.publish")}
              </Button>
              {userEmail ? (
                <form action={signOut}>
                  <button
                    type="submit"
                    className="hidden items-center gap-1.5 text-sm text-[var(--muted)] transition hover:text-[var(--foreground)] sm:inline-flex"
                    title={userEmail}
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </form>
              ) : null}
            </div>
          </div>
        </header>

        <div className="relative border-b border-[var(--border)] bg-[var(--surface-solid)]/60 p-6 lg:hidden">
          <p className="mb-4 text-center text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
            {t("dashboard.preview_mobile")}
          </p>
          <PhoneFrame className="max-w-[300px]">
            <ProfileView username={previewUsername} content={previewContent} compact />
          </PhoneFrame>
        </div>

        <div className="mx-auto w-full max-w-3xl flex-1 space-y-5 px-4 py-8 lg:px-6">
          {saved ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              ✓{" "}
              {t("dashboard.saved", { url: "" }).replace("{url}", "").trim()}{" "}
              <Link
                href={`/${state.username}`}
                target="_blank"
                className="font-medium underline underline-offset-2"
              >
                profyl.io/{state.username}
              </Link>
            </div>
          ) : null}
          {restoredFromDraft && !saved ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              {t("dashboard.draft_restored")}
            </div>
          ) : null}
          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              <p className="font-medium">⚠ {t(`dashboard.error.${error.replace(/-/g, "_")}`)}</p>
              {error === "contenu-invalide" ? (
                <p className="mt-1 text-xs text-red-700">{t("dashboard.error.content_hint")}</p>
              ) : null}
              <p className="mt-1 text-xs text-red-700">{t("dashboard.error.reassurance")}</p>
            </div>
          ) : null}

          <form id="profile-form" action={saveProfile} className="space-y-5">
            <input type="hidden" name="content" value={contentJson} />

            <SectionCard
              title={t("dashboard.section.address.title")}
              description={t("dashboard.section.address.desc")}
            >
              <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-1">
                <span className="shrink-0 text-sm text-[var(--muted)]">profyl.io/</span>
                <input
                  name="username"
                  required
                  value={state.username}
                  onChange={(e) =>
                    update("username", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))
                  }
                  placeholder={t("dashboard.field.username.placeholder")}
                  className="h-11 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--muted)]"
                />
              </div>
            </SectionCard>

            <SectionCard
              title={t("dashboard.section.identity.title")}
              description={t("dashboard.section.identity.desc")}
            >
              <Field label={t("dashboard.field.photo")} required>
                {userId ? (
                  <AvatarUploader
                    value={state.heroPhotoUrl}
                    onChange={(url) => update("heroPhotoUrl", url)}
                    userId={userId}
                  />
                ) : (
                  <Input
                    required
                    value={state.heroPhotoUrl}
                    onChange={(e) => update("heroPhotoUrl", e.target.value)}
                    placeholder="https://..."
                  />
                )}
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={t("dashboard.field.fullname")} required>
                  <Input
                    required
                    value={state.heroFullName}
                    onChange={(e) => update("heroFullName", e.target.value)}
                    placeholder={t("dashboard.field.fullname.placeholder")}
                  />
                </Field>
                <Field label={t("dashboard.field.title")} required>
                  <Input
                    required
                    value={state.heroTitle}
                    onChange={(e) => update("heroTitle", e.target.value)}
                    placeholder={t("dashboard.field.title.placeholder")}
                  />
                </Field>
                <Field label={t("dashboard.field.city")}>
                  <Input
                    value={state.heroLocation}
                    onChange={(e) => update("heroLocation", e.target.value)}
                    placeholder={t("dashboard.field.city.placeholder")}
                  />
                </Field>
              </div>
              <Field label={t("dashboard.field.summary")}>
                <Textarea
                  value={state.heroSummary}
                  onChange={(e) => update("heroSummary", e.target.value)}
                  placeholder={t("dashboard.field.summary.placeholder")}
                />
              </Field>
            </SectionCard>

            <SectionCard title={t("dashboard.section.contact.title")}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label={t("dashboard.field.email")}>
                  <Input
                    type="email"
                    value={state.contactEmail}
                    onChange={(e) => update("contactEmail", e.target.value)}
                    placeholder={t("dashboard.field.email.placeholder")}
                  />
                </Field>
                <Field label={t("dashboard.field.phone")}>
                  <Input
                    value={state.contactPhone}
                    onChange={(e) => update("contactPhone", e.target.value)}
                    placeholder={t("dashboard.field.phone.placeholder")}
                  />
                </Field>
                <Field label={t("dashboard.field.website")}>
                  <Input
                    value={state.contactWebsite}
                    onChange={(e) => update("contactWebsite", e.target.value)}
                    placeholder={t("dashboard.field.website.placeholder")}
                  />
                </Field>
                <Field label={t("dashboard.field.linkedin")}>
                  <Input
                    value={state.contactLinkedin}
                    onChange={(e) => update("contactLinkedin", e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                  />
                </Field>
              </div>
            </SectionCard>

            <SectionCard
              title={t("dashboard.section.skills.title")}
              description={t("dashboard.section.skills.desc")}
            >
              <Field label={t("dashboard.field.skills_core")}>
                <Input
                  value={state.skillsCore}
                  onChange={(e) => update("skillsCore", e.target.value)}
                  placeholder={t("dashboard.field.skills_core.placeholder")}
                />
              </Field>
              <Field label={t("dashboard.field.skills_tools")}>
                <Input
                  value={state.skillsTools}
                  onChange={(e) => update("skillsTools", e.target.value)}
                  placeholder={t("dashboard.field.skills_tools.placeholder")}
                />
              </Field>
            </SectionCard>

            {/* EXPÉRIENCES */}
            <RepeatableSection
              title={t("dashboard.section.experiences.title")}
              description={t("dashboard.section.experiences.desc")}
              count={state.experiences.length}
              plan={plan}
              sectionKey="experiences"
              onAdd={addExperience}
              addLabel={t("dashboard.add.experience")}
              emptyLabel={t("dashboard.empty.experience")}
            >
              {state.experiences.map((exp, idx) => (
                <RepeatItem
                  key={idx}
                  index={idx}
                  title={exp.role || exp.company || t("dashboard.repeat.new_experience")}
                  subtitle={exp.company}
                  onRemove={() => removeArrayItem("experiences", idx)}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label={t("dashboard.field.company")}>
                      <Input
                        value={exp.company}
                        onChange={(e) =>
                          updateArrayItem<Experience>("experiences", idx, {
                            company: e.target.value
                          })
                        }
                      />
                    </Field>
                    <Field label={t("dashboard.field.role")}>
                      <Input
                        value={exp.role}
                        onChange={(e) =>
                          updateArrayItem<Experience>("experiences", idx, { role: e.target.value })
                        }
                      />
                    </Field>
                    <Field label={t("dashboard.field.start")}>
                      <Input
                        value={exp.start}
                        onChange={(e) =>
                          updateArrayItem<Experience>("experiences", idx, { start: e.target.value })
                        }
                        placeholder="2022"
                      />
                    </Field>
                    <Field label={t("dashboard.field.end")}>
                      <Input
                        value={exp.end}
                        onChange={(e) =>
                          updateArrayItem<Experience>("experiences", idx, { end: e.target.value })
                        }
                        placeholder={t("dashboard.field.end.placeholder")}
                      />
                    </Field>
                  </div>
                  <Field label={t("dashboard.field.description")}>
                    <Textarea
                      value={exp.description}
                      onChange={(e) =>
                        updateArrayItem<Experience>("experiences", idx, {
                          description: e.target.value
                        })
                      }
                    />
                  </Field>
                </RepeatItem>
              ))}
            </RepeatableSection>

            {/* FORMATIONS */}
            <RepeatableSection
              title={t("dashboard.section.education.title")}
              count={state.education.length}
              plan={plan}
              sectionKey="education"
              onAdd={addEducation}
              addLabel={t("dashboard.add.education")}
              emptyLabel={t("dashboard.empty.education")}
            >
              {state.education.map((edu, idx) => (
                <RepeatItem
                  key={idx}
                  index={idx}
                  title={edu.degree || t("dashboard.repeat.new_education")}
                  subtitle={edu.school}
                  onRemove={() => removeArrayItem("education", idx)}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label={t("dashboard.field.school")}>
                      <Input
                        value={edu.school}
                        onChange={(e) =>
                          updateArrayItem<Education>("education", idx, { school: e.target.value })
                        }
                      />
                    </Field>
                    <Field label={t("dashboard.field.degree")}>
                      <Input
                        value={edu.degree}
                        onChange={(e) =>
                          updateArrayItem<Education>("education", idx, { degree: e.target.value })
                        }
                      />
                    </Field>
                    <Field label={t("dashboard.field.start")}>
                      <Input
                        value={edu.start}
                        onChange={(e) =>
                          updateArrayItem<Education>("education", idx, { start: e.target.value })
                        }
                      />
                    </Field>
                    <Field label={t("dashboard.field.end")}>
                      <Input
                        value={edu.end}
                        onChange={(e) =>
                          updateArrayItem<Education>("education", idx, { end: e.target.value })
                        }
                      />
                    </Field>
                  </div>
                </RepeatItem>
              ))}
            </RepeatableSection>

            {/* PROJETS */}
            <RepeatableSection
              title={t("dashboard.section.projects.title")}
              count={state.projects.length}
              plan={plan}
              sectionKey="projects"
              onAdd={addProject}
              addLabel={t("dashboard.add.project")}
              emptyLabel={t("dashboard.empty.project")}
            >
              {state.projects.map((project, idx) => (
                <RepeatItem
                  key={idx}
                  index={idx}
                  title={project.name || t("dashboard.repeat.new_project")}
                  onRemove={() => removeArrayItem("projects", idx)}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label={t("dashboard.field.project_name")}>
                      <Input
                        value={project.name}
                        onChange={(e) =>
                          updateArrayItem<Project>("projects", idx, { name: e.target.value })
                        }
                      />
                    </Field>
                    <Field label={t("dashboard.field.project_link")}>
                      <Input
                        value={project.link}
                        onChange={(e) =>
                          updateArrayItem<Project>("projects", idx, { link: e.target.value })
                        }
                        placeholder="https://..."
                      />
                    </Field>
                  </div>
                  <Field label={t("dashboard.field.description")}>
                    <Textarea
                      value={project.description}
                      onChange={(e) =>
                        updateArrayItem<Project>("projects", idx, {
                          description: e.target.value
                        })
                      }
                    />
                  </Field>
                </RepeatItem>
              ))}
            </RepeatableSection>

            {/* LANGUES */}
            <RepeatableSection
              title={t("dashboard.section.languages.title")}
              count={state.languages.length}
              plan={plan}
              sectionKey="languages"
              onAdd={addLanguage}
              addLabel={t("dashboard.add.language")}
              emptyLabel={t("dashboard.empty.language")}
            >
              {state.languages.map((lang, idx) => (
                <RepeatItem
                  key={idx}
                  index={idx}
                  title={lang.name || t("dashboard.repeat.new_language")}
                  subtitle={lang.level}
                  onRemove={() => removeArrayItem("languages", idx)}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label={t("dashboard.field.language")}>
                      <Input
                        value={lang.name}
                        onChange={(e) =>
                          updateArrayItem<Language>("languages", idx, { name: e.target.value })
                        }
                        placeholder={t("dashboard.field.language.placeholder")}
                      />
                    </Field>
                    <Field label={t("dashboard.field.language_level")}>
                      <Input
                        value={lang.level}
                        onChange={(e) =>
                          updateArrayItem<Language>("languages", idx, { level: e.target.value })
                        }
                        placeholder={t("dashboard.field.language_level.placeholder")}
                      />
                    </Field>
                  </div>
                </RepeatItem>
              ))}
            </RepeatableSection>

            <SectionCard title={t("dashboard.section.extras.title")}>
              <Field label={t("dashboard.field.certifications")}>
                <Input
                  value={state.certifications}
                  onChange={(e) => update("certifications", e.target.value)}
                  placeholder={t("dashboard.field.certifications.placeholder")}
                />
              </Field>
              <Field label={t("dashboard.field.interests")}>
                <Input
                  value={state.interests}
                  onChange={(e) => update("interests", e.target.value)}
                  placeholder={t("dashboard.field.interests.placeholder")}
                />
              </Field>
            </SectionCard>
          </form>
        </div>
      </div>

      <aside className="relative hidden min-h-screen w-full max-w-[440px] flex-col border-l border-[var(--border)] bg-[var(--surface-solid)]/50 lg:flex">
        <AmbientBackground variant="subtle" />
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center p-8">
          <div className="mb-6 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
              {t("dashboard.preview_live")}
            </p>
          </div>
          <PhoneFrame>
            <ProfileView username={previewUsername} content={previewContent} compact />
          </PhoneFrame>
          {state.username ? (
            <div className="mt-8 w-full max-w-[300px]">
              <ProfileQr username={state.username} />
            </div>
          ) : null}
        </div>
      </aside>
    </div>
  );
}

/* ---------- Sub-components ---------- */

function Field({
  label,
  required,
  children
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
      </Label>
      {children}
    </div>
  );
}

function RepeatableSection({
  title,
  description,
  count,
  plan,
  sectionKey,
  onAdd,
  addLabel,
  emptyLabel,
  children
}: {
  title: string;
  description?: string;
  count: number;
  plan: PlanTier;
  sectionKey: SectionKey;
  onAdd: () => void;
  addLabel: string;
  emptyLabel: string;
  children: ReactNode;
}) {
  const t = useT();
  const limit = getLimit(plan, sectionKey);
  const limitReached = !canAdd(plan, sectionKey, count);
  const limitText = limit === Infinity ? null : `${count}/${limit}`;

  return (
    <SectionCard
      title={
        <span className="flex items-center gap-2">
          {title}
          {limitText ? (
            <span className="rounded-full bg-[var(--surface-hover)] px-2 py-0.5 text-[11px] font-medium text-[var(--muted)]">
              {limitText}
            </span>
          ) : null}
        </span>
      }
      description={description}
    >
      <div className="space-y-3">
        {count === 0 ? (
          <p className="rounded-xl border border-dashed border-[var(--border)] px-4 py-6 text-center text-sm text-[var(--muted)]">
            {emptyLabel}
          </p>
        ) : (
          children
        )}

        {limitReached ? (
          <div className="flex items-center gap-3 rounded-xl border border-[var(--accent-soft-3)] bg-[var(--accent-soft-3)]/40 px-4 py-3 text-sm">
            <Lock className="h-4 w-4 shrink-0 text-[var(--accent-3)]" />
            <p className="flex-1 text-[var(--muted-strong)]">
              {t("dashboard.limit.reached", { limit })}{" "}
              <Link
                href="/pricing"
                className="font-medium text-[var(--foreground)] underline decoration-[var(--accent)] decoration-2 underline-offset-4"
              >
                {t("dashboard.limit.upgrade_link")}
              </Link>
            </p>
          </div>
        ) : (
          <button
            type="button"
            onClick={onAdd}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[var(--border-strong)] bg-[var(--surface-solid)]/50 px-4 py-3 text-sm font-medium text-[var(--muted-strong)] transition hover:border-[var(--accent)] hover:bg-[var(--surface-solid)] hover:text-[var(--accent)]"
          >
            <Plus className="h-4 w-4" />
            {addLabel}
          </button>
        )}
      </div>
    </SectionCard>
  );
}

function RepeatItem({
  index,
  title,
  subtitle,
  onRemove,
  children
}: {
  index: number;
  title: string;
  subtitle?: string;
  onRemove: () => void;
  children: ReactNode;
}) {
  const t = useT();
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-solid)] shadow-[var(--shadow-sm)]">
      <header className="flex items-center gap-3 px-4 py-3">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="flex flex-1 items-center gap-2 text-left"
        >
          <ChevronDown
            className={`h-4 w-4 text-[var(--muted)] transition-transform ${expanded ? "" : "-rotate-90"}`}
          />
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
            #{index + 1}
          </span>
          <span className="truncate font-medium text-[var(--foreground)]">{title}</span>
          {subtitle ? (
            <span className="truncate text-sm text-[var(--muted)]">· {subtitle}</span>
          ) : null}
        </button>
        <button
          type="button"
          onClick={() => {
            if (confirm(t("common.confirm.delete"))) onRemove();
          }}
          className="rounded-lg p-1.5 text-[var(--muted)] transition hover:bg-red-50 hover:text-red-600"
          aria-label={t("dashboard.repeat.delete")}
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </header>
      {expanded ? (
        <div className="space-y-4 border-t border-[var(--border)] p-4">{children}</div>
      ) : null}
    </div>
  );
}
