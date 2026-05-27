import { signOut } from "@/app/dashboard/actions";
import { HeaderActions, HeaderCta } from "@/components/header-actions";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { LogOut } from "lucide-react";

/**
 * Header partagé (landing, pricing).
 * Server Component pour l'auth check, contient des Client Components
 * (toggles, CTA) qui consomment les contextes theme / i18n.
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
        <HeaderActions
          showPricing={showPricing}
          showExample={showExample}
          demoUsername={demoUsername}
          isAuthed={isAuthed}
        />

        {/* Theme + Locale — toujours visibles */}
        <div className="hidden items-center gap-2 sm:flex">
          <ThemeToggle />
          <LocaleSwitcher />
        </div>

        {isAuthed ? (
          <form action={signOut}>
            <button
              type="submit"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[var(--muted)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
              title={user?.email ?? "Se déconnecter"}
              aria-label="Se déconnecter"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </form>
        ) : null}

        <HeaderCta isAuthed={isAuthed} />
      </div>
    </header>
  );
}
