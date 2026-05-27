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
import type { ProfileContent } from "@/types/profile";
import { defaultProfileContent } from "@/types/profile";
import { ExternalLink, Save } from "lucide-react";
import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { saveProfile } from "@/app/dashboard/actions";
import { DEMO_USERNAME } from "@/lib/demo-persona";

function splitList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
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
    experience: state.expCompany
      ? [
          {
            company: state.expCompany,
            role: state.expRole,
            start: state.expStart,
            end: state.expEnd,
            description: state.expDescription
          }
        ]
      : [],
    education: state.eduSchool
      ? [
          {
            school: state.eduSchool,
            degree: state.eduDegree,
            start: state.eduStart,
            end: state.eduEnd
          }
        ]
      : [],
    projects: state.projectName
      ? [
          {
            name: state.projectName,
            link: state.projectLink,
            description: state.projectDescription
          }
        ]
      : [],
    certifications: splitList(state.certifications),
    languages: state.languageName
      ? [{ name: state.languageName, level: state.languageLevel }]
      : [],
    extras: {
      interests: splitList(state.interests)
    }
  };
}

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
  expCompany: string;
  expRole: string;
  expStart: string;
  expEnd: string;
  expDescription: string;
  eduSchool: string;
  eduDegree: string;
  eduStart: string;
  eduEnd: string;
  projectName: string;
  projectLink: string;
  projectDescription: string;
  certifications: string;
  languageName: string;
  languageLevel: string;
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
    expCompany: content.experience[0]?.company ?? "",
    expRole: content.experience[0]?.role ?? "",
    expStart: content.experience[0]?.start ?? "",
    expEnd: content.experience[0]?.end ?? "",
    expDescription: content.experience[0]?.description ?? "",
    eduSchool: content.education[0]?.school ?? "",
    eduDegree: content.education[0]?.degree ?? "",
    eduStart: content.education[0]?.start ?? "",
    eduEnd: content.education[0]?.end ?? "",
    projectName: content.projects[0]?.name ?? "",
    projectLink: content.projects[0]?.link ?? "",
    projectDescription: content.projects[0]?.description ?? "",
    certifications: content.certifications.join(", "),
    languageName: content.languages[0]?.name ?? "",
    languageLevel: content.languages[0]?.level ?? "",
    interests: content.extras.interests.join(", ")
  };
}

