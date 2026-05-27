import { Pencil } from "lucide-react";
import Link from "next/link";

/**
 * Bouton flottant "Modifier" visible uniquement quand l'user connecté
 * visite SA PROPRE page publique. Affiché en haut à droite, sticky.
 */
export function FloatingEditButton() {
  return (
    <Link
      href="/dashboard"
      className="fixed right-5 top-5 z-30 inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white px-4 py-2.5 text-sm font-medium text-[var(--foreground)] shadow-[var(--shadow-md)] transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[var(--shadow-lg)] sm:right-8 sm:top-8"
    >
      <Pencil className="h-3.5 w-3.5 text-[var(--accent)]" />
      Modifier
    </Link>
  );
}
