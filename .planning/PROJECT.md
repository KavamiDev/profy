# Profyl

## What This Is

Profyl est un SaaS qui remplace le CV papier : chaque candidat claim un username et obtient son site CV en ligne (`profyl.io/jean-dupont`), toujours beau, toujours à jour, partageable par lien ou QR code. Cible v1 : candidats francophones (France d'abord). Builder no-code opinionné avec 9 blocs fixes — le candidat remplit, le résultat est forcément beau.

## Core Value

Un candidat doit pouvoir, en moins de 10 minutes, créer un profil professionnel publiquement accessible à `profyl.io/<son-username>` et le partager à un recruteur — sans choix de template, sans customisation, sans friction.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. -->

(None yet — ship to validate)

### Active

<!-- Slice ultra-mince v0 : Free uniquement. Tout est hypothèse jusqu'à validation post-launch. -->

- [ ] Landing page avec claim username (input + check disponibilité temps réel)
- [ ] Réservation username : premier arrivé, premier servi + blacklist (~200 noms réservés : routes système, marques, mots vulgaires)
- [ ] Auth magic link (email seul) via Supabase
- [ ] Éditeur no-code avec les 9 blocs et preview temps réel
  - Hero (photo obligatoire FR, nom, titre, localisation)
  - Liens sociaux (LinkedIn, GitHub, Portfolio…)
  - À propos (3-4 lignes max)
  - Expériences (timeline : poste / boîte / durée)
  - Formation (format compact)
  - Compétences (tags par catégorie)
  - Projets (card : image, titre, lien, description)
  - Langues + Certifications
  - Contact / CTA (email, téléphone, bouton contact)
- [ ] Upload photo Hero (Supabase Storage)
- [ ] Page publique `profyl.io/<username>` en ISR (SEO + OG tags + mobile-first)
- [ ] QR code basique généré côté client, affiché sur le profil (gratuit pour tous en v0)
- [ ] Vocabulaire français partout (UI + blocs)

### Out of Scope

<!-- Explicit boundaries. Includes reasoning to prevent re-adding. -->

- **Tier Pro + Stripe** — Le v0 valide l'usage avant de monétiser. Pro arrive en v1.
- **Analytics (qui a scanné, quand)** — Feature Pro, hors slice ultra-mince.
- **Domaine custom** — Multi-tenant DNS = 2-3 semaines de dev à lui seul. Pro v1+.
- **Export PDF (CV ATS)** — Très désirable mais hors slice v0. À reprioriser v0.5 si validation positive — c'est le killer differentiator du vertical CV.
- **Import LinkedIn** — Énorme accélérateur d'adoption, mais hors v0. À reprioriser v0.5.
- **QR code HD téléchargeable** — Feature Pro. Le QR côté client suffit en v0.
- **Choix de template / customisation visuelle** — Décision produit forte : "pas de customisation infinie, une seule direction impeccable" différencie de own.page.
- **Mobile app native** — Web-first, mobile responsive uniquement.
- **OAuth (Google/LinkedIn login)** — Magic link suffit en v0.
- **Vérification d'identité du username** — Premier servi + blacklist suffit. Anti-squatting plus poussé = post-launch si problème observé.

## Context

- **Marché** : France/francophone d'abord. Le marché du recrutement français demande encore PDF + photo CV (norme culturelle, contraire aux anglo). Le vocabulaire doit être 100% français ("Expériences", "Formation", "Compétences" — pas "Skills").
- **Concurrence** : own.page (link-in-bio générique, anglo) — Profyl se positionne vertical CV/recrutement, pas link-in-bio. Read.cv, Stand.earth dans le même espace mais pas spécialisés FR.
- **Comportement utilisateur attendu** : un candidat installe son Profyl une fois (10 min), le met à jour quelques fois par an, partage le lien ou le QR à des recruteurs. Les pages profils sont vues majoritairement sur mobile.
- **Contrainte perf** : pages profils publiques doivent charger en < 1s (un recruteur n'attend pas). Pousse vers ISR / pages statiques régénérées.
- **SEO** : `profyl.io/<nom-candidat>` doit ranker pour les recherches de recruteurs sur le nom du candidat.
- **Le développeur** travaille déjà sur MIA (projet séparé). Solo, parle français.

## Constraints

- **Tech stack**: Next.js 15 App Router + Supabase (Postgres + Auth magic link + Storage) + Vercel + Tailwind + shadcn/ui — Choix verrouillé pour vélocité solo, ISR natif pour pages profils, gestion domaines custom future via Vercel, RLS Supabase pour sécurité multi-tenant.
- **Data model**: JSON blob (`content jsonb`) pour les 9 blocs — Souple, rapide à itérer, parfait pour un builder où les blocs évoluent. Pas de query cross-profils nécessaire en v0.
- **Langue UI**: Français obligatoire — Marché FR ciblé.
- **Photo Hero**: Obligatoire dans le bloc Hero — Norme culturelle française du CV.
- **Render strategy**: ISR (Incremental Static Regeneration) pour les pages publiques — SEO + perf mobile critiques.
- **Hosting**: Vercel — Domaines custom natifs (futur Pro), ISR natif Next.js.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Slice ultra-mince v0 (Free seul, pas de Pro) | Valider l'usage "claim + share" avant de monétiser. Profyl vit ou meurt sur cette boucle. | — Pending |
| Vertical CV/recrutement vs link-in-bio générique | Différenciation claire vs own.page. Permet de spécialiser les blocs (Expériences/Formation/Compétences finement pensés) et d'ajouter killer features futures (export PDF ATS, import LinkedIn). | — Pending |
| Marché FR d'abord | Localisation parfaite (vocabulaire, photo Hero norme FR), moins de concurrence directe, taille de marché suffisante pour valider. | — Pending |
| Stack Next.js + Supabase + Vercel | Vélocité solo maximale, ISR natif, magic link out-of-the-box, RLS pour multi-tenant, domaines custom future via Vercel. | — Pending |
| JSON blob (`content jsonb`) vs tables relationnelles | Souplesse d'itération du builder, pas de besoin de query cross-profils en v0. | — Pending |
| Username : premier servi + blacklist (~200 noms) | Simple comme own.page, mais bloque squatting de routes système, marques, mots vulgaires dès le départ. | — Pending |
| QR code basique gratuit pour tous en v0 | Wow factor pour 0 effort (lib JS côté client). QR HD téléchargeable réservé au Pro v1+. | — Pending |
| Pas de choix de template / customisation | Décision produit identitaire — "une seule direction impeccable" est ce qui différencie de own.page et garantit que le résultat est toujours beau. | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-27 after initialization*
