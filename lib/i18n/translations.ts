import type { Locale } from "./locales";

/**
 * Dictionnaire central de toutes les strings UI traduites.
 *
 * Convention de clés : `<page>.<section>.<role>`
 *
 * IMPORTANT — Cohérence culturelle EN vs FR :
 * - FR cible le marché français → photo CV obligatoire, "made in France",
 *   vocabulaire FR strict (RGPD France, candidat·e francophone).
 * - EN cible les francophones expats + non-FR qui visent le marché FR.
 *   Pas de "Made for France" aux US — remplacé par "Built in Europe".
 *   "CV" → "Resume" (US) ou "CV" (UK) — on prend "Resume" comme défaut.
 *   On garde "Hosted in France 🇫🇷" car la souveraineté donnée = +
 *   pour TOUS les users européens.
 *
 * Si une clé n'a pas de traduction EN, le hook useT() retombe sur FR.
 */

type Dictionary = Record<string, string>;

export const TRANSLATIONS: Record<Locale, Dictionary> = {
  // ============================================
  // FRANÇAIS
  // ============================================
  fr: {
    // ---------- Common ----------
    "common.cta.create": "Créer mon profil",
    "common.cta.continue": "Continuer mon profil",
    "common.cta.example": "Exemple",
    "common.cta.pricing": "Pricing",
    "common.cta.signout": "Se déconnecter",
    "common.cta.back": "← Retour",
    "common.theme.light": "Mode clair",
    "common.theme.dark": "Mode sombre",
    "common.confirm.delete": "Supprimer cet élément ?",

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
    "landing.embed.help": "Scrolle dedans pour voir l'ensemble du profil de Marie.",

    "landing.wall.eyebrow": "Une famille qui s'agrandit",
    "landing.wall.title_1": "Des candidats,",
    "landing.wall.title_em": "pas des templates.",
    "landing.wall.description":
      "Chaque Profyl est unique parce que chaque parcours l'est. Voici quelques pages — réelles, vivantes, partageables.",
    "landing.wall.handwritten": "↑ Le prochain pourrait être le tien.",
    "landing.wall.see": "Voir",

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

    "landing.cta_final.sticker": "Lance-toi",
    "landing.cta_final.title_1": "Ton meilleur lien pro,",
    "landing.cta_final.title_em": "en moins de 10 minutes.",
    "landing.cta_final.text_1": "Inspire-toi de",
    "landing.cta_final.text_2": "ou plonge tête baissée.",
    "landing.cta_final.button": "Créer mon Profyl",
    "landing.cta_final.disclaimer":
      "Pas de carte bancaire · domaine custom bientôt · 100% RGPD France",

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

    "pricing.free.feature.1": "Page profyl.io/<ton-nom>",
    "pricing.free.feature.2": "9 blocs : photo, expériences, projets, langues...",
    "pricing.free.feature.3": "QR code partageable",
    "pricing.free.feature.4": "6 expériences · 4 formations · 6 projets",
    "pricing.free.feature.5": "Modifications illimitées à vie",
    "pricing.free.feature.6": "Hébergé en France 🇫🇷",
    "pricing.free.notincluded.1": "Petit watermark Profyl en bas de page",
    "pricing.free.notincluded.2": "Limites de sections sur Free",

    "pricing.pro.feature.1": "Tout de Free, plus :",
    "pricing.pro.feature.2": "Connecte ton domaine perso (jean-dupont.fr)",
    "pricing.pro.feature.3": "Export PDF print-ready A4",
    "pricing.pro.feature.4": "Aucun watermark",
    "pricing.pro.feature.5": "Sections illimitées",
    "pricing.pro.feature.6": "Plusieurs profils (FR/EN, dev/manager...)",
    "pricing.pro.feature.7": "Bloc vidéo intro (Loom / YouTube)",
    "pricing.pro.feature.8": "Image OG personnalisée pour LinkedIn",
    "pricing.pro.feature.9": "Support email prioritaire",

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
    "login.sent": "✓ Email envoyé. Ouvre ta boîte mail et clique sur le lien pour te connecter.",
    "login.error.send": "Impossible d'envoyer le lien. Vérifie ton email et réessaie.",
    "login.error.callback": "Lien expiré ou invalide. Réessaie.",
    "login.error.generic": "Erreur de connexion. Réessaie.",
    "login.legal_1": "En te connectant, tu acceptes nos conditions d'utilisation.",
    "login.legal_2": "Tes données sont hébergées en France 🇫🇷.",

    // ---------- Dashboard editor ----------
    "dashboard.publish": "Publier",
    "dashboard.preview_mobile": "Aperçu",
    "dashboard.preview_live": "Aperçu live",
    "dashboard.see_example": "Exemple",
    "dashboard.see_page": "Voir la page",
    "dashboard.saved":
      "✓ Profil publié avec succès — visite {url}",
    "dashboard.draft_restored":
      "📝 Brouillon récupéré automatiquement — on a restauré ce que tu avais commencé à remplir.",
    "dashboard.error.username_reserve": "Ce username est réservé.",
    "dashboard.error.username_invalide":
      "Username invalide (3–30 caractères, minuscules, chiffres, tirets).",
    "dashboard.error.username_pris": "Ce username est déjà pris. Choisis-en un autre.",
    "dashboard.error.contenu_invalide": "Vérifie le nom, le titre, la photo et les liens URL.",
    "dashboard.error.generic": "Erreur lors de la sauvegarde.",
    "dashboard.error.content_hint":
      "Vérifie surtout : nom complet, titre professionnel et photo Hero qui sont obligatoires.",
    "dashboard.error.reassurance": "Tes données sont sauvegardées — tu n'as rien perdu.",

    // Sections
    "dashboard.section.address.title": "Ton adresse Profyl",
    "dashboard.section.address.desc": "Choisis l'URL que tu partageras aux recruteurs.",
    "dashboard.section.identity.title": "Identité",
    "dashboard.section.identity.desc": "La photo est obligatoire sur un CV français.",
    "dashboard.section.contact.title": "Contact",
    "dashboard.section.skills.title": "Compétences",
    "dashboard.section.skills.desc": "Sépare par des virgules.",
    "dashboard.section.experiences.title": "Expériences",
    "dashboard.section.experiences.desc": "Du plus récent au plus ancien.",
    "dashboard.section.education.title": "Formations",
    "dashboard.section.projects.title": "Projets",
    "dashboard.section.languages.title": "Langues",
    "dashboard.section.extras.title": "En plus",

    // Field labels
    "dashboard.field.username": "Username",
    "dashboard.field.username.placeholder": "jean-dupont",
    "dashboard.field.fullname": "Nom complet",
    "dashboard.field.fullname.placeholder": "Jean Dupont",
    "dashboard.field.title": "Titre professionnel",
    "dashboard.field.title.placeholder": "Product Designer",
    "dashboard.field.city": "Ville",
    "dashboard.field.city.placeholder": "Paris, France",
    "dashboard.field.photo": "Photo Hero",
    "dashboard.field.summary": "Résumé",
    "dashboard.field.summary.placeholder":
      "Quelques lignes sur ton parcours et ce que tu recherches...",
    "dashboard.field.email": "Email",
    "dashboard.field.email.placeholder": "jean@email.com",
    "dashboard.field.phone": "Téléphone",
    "dashboard.field.phone.placeholder": "+33 6 12 34 56 78",
    "dashboard.field.website": "Site web",
    "dashboard.field.website.placeholder": "https://monsite.fr",
    "dashboard.field.linkedin": "LinkedIn",
    "dashboard.field.skills_core": "Compétences clés",
    "dashboard.field.skills_core.placeholder": "UX Research, Figma, Prototypage",
    "dashboard.field.skills_tools": "Outils",
    "dashboard.field.skills_tools.placeholder": "Notion, Jira, Webflow",
    "dashboard.field.company": "Entreprise",
    "dashboard.field.role": "Poste",
    "dashboard.field.start": "Début",
    "dashboard.field.end": "Fin",
    "dashboard.field.end.placeholder": "2025 ou Aujourd'hui",
    "dashboard.field.description": "Description",
    "dashboard.field.school": "École",
    "dashboard.field.degree": "Diplôme",
    "dashboard.field.project_name": "Nom",
    "dashboard.field.project_link": "Lien",
    "dashboard.field.language": "Langue",
    "dashboard.field.language.placeholder": "Anglais",
    "dashboard.field.language_level": "Niveau",
    "dashboard.field.language_level.placeholder": "C1 / Courant",
    "dashboard.field.certifications": "Certifications",
    "dashboard.field.certifications.placeholder": "AWS, Google UX, PSPO",
    "dashboard.field.interests": "Centres d'intérêt",
    "dashboard.field.interests.placeholder": "Randonnée, Photographie",

    // Repeatable section
    "dashboard.add.experience": "Ajouter une expérience",
    "dashboard.add.education": "Ajouter une formation",
    "dashboard.add.project": "Ajouter un projet",
    "dashboard.add.language": "Ajouter une langue",
    "dashboard.empty.experience": "Aucune expérience pour l'instant",
    "dashboard.empty.education": "Aucune formation pour l'instant",
    "dashboard.empty.project": "Aucun projet pour l'instant",
    "dashboard.empty.language": "Aucune langue pour l'instant",
    "dashboard.repeat.new_experience": "Nouvelle expérience",
    "dashboard.repeat.new_education": "Nouvelle formation",
    "dashboard.repeat.new_project": "Nouveau projet",
    "dashboard.repeat.new_language": "Nouvelle langue",
    "dashboard.repeat.delete": "Supprimer",
    "dashboard.limit.reached":
      "Limite Free atteinte ({limit}). Passe en Pro pour ajouter plus.",
    "dashboard.limit.upgrade_link": "Passe en Pro",

    // Avatar uploader
    "dashboard.upload.error_format": "Format non supporté. Utilise JPEG, PNG ou WebP.",
    "dashboard.upload.error_size": "Image trop lourde (max {max} Mo).",
    "dashboard.upload.error_failed": "Échec de l'upload. Réessaie.",
    "dashboard.upload.busy": "Compression et upload...",
    "dashboard.upload.change": "Changer la photo",
    "dashboard.upload.drop": "Glisse une photo ou clique",
    "dashboard.upload.hint": "JPEG · PNG · WebP · max {max} Mo",
    "dashboard.upload.hint2": "Compressée automatiquement à 500 Ko / 1200 px.",
    "dashboard.upload.delete_confirm": "Supprimer la photo ?",
    "dashboard.upload.delete_label": "Supprimer la photo",

    // ---------- Profile view (page publique + preview) ----------
    "profile.section.summary.eyebrow": "À propos",
    "profile.section.summary.title": "En quelques mots",
    "profile.section.skills.eyebrow": "Compétences",
    "profile.section.skills.title": "Ce que je sais faire",
    "profile.section.experiences.eyebrow": "Parcours",
    "profile.section.experiences.title": "Expériences",
    "profile.section.projects.eyebrow": "Réalisations",
    "profile.section.projects.title": "Projets",
    "profile.section.education.eyebrow": "Études",
    "profile.section.education.title": "Formation",
    "profile.section.extras.eyebrow": "En plus",
    "profile.section.extras.title": "Le reste",
    "profile.section.skills.compact": "Compétences",
    "profile.section.experiences.compact": "Expérience",
    "profile.section.education.compact": "Formation",
    "profile.section.projects.compact": "Projets",
    "profile.section.extras.compact": "En plus",
    "profile.label.website": "Site web",
    "profile.label.certifications": "Certifications",
    "profile.label.languages": "Langues",
    "profile.label.interests": "Passions",
    "profile.label.your_name": "Ton nom",
    "profile.placeholder.username": "ton-username",
    "profile.extra.certifications": "Certifications · ",
    "profile.extra.languages": "Langues · ",
    "profile.extra.interests": "Passions · ",

    // ---------- Public profile page header/footer ----------
    "publicpage.cta.create_mine": "Créer le mien",
    "publicpage.share.eyebrow": "Partage cette page",
    "publicpage.share.help":
      "Scanne le QR code pour ouvrir cette page sur un téléphone, ou copie le lien.",
    "publicpage.footer.created_with": "Page créée avec",
    "publicpage.footer.tagline": "· ton CV en ligne, toujours à jour",
    "publicpage.edit": "Modifier"
  },

  // ============================================
  // ENGLISH — Coherent EN copy (not literal FR→EN)
  // ============================================
  en: {
    // ---------- Common ----------
    "common.cta.create": "Create my profile",
    "common.cta.continue": "Continue editing",
    "common.cta.example": "Example",
    "common.cta.pricing": "Pricing",
    "common.cta.signout": "Sign out",
    "common.cta.back": "← Back",
    "common.theme.light": "Light mode",
    "common.theme.dark": "Dark mode",
    "common.confirm.delete": "Delete this item?",

    // ---------- Landing ----------
    "landing.eyebrow": "New · the resume, reinvented",
    "landing.title_1": "Your resume deserves",
    "landing.title_em_1": "better",
    "landing.title_2": "than a",
    "landing.title_em_2": "PDF.",
    "landing.subtitle":
      "A real professional web page, always up to date, shareable with one link.",
    "landing.subtitle_handwritten": "No template. No friction.",
    "landing.cta.primary": "Create my page",
    "landing.cta.secondary": "See live example",
    "landing.proof": "230+ candidates joined this week",
    // Stickers: France→Europe to stay coherent for non-FR audience
    "landing.sticker.france": "Built in Europe 🇪🇺",
    "landing.sticker.free": "100% free",
    "landing.sticker.live": "Live page, scrollable ↓",
    "landing.embed.caption": "↑ A real Profyl page.",
    "landing.embed.help": "Scroll inside to see Marie's full profile.",

    "landing.wall.eyebrow": "A growing community",
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
      "Type your name, check availability, get a magic link. 30 seconds.",
    "landing.steps.2.title": "Fill 9 blocks",
    "landing.steps.2.text":
      "Photo, experience, projects, languages. You fill — Profyl handles the design.",
    "landing.steps.3.title": "Share your link",
    "landing.steps.3.text":
      "profyl.io/your-name + QR code. On LinkedIn, your resume, your email signature.",

    "landing.cta_final.sticker": "Get started",
    "landing.cta_final.title_1": "Your best pro link,",
    "landing.cta_final.title_em": "in less than 10 minutes.",
    "landing.cta_final.text_1": "Take inspiration from",
    "landing.cta_final.text_2": "or jump right in.",
    "landing.cta_final.button": "Create my Profyl",
    "landing.cta_final.disclaimer":
      "No credit card · custom domain coming soon · GDPR-compliant EU hosting",

    // Marquee: EN-friendly items (no FR-specific stuff)
    "landing.marquee.1": "Built in Europe 🇪🇺",
    "landing.marquee.2": "100% free",
    "landing.marquee.3": "Ready in 10 min",
    "landing.marquee.4": "Native QR code",
    "landing.marquee.5": "Live ISR via Vercel",
    "landing.marquee.6": "Photo-friendly design",
    "landing.marquee.7": "Multi-language ready",
    "landing.marquee.8": "Mobile-first",
    "landing.marquee.9": "No template to pick",
    "landing.marquee.10": "Always up to date",

    "footer.tagline": "Profyl · The professional resume page ·",
    "footer.handwritten": "made with 🤍 in Paris",
    "footer.france": "GDPR-compliant EU hosting",

    // ---------- Pricing ----------
    "pricing.eyebrow": "Pricing",
    "pricing.title_1": "A",
    "pricing.title_em": "simple",
    "pricing.title_2": "plan. No surprise.",
    "pricing.subtitle":
      "Start free. Upgrade to Pro the day your resume deserves its own domain. Cancel anytime.",
    "pricing.reassurance.trial": "14-day Pro trial",
    "pricing.reassurance.no_card": "No credit card required",
    "pricing.reassurance.cancel": "One-click cancellation",

    "pricing.free.name": "Free",
    "pricing.free.tagline": "To get started, simply.",
    "pricing.free.cta": "Create my Profyl",
    "pricing.pro.name": "Pro",
    "pricing.pro.tagline": "When your resume must do the work for you.",
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

    "pricing.free.feature.1": "profyl.io/<your-name> page",
    "pricing.free.feature.2": "9 blocks: photo, experience, projects, languages...",
    "pricing.free.feature.3": "Shareable QR code",
    "pricing.free.feature.4": "6 experiences · 4 educations · 6 projects",
    "pricing.free.feature.5": "Unlimited edits forever",
    "pricing.free.feature.6": "GDPR-compliant EU hosting",
    "pricing.free.notincluded.1": "Small Profyl watermark at the bottom",
    "pricing.free.notincluded.2": "Section caps on Free",

    "pricing.pro.feature.1": "Everything in Free, plus:",
    "pricing.pro.feature.2": "Connect your own domain (jane-smith.com)",
    "pricing.pro.feature.3": "Print-ready A4 PDF export",
    "pricing.pro.feature.4": "No watermark",
    "pricing.pro.feature.5": "Unlimited sections",
    "pricing.pro.feature.6": "Multiple profiles (EN/FR, dev/manager...)",
    "pricing.pro.feature.7": "Intro video block (Loom / YouTube)",
    "pricing.pro.feature.8": "Custom OG image for LinkedIn",
    "pricing.pro.feature.9": "Priority email support",

    "pricing.row.experiences": "Experience",
    "pricing.row.education": "Education",
    "pricing.row.projects": "Projects",
    "pricing.row.skills": "Skills",
    "pricing.row.domain": "Custom domain",
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

    "pricing.faq.q1": "How long to publish my page?",
    "pricing.faq.a1":
      "10 minutes. You fill 9 guided blocks, we handle the design. You can edit forever.",
    "pricing.faq.q2": "How does the custom domain work?",
    "pricing.faq.a2":
      "You buy your domain (jane-smith.com or whatever) at Namecheap, Porkbun, Gandi, OVH... for around $10/year. In Profyl you paste the name, we give you the DNS records to configure at your registrar (a simple CNAME). Your Profyl page becomes accessible on your domain within 1-24h. If the domain is taken, we suggest close alternatives (other extensions, without dashes, etc).",
    "pricing.faq.q3": "What if my domain name is taken?",
    "pricing.faq.a3":
      "It happens often — there are 4 Jane Smiths on LinkedIn 😅. We help you find an alternative — different extension (.io, .pro, .dev), without dashes (janesmith.com), with an added word (janesmith-design.com). Or you can stick with profyl.io/jane-smith, it works great.",
    "pricing.faq.q4": "What are multiple profiles for?",
    "pricing.faq.a4":
      "Handy if you wear two hats: an English dev profile (profyl.io/jane-dev), a French management one (profyl.io/jane-manager), a third for your freelance work. You only pay €5/month once.",
    "pricing.faq.q5": "When can I cancel my subscription?",
    "pricing.faq.a5":
      "Whenever, one click from your account. No commitment. You go back to Free, your profile stays online (just capped to Free limits).",
    "pricing.faq.q6": "Where is my data hosted?",
    "pricing.faq.a6":
      "In Europe. Everything hosted in Frankfurt (Vercel + Supabase) under GDPR. No US transfer.",
    "pricing.faq.q7": "What's the PDF export like?",
    "pricing.faq.a7":
      "A print-ready A4 PDF, clean typography, Hero photo preserved. Perfect to attach to applications that still require a PDF resume.",
    "pricing.faq.q8": "Is there a discount for schools / bootcamps?",
    "pricing.faq.a8":
      "Yes. If you're at a coding school, bootcamp or university program, write to us: 75% off the first Pro year.",

    // ---------- Login ----------
    "login.eyebrow": "Sign in",
    "login.title_1": "Your resume online,",
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
    "login.legal_2": "Your data is hosted in the EU 🇪🇺.",

    // ---------- Dashboard editor ----------
    "dashboard.publish": "Publish",
    "dashboard.preview_mobile": "Preview",
    "dashboard.preview_live": "Live preview",
    "dashboard.see_example": "Example",
    "dashboard.see_page": "View page",
    "dashboard.saved": "✓ Profile published — visit {url}",
    "dashboard.draft_restored":
      "📝 Draft auto-recovered — we restored what you had started.",
    "dashboard.error.username_reserve": "This username is reserved.",
    "dashboard.error.username_invalide":
      "Invalid username (3–30 chars, lowercase, digits, dashes).",
    "dashboard.error.username_pris": "This username is already taken. Pick another one.",
    "dashboard.error.contenu_invalide": "Check the name, title, photo and URLs.",
    "dashboard.error.generic": "Save failed.",
    "dashboard.error.content_hint":
      "Especially check: full name, job title and hero photo — they're required.",
    "dashboard.error.reassurance": "Your data is saved — you didn't lose anything.",

    "dashboard.section.address.title": "Your Profyl URL",
    "dashboard.section.address.desc": "Pick the URL you'll share with recruiters.",
    "dashboard.section.identity.title": "Identity",
    "dashboard.section.identity.desc": "Add a profile photo to stand out.",
    "dashboard.section.contact.title": "Contact",
    "dashboard.section.skills.title": "Skills",
    "dashboard.section.skills.desc": "Separate with commas.",
    "dashboard.section.experiences.title": "Experience",
    "dashboard.section.experiences.desc": "Most recent first.",
    "dashboard.section.education.title": "Education",
    "dashboard.section.projects.title": "Projects",
    "dashboard.section.languages.title": "Languages",
    "dashboard.section.extras.title": "Extras",

    "dashboard.field.username": "Username",
    "dashboard.field.username.placeholder": "jane-smith",
    "dashboard.field.fullname": "Full name",
    "dashboard.field.fullname.placeholder": "Jane Smith",
    "dashboard.field.title": "Job title",
    "dashboard.field.title.placeholder": "Product Designer",
    "dashboard.field.city": "City",
    "dashboard.field.city.placeholder": "London, UK",
    "dashboard.field.photo": "Profile photo",
    "dashboard.field.summary": "Bio",
    "dashboard.field.summary.placeholder":
      "A few lines about your background and what you're looking for...",
    "dashboard.field.email": "Email",
    "dashboard.field.email.placeholder": "jane@email.com",
    "dashboard.field.phone": "Phone",
    "dashboard.field.phone.placeholder": "+44 7700 900000",
    "dashboard.field.website": "Website",
    "dashboard.field.website.placeholder": "https://mysite.com",
    "dashboard.field.linkedin": "LinkedIn",
    "dashboard.field.skills_core": "Core skills",
    "dashboard.field.skills_core.placeholder": "UX Research, Figma, Prototyping",
    "dashboard.field.skills_tools": "Tools",
    "dashboard.field.skills_tools.placeholder": "Notion, Jira, Webflow",
    "dashboard.field.company": "Company",
    "dashboard.field.role": "Role",
    "dashboard.field.start": "Start",
    "dashboard.field.end": "End",
    "dashboard.field.end.placeholder": "2025 or Present",
    "dashboard.field.description": "Description",
    "dashboard.field.school": "School",
    "dashboard.field.degree": "Degree",
    "dashboard.field.project_name": "Name",
    "dashboard.field.project_link": "Link",
    "dashboard.field.language": "Language",
    "dashboard.field.language.placeholder": "Spanish",
    "dashboard.field.language_level": "Level",
    "dashboard.field.language_level.placeholder": "C1 / Fluent",
    "dashboard.field.certifications": "Certifications",
    "dashboard.field.certifications.placeholder": "AWS, Google UX, PSPO",
    "dashboard.field.interests": "Interests",
    "dashboard.field.interests.placeholder": "Hiking, Photography",

    "dashboard.add.experience": "Add experience",
    "dashboard.add.education": "Add education",
    "dashboard.add.project": "Add project",
    "dashboard.add.language": "Add language",
    "dashboard.empty.experience": "No experience yet",
    "dashboard.empty.education": "No education yet",
    "dashboard.empty.project": "No project yet",
    "dashboard.empty.language": "No language yet",
    "dashboard.repeat.new_experience": "New experience",
    "dashboard.repeat.new_education": "New education",
    "dashboard.repeat.new_project": "New project",
    "dashboard.repeat.new_language": "New language",
    "dashboard.repeat.delete": "Delete",
    "dashboard.limit.reached": "Free limit reached ({limit}). Go Pro to add more.",
    "dashboard.limit.upgrade_link": "Go Pro",

    "dashboard.upload.error_format": "Format not supported. Use JPEG, PNG or WebP.",
    "dashboard.upload.error_size": "Image too large (max {max} MB).",
    "dashboard.upload.error_failed": "Upload failed. Try again.",
    "dashboard.upload.busy": "Compressing and uploading...",
    "dashboard.upload.change": "Change photo",
    "dashboard.upload.drop": "Drop a photo or click",
    "dashboard.upload.hint": "JPEG · PNG · WebP · max {max} MB",
    "dashboard.upload.hint2": "Auto-compressed to 500 KB / 1200 px.",
    "dashboard.upload.delete_confirm": "Delete the photo?",
    "dashboard.upload.delete_label": "Delete the photo",

    // ---------- Profile view ----------
    "profile.section.summary.eyebrow": "About",
    "profile.section.summary.title": "In a few words",
    "profile.section.skills.eyebrow": "Skills",
    "profile.section.skills.title": "What I can do",
    "profile.section.experiences.eyebrow": "Career",
    "profile.section.experiences.title": "Experience",
    "profile.section.projects.eyebrow": "Work",
    "profile.section.projects.title": "Projects",
    "profile.section.education.eyebrow": "Studies",
    "profile.section.education.title": "Education",
    "profile.section.extras.eyebrow": "More",
    "profile.section.extras.title": "Extras",
    "profile.section.skills.compact": "Skills",
    "profile.section.experiences.compact": "Experience",
    "profile.section.education.compact": "Education",
    "profile.section.projects.compact": "Projects",
    "profile.section.extras.compact": "More",
    "profile.label.website": "Website",
    "profile.label.certifications": "Certifications",
    "profile.label.languages": "Languages",
    "profile.label.interests": "Interests",
    "profile.label.your_name": "Your name",
    "profile.placeholder.username": "your-username",
    "profile.extra.certifications": "Certifications · ",
    "profile.extra.languages": "Languages · ",
    "profile.extra.interests": "Interests · ",

    // ---------- Public profile page header/footer ----------
    "publicpage.cta.create_mine": "Create mine",
    "publicpage.share.eyebrow": "Share this page",
    "publicpage.share.help":
      "Scan the QR code to open this page on a phone, or copy the link.",
    "publicpage.footer.created_with": "Page made with",
    "publicpage.footer.tagline": "· your online resume, always up to date",
    "publicpage.edit": "Edit"
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
