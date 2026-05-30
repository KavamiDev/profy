/**
 * Injecte un bloc JSON-LD (données structurées schema.org) dans le <head>/DOM.
 * Server component : rendu une seule fois côté serveur, lu par Googlebot.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // Le contenu vient de nos propres données, pas d'input utilisateur arbitraire.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
