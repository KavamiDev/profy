"use client";

import { AmbientBackground } from "@/components/ambient-background";
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
import { useMemo, useState, type ReactNode } from "react";

function splitList(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
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

const errorMessages: Record<string, string> = {
  "username-reserve": "Ce username est réservé.",
  "username-invalide": "Username invalide (3–30 caractères, minuscules, chiffres, tirets).",
  "username-pris": "Ce username est déjà pris. Choisis-en un autre.",
  "contenu-invalide": "Vérifie le nom, le titre, la photo et les liens URL."
};

export function DashboardEditor({
  initialUsername = "",
  initialContent = defaultProfileContent,
  saved,
  error,
  plan = "free",
  userEmail = ""
}: {
  initialUsername?: string;
  initialContent?: ProfileContent;
  saved?: boolean;
  error?: string;
  plan?: PlanTier;
  userEmail?: string;
}) {
  const [state, setState] = useState<FormState>(() =>
    contentToFormState(initialUsername, initialContent)
  );

  const previewContent = useMemo(() => buildContent(state), [state]);
  const previewUsername = state.username || "ton-username";
  const contentJson = useMemo(() => JSON.stringify(previewContent), [previewContent]);
  const isEditMode = Boolean(initialUsername);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  function updateArrayItem<T>(key: "experiences" | "education" | "projects" | "languages", idx: number, patch: Partial<T>) {
    setState((prev) => ({
      ...prev,
      [key]: (prev[key] as T[]).map((item, i) => (i === idx ? { ...item, ...patch } : item))
    }));
  }

  function removeArrayItem(key: "experiences" | "education" | "projects" | "languages", idx: number) {
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
                Exemple
              </Link>
              {state.username ? (
                <Link
                  href={`/${state.username}`}
                  target="_blank"
                  className="hidden items-center gap-2 text-sm text-[var(--muted)] transition hover:text-[var(--foreground)] sm:inline-flex"
                >
                  Voir la page
                  <ExternalLink className="h-4 w-4" />
                </Link>
              ) : null}
              <Button type="submit" form="profile-form" variant="accent" size="sm">
                <Save className="mr-2 h-4 w-4" />
                Publier
              </Button>
              {userEmail ? (
                <form action={signOut}>
                  <button
                    type="submit"
                    className="hidden items-center gap-1.5 text-sm text-[var(--muted)] transition hover:text-[var(--foreground)] sm:inline-flex"
                    title={`Connecté en tant que ${userEmail}`}
                  >
                    <LogOut className="h-4 w-4" />
                  </button>
                </form>
              ) : null}
            </div>
          </div>
        </header>

        <div className="relative border-b border-[var(--border)] bg-white/60 p-6 lg:hidden">
          <p className="mb-4 text-center text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
            Aperçu
          </p>
          <PhoneFrame className="max-w-[300px]">
            <ProfileView username={previewUsername} content={previewContent} compact />
          </PhoneFrame>
        </div>

        <div className="mx-auto w-full max-w-3xl flex-1 space-y-5 px-4 py-8 lg:px-6">
          {saved ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              ✓ Profil publié avec succès — visite{" "}
              <Link
                href={`/${state.username}`}
                target="_blank"
                className="font-medium underline underline-offset-2"
              >
                profyl.io/{state.username}
              </Link>
            </div>
          ) : null}
          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {errorMessages[error] ?? "Erreur lors de la sauvegarde."}
            </div>
          ) : null}

          <form id="profile-form" action={saveProfile} className="space-y-5">
            {/* hidden inputs portant tout le content sérialisé + flags */}
            <input type="hidden" name="content" value={contentJson} />
            <input type="hidden" name="editMode" value={isEditMode ? "1" : "0"} />

            <SectionCard
              title="Ton adresse Profyl"
              description="Choisis l'URL que tu partageras aux recruteurs."
            >
              <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--background)] px-4 py-1">
                <span className="shrink-0 text-sm text-[var(--muted)]">profyl.io/</span>
                <input
                  name="username"
                  required
                  value={state.username}
                  onChange={(e) =>
                    update(
                      "username",
                      e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "")
                    )
                  }
                  placeholder="jean-dupont"
                  className="h-11 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--muted)]"
                />
              </div>
            </SectionCard>

            <SectionCard
              title="Identité"
              description="La photo est obligatoire sur un CV français."
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nom complet" required>
                  <Input
                    required
                    value={state.heroFullName}
                    onChange={(e) => update("heroFullName", e.target.value)}
                    placeholder="Jean Dupont"
                  />
                </Field>
                <Field label="Titre professionnel" required>
                  <Input
                    required
                    value={state.heroTitle}
                    onChange={(e) => update("heroTitle", e.target.value)}
                    placeholder="Product Designer"
                  />
                </Field>
                <Field label="Ville">
                  <Input
                    value={state.heroLocation}
                    onChange={(e) => update("heroLocation", e.target.value)}
                    placeholder="Paris, France"
                  />
                </Field>
                <Field label="URL de ta photo" required>
                  <Input
                    required
                    value={state.heroPhotoUrl}
                    onChange={(e) => update("heroPhotoUrl", e.target.value)}
                    placeholder="https://..."
                  />
                </Field>
              </div>
              <Field label="Résumé">
                <Textarea
                  value={state.heroSummary}
                  onChange={(e) => update("heroSummary", e.target.value)}
                  placeholder="Quelques lignes sur ton parcours et ce que tu recherches..."
                />
              </Field>
            </SectionCard>

            <SectionCard title="Contact">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Email">
                  <Input
                    type="email"
                    value={state.contactEmail}
                    onChange={(e) => update("contactEmail", e.target.value)}
                    placeholder="jean@email.com"
                  />
                </Field>
                <Field label="Téléphone">
                  <Input
                    value={state.contactPhone}
                    onChange={(e) => update("contactPhone", e.target.value)}
                    placeholder="+33 6 12 34 56 78"
                  />
                </Field>
                <Field label="Site web">
                  <Input
                    value={state.contactWebsite}
                    onChange={(e) => update("contactWebsite", e.target.value)}
                    placeholder="https://monsite.fr"
                  />
                </Field>
                <Field label="LinkedIn">
                  <Input
                    value={state.contactLinkedin}
                    onChange={(e) => update("contactLinkedin", e.target.value)}
                    placeholder="https://linkedin.com/in/..."
                  />
                </Field>
              </div>
            </SectionCard>

            <SectionCard title="Compétences" description="Sépare par des virgules.">
              <Field label="Compétences clés">
                <Input
                  value={state.skillsCore}
                  onChange={(e) => update("skillsCore", e.target.value)}
                  placeholder="UX Research, Figma, Prototypage"
                />
              </Field>
              <Field label="Outils">
                <Input
                  value={state.skillsTools}
                  onChange={(e) => update("skillsTools", e.target.value)}
                  placeholder="Notion, Jira, Webflow"
                />
              </Field>
            </SectionCard>

            {/* ---------- EXPÉRIENCES (array dynamique) ---------- */}
            <RepeatableSection
              title="Expériences"
              description="Du plus récent au plus ancien."
              count={state.experiences.length}
              plan={plan}
              sectionKey="experiences"
              onAdd={addExperience}
              addLabel="Ajouter une expérience"
              emptyLabel="Aucune expérience pour l'instant"
            >
              {state.experiences.map((exp, idx) => (
                <RepeatItem
                  key={idx}
                  index={idx}
                  title={exp.role || exp.company || "Nouvelle expérience"}
                  subtitle={exp.company}
                  onRemove={() => removeArrayItem("experiences", idx)}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Entreprise">
                      <Input
                        value={exp.company}
                        onChange={(e) =>
                          updateArrayItem<Experience>("experiences", idx, {
                            company: e.target.value
                          })
                        }
                      />
                    </Field>
                    <Field label="Poste">
                      <Input
                        value={exp.role}
                        onChange={(e) =>
                          updateArrayItem<Experience>("experiences", idx, { role: e.target.value })
                        }
                      />
                    </Field>
                    <Field label="Début">
                      <Input
                        value={exp.start}
                        onChange={(e) =>
                          updateArrayItem<Experience>("experiences", idx, { start: e.target.value })
                        }
                        placeholder="2022"
                      />
                    </Field>
                    <Field label="Fin">
                      <Input
                        value={exp.end}
                        onChange={(e) =>
                          updateArrayItem<Experience>("experiences", idx, { end: e.target.value })
                        }
                        placeholder="2025 ou Aujourd'hui"
                      />
                    </Field>
                  </div>
                  <Field label="Description">
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

            {/* ---------- FORMATIONS ---------- */}
            <RepeatableSection
              title="Formations"
              count={state.education.length}
              plan={plan}
              sectionKey="education"
              onAdd={addEducation}
              addLabel="Ajouter une formation"
              emptyLabel="Aucune formation pour l'instant"
            >
              {state.education.map((edu, idx) => (
                <RepeatItem
                  key={idx}
                  index={idx}
                  title={edu.degree || "Nouvelle formation"}
                  subtitle={edu.school}
                  onRemove={() => removeArrayItem("education", idx)}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="École">
                      <Input
                        value={edu.school}
                        onChange={(e) =>
                          updateArrayItem<Education>("education", idx, { school: e.target.value })
                        }
                      />
                    </Field>
                    <Field label="Diplôme">
                      <Input
                        value={edu.degree}
                        onChange={(e) =>
                          updateArrayItem<Education>("education", idx, { degree: e.target.value })
                        }
                      />
                    </Field>
                    <Field label="Début">
                      <Input
                        value={edu.start}
                        onChange={(e) =>
                          updateArrayItem<Education>("education", idx, { start: e.target.value })
                        }
                      />
                    </Field>
                    <Field label="Fin">
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

            {/* ---------- PROJETS ---------- */}
            <RepeatableSection
              title="Projets"
              count={state.projects.length}
              plan={plan}
              sectionKey="projects"
              onAdd={addProject}
              addLabel="Ajouter un projet"
              emptyLabel="Aucun projet pour l'instant"
            >
              {state.projects.map((project, idx) => (
                <RepeatItem
                  key={idx}
                  index={idx}
                  title={project.name || "Nouveau projet"}
                  onRemove={() => removeArrayItem("projects", idx)}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Nom">
                      <Input
                        value={project.name}
                        onChange={(e) =>
                          updateArrayItem<Project>("projects", idx, { name: e.target.value })
                        }
                      />
                    </Field>
                    <Field label="Lien">
                      <Input
                        value={project.link}
                        onChange={(e) =>
                          updateArrayItem<Project>("projects", idx, { link: e.target.value })
                        }
                        placeholder="https://..."
                      />
                    </Field>
                  </div>
                  <Field label="Description">
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

            {/* ---------- LANGUES ---------- */}
            <RepeatableSection
              title="Langues"
              count={state.languages.length}
              plan={plan}
              sectionKey="languages"
              onAdd={addLanguage}
              addLabel="Ajouter une langue"
              emptyLabel="Aucune langue pour l'instant"
            >
              {state.languages.map((lang, idx) => (
                <RepeatItem
                  key={idx}
                  index={idx}
                  title={lang.name || "Nouvelle langue"}
                  subtitle={lang.level}
                  onRemove={() => removeArrayItem("languages", idx)}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Langue">
                      <Input
                        value={lang.name}
                        onChange={(e) =>
                          updateArrayItem<Language>("languages", idx, { name: e.target.value })
                        }
                        placeholder="Anglais"
                      />
                    </Field>
                    <Field label="Niveau">
                      <Input
                        value={lang.level}
                        onChange={(e) =>
                          updateArrayItem<Language>("languages", idx, { level: e.target.value })
                        }
                        placeholder="C1 / Courant"
                      />
                    </Field>
                  </div>
                </RepeatItem>
              ))}
            </RepeatableSection>

            <SectionCard title="En plus">
              <Field label="Certifications">
                <Input
                  value={state.certifications}
                  onChange={(e) => update("certifications", e.target.value)}
                  placeholder="AWS, Google UX, PSPO"
                />
              </Field>
              <Field label="Centres d'intérêt">
                <Input
                  value={state.interests}
                  onChange={(e) => update("interests", e.target.value)}
                  placeholder="Randonnée, Photographie"
                />
              </Field>
            </SectionCard>
          </form>
        </div>
      </div>

      <aside className="relative hidden min-h-screen w-full max-w-[440px] flex-col border-l border-[var(--border)] bg-white/50 lg:flex">
        <AmbientBackground variant="subtle" />
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center p-8">
          <div className="mb-6 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
              Aperçu live
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
              Limite Free atteinte ({limit}).{" "}
              <Link
                href="/pricing"
                className="font-medium text-[var(--foreground)] underline decoration-[var(--accent)] decoration-2 underline-offset-4"
              >
                Passe en Pro
              </Link>{" "}
              pour ajouter plus.
            </p>
          </div>
        ) : (
          <button
            type="button"
            onClick={onAdd}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-[var(--border-strong)] bg-white/50 px-4 py-3 text-sm font-medium text-[var(--muted-strong)] transition hover:border-[var(--accent)] hover:bg-white hover:text-[var(--accent)]"
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
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="rounded-xl border border-[var(--border)] bg-white shadow-[var(--shadow-sm)]">
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
            if (confirm("Supprimer cet élément ?")) onRemove();
          }}
          className="rounded-lg p-1.5 text-[var(--muted)] transition hover:bg-red-50 hover:text-red-600"
          aria-label="Supprimer"
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
