import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Sparkles, Star, Zap } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Pricing — Profyl",
  description: "Gratuit ou Pro à 5 €/mois. Pas de complication."
};

type Plan = {
  key: "free" | "pro";
  name: string;
  tagline: string;
  price: { monthly: string; annual?: string };
  cta: { label: string; href: string };
  highlight?: boolean;
  icon: typeof Zap;
  features: string[];
  notIncluded?: string[];
};

const plans: Plan[] = [
  {
    key: "free",
    name: "Free",
    tagline: "Pour commencer, tout simplement.",
    price: { monthly: "0 €" },
    cta: { label: "Créer mon Profyl", href: "/dashboard" },
    icon: Sparkles,
    features: [
      "Page profyl.io/<ton-nom>",
      "9 blocs : photo, expériences, projets, langues...",
      "QR code partageable",
      "6 expériences · 4 formations · 6 projets",
      "Modifications illimitées à vie",
      "Hébergé en France 🇫🇷"
    ],
    notIncluded: [
      "Petit watermark Profyl en bas de page",
      "Limites de sections sur Free"
    ]
  },
  {
    key: "pro",
    name: "Pro",
    tagline: "Quand ton CV doit faire le job à ta place.",
    price: { monthly: "5 €", annual: "50 €" },
    cta: { label: "Passer en Pro", href: "/dashboard?upgrade=pro" },
    highlight: true,
    icon: Zap,
    features: [
      "Tout de Free, plus :",
      "Connecte ton domaine perso (jean-dupont.fr)",
      "Export PDF print-ready A4",
      "Aucun watermark",
      "Sections illimitées",
      "Plusieurs profils (FR/EN, dev/manager...)",
      "Bloc vidéo intro (Loom / YouTube)",
      "Image OG personnalisée pour LinkedIn",
      "Support email prioritaire"
    ]
  }
];

const faqs = [
  {
    q: "Combien de temps pour publier ma page ?",
    a: "10 minutes. Tu remplis 9 blocs guidés, on s'occupe du design. Tu peux modifier à vie."
  },
  {
    q: "Comment marche le domaine custom ?",
    a: "Tu achètes ton domaine (jean-dupont.fr ou autre) chez Gandi, OVH, Namecheap... pour environ 10 €/an. Dans Profyl tu colles le nom, on te donne les enregistrements DNS à configurer chez ton registrar (un simple CNAME). Ta page Profyl devient accessible sur ton domaine en 1 à 24h. Si le domaine est déjà pris, on te suggère des alternatives proches (autres extensions, sans tirets, etc)."
  },
  {
    q: "Et si mon nom de domaine est pris ?",
    a: "C'est fréquent : il y a 4 Jean Dupont sur LinkedIn 😅. On t'aide à trouver une alternative — autre extension (.com, .pro, .dev), sans tiret (jeandupont.fr), avec un mot ajouté (jeandupont-design.fr). Ou tu peux rester sur profyl.io/jean-dupont, ça marche très bien."
  },
  {
    q: "Plusieurs profils, ça sert à quoi ?",
    a: "Pratique si tu as 2 casquettes : un profil dev en anglais (profyl.io/jean-dev), un autre management en français (profyl.io/jean-manager), un troisième pour ton activité de freelance. Tu ne payes qu'une fois 5 €/mois."
  },
  {
    q: "Je peux annuler mon abonnement quand ?",
    a: "Quand tu veux, en un clic depuis ton compte. Pas de durée d'engagement. Tu repasses en Free, ton profil reste en ligne (juste plafonné aux limites Free)."
  },
  {
    q: "Mes données sont en France ?",
    a: "Oui. Tout est hébergé à Frankfurt (Vercel + Supabase) sous régime RGPD européen. Aucun transfert US."
  },
  {
    q: "L'export PDF, ça donne quoi ?",
    a: "Un PDF A4 print-ready, typo soignée, photo Hero respectée. Parfait à joindre à une candidature qui exige encore le CV PDF."
  },
  {
    q: "Y a-t-il une remise pour les écoles / bootcamps ?",
    a: "Oui. Si tu es à l'École 42, Le Wagon, OpenClassrooms ou équivalent, écris-nous : −75% sur la première année Pro."
  }
];

