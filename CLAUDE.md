<!-- GSD:project-start source:PROJECT.md -->
## Project

**Profyl**

Profyl est un SaaS qui remplace le CV papier : chaque candidat claim un username et obtient son site CV en ligne (`profyl.io/jean-dupont`), toujours beau, toujours à jour, partageable par lien ou QR code. Cible v1 : candidats francophones (France d'abord). Builder no-code opinionné avec 9 blocs fixes — le candidat remplit, le résultat est forcément beau.

**Core Value:** Un candidat doit pouvoir, en moins de 10 minutes, créer un profil professionnel publiquement accessible à `profyl.io/<son-username>` et le partager à un recruteur — sans choix de template, sans customisation, sans friction.

### Constraints

- **Tech stack**: Next.js 16.2+ App Router + React 19.2 + Supabase (Postgres + `@supabase/ssr` Auth magic link + Storage, région EU Frankfurt/Paris) + Vercel + Tailwind v4 + shadcn — Choix verrouillé pour vélocité solo, ISR natif pour pages profils, gestion domaines custom future via Vercel, RLS Supabase pour sécurité multi-tenant. **Ne PAS utiliser `@supabase/auth-helpers-nextjs` (déprécié).**
- **Data model**: JSON blob (`content jsonb`) pour les 9 blocs — Souple, rapide à itérer, parfait pour un builder où les blocs évoluent. Pas de query cross-profils nécessaire en v0.
- **Langue UI**: Français obligatoire — Marché FR ciblé.
- **Photo Hero**: Obligatoire dans le bloc Hero — Norme culturelle française du CV.
- **Render strategy**: ISR (Incremental Static Regeneration) pour les pages publiques — SEO + perf mobile critiques.
- **Hosting**: Vercel — Domaines custom natifs (futur Pro), ISR natif Next.js.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## TL;DR — Décision Critique avant le Roadmap
## Recommended Stack
### Core Technologies
| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| **Next.js** | `16.2.6` (latest) ou `15.5.18` (si user lock à 15) | Framework full-stack, App Router, ISR pour pages profils publiques | ISR natif (`export const revalidate = N` + `generateStaticParams`) est exactement le pattern requis pour `profyl.io/<username>`. Turbopack par défaut en v16. React 19.2 inclus. Confidence : HIGH |
| **React** | `19.2.6` | UI library | Imposé par Next 16. Stable, Server Components matures, `use()` hook, View Transitions natives utiles pour l'éditeur. Confidence : HIGH |
| **TypeScript** | `5.7+` (recommandé `5.9.x`) | Type safety | Zod v4 nécessite TS 5.5+, RHF + dnd-kit ont des types stricts. Confidence : HIGH |
| **Supabase JS Client** | `@supabase/supabase-js@2.106.2` | DB + Auth + Storage SDK browser | Stack lockée. v2.x stable depuis 2022, API stabilisée. Confidence : HIGH |
| **Supabase SSR** | `@supabase/ssr@0.10.3` | Wrapper SSR pour App Router (cookies, server clients, middleware) | **OBLIGATOIRE en App Router** — remplace l'ancien `@supabase/auth-helpers-nextjs` (déprécié, voir "What NOT to Use"). Gère `createBrowserClient`, `createServerClient`, refresh tokens via middleware. Confidence : HIGH |
| **Tailwind CSS** | `4.3.0` | Styling utility-first | v4 (sortie jan 2025) : engine Rust, config CSS-native (`@theme`), 5-10x plus rapide. Requis pour shadcn/ui moderne. Confidence : HIGH |
| **@tailwindcss/postcss** | `4.3.0` | PostCSS plugin pour Tailwind v4 | En v4 le setup PostCSS a changé (plus de `tailwind.config.js` JS — tout passe par CSS). Confidence : HIGH |
| **shadcn/ui CLI** | `shadcn@3.5.0` (CLI v3, registry actuel) | Composants copy-paste (Button, Dialog, Form, Input, Toast…) | Pas un package npm runtime — CLI qui copie le code dans `components/ui/`. Compat Tailwind v4 + React 19 + Next 16 confirmée. Confidence : HIGH |
| **PostgreSQL** | `15+` (Supabase default) | DB | Inclus dans Supabase. JSONB pour `content` blob des 9 blocs (stack lockée). Confidence : HIGH |
### Supporting Libraries
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| **zod** | `4.4.3` | Validation schemas TS-first | TOUS les schemas : forms éditeur (chaque bloc), validation server actions, claim username, parsing JSONB côté serveur. v4 = 100x plus rapide qu'v3, types réduits, supporte `z.discriminatedUnion` propre pour les variantes de blocs. Confidence : HIGH |
| **react-hook-form** | `7.76.1` | Form state management | Éditeur 9 blocs : chaque bloc = un `useForm` indépendant ou un `useFieldArray` (Expériences, Formation, Projets). Performance critique car preview temps réel. Confidence : HIGH |
| **@hookform/resolvers** | `5.4.0` | Pont RHF ↔ Zod | `zodResolver(schema)` — combo standard de l'écosystème. Confidence : HIGH |
| **zustand** | `5.0.13` | State management éditeur global | Stocker le `content` global de l'éditeur + dirty state + preview state, partagé entre l'éditeur et le composant preview. Léger (~1KB), pas de Provider hell, supporte React 19 SSR proprement. Confidence : HIGH |
| **@dnd-kit/react** | `0.4.0` (nouveau pkg, encore <1.0) | Drag-and-drop pour réordonner blocs et items (Expériences, Projets) | **Nouveau paquet officiel** (`@dnd-kit/react`) qui remplace `@dnd-kit/core` + `@dnd-kit/sortable` legacy. API plus simple (`useSortable({id, index})`). Maintenu activement, React 19 compat OK. Confidence : MEDIUM (pkg encore en 0.x, breaking changes possibles avant 1.0 — voir "Alternatives Considered") |
| **qrcode.react** | `4.2.0` | QR code SVG côté client pour profil | Le plus établi, exporte `<QRCodeSVG />` et `<QRCodeCanvas />`. SVG = scalable, parfait pour le partage. Compat React 19 explicite (`peerDependency: ^16 \|\| ^17 \|\| ^18 \|\| ^19`). 4.x stable. Confidence : HIGH |
| **nuqs** | `2.8.9` | URL search params type-safe | À utiliser SEULEMENT pour l'état "section active dans l'éditeur" (`?bloc=experiences`) — utile pour deep-link et refresh sans perdre le contexte. NE PAS l'utiliser pour le contenu de l'éditeur (trop volumineux pour l'URL). Confidence : HIGH |
| **next/image** (built-in) | inclus Next 16 | Optimisation photo Hero | Combiné avec Supabase Storage public URL + `remotePatterns` dans `next.config.ts`. Pour v0, **PAS** le custom loader Supabase (réservé Pro plan). Confidence : HIGH |
| **browser-image-compression** | `2.0.2` | Compression côté client avant upload photo Hero | Réduit la photo à <500KB / max 1200px avant POST vers Supabase Storage. Économise bande passante, quota Storage, et temps d'upload mobile (cible critique : recruteurs sur mobile). Confidence : MEDIUM (peut être remplacé par Canvas API maison si <50 lignes ; recommandé pour vélocité solo) |
| **clsx** + **tailwind-merge** | `2.x` / `3.x` | Helper `cn()` pour classes Tailwind conditionnelles | Installé automatiquement par shadcn CLI dans `lib/utils.ts`. Standard de l'écosystème. Confidence : HIGH |
| **lucide-react** | `0.470+` | Icônes | Choix par défaut de shadcn/ui. Tree-shakable. Confidence : HIGH |
| **sonner** | `1.7+` | Toast notifications | Adopté par shadcn/ui en remplacement du `<Toast />` original. Confidence : HIGH |
### Development Tools
| Tool | Purpose | Notes |
|------|---------|-------|
| **Supabase CLI** | Migrations DB local + types generation | `supabase gen types typescript --linked > types/database.ts` — génère les types depuis le schema pour typer le `Database` du client. |
| **Biome** ou **ESLint + Prettier** | Lint + format | Biome 2.x recommandé pour vélocité solo (10x plus rapide, config minimale). Sinon ESLint flat config + Prettier. |
| **Turbopack** | Bundler dev (et build en v16) | **Activé par défaut en Next 16** — ne pas le désactiver. |
| **Vercel CLI** | Deploy + env vars sync | `vercel env pull .env.local` pour synchroniser les secrets Supabase. |
| **pnpm** ou **bun** | Package manager | pnpm 9.x recommandé (stable, lockfile compact). bun OK si user le connaît. |
## Installation
# 1. Bootstrap Next.js 16 + TS + Tailwind v4 + App Router
# 2. Supabase (DB + Auth + Storage)
# 3. Forms + validation
# 4. State management éditeur
# 5. Drag and drop (nouveau @dnd-kit/react)
# 6. QR code
# 7. URL state (optionnel mais utile)
# 8. Image compression côté client
# 9. shadcn CLI + composants initiaux
# 10. Dev tools
# Optionnel : Biome au lieu d'ESLint+Prettier
## Patterns Spécifiques au Projet
### Username Availability Check
- **NE PAS** créer une Route Handler dédiée pour ce check — Server Actions sont plus idiomatiques en App Router et permettent réutilisation côté form submit.
- **NE PAS** faire une RPC Supabase custom : un simple `SELECT 1 FROM profiles WHERE username = ?` suffit. RPC = overkill ici.
- **Debounce 300ms côté client** via `useEffect` + `setTimeout` ou un hook custom (pas besoin de lib externe — 15 lignes).
- **Source of truth** : `UNIQUE` constraint au niveau Postgres + check `citext` (case-insensitive). Le check client est de l'UX, la validation finale est en DB.
- **Blacklist** : table dédiée `reserved_usernames` (200 entrées) OU constant TS importé côté server action. Préférer la **table DB** pour pouvoir l'éditer sans redeploy.
### ISR pour pages publiques `profyl.io/<username>`
- **Revalidation on-demand** quand le candidat sauvegarde son éditeur : `revalidateTag(\`profile:${username}\`)` ou `revalidatePath(\`/${username}\`)` dans la Server Action de save.
- Confidence : HIGH
### Supabase Storage + next/image pour Photo Hero
- Bucket `avatars` **public read** (RLS permet `SELECT` à `anon`, `INSERT/UPDATE` au owner via `auth.uid()`).
- Path convention : `avatars/{user_id}/hero.{ext}` (un seul fichier par user, écrasement à chaque update).
- Compression client (`browser-image-compression`) → `max-width 1200px, max-size 500KB, format WebP`.
- next/image avec `remotePatterns` dans `next.config.ts` :
- **NE PAS** activer le Supabase Image Transformation Loader (Pro plan, hors v0 Free).
### State Management Éditeur
- **Zustand store** : `useEditorStore` avec `{ content: ProfileContent, dirty: boolean, save(), setBlock(blockId, data) }`.
- **react-hook-form** par bloc pour la saisie locale (validation Zod inline, perf optimale).
- **Sync RHF → Zustand** : `useEffect(() => store.setBlock(id, watch()), [watch()])` ou `form.watch((data) => store.setBlock(id, data))`.
- **Preview** lit directement depuis le store Zustand → re-render auto.
- Pas besoin de Context, pas besoin de Redux, pas besoin de Jotai.
### Auth Magic Link
- `supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: \`${siteUrl}/auth/callback\` } })`
- Route handler `/auth/callback/route.ts` qui appelle `supabase.auth.exchangeCodeForSession(code)` puis redirige vers `/dashboard`.
- Middleware `proxy.ts` (Next 16) ou `middleware.ts` (Next 15) qui refresh les tokens à chaque request — **CRITIQUE**, sans ça la session expire en silence.
- Templates email Supabase à traduire en FR depuis le dashboard.
## Alternatives Considered
| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| `@dnd-kit/react@0.4` (nouveau) | `@dnd-kit/core@6.3.1` + `@dnd-kit/sortable@10.0` (legacy stable) | Si le projet est risk-averse sur les pkgs <1.0. Le legacy est éprouvé et plus documenté (most blog posts/SO answers utilisent encore ça). API plus verbeuse (`useSortable` + `attributes` + `listeners` à spread manuellement). |
| Zustand | TanStack Query + URL state | Pour un éditeur avec server state lourd. Ici l'éditeur est 100% client-side jusqu'au save → Zustand suffit. |
| Zustand | Jotai | Si on voulait du atomic state. Zustand est plus simple pour un store unique d'éditeur. |
| Zod v4 | Valibot | Valibot a un bundle plus petit, mais l'écosystème (RHF resolver, shadcn forms) est 100% Zod. Pas la peine de s'isoler. |
| react-hook-form | TanStack Form | TanStack Form est plus jeune, RHF est l'écosystème dominant + integration shadcn directe. |
| qrcode.react | `react-qr-code` ou `next-qrcode` | `react-qr-code` OK aussi (plus simple, SVG only). `next-qrcode` est hook-based — pratique mais plus de surface API. qrcode.react gagne sur maturité + simplicité. |
| Server Action (username check) | tRPC | tRPC = overkill pour un projet solo / monolithique Next.js avec Supabase déjà. |
| Supabase Storage | Cloudinary / Uploadthing | Cloudinary = transformations puissantes mais coûte en plus. Stack déjà Supabase → autant l'utiliser. Uploadthing intéressant mais ajoute un vendor. |
| Next.js 16 | Next.js 15.5 | Si lock strict user. Tout le reste de la stack reste identique. |
| Tailwind v4 | Tailwind v3.4 | Si dépendances externes ne supportent pas encore v4 (peu probable en 2026). |
| pnpm | bun / npm / yarn | bun OK pour vitesse, npm/yarn ok mais moins efficaces. |
## What NOT to Use
| Avoid | Why | Use Instead |
|-------|-----|-------------|
| **`@supabase/auth-helpers-nextjs`** | **DÉPRÉCIÉ** depuis 2024. Ne fonctionne pas correctement avec App Router/Server Components. Toute doc qui le mentionne est obsolète. | `@supabase/ssr` (createBrowserClient / createServerClient) |
| **Pages Router de Next** | Stack déjà sur App Router. Mélanger = confusion routing. | App Router uniquement (`app/`) |
| **`next/legacy/image`** | Déprécié, perfs inférieures. | `next/image` (built-in moderne) |
| **`getServerSideProps` / `getStaticProps`** | API Pages Router. N'existe pas en App Router. | `async` Server Components + `fetch` cache + `export const revalidate` |
| **Synchronous `cookies()` / `headers()` / `params`** | **Breaking change Next 15+** : tous les accès Request APIs sont async. Code legacy va casser. | `const cookieStore = await cookies()` ; `const { id } = await params` |
| **`middleware.ts`** (en Next 16) | Renommé en `proxy.ts` en Next 16 (deprecation soft). | `proxy.ts` si Next 16. `middleware.ts` reste OK en Next 15. |
| **`react-dnd`** | Maintenance ralentie, mauvaise compat React 19 (issue #3655 ouverte longtemps). Pas accessible. | `@dnd-kit/react` ou `@dnd-kit/core` legacy |
| **react-beautiful-dnd** | **OFFICIELLEMENT ARCHIVÉ** par Atlassian. Pas React 19 compatible. | `@dnd-kit/react` |
| **Redux / Redux Toolkit** | Énorme overhead pour un store d'éditeur unique. Boilerplate massif. | Zustand |
| **Formik** | Maintenance ralentie, perfs inférieures à RHF. | react-hook-form |
| **Yup** | Plus lent, types moins bons que Zod. | Zod v4 |
| **Tailwind `tailwind.config.js` (style v3)** | En Tailwind v4, la config se fait en CSS (`@theme {}` dans `globals.css`). Le JS config est legacy. | `@theme` dans CSS + `@tailwindcss/postcss` plugin |
| **`@supabase/auth-ui-react`** | UI components opinionnés, mal stylables, design daté. | UI custom avec shadcn/ui Form + react-hook-form |
| **Stocker tout l'état éditeur dans URL (nuqs)** | Le `content` JSON fait facilement >5KB, dépasse les limites URL. | Zustand pour le contenu, nuqs uniquement pour `?bloc=xxx` |
| **`useFormState` / `useFormStatus` SEUL pour l'éditeur** | OK pour des forms simples, mais pas suffisant pour 9 blocs avec preview live. | RHF + Zustand combo |
| **Cloudinary pour v0** | Vendor en plus, coût, complexité. Supabase Storage suffit jusqu'à 1Go (Free plan). | Supabase Storage + next/image |
| **Server Components qui importent `@supabase/supabase-js` direct** | Ne gère pas les cookies → session perdue. Ressorts les anti-patterns du Pages Router. | Toujours `createServerClient` de `@supabase/ssr` avec adapter cookies. |
| **`fetch` non typé vers Supabase REST** | Perte des types, perte du cache RLS. | Toujours le SDK `supabase.from('...')` typé via `Database` generic. |
| **Drizzle/Prisma au-dessus de Supabase en v0** | Couche ORM en plus → conflits avec RLS, types générés en double. Stack JSON simple ne le justifie pas. | SDK Supabase + types générés par CLI |
## Stack Patterns by Variant
- Utiliser `next@15.5.18` + `middleware.ts` (pas `proxy.ts`).
- Tout le reste identique. Compatibilité Tailwind v4, React 19, Supabase SSR, dnd-kit, zod v4 : OK.
- Perdre : Turbopack par défaut + 400% dev startup speedup.
- Ajouter `@react-pdf/renderer` (React-native style) ou `puppeteer-core` + Vercel function (rendu HTML→PDF).
- Préférer @react-pdf pour vélocité et coût (pas de serverless function lourde).
- Pas d'API officielle LinkedIn pour profils → scraper (fragile, risque légal) OU import manuel via PDF LinkedIn → parsing texte côté serveur.
- Ne pas inclure de lib spécifique en v0.
- Activer Supabase Smart CDN (Pro plan) pour les images Storage.
- Ajouter `@vercel/analytics` + Speed Insights (gratuit, déjà inclus côté hosting).
- Considérer une table `profile_search` matérialisée si recherche cross-profils.
## Version Compatibility
| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| `next@16.2` | `react@19.2`, `react-dom@19.2` | Imposé. Pas de downgrade React possible. |
| `tailwindcss@4.3` | `@tailwindcss/postcss@4.3` | Versions doivent matcher. Configuration via CSS, plus de `tailwind.config.js` JS obligatoire. |
| `@supabase/ssr@0.10` | `@supabase/supabase-js@^2.106` | Peer dep stricte. Updater ensemble. |
| `zod@4` | `@hookform/resolvers@^5` | Resolvers v5+ supportent Zod v4. v3 résolveurs = Zod v3 uniquement. |
| `react-hook-form@7.76` | React 19 OK | RHF supporte React 19 depuis v7.54. |
| `@dnd-kit/react@0.4` | React 19 + Next 16 OK | Encore <1.0 → pin la version exacte (`"@dnd-kit/react": "0.4.0"` sans `^`). |
| `qrcode.react@4.2` | React 19 OK | `peerDeps` incluent React 19. |
| `nuqs@2.8` | Next 16 App Router OK | Provider à mettre dans `app/layout.tsx`. |
| `zustand@5` | React 19 OK | v5 a fixé tous les pièges React 19 / concurrent. |
## Confidence Summary
| Choix | Confidence | Notes |
|-------|------------|-------|
| Next.js 16.2 vs 15.5 | HIGH | Vérifié via npm `dist-tags` et nextjs.org/blog. Recommandation 16 pour greenfield. |
| @supabase/ssr (vs auth-helpers déprécié) | HIGH | Doc officielle Supabase + Context7 explicite. |
| Tailwind v4 + shadcn | HIGH | shadcn registry compatible v4 + React 19. |
| Zod v4 + RHF + resolvers v5 | HIGH | Combo standard, doc officielle Zod v4 indique compat. |
| Zustand v5 (vs Jotai/Redux) | HIGH | Standard pour state global modéré + React 19 safe. |
| **@dnd-kit/react (nouveau)** | **MEDIUM** | Pkg encore en 0.4.0. Fallback `@dnd-kit/core` legacy si nécessaire — décider en Phase Éditeur. |
| qrcode.react (vs alternatives) | HIGH | Le plus établi, React 19 compat explicite. |
| browser-image-compression | MEDIUM | Lib mineure (~50KB). Acceptable, sinon implémentation Canvas maison 50 lignes. |
| Username check : Server Action + UNIQUE constraint | HIGH | Pattern idiomatique App Router. |
| ISR via `revalidate` + `revalidatePath` on save | HIGH | Exemple direct dans la doc Next.js 16 |
| Supabase Storage + next/image (vs Cloudinary) | HIGH | Free tier suffit largement pour v0. |
## Sources
### Context7 (authoritative)
- `/vercel/next.js` — versions, App Router ISR patterns, `generateStaticParams`
- `/supabase/ssr` — `createServerClient` API, cookie patterns, middleware
- `/websites/zod_dev_v4` — Zod v4 changelog, breaking changes, resolver compat
- `/websites/dndkit` — nouveau `@dnd-kit/react` API + migration guide
- `/pmndrs/zustand` — v5 React 19 safety
- `/colinhacks/zod` — versions
### npm registry (versions vérifiées au 2026-05-27)
- `next@16.2.6` (latest) / `15.5.18` (backport)
- `react@19.2.6` / `react-dom@19.2.6`
- `@supabase/ssr@0.10.3` / `@supabase/supabase-js@2.106.2`
- `tailwindcss@4.3.0` / `@tailwindcss/postcss@4.3.0`
- `shadcn@3.5.0` (CLI)
- `zod@4.4.3` / `react-hook-form@7.76.1` / `@hookform/resolvers@5.4.0`
- `zustand@5.0.13` / `nuqs@2.8.9`
- `@dnd-kit/react@0.4.0` (nouveau) / `@dnd-kit/core@6.3.1` (legacy)
- `qrcode.react@4.2.0` / `browser-image-compression@2.0.2`
### Documentation officielle
- https://nextjs.org/blog — Next 16.2 release (mars 2026), Next 16 (oct 2025)
- https://nextjs.org/docs/app/guides/upgrading/version-16 — breaking changes (proxy.ts, async APIs)
- https://supabase.com/docs/guides/auth/server-side/nextjs — pattern @supabase/ssr
- https://tailwindcss.com/blog — Tailwind v4.3 (mai 2026)
- https://supabase.com/docs/guides/storage/serving/image-transformations — Loader Pro plan
- https://dndkit.com/react/quickstart/ — nouveau @dnd-kit/react
### WebSearch (verified findings)
- Next 15 vs 16 comparison (devanddeliver.com, descope.com) — confirmed Next 16 production-ready
- @dnd-kit maintenance status (GitHub issue #1194) — active maintenance, React 19 compat
- qrcode.react vs alternatives (npm + GitHub) — confirmed React 19 peer dep
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
