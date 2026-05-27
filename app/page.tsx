import { AmbientBackground } from "@/components/ambient-background";
import { Logo } from "@/components/logo";
import { PhoneFrame } from "@/components/phone-frame";
import { ProfileView } from "@/components/profile-view";
import { Button } from "@/components/ui/button";
import { DEMO_USERNAME, demoPersonaContent } from "@/lib/demo-persona";
import { ArrowRight, ExternalLink, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

const stats = [
  { value: "< 10 min", label: "pour publier" },
  { value: "1 lien", label: "à partager" },
  { value: "0 template", label: "à choisir" }
];

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
        <section className="mx-auto max-w-6xl px-6 pb-20 pt-4 md:pt-12">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="animate-rise-in">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border)] glass px-4 py-2 text-sm text-[var(--muted-strong)]">
                <Sparkles className="h-4 w-4 text-[var(--accent)]" />
                Le CV français, réinventé
              </div>

              <h1 className="font-[family-name:var(--font-display)] text-5xl font-semibold leading-[1.05] tracking-tight md:text-[4.25rem]">
                <span className="gradient-text">Ton profil pro</span>
                <br />
                <span className="text-[var(--foreground)]">qui impressionne.</span>
              </h1>

              <p className="mt-6 max-w-md text-lg leading-relaxed text-[var(--muted)]">
                Une page élégante, partageable en un lien ou QR code.
                Sans friction. Sans template. Juste toi.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link href="/dashboard">
                  <Button variant="accent" size="lg" className="w-full sm:w-auto">
                    Créer ma page
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href={`/${DEMO_USERNAME}`}>
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                    Voir l&apos;exemple Marie
                  </Button>
                </Link>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-[var(--border)] bg-white px-3 py-3 text-center shadow-[var(--shadow-sm)]"
                  >
                    <p className="font-[family-name:var(--font-display)] text-lg font-semibold md:text-xl">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-[11px] text-[var(--muted)] md:text-xs">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-rise-in-delay-2 relative flex justify-center lg:justify-end">
              <Link href={`/${DEMO_USERNAME}`} className="group relative block">
                <div className="absolute -inset-6 rounded-[48px] bg-gradient-to-br from-[var(--accent)]/10 via-[var(--accent-2)]/10 to-transparent blur-2xl transition group-hover:opacity-80" />
                <PhoneFrame floating className="relative z-10 transition group-hover:scale-[1.01]">
                  <ProfileView username={DEMO_USERNAME} content={demoPersonaContent} compact />
                </PhoneFrame>
                <p className="mt-4 text-center text-sm text-[var(--muted)] transition group-hover:text-[var(--foreground)]">
                  profyl.io/{DEMO_USERNAME} — clique pour voir
                </p>
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-[var(--border)] bg-white/50 py-24">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
              Pourquoi Profyl
            </p>
            <h2 className="mt-4 text-center font-[family-name:var(--font-display)] text-3xl font-semibold md:text-4xl">
              Conçu pour <span className="gradient-text">ressortir</span>
            </h2>

            <div className="mt-16 grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: Zap,
                  title: "Impact immédiat",
                  text: "Photo hero, typo soignée, liens cliquables — le recruteur retient ton profil en 10 secondes."
                },
                {
                  icon: Sparkles,
                  title: "Zéro friction",
                  text: "Un formulaire guidé. Pas de JSON, pas de mise en page, pas de choix de template."
                },
                {
                  icon: ArrowRight,
                  title: "Partage instantané",
                  text: "profyl.io/ton-nom + QR code. Un lien unique, toujours à jour."
                }
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-[var(--border)] bg-white p-8 shadow-[var(--shadow-sm)] transition hover:shadow-[var(--shadow-md)]"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)]">
                    <item.icon className="h-5 w-5 text-[var(--accent)]" />
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-28">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-[family-name:var(--font-display)] text-4xl font-semibold md:text-5xl">
              Prêt à te démarquer ?
            </h2>
            <p className="mt-4 text-lg text-[var(--muted)]">
              Inspire-toi de{" "}
              <Link href={`/${DEMO_USERNAME}`} className="font-medium text-[var(--accent)] underline underline-offset-4">
                Marie Laurent
              </Link>
              , puis crée le tien.
            </p>
            <Link href="/dashboard" className="mt-10 inline-block">
              <Button variant="accent" size="lg">
                Lancer mon Profyl
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-[var(--border)] py-8 text-center text-sm text-[var(--muted)]">
        Profyl · CV en ligne pour candidats francophones
      </footer>
    </div>
  );
}
