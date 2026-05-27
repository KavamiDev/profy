import { signOut } from "@/app/dashboard/actions";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { ArrowRight, ExternalLink, LogOut } from "lucide-react";
import Link from "next/link";

/**
 * Header partagé (landing, pricing).
 * - Si user connecté : CTA "Continuer mon profil" + bouton "Se déconnecter"
 * - Si user anonyme : CTA "Créer mon profil" + lien Pricing/Exemple
 */
export async function SiteHeader({
  showPricing = true,
  showExample = false,
  demoUsername
}: {
  showPricing?: boolean;
  showExample?: boolean;
  demoUsername?: string;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const isAuthed = Boolean(user);

  return (
    <header className="relative z-20 mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
      <Logo />
      <div className="flex items-center gap-3">
        {showPricing ? (
          <Link
            href="/pricing"
            className="hidden text-sm text-[var(--muted)] transition hover:text-[var(--foreground)] sm:inline-block"
          >
            Pricing
          </Link>
        ) : null}
        {showExample && demoUsername ? (
          <Link
            href={`/${demoUsername}`}
            className="hidden items-center gap-1.5 text-sm text-[var(--muted)] transition hover:text-[var(--foreground)] sm:inline-flex"
          >
            Exemple
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        ) : null}

        {isAuthed ? (
          <>
            <Link href="/dashboard">
              <Button variant="accent" size="sm">
                Continuer mon profil
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--muted)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
                title={`Se déconnecter (${user?.email ?? ""})`}
                aria-label="Se déconnecter"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </form>
          </>
        ) : (
          <Link href="/dashboard">
            <Button variant="primary" size="sm">
              Créer mon profil
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
}
