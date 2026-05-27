import { BrowserFrame } from "@/components/browser-frame";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { DEMO_USERNAME, wallPersonas } from "@/lib/demo-persona";
import { ArrowRight, ExternalLink, MapPin, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const marqueeItems = [
  "Pensé pour la France 🇫🇷",
  "100% gratuit",
  "10 min top chrono",
  "QR code natif",
  "ISR Vercel",
  "Photo Hero obligatoire",
  "Vocabulaire FR strict",
  "Mobile-first",
  "Sans template à choisir",
  "Toujours à jour"
];

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

const accentGradient: Record<string, string> = {
  coral: "from-[#ffe9e3] to-white",
  lavender: "from-[#ebe6fa] to-white",
  honey: "from-[#fdf0d9] to-white",
  mint: "from-[#d9eee2] to-white",
  ink: "from-[#e2e1e8] to-white"
};

export default function HomePage() {
  return (
    <div className="grain relative min-h-screen overflow-hidden">
      {/* ---------- Background mesh ---------- */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div
          className="animate-float absolute -right-[15%] -top-[20%] h-[800px] w-[800px] rounded-full opacity-90"
          style={{
            background:
              "radial-gradient(circle, rgba(255,90,60,0.14) 0%, rgba(255,90,60,0.05) 40%, transparent 70%)"
          }}
        />
        <div
          className="absolute -left-[20%] top-[40%] h-[700px] w-[700px] rounded-full opacity-70"
          style={{
            background:
              "radial-gradient(circle, rgba(122,108,224,0.10) 0%, transparent 65%)"
          }}
        />
      </div>

      {/* ---------- Header ---------- */}
      <header className="relative z-20 mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
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
        <section className="relative mx-auto max-w-7xl px-6 pb-12 pt-8 md:pt-20">
          <div className="animate-rise-in text-center">
            {/* Eyebrow badge */}
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white/80 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted-strong)] shadow-[var(--shadow-sm)] backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
              </span>
              Nouveau · le CV français, réinventé
            </div>

            <h1 className="hero-title mx-auto mt-8 max-w-6xl">
              Ton CV mérite <em>mieux</em>
              <br />
              qu&apos;un <em>PDF.</em>
            </h1>

            <p className="mx-auto mt-10 max-w-xl text-lg leading-relaxed text-[var(--muted-strong)] md:text-xl">
              Une vraie page web professionnelle, toujours à jour, partageable
              en un lien.{" "}
              <span className="handwritten text-[var(--foreground)]">
                Sans template. Sans friction.
              </span>
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link href="/dashboard">
                <Button variant="accent" size="lg" className="w-full animate-pulse-coral sm:w-auto">
                  Créer ma page
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href={`/${DEMO_USERNAME}`}>
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Voir l&apos;exemple live
                </Button>
              </Link>
            </div>

            <p className="mt-5 inline-flex items-center gap-2 text-sm text-[var(--muted)]">
              <span className="inline-flex -space-x-1.5">
                {wallPersonas.slice(0, 4).map((p) => (
                  <span
                    key={p.username}
                    className="relative h-5 w-5 overflow-hidden rounded-full border-2 border-white"
                  >
                    <Image src={p.photoUrl} alt="" fill className="object-cover" unoptimized />
                  </span>
                ))}
              </span>
              <span>Déjà 230+ candidats inscrits cette semaine</span>
            </p>
          </div>
        </section>

        {/* ---------- BROWSER FRAME EMBED ---------- */}
        <section className="relative px-4 pb-24 md:px-6 md:pb-32">
          <div className="animate-rise-in-delay-2 relative mx-auto max-w-6xl">
            {/* Decorative annotations autour du frame */}
            <span
              className="sticker sticker--cream animate-wobble -left-2 -top-6 z-30 sm:-left-10 sm:-top-8 md:-left-16"
              style={{ ["--rot" as never]: "-6deg" }}
            >
              <span aria-hidden>🇫🇷</span> Pensé pour la France
            </span>
            <span
              className="sticker sticker--accent animate-wobble -right-2 -top-4 z-30 sm:-right-8 md:-right-14"
              style={{ ["--rot" as never]: "7deg" }}
            >
              <span aria-hidden>✨</span> 100% gratuit
            </span>
            <span
              className="sticker sticker--mint animate-wobble -bottom-4 left-4 z-30 sm:-bottom-6 sm:left-12"
              style={{ ["--rot" as never]: "-4deg" }}
            >
              <span aria-hidden>⏱</span> Page live, scrollable ↓
            </span>

            {/* Halo coral derrière */}
            <div
              aria-hidden
              className="absolute -inset-12 -z-10 rounded-[60px] bg-gradient-to-br from-[var(--accent)]/15 via-[var(--accent-2)]/10 to-transparent blur-3xl"
            />

            <BrowserFrame
              url={`https://profyl.io/${DEMO_USERNAME}`}
              src={`/${DEMO_USERNAME}?embed=1`}
              title={`Profil exemple de ${DEMO_USERNAME}`}
              height={780}
              className="mx-auto"
            />

            <p className="mt-8 text-center text-sm text-[var(--muted)]">
              <span className="handwritten text-base text-[var(--foreground)]">
                ↑ Une vraie page Profyl.
              </span>{" "}
              Scrolle dedans pour voir l&apos;ensemble du profil de Marie.
            </p>
          </div>
        </section>

        {/* ---------- MARQUEE STRIP ---------- */}
        <section className="relative border-y border-[var(--border)] bg-[var(--accent-5)] py-6 text-white">
          <div className="marquee-mask">
            <div className="marquee-track">
              {[...marqueeItems, ...marqueeItems].map((item, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-3 font-[family-name:var(--font-display)] text-xl font-medium italic md:text-2xl"
                >
                  <Star className="h-4 w-4 fill-[var(--accent)] text-[var(--accent)]" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- WALL OF PROFILES (warm section) ---------- */}
        <section className="section-warm relative overflow-hidden border-b border-[var(--border)] py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="hero-eyebrow">Une famille qui s&apos;agrandit</p>
              <h2 className="section-title mt-4">
                Des candidats, <em>pas des templates.</em>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-lg text-[var(--muted-strong)]">
                Chaque Profyl est unique parce que chaque parcours l&apos;est.
                Voici quelques pages — réelles, vivantes, partageables.
              </p>
            </div>

            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {wallPersonas.map((p) => (
                <Link
                  key={p.username}
                  href={p.username === DEMO_USERNAME ? `/${DEMO_USERNAME}` : "/dashboard"}
                  className="card-mini block"
                  style={{ transform: `rotate(${p.rotate}deg)` }}
                >
                  <div
                    className={`bg-gradient-to-b ${accentGradient[p.accent]} relative flex justify-center px-5 pb-4 pt-10`}
                  >
                    <div className="relative h-24 w-24 overflow-hidden rounded-full border-[4px] border-white shadow-[var(--shadow-md)]">
                      <Image
                        src={p.photoUrl}
                        alt={p.fullName}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </div>
                  <div className="px-5 pb-6 pt-2">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                      profyl.io/{p.username}
                    </p>
                    <h3 className="mt-1 font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight">
                      {p.fullName}
                    </h3>
                    <p className="text-base text-[var(--muted-strong)]">{p.title}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="inline-flex items-center gap-1 text-xs text-[var(--muted)]">
                        <MapPin className="h-3 w-3" />
                        {p.location}
                      </p>
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--accent)]">
                        Voir <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <p className="mt-14 text-center">
              <span className="handwritten text-2xl text-[var(--foreground)]">
                ↑ Le prochain pourrait être le tien.
              </span>
            </p>
          </div>
        </section>

        {/* ---------- HOW IT WORKS (mint section) ---------- */}
        <section className="section-mint relative overflow-hidden py-24 md:py-32">
          {/* Dot grid decorative */}
          <div className="dot-grid pointer-events-none absolute right-8 top-8 h-32 w-32 opacity-50" />

          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="hero-eyebrow">Comment ça marche</p>
              <h2 className="section-title mt-4">
                Trois étapes. <em>C&apos;est tout.</em>
              </h2>
            </div>

            <div className="mt-20 grid gap-12 md:grid-cols-3 md:gap-8">
              {steps.map((step, idx) => (
                <div key={step.n} className="relative">
                  <div className="flex items-baseline gap-4">
                    <span className="step-num">{step.n}</span>
                    <Sparkles className="h-5 w-5 text-[var(--accent)]" />
                  </div>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-lg text-[var(--muted-strong)] leading-relaxed">
                    {step.text}
                  </p>
                  {idx < steps.length - 1 && (
                    <div className="absolute right-[-24px] top-12 hidden h-px w-12 bg-gradient-to-r from-[var(--accent)] to-transparent md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- CTA FINAL (ink section, high contrast) ---------- */}
        <section className="section-ink relative overflow-hidden py-24 md:py-36">
          {/* Decorative spinning star */}
          <div className="animate-spin-slow pointer-events-none absolute right-8 top-12 opacity-20 md:right-20">
            <Star className="h-24 w-24 fill-[var(--accent)] text-[var(--accent)]" />
          </div>
          <div className="animate-spin-slow pointer-events-none absolute bottom-10 left-10 opacity-15">
            <Star className="h-16 w-16 fill-white text-white" />
          </div>

          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <span
              className="sticker sticker--accent static mb-8 inline-flex"
              style={{ ["--rot" as never]: "-3deg", position: "relative" }}
            >
              <span aria-hidden>🚀</span> Lance-toi
            </span>
            <h2 className="section-title mt-2 text-white">
              Ton meilleur lien pro,
              <br />
              <em className="text-[var(--accent-3)]">en moins de 10 minutes.</em>
            </h2>
            <p className="mx-auto mt-6 max-w-md text-lg text-white/70">
              Inspire-toi de{" "}
              <Link
                href={`/${DEMO_USERNAME}`}
                className="font-medium text-white underline decoration-[var(--accent)] decoration-2 underline-offset-4 hover:text-[var(--accent-3)]"
              >
                Marie Laurent
              </Link>{" "}
              ou plonge tête baissée.
            </p>
            <Link href="/dashboard" className="mt-10 inline-block">
              <Button variant="accent" size="lg" className="animate-pulse-coral">
                Créer mon Profyl
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <p className="mt-6 text-sm text-white/50">
              Pas de carte bancaire · domaine custom bientôt · 100% RGPD France
            </p>
          </div>
        </section>
      </main>

      {/* ---------- Footer ---------- */}
      <footer className="relative z-10 border-t border-[var(--border)] bg-white py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-6 text-sm text-[var(--muted)] sm:flex-row sm:justify-between">
          <Logo />
          <p className="text-center sm:text-right">
            Profyl · CV en ligne pour candidats francophones ·{" "}
            <span className="handwritten text-[var(--foreground)]">fait avec 🤍 à Paris</span>
          </p>
        </div>
      </footer>
    </div>
  );
}
