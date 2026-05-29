import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PRIMARY_DOMAIN = process.env.NEXT_PUBLIC_PRIMARY_DOMAIN ?? "profyl.io";

/** Host appartenant à l'app elle-même (≠ domaine custom d'un utilisateur). */
function isPrimaryHost(host: string): boolean {
  return (
    host === PRIMARY_DOMAIN ||
    host.endsWith(`.${PRIMARY_DOMAIN}`) ||
    host.endsWith(".vercel.app") ||
    host === "localhost" ||
    host.startsWith("localhost:") ||
    host.startsWith("127.0.0.1")
  );
}

// Cache mémoire (par instance edge) domaine -> username, TTL 60s.
const domainCache = new Map<string, { username: string | null; exp: number }>();

/** Résout un domaine custom vérifié vers son username via Supabase REST. */
async function resolveCustomDomain(host: string): Promise<string | null> {
  const cached = domainCache.get(host);
  if (cached && cached.exp > Date.now()) return cached.username;

  let username: string | null = null;
  try {
    const url =
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/profiles` +
      `?custom_domain=eq.${encodeURIComponent(host)}` +
      `&custom_domain_verified=eq.true&status=eq.published&select=username&limit=1`;
    const res = await fetch(url, {
      headers: {
        apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`
      }
    });
    if (res.ok) {
      const rows = (await res.json()) as { username: string }[];
      username = rows[0]?.username ?? null;
    }
  } catch {
    username = null;
  }

  domainCache.set(host, { username, exp: Date.now() + 60_000 });
  return username;
}

/**
 * Middleware Next 16 — `proxy.ts` (renommé depuis `middleware.ts`).
 * 1. Domaines custom : rewrite vers la page profil `/[username]`.
 * 2. Supabase Auth : refresh des tokens à chaque request (domaine primaire).
 *
 * Entre createServerClient() et getUser() : RIEN (anti-pattern @supabase/ssr).
 */
export async function proxy(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").split(":")[0].toLowerCase();

  // --- Domaine custom : on mappe la racine vers le profil correspondant. ---
  if (host && !isPrimaryHost(host) && request.nextUrl.pathname === "/") {
    const username = await resolveCustomDomain(host);
    if (username) {
      return NextResponse.rewrite(new URL(`/${username}`, request.url));
    }
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        }
      }
    }
  );

  // Refresh session — DOIT être appelé immédiatement après createServerClient.
  await supabase.auth.getUser();

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, robots.txt, sitemap.xml
     * - Public files with extensions
     */
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
  ]
};
