import { AmbientBackground } from "@/components/ambient-background";
import { Logo } from "@/components/logo";
import { PhoneFrame } from "@/components/phone-frame";
import { ProfileView } from "@/components/profile-view";
import { Button } from "@/components/ui/button";
import { DEMO_USERNAME, demoPersonaContent, wallPersonas } from "@/lib/demo-persona";
import { ArrowRight, ExternalLink, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const steps = [
  {
    n: "01",
    title: "Claim ton username",
    text: "Tape ton nom, vérifie qu'il est dispo, reçois un magic link. 30 secondes."
  },
  {
    n: "02",
    title: "Remplis 9 blocs",
    text: "Photo, expériences, projets, langues. Tu remplis — Profyl met en forme."
  },
  {
    n: "03",
    title: "Partage ton lien",
    text: "profyl.io/ton-nom + un QR code. Sur LinkedIn, ton CV, ta signature email."
  }
];

const accentMap: Record<string, string> = {
  coral: "from-[#fdf0ee] to-white",
  lavender: "from-[#f3f0fa] to-white",
  honey: "from-[#fef3e7] to-white",
  mint: "from-[#e8f5ee] to-white",
  ink: "from-[#ececec] to-white"
};

export default function HomePage() {
  return (
    <div className="grain relative min-h-screen overflow-hidden">
      <AmbientBackground />

      <header className="relative z-10 mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
        <Logo />
        <div className="flex items-center gap-3">
          <Link
            href={`/${DEMO_USERNAME}`}
            className="hidden items-center gap-1.5 text-sm text-[var(--muted)] transition hover:text-[var(--foreground)] sm:inline-flex"
          >
            Voir un exemple
            <ExternalLink className="h-3.5 w-3.5" />
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
        <section className="relative mx-auto max-w-6xl px-6 pb-24 pt-10 md:pt-20">
          <div className="animate-rise-in text-center">
            <p className="hero-eyebrow">Le CV français, réinventé</p>

            <h1 className="hero-title mx-auto mt-6 max-w-5xl">
              Ton CV mérite <em>mieux</em>
              <br />
              qu&apos;un PDF.
            </h1>

            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-[var(--muted-strong)] md:text-xl">
              Une page web professionnelle, toujours à jour, partageable
              en un lien. Sans template à choisir. Sans friction.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link href="/dashboard">
                <Button variant="accent" size="lg" className="w-full sm:w-auto">
                  Créer ma page
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href={`/${DEMO_USERNAME}`}>
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Voir l&apos;exemple
                </Button>
              </Link>
            </div>

            <p className="mt-5 text-sm text-[var(--muted)]">
              Gratuit · pas de carte bancaire · prêt en 10 min
            </p>
          </div>

          {/* ---------- Phone + stickers ---------- */}
          <div className="animate-rise-in-delay-2 relative mt-20 flex justify-center">
            {/* Sticker top-left — "Made in France" */}
            <span
              className="sticker sticker--cream animate-wobble left-4 top-0 sm:left-12 md:-left-4 md:top-8 lg:left-12"
              style={{ ["--rot" as never]: "-6deg" }}
            >
              <span aria-hidden>🇫🇷</span> Pensé pour la France
            </span>

            {/* Sticker right — "100% gratuit" */}
            <span
              className="sticker sticker--accent animate-wobble right-2 top-10 sm:right-8 md:right-0 md:top-16 lg:right-16"
              style={{ ["--rot" as never]: "7deg" }}
            >
              <span aria-hidden>✨</span> 100% gratuit
            </span>

            {/* Sticker bottom-left — "Prêt en 10 min" */}
            <span
              className="sticker sticker--mint animate-wobble bottom-12 left-2 sm:left-8 md:bottom-20 md:left-0"
              style={{ ["--rot" as never]: "-4deg" }}
            >
              <span aria-hidden>⏱</span> 10 min top chrono
            </span>

            <Link href={`/${DEMO_USERNAME}`} className="group relative block">
              <div className="absolute -inset-10 rounded-[60px] bg-gradient-to-br from-[var(--accent)]/8 via-[var(--accent-2)]/8 to-transparent blur-3xl" />
              <PhoneFrame floating className="relative z-10 transition group-hover:scale-[1.015]">
                <ProfileView username={DEMO_USERNAME} content={demoPersonaContent} compact />
              </PhoneFrame>
              <p className="mt-5 text-center text-sm text-[var(--muted)] transition group-hover:text-[var(--foreground)]">
                profyl.io/{DEMO_USERNAME} <span aria-hidden>↗</span>
              </p>
            </Link>
          </div>
        </section>

        {/* ---------- WALL OF PROFILES ---------- */}
        <section className="relative border-t border-[var(--border)] bg-white/40 py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="hero-eyebrow">Une famille qui s&apos;agrandit</p>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight md:text-5xl">
                Des candidats, <em className="italic text-[var(--accent)]">pas des templates.</em>
              </h2>
              <p className="mt-4 text-[var(--muted-strong)]">
                Chaque Profyl est unique parce que chaque parcours l&apos;est. Voici
                quelques pages — réelles, vivantes, partageables.
              </p>
            </div>

            <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {wallPersonas.map((p, i) => (
                <Link
                  key={p.username}
                  href={p.username === DEMO_USERNAME ? `/${DEMO_USERNAME}` : "/dashboard"}
                  className="card-mini block p-5"
                  style={{ transform: `rotate(${p.rotate}deg)`, animationDelay: `${i * 60}ms` }}
                >
                  <div
                    className={`bg-gradient-to-b ${accentMap[p.accent]} -m-5 mb-5 flex justify-center px-5 pb-3 pt-7`}
                  >
                    <div className="relative h-20 w-20 overflow-hidden rounded-full border-[3px] border-white shadow-[var(--shadow-md)]">
                      <Image
                        src={p.photoUrl}
                        alt={p.fullName}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    profyl.io/{p.username}
                  </p>
                  <h3 className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight">
                    {p.fullName}
                  </h3>
                  <p className="text-sm text-[var(--muted-strong)]">{p.title}</p>
                  <p className="mt-2 inline-flex items-center gap-1 text-xs text-[var(--muted)]">
                    <MapPin className="h-3 w-3" />
                    {p.location}
                  </p>
                </Link>
              ))}
            </div>

            <p className="mt-12 text-center text-sm text-[var(--muted)]">
              <span className="handwritten text-base text-[var(--foreground)]">↑ Et toi ?</span>{" "}
              Le prochain username libre pourrait être le tien.
            </p>
          </div>
        </section>

        {/* ---------- HOW IT WORKS ---------- */}
        <section className="relative py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-2xl text-center">
              <p className="hero-eyebrow">Comment ça marche</p>
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight md:text-5xl">
                Trois étapes. <em className="italic text-[var(--accent)]">C&apos;est tout.</em>
              </h2>
            </div>

            <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
              {steps.map((step, idx) => (
                <div key={step.n} className="relative">
                  <span className="step-num">{step.n}</span>
                  <h3 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[var(--muted-strong)] leading-relaxed">{step.text}</p>
                  {idx < steps.length - 1 && (
                    <div className="absolute right-[-20px] top-6 hidden h-px w-10 bg-[var(--border-strong)] md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- CTA FINAL ---------- */}
        <section className="relative pb-32">
          <div className="mx-auto max-w-3xl rounded-[40px] border border-[var(--border)] bg-white px-8 py-16 text-center shadow-[var(--shadow-lg)] md:px-16">
            <span
              className="sticker sticker--accent static mb-6 inline-flex"
              style={{ ["--rot" as never]: "-3deg", position: "relative" }}
            >
              <span aria-hidden>🚀</span> Lance-toi
            </span>
            <h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight md:text-5xl">
              Ton meilleur lien pro,
              <br />
              <em className="italic text-[var(--accent)]">en moins de 10 minutes.</em>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-[var(--muted-strong)]">
              Inspire-toi de{" "}
              <Link
                href={`/${DEMO_USERNAME}`}
                className="font-medium text-[var(--foreground)] underline decoration-[var(--accent)] decoration-2 underline-offset-4 hover:text-[var(--accent)]"
              >
                Marie Laurent
              </Link>{" "}
              ou plonge tête baissée.
            </p>
            <Link href="/dashboard" className="mt-10 inline-block">
              <Button variant="accent" size="lg">
                Créer mon Profyl
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-[var(--border)] py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-sm text-[var(--muted)] sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          <p>
            Profyl · CV en ligne pour candidats francophones ·{" "}
            <span className="handwritten text-[var(--foreground)]">fait avec 🤍 à Paris</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
