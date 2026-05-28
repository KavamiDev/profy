import type { Locale } from "./locales";

/**
 * Dictionnaire central de toutes les strings UI traduites.
 *
 * Convention de clés : `<page>.<section>.<role>`
 *
 * Si une clé n'a pas de traduction EN, le hook `useT()` retombe sur la
 * version FR — pas de string vide affichée.
 */

type Dictionary = Record<string, string>;

export const TRANSLATIONS: Record<Locale, Dictionary> = {
  fr: {
    // ---------- Common ----------
    "common.cta.create": "Créer mon profil",
    "common.cta.continue": "Continuer mon profil",
    "common.cta.example": "Exemple",
    "common.cta.pricing": "Pricing",
    "common.cta.signout": "Se déconnecter",
    "common.cta.signout_with": "Se déconnecter ({email})",
    "common.theme.light": "Mode clair",
    "common.theme.dark": "Mode sombre",

    // ---------- Landing ----------
    "landing.eyebrow": "Nouveau · le CV français, réinventé",
    "landing.title_1": "Ton CV mérite",
    "landing.title_em_1": "mieux",
    "landing.title_2": "qu'un",
    "landing.title_em_2": "PDF.",
    "landing.subtitle":
      "Une vraie page web professionnelle, toujours à jour, partageable en un lien.",
    "landing.subtitle_handwritten": "Sans template. Sans friction.",
    "landing.cta.primary": "Créer ma page",
    "landing.cta.secondary": "Voir l'exemple live",
    "landing.proof": "Déjà 230+ candidats inscrits cette semaine",
    "landing.sticker.france": "Pensé pour la France",
    "landing.sticker.free": "100% gratuit",
    "landing.sticker.live": "Page live, scrollable ↓",
    "landing.embed.caption": "↑ Une vraie page Profyl.",
    "landing.embed.help":
      "Scrolle dedans pour voir l'ensemble du profil de Marie.",

    // Wall of profiles
    "landing.wall.eyebrow": "Une famille qui s'agrandit",
    "landing.wall.title_1": "Des candidats,",
    "landing.wall.title_em": "pas des templates.",
    "landing.wall.description":
      "Chaque Profyl est unique parce que chaque parcours l'est. Voici quelques pages — réelles, vivantes, partageables.",
    "landing.wall.handwritten": "↑ Le prochain pourrait être le tien.",
    "landing.wall.see": "Voir",

    // How it works
    "landing.steps.eyebrow": "Comment ça marche",
    "landing.steps.title_1": "Trois étapes.",
    "landing.steps.title_em": "C'est tout.",
    "landing.steps.1.title": "Claim ton username",
    "landing.steps.1.text":
      "Tape ton nom, vérifie qu'il est dispo, reçois un magic link. 30 secondes.",
    "landing.steps.2.title": "Remplis 9 blocs",
    "landing.steps.2.text":
      "Photo, expériences, projets, langues. Tu remplis — Profyl met en forme.",
    "landing.steps.3.title": "Partage ton lien",
    "landing.steps.3.text":
      "profyl.io/ton-nom + un QR code. Sur LinkedIn, ton CV, ta signature email.",

    // CTA final
    "landing.cta_final.sticker": "Lance-toi",
    "landing.cta_final.title_1": "Ton meilleur lien pro,",
    "landing.cta_final.title_em": "en moins de 10 minutes.",
    "landing.cta_final.text_1": "Inspire-toi de",
    "landing.cta_final.text_2": "ou plonge tête baissée.",
    "landing.cta_final.button": "Créer mon Profyl",
    "landing.cta_final.disclaimer":
      "Pas de carte bancaire · domaine custom bientôt · 100% RGPD France",

    // Marquee
    "landing.marquee.1": "Pensé pour la France 🇫🇷",
    "landing.marquee.2": "100% gratuit",
    "landing.marquee.3": "10 min top chrono",
    "landing.marquee.4": "QR code natif",
    "landing.marquee.5": "ISR Vercel",
    "landing.marquee.6": "Photo Hero obligatoire",
    "landing.marquee.7": "Vocabulaire FR strict",
    "landing.marquee.8": "Mobile-first",
    "landing.marquee.9": "Sans template à choisir",
    "landing.marquee.10": "Toujours à jour",

    // Footer
    "footer.tagline": "Profyl · CV en ligne pour candidats francophones ·",
    "footer.handwritten": "fait avec 🤍 à Paris",
    "footer.france": "hébergé en France 🇫🇷",

    // ---------- Pricing ----------
    "pricing.eyebrow": "Pricing",
    "pricing.title_1": "Un plan",
    "pricing.title_em": "simple.",
    "pricing.title_2": "Pas de surprise.",
    "pricing.subtitle":
      "Commence gratuitement. Passe en Pro le jour où ton CV mérite ton propre domaine. Annule quand tu veux.",
    "pricing.reassurance.trial": "14 jours d'essai Pro",
    "pricing.reassurance.no_card": "Sans carte bancaire",
    "pricing.reassurance.cancel": "Annulation en un clic",

    "pricing.free.name": "Free",
    "pricing.free.tagline": "Pour commencer, tout simplement.",
    "pricing.free.cta": "Créer mon Profyl",
    "pricing.pro.name": "Pro",
    "pricing.pro.tagline": "Quand ton CV doit faire le job à ta place.",
    "pricing.pro.cta": "Passer en Pro",
    "pricing.pro.recommended": "Recommandé",
    "pricing.price.per_month": "/mois",
    "pricing.price.or_annual": "ou {price}/an (−16%)",

    "pricing.comparison.eyebrow": "Détail",
    "pricing.comparison.title": "Le comparatif",
    "pricing.comparison.col_limits": "Limites",

    "pricing.faq.eyebrow": "FAQ",
    "pricing.faq.title_1": "Questions",
    "pricing.faq.title_em": "fréquentes.",

    "pricing.cta_final.title_1": "Prêt à",
    "pricing.cta_final.title_em": "claim ton lien",
    "pricing.cta_final.title_2": "?",
    "pricing.cta_final.text":
      "Commence en Free. Tu passes en Pro le jour où le domaine perso devient une évidence.",
    "pricing.cta_final.button": "Créer mon Profyl gratuitement",

    // Free plan features
    "pricing.free.feature.1": "Page profyl.io/<ton-nom>",
    "pricing.free.feature.2": "9 blocs : photo, expériences, projets, langues...",
    "pricing.free.feature.3": "QR code partageable",
    "pricing.free.feature.4": "6 expériences · 4 formations · 6 projets",
    "pricing.free.feature.5": "Modifications illimitées à vie",
    "pricing.free.feature.6": "Hébergé en France 🇫🇷",
    "pricing.free.notincluded.1": "Petit watermark Profyl en bas de page",
    "pricing.free.notincluded.2": "Limites de sections sur Free",

    // Pro plan features
    "pricing.pro.feature.1": "Tout de Free, plus :",
    "pricing.pro.feature.2": "Connecte ton domaine perso (jean-dupont.fr)",
    "pricing.pro.feature.3": "Export PDF print-ready A4",
    "pricing.pro.feature.4": "Aucun watermark",
    "pricing.pro.feature.5": "Sections illimitées",
    "pricing.pro.feature.6": "Plusieurs profils (FR/EN, dev/manager...)",
    "pricing.pro.feature.7": "Bloc vidéo intro (Loom / YouTube)",
    "pricing.pro.feature.8": "Image OG personnalisée pour LinkedIn",
    "pricing.pro.feature.9": "Support email prioritaire",

    // Comparison table rows
    "pricing.row.experiences": "Expériences",
    "pricing.row.education": "Formations",
    "pricing.row.projects": "Projets",
    "pricing.row.skills": "Compétences",
    "pricing.row.domain": "Domaine perso connecté",
    "pricing.row.multi": "Profils multiples",
    "pricing.row.pdf": "Export PDF",
    "pricing.row.watermark": "Sans watermark",
    "pricing.row.video": "Bloc vidéo intro",
    "pricing.row.og": "Image OG personnalisée",
    "pricing.row.support": "Support email",
    "pricing.row.value.unlimited": "Illimité",
    "pricing.row.value.community": "Communautaire",
    "pricing.row.value.priority": "Prioritaire",
    "pricing.row.value.dash": "—",
    "pricing.row.value.up_to_5": "Jusqu'à 5",

    // FAQ
    "pricing.faq.q1": "Combien de temps pour publier ma page ?",
    "pricing.faq.a1":
      "10 minutes. Tu remplis 9 blocs guidés, on s'occupe du design. Tu peux modifier à vie.",
    "pricing.faq.q2": "Comment marche le domaine custom ?",
    "pricing.faq.a2":
      "Tu achètes ton domaine (jean-dupont.fr ou autre) chez Gandi, OVH, Namecheap... pour environ 10 €/an. Dans Profyl tu colles le nom, on te donne les enregistrements DNS à configurer chez ton registrar (un simple CNAME). Ta page Profyl devient accessible sur ton domaine en 1 à 24h. Si le domaine est déjà pris, on te suggère des alternatives proches (autres extensions, sans tirets, etc).",
    "pricing.faq.q3": "Et si mon nom de domaine est pris ?",
    "pricing.faq.a3":
      "C'est fréquent : il y a 4 Jean Dupont sur LinkedIn 😅. On t'aide à trouver une alternative — autre extension (.com, .pro, .dev), sans tiret (jeandupont.fr), avec un mot ajouté (jeandupont-design.fr). Ou tu peux rester sur profyl.io/jean-dupont, ça marche très bien.",
    "pricing.faq.q4": "Plusieurs profils, ça sert à quoi ?",
    "pricing.faq.a4":
      "Pratique si tu as 2 casquettes : un profil dev en anglais (profyl.io/jean-dev), un autre management en français (profyl.io/jean-manager), un troisième pour ton activité de freelance. Tu ne payes qu'une fois 5 €/mois.",
    "pricing.faq.q5": "Je peux annuler mon abonnement quand ?",
    "pricing.faq.a5":
      "Quand tu veux, en un clic depuis ton compte. Pas de durée d'engagement. Tu repasses en Free, ton profil reste en ligne (juste plafonné aux limites Free).",
    "pricing.faq.q6": "Mes données sont en France ?",
    "pricing.faq.a6":
      "Oui. Tout est hébergé à Frankfurt (Vercel + Supabase) sous régime RGPD européen. Aucun transfert US.",
    "pricing.faq.q7": "L'export PDF, ça donne quoi ?",
    "pricing.faq.a7":
      "Un PDF A4 print-ready, typo soignée, photo Hero respectée. Parfait à joindre à une candidature qui exige encore le CV PDF.",
    "pricing.faq.q8": "Y a-t-il une remise pour les écoles / bootcamps ?",
    "pricing.faq.a8":
      "Oui. Si tu es à l'École 42, Le Wagon, OpenClassrooms ou équivalent, écris-nous : −75% sur la première année Pro.",

    // ---------- Login ----------
    "login.eyebrow": "Connexion",
    "login.title_1": "Ton CV en ligne,",
    "login.title_em": "en un email.",
    "login.subtitle":
      "On t'envoie un lien magique. Pas de mot de passe à retenir, pas de compte à créer.",
    "login.email_label": "Adresse email",
    "login.email_placeholder": "jean.dupont@email.com",
    "login.button": "M'envoyer un lien magique",
    "login.button_loading": "Envoi en cours...",
    "login.sent":
      "✓ Email envoyé. Ouvre ta boîte mail et clique sur le lien pour te connecter.",
    "login.error.send":
      "Impossible d'envoyer le lien. Vérifie ton email et réessaie.",
    "login.error.callback": "Lien expiré ou invalide. Réessaie.",
    "login.error.generic": "Erreur de connexion. Réessaie.",
    "login.legal_1": "En te connectant, tu acceptes nos conditions d'utilisation.",
    "login.legal_2": "Tes données sont hébergées en France 🇫🇷."
  },

  // ============================================
  // ENGLISH
  // ============================================
  en: {
    // ---------- Common ----------
    "common.cta.create": "Create my profile",
    "common.cta.continue": "Continue my profile",
    "common.cta.example": "Example",
    "common.cta.pricing": "Pricing",
    "common.cta.signout": "Sign out",
    "common.cta.signout_with": "Sign out ({email})",
    "common.theme.light": "Light mode",
    "common.theme.dark": "Dark mode",

    // ---------- Landing ----------
    "landing.eyebrow": "New · the French CV, reinvented",
    "landing.title_1": "Your CV deserves",
    "landing.title_em_1": "better",
    "landing.title_2": "than a",
    "landing.title_em_2": "PDF.",
    "landing.subtitle":
      "A real professional web page, always up to date, shareable with one link.",
    "landing.subtitle_handwritten": "No template. No friction.",
    "landing.cta.primary": "Create my page",
    "landing.cta.secondary": "See live example",
    "landing.proof": "230+ candidates signed up this week",
    "landing.sticker.france": "Made for France",
    "landing.sticker.free": "100% free",
    "landing.sticker.live": "Live page, scrollable ↓",
    "landing.embed.caption": "↑ A real Profyl page.",
    "landing.embed.help": "Scroll inside to see Marie's full profile.",

    "landing.wall.eyebrow": "A growing family",
    "landing.wall.title_1": "Real candidates,",
    "landing.wall.title_em": "not templates.",
    "landing.wall.description":
      "Every Profyl is unique because every career is. Here are a few pages — real, alive, shareable.",
    "landing.wall.handwritten": "↑ The next could be yours.",
    "landing.wall.see": "View",

    "landing.steps.eyebrow": "How it works",
    "landing.steps.title_1": "Three steps.",
    "landing.steps.title_em": "That's it.",
    "landing.steps.1.title": "Claim your username",
    "landing.steps.1.text":
      "Type your name, check it's available, get a magic link. 30 seconds.",
    "landing.steps.2.title": "Fill 9 blocks",
    "landing.steps.2.text":
      "Photo, experiences, projects, languages. You fill — Profyl handles the design.",
    "landing.steps.3.title": "Share your link",
    "landing.steps.3.text":
      "profyl.io/your-name + QR code. On LinkedIn, your resume, your email signature.",

    "landing.cta_final.sticker": "Get started",
    "landing.cta_final.title_1": "Your best pro link,",
    "landing.cta_final.title_em": "in less than 10 minutes.",
    "landing.cta_final.text_1": "Get inspired by",
    "landing.cta_final.text_2": "or dive right in.",
    "landing.cta_final.button": "Create my Profyl",
    "landing.cta_final.disclaimer":
      "No credit card · custom domain coming soon · 100% French GDPR",

    "landing.marquee.1": "Made for France 🇫🇷",
    "landing.marquee.2": "100% free",
    "landing.marquee.3": "Ready in 10 min",
    "landing.marquee.4": "Native QR code",
    "landing.marquee.5": "Vercel ISR",
    "landing.marquee.6": "Hero photo required",
    "landing.marquee.7": "French-first vocabulary",
    "landing.marquee.8": "Mobile-first",
    "landing.marquee.9": "No template to pick",
    "landing.marquee.10": "Always up to date",

    "footer.tagline": "Profyl · Online resume for French-speaking candidates ·",
    "footer.handwritten": "made with 🤍 in Paris",
    "footer.france": "hosted in France 🇫🇷",

    // ---------- Pricing ----------
    "pricing.eyebrow": "Pricing",
    "pricing.title_1": "A",
    "pricing.title_em": "simple",
    "pricing.title_2": "plan. No surprise.",
    "pricing.subtitle":
      "Start free. Switch to Pro the day your CV deserves its own domain. Cancel any time.",
    "pricing.reassurance.trial": "14-day Pro trial",
    "pricing.reassurance.no_card": "No credit card required",
    "pricing.reassurance.cancel": "One-click cancellation",

    "pricing.free.name": "Free",
    "pricing.free.tagline": "To get started, simply.",
    "pricing.free.cta": "Create my Profyl",
    "pricing.pro.name": "Pro",
    "pricing.pro.tagline": "When your CV must do the work for you.",
    "pricing.pro.cta": "Go Pro",
    "pricing.pro.recommended": "Recommended",
    "pricing.price.per_month": "/month",
    "pricing.price.or_annual": "or {price}/year (−16%)",

    "pricing.comparison.eyebrow": "Details",
    "pricing.comparison.title": "The breakdown",
    "pricing.comparison.col_limits": "Limits",

    "pricing.faq.eyebrow": "FAQ",
    "pricing.faq.title_1": "Frequently",
    "pricing.faq.title_em": "asked.",

    "pricing.cta_final.title_1": "Ready to",
    "pricing.cta_final.title_em": "claim your link",
    "pricing.cta_final.title_2": "?",
    "pricing.cta_final.text":
      "Start free. Upgrade to Pro when a custom domain feels obvious.",
    "pricing.cta_final.button": "Create my Profyl for free",

    // Free plan features
    "pricing.free.feature.1": "profyl.io/<your-name> page",
    "pricing.free.feature.2": "9 blocks: photo, experiences, projects, languages...",
    "pricing.free.feature.3": "Shareable QR code",
    "pricing.free.feature.4": "6 experiences · 4 educations · 6 projects",
    "pricing.free.feature.5": "Unlimited edits forever",
    "pricing.free.feature.6": "Hosted in France 🇫🇷",
    "pricing.free.notincluded.1": "Small Profyl watermark at the bottom",
    "pricing.free.notincluded.2": "Section caps on Free",

    // Pro plan features
    "pricing.pro.feature.1": "Everything in Free, plus:",
    "pricing.pro.feature.2": "Connect your own domain (jean-dupont.fr)",
    "pricing.pro.feature.3": "Print-ready A4 PDF export",
    "pricing.pro.feature.4": "No watermark",
    "pricing.pro.feature.5": "Unlimited sections",
    "pricing.pro.feature.6": "Multiple profiles (FR/EN, dev/manager...)",
    "pricing.pro.feature.7": "Intro video block (Loom / YouTube)",
    "pricing.pro.feature.8": "Custom OG image for LinkedIn",
    "pricing.pro.feature.9": "Priority email support",

    // Comparison table rows
    "pricing.row.experiences": "Experiences",
    "pricing.row.education": "Educations",
    "pricing.row.projects": "Projects",
    "pricing.row.skills": "Skills",
    "pricing.row.domain": "Custom domain connected",
    "pricing.row.multi": "Multiple profiles",
    "pricing.row.pdf": "PDF export",
    "pricing.row.watermark": "No watermark",
    "pricing.row.video": "Intro video block",
    "pricing.row.og": "Custom OG image",
    "pricing.row.support": "Email support",
    "pricing.row.value.unlimited": "Unlimited",
    "pricing.row.value.community": "Community",
    "pricing.row.value.priority": "Priority",
    "pricing.row.value.dash": "—",
    "pricing.row.value.up_to_5": "Up to 5",

    // FAQ
    "pricing.faq.q1": "How long to publish my page?",
    "pricing.faq.a1":
      "10 minutes. You fill 9 guided blocks, we handle the design. You can edit forever.",
    "pricing.faq.q2": "How does the custom domain work?",
    "pricing.faq.a2":
      "You buy your domain (jean-dupont.fr or whatever) at Gandi, OVH, Namecheap... for around 10 €/year. In Profyl you paste the name, we give you the DNS records to configure at your registrar (a simple CNAME). Your Profyl page becomes accessible on your domain within 1-24h. If the domain is taken, we suggest close alternatives (other extensions, without dashes, etc).",
    "pricing.faq.q3": "What if my domain name is taken?",
    "pricing.faq.a3":
      "It happens often — there are 4 Jean Dupont on LinkedIn 😅. We help you find an alternative — different extension (.com, .pro, .dev), without dashes (jeandupont.fr), with an added word (jeandupont-design.fr). Or you can stick with profyl.io/jean-dupont, it works great.",
    "pricing.faq.q4": "What are multiple profiles for?",
    "pricing.faq.a4":
      "Handy if you wear two hats: an English dev profile (profyl.io/jean-dev), a French management one (profyl.io/jean-manager), a third for your freelance work. You only pay 5 €/month once.",
    "pricing.faq.q5": "When can I cancel my subscription?",
    "pricing.faq.a5":
      "Whenever, one click from your account. No commitment period. You go back to Free, your profile stays online (just capped to Free limits).",
    "pricing.faq.q6": "Is my data in France?",
    "pricing.faq.a6":
      "Yes. Everything hosted in Frankfurt (Vercel + Supabase) under European GDPR. No US transfer.",
    "pricing.faq.q7": "What's the PDF export like?",
    "pricing.faq.a7":
      "A print-ready A4 PDF, clean typography, Hero photo preserved. Perfect to attach to an application that still requires a PDF resume.",
    "pricing.faq.q8": "Is there a discount for schools / bootcamps?",
    "pricing.faq.a8":
      "Yes. If you're at École 42, Le Wagon, OpenClassrooms or equivalent, write to us: −75% on the first Pro year.",

    // ---------- Login ----------
    "login.eyebrow": "Sign in",
    "login.title_1": "Your CV online,",
    "login.title_em": "in one email.",
    "login.subtitle":
      "We send you a magic link. No password to remember, no account to create.",
    "login.email_label": "Email address",
    "login.email_placeholder": "jane.smith@email.com",
    "login.button": "Send me a magic link",
    "login.button_loading": "Sending...",
    "login.sent": "✓ Email sent. Open your inbox and click the link to sign in.",
    "login.error.send": "Failed to send the link. Check your email and try again.",
    "login.error.callback": "Link expired or invalid. Try again.",
    "login.error.generic": "Sign-in error. Try again.",
    "login.legal_1": "By signing in, you accept our terms of service.",
    "login.legal_2": "Your data is hosted in France 🇫🇷."
  }
};

/**
 * Lookup avec interpolation simple `{key}` et fallback FR si la clé
 * n'existe pas dans la locale demandée.
 */
export function translate(
  locale: Locale,
  key: string,
  vars?: Record<string, string | number>
): string {
  const dict = TRANSLATIONS[locale] ?? TRANSLATIONS.fr;
  let value = dict[key] ?? TRANSLATIONS.fr[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      value = value.replace(new RegExp(`\\{${k}\\}`, "g"), String(v));
    }
  }
  return value;
}
