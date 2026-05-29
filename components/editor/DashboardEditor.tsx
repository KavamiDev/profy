"use client";

import { useEffect } from "react";
import { saveProfile } from "@/app/dashboard/actions";
import { defaultProfileContent, type ProfileContent } from "@/types/profile";
import { type PlanTier } from "@/lib/plan-limits";
import { useEditorStore } from "@/lib/editor/store";
import { useDraftPersistence } from "@/lib/editor/draft";

import { EditorHeader } from "./EditorHeader";
import { EditorBanners } from "./EditorBanners";
import { EditorPreviewMobile, EditorPreviewDesktop, EditorContentField } from "./EditorPreview";

import { AddressBlock } from "./blocks/AddressBlock";
import { IdentityBlock } from "./blocks/IdentityBlock";
import { ContactBlock } from "./blocks/ContactBlock";
import { SkillsBlock } from "./blocks/SkillsBlock";
import { ExperiencesBlock } from "./blocks/ExperiencesBlock";
import { EducationBlock } from "./blocks/EducationBlock";
import { ProjectsBlock } from "./blocks/ProjectsBlock";
import { LanguagesBlock } from "./blocks/LanguagesBlock";
import { ExtrasBlock } from "./blocks/ExtrasBlock";

export function DashboardEditor({
  initialUsername = "",
  initialContent = defaultProfileContent,
  saved,
  error,
  proActivated,
  plan = "free",
  userEmail = "",
  userId = ""
}: {
  initialUsername?: string;
  initialContent?: ProfileContent;
  saved?: boolean;
  error?: string;
  proActivated?: boolean;
  plan?: PlanTier;
  userEmail?: string;
  userId?: string;
}) {
  // Hydrate le store une seule fois côté client avec les props SSR.
  // Le draft localStorage peut ensuite l'écraser (via useDraftPersistence).
  useEffect(() => {
    useEditorStore.getState().hydrate({ username: initialUsername, content: initialContent });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useDraftPersistence(userId, !!saved);

  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] lg:flex-row">
      <div className="flex min-h-screen flex-1 flex-col">
        <EditorHeader userEmail={userEmail} />
        <EditorPreviewMobile />

        <div className="mx-auto w-full max-w-3xl flex-1 space-y-5 px-4 py-8 lg:px-6">
          <EditorBanners saved={saved} error={error} proActivated={proActivated} />

          <form id="profile-form" action={saveProfile} className="space-y-5">
            <EditorContentField />
            <AddressBlock />
            <IdentityBlock userId={userId} />
            <ContactBlock />
            <SkillsBlock />
            <ExperiencesBlock plan={plan} />
            <EducationBlock plan={plan} />
            <ProjectsBlock plan={plan} />
            <LanguagesBlock plan={plan} />
            <ExtrasBlock />
          </form>
        </div>
      </div>

      <EditorPreviewDesktop />
    </div>
  );
}
