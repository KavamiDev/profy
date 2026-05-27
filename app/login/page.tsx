import { LoginForm } from "@/components/login-form";
import { Logo } from "@/components/logo";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Connexion — Profyl"
};

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ next?: string; sent?: string; error?: string }>;
}) {
  const params = await searchParams;

  // Si déjà connecté, redirige direct.
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  if (user) {
    redirect(params.next || "/dashboard");
  }

  return (
    <div className="grain relative flex min-h-screen flex-col bg-[var(--background)]">
      <header className="relative z-10 mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6">
        <Logo />
        <Link
          href="/"
          className="text-sm text-[var(--muted)] transition hover:text-[var(--foreground)]"
        >
          ← Retour
        </Link>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-6 pb-20">
        <div className="w-full max-w-md">
          <div className="text-center">
            <p className="hero-eyebrow">Connexion</p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold tracking-tight md:text-5xl">
              Ton CV en ligne, <em className="italic text-[var(--accent)]">en un email.</em>
            </h1>
            <p className="mx-auto mt-4 max-w-sm text-[var(--muted-strong)]">
              On t&apos;envoie un lien magique. Pas de mot de passe à retenir,
              pas de compte à créer.
            </p>
          </div>

          <div className="mt-10 rounded-3xl border border-[var(--border)] bg-white p-7 shadow-[var(--shadow-lg)]">
            <LoginForm next={params.next} />
          </div>

          {params.sent === "1" ? (
            <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
              ✓ Email envoyé. Ouvre ta boîte mail et clique sur le lien
              pour te connecter.
            </div>
          ) : null}

          {params.error ? (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {params.error === "send-failed"
                ? "Impossible d'envoyer le lien. Vérifie ton email et réessaie."
                : params.error === "invalid-callback"
                  ? "Lien expiré ou invalide. Réessaie."
                  : "Erreur de connexion. Réessaie."}
            </div>
          ) : null}

          <p className="mt-8 text-center text-xs text-[var(--muted)]">
            En te connectant, tu acceptes nos conditions d&apos;utilisation.
            <br />
            Tes données sont hébergées en France 🇫🇷.
          </p>
        </div>
      </main>
    </div>
  );
}
