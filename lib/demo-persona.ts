import type { ProfileContent } from "@/types/profile";

export const DEMO_USERNAME = "marie-laurent";

export const demoPersonaContent: ProfileContent = {
  hero: {
    fullName: "Marie Laurent",
    title: "Chef de projet digital · Product Owner",
    location: "Lyon, France",
    photoUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    summary:
      "8 ans à piloter des produits digitaux B2B et B2C. J'aime transformer des idées en expériences simples, mesurer l'impact, et faire avancer les équipes. En recherche d'un poste Product / PM dans une scale-up engagée."
  },
  contact: {
    email: "marie.laurent@email.com",
    phone: "+33 6 12 34 56 78",
    website: "https://marielaurent.fr",
    linkedin: "https://linkedin.com/in/marie-laurent"
  },
  skills: {
    core: [
      "Gestion de projet",
      "Product Discovery",
      "Roadmap & priorisation",
      "Agile / Scrum",
      "Stakeholder management"
    ],
    tools: ["Notion", "Figma", "Jira", "Miro", "Google Analytics"]
  },
  experience: [
    {
      company: "Agence Nova",
      role: "Senior Chef de projet digital",
      start: "2021",
      end: "Aujourd'hui",
      description:
        "Pilotage de 4 produits B2B (SaaS RH, e-learning). Équipes cross-fonctionnelles de 12 personnes. +32 % de rétention client sur 18 mois."
    },
    {
      company: "Groupe RetailCo",
      role: "Product Owner",
      start: "2018",
      end: "2021",
      description:
        "Refonte du parcours mobile e-commerce. Lancement MVP en 4 mois, 120k utilisateurs actifs à M+6."
    }
  ],
  education: [
    {
      school: "EM Lyon Business School",
      degree: "Master Management de l'innovation",
      start: "2016",
      end: "2018"
    },
    {
      school: "Université Lumière Lyon 2",
      degree: "Licence Économie & Gestion",
      start: "2013",
      end: "2016"
    }
  ],
  projects: [
    {
      name: "Open RH — MVP open source",
      link: "https://github.com",
      description:
        "Outil de feedback 360° pour PME. Co-création avec 3 DRH, 200 beta testeurs."
    }
  ],
  certifications: ["PSPO I (Scrum.org)", "Google Analytics"],
  languages: [
    { name: "Français", level: "Natif" },
    { name: "Anglais", level: "Courant (TOEIC 945)" }
  ],
  extras: {
    interests: ["Randonnée", "Photographie", "Bénévolat associatif"]
  }
};

// Mini personae pour le "wall of profiles" sur la landing — illustration uniquement.
export type WallPersona = {
  username: string;
  fullName: string;
  title: string;
  location: string;
  photoUrl: string;
  accent: "coral" | "lavender" | "honey" | "mint" | "ink";
  rotate: number;
  /** true = persona de démonstration (pas un vrai inscrit) → badge "Exemple". */
  isExample?: boolean;
};

export const wallPersonas: WallPersona[] = [
  {
    username: "marie-laurent",
    fullName: "Marie Laurent",
    title: "Product Owner",
    location: "Lyon",
    photoUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
    accent: "coral",
    rotate: -2
  },
  {
    username: "thomas-rossi",
    fullName: "Thomas Rossi",
    title: "Designer produit",
    location: "Paris",
    photoUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    accent: "lavender",
    rotate: 1.5
  },
  {
    username: "lea-benhamou",
    fullName: "Léa Benhamou",
    title: "Ingénieure logicielle",
    location: "Toulouse",
    photoUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    accent: "honey",
    rotate: -1
  },
  {
    username: "karim-diallo",
    fullName: "Karim Diallo",
    title: "Marketing growth",
    location: "Marseille",
    photoUrl:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=400&h=400&fit=crop&crop=face",
    accent: "mint",
    rotate: 2.5
  },
  {
    username: "chloe-martin",
    fullName: "Chloé Martin",
    title: "Architecte d'intérieur",
    location: "Bordeaux",
    photoUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    accent: "coral",
    rotate: -2.5
  },
  {
    username: "antoine-petit",
    fullName: "Antoine Petit",
    title: "Data analyst",
    location: "Nantes",
    photoUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    accent: "ink",
    rotate: 1
  }
];

const WALL_ACCENTS = ["coral", "lavender", "honey", "mint", "ink"] as const;
const WALL_ROTATES = [-2, 1.5, -1, 2.5, -2.5, 1];

/**
 * Compose le mur de la landing : vrais profils publiés d'abord, puis on
 * complète avec les personas de démo (marqués `isExample`) jusqu'à `limit`.
 * Garantit un mur toujours rempli même quand peu de candidats sont inscrits,
 * sans jamais faire passer un exemple pour un vrai inscrit.
 */
export function composeWall(
  real: { username: string; fullName: string; title: string; location: string; photoUrl: string }[],
  limit = 6
): WallPersona[] {
  const cards: WallPersona[] = real.slice(0, limit).map((c, i) => ({
    ...c,
    accent: WALL_ACCENTS[i % WALL_ACCENTS.length],
    rotate: WALL_ROTATES[i % WALL_ROTATES.length],
    isExample: false
  }));

  const used = new Set(cards.map((c) => c.username));
  for (const persona of wallPersonas) {
    if (cards.length >= limit) break;
    if (used.has(persona.username)) continue;
    cards.push({ ...persona, isExample: true });
  }
  return cards;
}
