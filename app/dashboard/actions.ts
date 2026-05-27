"use server";

import { saveProfileByUsername } from "@/lib/server/profiles-store";
import { profileContentSchema, usernameSchema } from "@/lib/validators/profile";
import type { ProfileContent } from "@/types/profile";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const RESERVED = ["admin", "api", "www", "dashboard", "login"];

function readString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function splitList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function saveProfile(formData: FormData) {
  const usernameResult = usernameSchema.safeParse(String(formData.get("username") ?? ""));
  if (!usernameResult.success) {
    redirect("/dashboard?error=username-invalide");
  }

  const username = usernameResult.data;
  if (RESERVED.includes(username)) {
    redirect("/dashboard?error=username-reserve");
  }

  const candidateContent: ProfileContent = {
    hero: {
      fullName: readString(formData, "heroFullName"),
      title: readString(formData, "heroTitle"),
      location: readString(formData, "heroLocation"),
      photoUrl: readString(formData, "heroPhotoUrl"),
      summary: readString(formData, "heroSummary")
    },
    contact: {
      email: readString(formData, "contactEmail"),
      phone: readString(formData, "contactPhone"),
      website: readString(formData, "contactWebsite"),
      linkedin: readString(formData, "contactLinkedin")
    },
    skills: {
      core: splitList(readString(formData, "skillsCore")),
      tools: splitList(readString(formData, "skillsTools"))
    },
    experience: readString(formData, "expCompany")
      ? [
          {
            company: readString(formData, "expCompany"),
            role: readString(formData, "expRole"),
            start: readString(formData, "expStart"),
            end: readString(formData, "expEnd"),
            description: readString(formData, "expDescription")
          }
        ]
      : [],
    education: readString(formData, "eduSchool")
      ? [
          {
            school: readString(formData, "eduSchool"),
            degree: readString(formData, "eduDegree"),
            start: readString(formData, "eduStart"),
            end: readString(formData, "eduEnd")
          }
        ]
      : [],
    projects: readString(formData, "projectName")
      ? [
          {
            name: readString(formData, "projectName"),
            link: readString(formData, "projectLink"),
            description: readString(formData, "projectDescription")
          }
        ]
      : [],
    certifications: splitList(readString(formData, "certifications")),
    languages: readString(formData, "languageName")
      ? [
          {
            name: readString(formData, "languageName"),
            level: readString(formData, "languageLevel")
          }
        ]
      : [],
    extras: {
      interests: splitList(readString(formData, "interests"))
    }
  };

  const contentResult = profileContentSchema.safeParse(candidateContent);
  if (!contentResult.success) {
    redirect(`/dashboard?error=contenu-invalide&username=${username}`);
  }

  const parsedContent = contentResult.data;

  await saveProfileByUsername(username, parsedContent);

  revalidatePath(`/${username}`);
  redirect(`/dashboard?saved=1&username=${username}`);
}
