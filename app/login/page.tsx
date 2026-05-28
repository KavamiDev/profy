import { LoginContent } from "@/components/login-content";
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
        <LoginContent
          next={params.next}
          sent={params.sent === "1"}
          error={params.error}
        />
      </main>
    </div>
  );
}
