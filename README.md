# Profyl

MVP SaaS pour creer un CV public a l'adresse `/<username>` en moins de 10 minutes.

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind v4
- Zod
- Stockage local JSON (`data/profiles.json`)

## Setup local

1. Installer les dependances: `npm install`
2. Lancer `npm run dev`

## Fonctions deja incluses

- Dashboard de profil (edition JSON des 9 blocs)
- Sauvegarde profile dans `data/profiles.json`
- Page publique ISR `/<username>`
- Revalidation on save (`revalidatePath`)
- QR code de partage