export function DashboardEditor({
  initialUsername = "",
  initialContent = defaultProfileContent,
  saved,
  error
}: {
  initialUsername?: string;
  initialContent?: ProfileContent;
  saved?: boolean;
  error?: string;
}) {
  const [state, setState] = useState<FormState>(() =>
    contentToFormState(initialUsername, initialContent)
  );

  const previewContent = useMemo(() => buildContent(state), [state]);
  const previewUsername = state.username || "ton-username";

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((prev) => ({ ...prev, [key]: value }));
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
              Profil publié avec succès.
            </div>
          ) : null}
          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {error === "username-reserve" && "Ce username est réservé."}
              {error === "username-invalide" &&
                "Username invalide (3–30 caractères, minuscules, chiffres, tirets)."}
              {error === "contenu-invalide" &&
                "Vérifie le nom, le titre, la photo et les liens URL."}
              {!["username-reserve", "username-invalide", "contenu-invalide"].includes(error) &&
                "Erreur lors de la sauvegarde."}
            </div>
          ) : null}

          <form id="profile-form" action={saveProfile} className="space-y-5">
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
                  onChange={(e) => update("username", e.target.value.toLowerCase())}
                  placeholder="jean-dupont"
                  className="h-11 flex-1 bg-transparent text-sm outline-none placeholder:text-[var(--muted)]"
                />
              </div>
            </SectionCard>

            <SectionCard title="Identité" description="La photo est obligatoire sur un CV français.">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nom complet" required>
                  <Input
                    name="heroFullName"
                    required
                    value={state.heroFullName}
                    onChange={(e) => update("heroFullName", e.target.value)}
                    placeholder="Jean Dupont"
                  />
                </Field>
                <Field label="Titre professionnel" required>
                  <Input
                    name="heroTitle"
                    required
                    value={state.heroTitle}
                    onChange={(e) => update("heroTitle", e.target.value)}
                    placeholder="Product Designer"
                  />
                </Field>
                <Field label="Ville">
                  <Input
                    name="heroLocation"
                    value={state.heroLocation}
                    onChange={(e) => update("heroLocation", e.target.value)}
                    placeholder="Paris, France"
                  />
                </Field>
                <Field label="URL de ta photo" required>
                  <Input
                    name="heroPhotoUrl"
                    required
                    value={state.heroPhotoUrl}
                    onChange={(e) => update("heroPhotoUrl", e.target.value)}
                    placeholder="https://..."
                  />
                </Field>
              </div>
              <Field label="Résumé">
                <Textarea
                  name="heroSummary"
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
                    name="contactEmail"
                    value={state.contactEmail}
                    onChange={(e) => update("contactEmail", e.target.value)}
                    placeholder="jean@email.com"
                  />
                </Field>
                <Field label="Téléphone">
                  <Input
                    name="contactPhone"
                    value={state.contactPhone}
                    onChange={(e) => update("contactPhone", e.target.value)}
                    placeholder="+33 6 12 34 56 78"
                  />
                </Field>
                <Field label="Site web">
                  <Input
                    name="contactWebsite"
                    value={state.contactWebsite}
                    onChange={(e) => update("contactWebsite", e.target.value)}
                    placeholder="https://monsite.fr"
                  />
                </Field>
                <Field label="LinkedIn">
                  <Input
                    name="contactLinkedin"
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
                  name="skillsCore"
                  value={state.skillsCore}
                  onChange={(e) => update("skillsCore", e.target.value)}
                  placeholder="UX Research, Figma, Prototypage"
                />
              </Field>
              <Field label="Outils">
                <Input
                  name="skillsTools"
                  value={state.skillsTools}
                  onChange={(e) => update("skillsTools", e.target.value)}
                  placeholder="Notion, Jira, Webflow"
                />
              </Field>
            </SectionCard>

            <SectionCard title="Expérience">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Entreprise">
                  <Input
                    name="expCompany"
                    value={state.expCompany}
                    onChange={(e) => update("expCompany", e.target.value)}
                  />
                </Field>
                <Field label="Poste">
                  <Input
                    name="expRole"
                    value={state.expRole}
                    onChange={(e) => update("expRole", e.target.value)}
                  />
                </Field>
                <Field label="Début">
                  <Input
                    name="expStart"
                    value={state.expStart}
                    onChange={(e) => update("expStart", e.target.value)}
                    placeholder="2022"
                  />
                </Field>
                <Field label="Fin">
                  <Input
                    name="expEnd"
                    value={state.expEnd}
                    onChange={(e) => update("expEnd", e.target.value)}
                    placeholder="2025"
                  />
                </Field>
              </div>
              <Field label="Description">
                <Textarea
                  name="expDescription"
                  value={state.expDescription}
                  onChange={(e) => update("expDescription", e.target.value)}
                />
              </Field>
            </SectionCard>

            <SectionCard title="Formation">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="École">
                  <Input
                    name="eduSchool"
                    value={state.eduSchool}
                    onChange={(e) => update("eduSchool", e.target.value)}
                  />
                </Field>
                <Field label="Diplôme">
                  <Input
                    name="eduDegree"
                    value={state.eduDegree}
                    onChange={(e) => update("eduDegree", e.target.value)}
                  />
                </Field>
                <Field label="Début">
                  <Input
                    name="eduStart"
                    value={state.eduStart}
                    onChange={(e) => update("eduStart", e.target.value)}
                  />
                </Field>
                <Field label="Fin">
                  <Input
                    name="eduEnd"
                    value={state.eduEnd}
                    onChange={(e) => update("eduEnd", e.target.value)}
                  />
                </Field>
              </div>
            </SectionCard>

            <SectionCard title="Projet">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nom">
                  <Input
                    name="projectName"
                    value={state.projectName}
                    onChange={(e) => update("projectName", e.target.value)}
                  />
                </Field>
                <Field label="Lien">
                  <Input
                    name="projectLink"
                    value={state.projectLink}
                    onChange={(e) => update("projectLink", e.target.value)}
                  />
                </Field>
              </div>
              <Field label="Description">
                <Textarea
                  name="projectDescription"
                  value={state.projectDescription}
                  onChange={(e) => update("projectDescription", e.target.value)}
                />
              </Field>
            </SectionCard>

            <SectionCard title="En plus">
              <Field label="Certifications">
                <Input
                  name="certifications"
                  value={state.certifications}
                  onChange={(e) => update("certifications", e.target.value)}
                  placeholder="AWS, Google UX"
                />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Langue">
                  <Input
                    name="languageName"
                    value={state.languageName}
                    onChange={(e) => update("languageName", e.target.value)}
                  />
                </Field>
                <Field label="Niveau">
                  <Input
                    name="languageLevel"
                    value={state.languageLevel}
                    onChange={(e) => update("languageLevel", e.target.value)}
                  />
                </Field>
              </div>
              <Field label="Centres d'intérêt">
                <Input
                  name="interests"
                  value={state.interests}
                  onChange={(e) => update("interests", e.target.value)}
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
