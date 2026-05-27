import { AmbientBackground } from "@/components/ambient-background";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grain relative flex min-h-screen flex-col items-center justify-center px-6">
      <AmbientBackground variant="subtle" />
      <div className="relative z-10 text-center">
        <Logo className="mb-12 justify-center" />
        <p className="text-7xl font-[family-name:var(--font-display)] font-semibold gradient-text">404</p>
        <h1 className="mt-4 text-2xl font-semibold">Profil introuvable</h1>
        <p className="mt-2 text-[var(--muted)]">
          Ce username n&apos;existe pas encore.{" "}
          <Link href="/marie-laurent" className="text-[var(--accent)] underline underline-offset-4">
            Voir l&apos;exemple Marie
          </Link>
        </p>
        <Link href="/dashboard" className="mt-8 inline-block">
          <Button variant="accent">Créer mon profil</Button>
        </Link>
      </div>
    </div>
  );
}