export default function PricingPage() {
  return (
    <div className="grain relative min-h-screen overflow-hidden">
      {/* Background halo */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="absolute -right-[10%] -top-[15%] h-[700px] w-[700px] rounded-full opacity-80"
          style={{
            background:
              "radial-gradient(circle, rgba(255,90,60,0.12) 0%, rgba(255,90,60,0.04) 40%, transparent 70%)"
          }}
        />
        <div
          className="absolute -left-[15%] top-[35%] h-[600px] w-[600px] rounded-full opacity-70"
          style={{
            background:
              "radial-gradient(circle, rgba(122,108,224,0.10) 0%, transparent 65%)"
          }}
        />
      </div>

      <header className="relative z-20 mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Logo />
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="hidden text-sm text-[var(--muted)] transition hover:text-[var(--foreground)] sm:inline-block"
          >
            Accueil
          </Link>
          <Link href="/dashboard">
            <Button variant="primary" size="sm">
              Créer mon profil
            </Button>
          </Link>
        </div>
      </header>

      <main className="relative z-10">
        {/* ---------- HERO ---------- */}
        <section className="mx-auto max-w-5xl px-6 pb-16 pt-12 text-center md:pt-20">
          <p className="hero-eyebrow">Pricing</p>
          <h1 className="section-title mt-4">
            Un plan <em>simple.</em>
            <br />
            Pas de surprise.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-[var(--muted-strong)]">
            Commence gratuitement. Passe en Pro le jour où ton CV mérite
            ton propre domaine. Annule quand tu veux.
          </p>
        </section>

        {/* ---------- PLANS ---------- */}
        <section className="px-6 pb-24 md:pb-32">
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            {plans.map((plan) => (
              <PlanCard key={plan.key} plan={plan} />
            ))}
          </div>

          {/* Reassurance strip */}
          <div className="mx-auto mt-10 flex max-w-2xl flex-col items-center gap-3 text-center text-sm text-[var(--muted)] sm:flex-row sm:justify-center sm:gap-6">
            <span className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-[var(--accent-4)]" />
              14 jours d&apos;essai Pro
            </span>
            <span className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-[var(--accent-4)]" />
              Sans carte bancaire
            </span>
            <span className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-[var(--accent-4)]" />
              Annulation en un clic
            </span>
          </div>
        </section>

        {/* ---------- COMPARISON ---------- */}
        <section className="section-warm relative overflow-hidden border-y border-[var(--border)] py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-6">
            <div className="text-center">
              <p className="hero-eyebrow">Détail</p>
              <h2 className="section-title mt-3">Le comparatif</h2>
            </div>

            <div className="mt-12 overflow-x-auto rounded-3xl border border-[var(--border)] bg-white shadow-[var(--shadow-md)]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--surface-hover)]">
                    <th className="p-4 text-left font-medium text-[var(--muted)]">Limites</th>
                    <th className="p-4 text-center font-semibold">Free</th>
                    <th className="p-4 text-center font-semibold text-[var(--accent)]">Pro</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {[
                    { label: "Expériences", free: "6", pro: "Illimité" },
                    { label: "Formations", free: "4", pro: "Illimité" },
                    { label: "Projets", free: "6", pro: "Illimité" },
                    { label: "Compétences", free: "15", pro: "Illimité" },
                    { label: "Domaine perso connecté", free: "—", pro: "✓" },
                    { label: "Profils multiples", free: "1", pro: "Jusqu'à 5" },
                    { label: "Export PDF", free: "—", pro: "✓" },
                    { label: "Sans watermark", free: "—", pro: "✓" },
                    { label: "Bloc vidéo intro", free: "—", pro: "✓" },
                    { label: "Image OG personnalisée", free: "—", pro: "✓" },
                    { label: "Support email", free: "Communautaire", pro: "Prioritaire" }
                  ].map((row) => (
                    <tr key={row.label}>
                      <td className="p-4 font-medium text-[var(--foreground)]">{row.label}</td>
                      <td className="p-4 text-center text-[var(--muted-strong)]">{row.free}</td>
                      <td className="bg-[var(--accent-soft)]/50 p-4 text-center font-medium text-[var(--accent-deep)]">
                        {row.pro}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section className="relative py-20 md:py-28">
          <div className="mx-auto max-w-3xl px-6">
            <div className="text-center">
              <p className="hero-eyebrow">FAQ</p>
              <h2 className="section-title mt-3">
                Questions <em>fréquentes.</em>
              </h2>
            </div>

            <div className="mt-12 space-y-3">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-2xl border border-[var(--border)] bg-white px-5 py-4 shadow-[var(--shadow-sm)] transition open:shadow-[var(--shadow-md)]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-[var(--foreground)]">
                    {faq.q}
                    <ArrowRight className="h-4 w-4 shrink-0 text-[var(--muted)] transition group-open:rotate-90 group-open:text-[var(--accent)]" />
                  </summary>
                  <p className="mt-3 leading-relaxed text-[var(--muted-strong)]">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- CTA FINAL ---------- */}
        <section className="section-ink relative overflow-hidden py-20 md:py-28">
          <div className="animate-spin-slow pointer-events-none absolute right-12 top-12 opacity-15">
            <Star className="h-20 w-20 fill-[var(--accent)] text-[var(--accent)]" />
          </div>
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <h2 className="section-title text-white">
              Prêt à <em className="text-[var(--accent-3)]">claim ton lien</em> ?
            </h2>
            <p className="mx-auto mt-5 max-w-md text-lg text-white/70">
              Commence en Free. Tu passes en Pro le jour où le domaine
              perso devient une évidence.
            </p>
            <Link href="/dashboard" className="mt-10 inline-block">
              <Button variant="accent" size="lg" className="animate-pulse-coral">
                Créer mon Profyl gratuitement
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-[var(--border)] bg-white py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-sm text-[var(--muted)] sm:flex-row sm:justify-between">
          <Logo />
          <p>Profyl · CV en ligne pour candidats francophones · hébergé en France 🇫🇷</p>
        </div>
      </footer>
    </div>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  const Icon = plan.icon;
  return (
    <div
      className={`relative flex flex-col rounded-3xl border bg-white p-8 shadow-[var(--shadow-md)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-xl)] ${
        plan.highlight
          ? "border-[var(--accent)] ring-4 ring-[var(--accent-soft)]"
          : "border-[var(--border)]"
      }`}
    >
      {plan.highlight ? (
        <span
          className="sticker sticker--accent absolute -top-4 left-1/2 -translate-x-1/2"
          style={{ ["--rot" as never]: "-3deg" }}
        >
          <Sparkles className="h-3.5 w-3.5" /> Recommandé
        </span>
      ) : null}

      <div className="mb-4 flex items-center gap-2.5">
        <span
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${
            plan.highlight
              ? "bg-[var(--accent)] text-white"
              : "bg-[var(--surface-hover)] text-[var(--foreground)]"
          }`}
        >
          <Icon className="h-4 w-4" />
        </span>
        <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight">
          {plan.name}
        </h2>
      </div>
      <p className="text-sm text-[var(--muted-strong)]">{plan.tagline}</p>

      <div className="my-6 flex items-baseline gap-1.5">
        <span className="font-[family-name:var(--font-display)] text-5xl font-semibold tracking-tight">
          {plan.price.monthly}
        </span>
        <span className="text-sm text-[var(--muted)]">/mois</span>
      </div>
      {plan.price.annual ? (
        <p className="-mt-3 mb-6 text-xs text-[var(--muted)]">
          ou <span className="font-medium text-[var(--foreground)]">{plan.price.annual}/an</span>{" "}
          (−16%)
        </p>
      ) : null}

      <Link href={plan.cta.href} className="mb-6 block">
        <Button variant={plan.highlight ? "accent" : "primary"} size="md" className="w-full">
          {plan.cta.label}
          <ArrowRight className="ml-2 h-3.5 w-3.5" />
        </Button>
      </Link>

      <ul className="space-y-2.5 text-sm">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" />
            <span className="text-[var(--muted-strong)]">{f}</span>
          </li>
        ))}
      </ul>

      {plan.notIncluded ? (
        <ul className="mt-5 space-y-2 border-t border-[var(--border)] pt-5 text-sm">
          {plan.notIncluded.map((n) => (
            <li key={n} className="flex items-start gap-2.5 text-[var(--muted)]">
              <span className="mt-0.5 h-4 w-4 shrink-0 text-center">·</span>
              <span>{n}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
