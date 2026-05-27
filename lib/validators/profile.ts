import { z } from "zod";

export const usernameSchema = z
  .string()
  .min(3, "Le username doit contenir au moins 3 caracteres")
  .max(30, "Le username ne peut pas depasser 30 caracteres")
  .regex(/^[a-z0-9-]+$/, "Utilise uniquement lettres minuscules, chiffres et tirets");

export const profileContentSchema = z.object({
  hero: z.object({
    fullName: z.string().min(1, "Le nom complet est obligatoire"),
    title: z.string().min(1, "Le titre est obligatoire"),
    location: z.string().default(""),
    photoUrl: z.string().min(1, "La photo Hero est obligatoire"),
    summary: z.string().default("")
  }),
  contact: z.object({
    email: z.string().email().or(z.literal("")),
    phone: z.string().default(""),
    website: z.string().url().or(z.literal("")),
    linkedin: z.string().url().or(z.literal(""))
  }),
  skills: z.object({
    core: z.array(z.string()),
    tools: z.array(z.string())
  }),
  experience: z.array(
    z.object({
      company: z.string(),
      role: z.string(),
      start: z.string(),
      end: z.string(),
      description: z.string()
    })
  ),
  education: z.array(
    z.object({
      school: z.string(),
      degree: z.string(),
      start: z.string(),
      end: z.string()
    })
  ),
  projects: z.array(
    z.object({
      name: z.string(),
      link: z.string(),
      description: z.string()
    })
  ),
  certifications: z.array(z.string()),
  languages: z.array(
    z.object({
      name: z.string(),
      level: z.string()
    })
  ),
  extras: z.object({
    interests: z.array(z.string())
  })
});
