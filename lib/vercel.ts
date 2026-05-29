/**
 * Wrapper minimal de l'API Vercel Domains pour brancher les domaines custom
 * des utilisateurs Pro sur le projet Profyl.
 *
 * Secrets requis (à poser dans .env.local / Vercel env) :
 *   VERCEL_API_TOKEN, VERCEL_PROJECT_ID, [VERCEL_TEAM_ID]
 *
 * Mode dégradé : si les secrets manquent, chaque appel renvoie
 * `{ ok:false, reason:"not_configured" }` → l'UI reste fonctionnelle.
 */

const API = "https://api.vercel.com";

type VercelConfig = { token: string; projectId: string; teamId?: string };

function getConfig(): VercelConfig | null {
  const token = process.env.VERCEL_API_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  if (!token || !projectId) return null;
  return { token, projectId, teamId: process.env.VERCEL_TEAM_ID };
}

function q(cfg: VercelConfig): string {
  return cfg.teamId ? `?teamId=${cfg.teamId}` : "";
}

export type DomainVerification = {
  type: string;
  domain: string;
  value: string;
  reason: string;
};

export type DomainStatus = {
  verified: boolean;
  misconfigured: boolean;
  verification: DomainVerification[];
};

export type VercelResult<T> =
  | { ok: true; data: T }
  | { ok: false; reason: "not_configured" | "api_error"; message?: string };

async function call<T>(
  cfg: VercelConfig,
  path: string,
  init?: RequestInit
): Promise<VercelResult<T>> {
  try {
    const res = await fetch(`${API}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${cfg.token}`,
        "Content-Type": "application/json",
        ...(init?.headers ?? {})
      }
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      return {
        ok: false,
        reason: "api_error",
        message: (json as { error?: { message?: string } })?.error?.message ?? `HTTP ${res.status}`
      };
    }
    return { ok: true, data: json as T };
  } catch (e) {
    return { ok: false, reason: "api_error", message: (e as Error).message };
  }
}

/** Ajoute le domaine au projet Vercel. */
export async function addDomain(domain: string): Promise<VercelResult<{ name: string }>> {
  const cfg = getConfig();
  if (!cfg) return { ok: false, reason: "not_configured" };
  return call(cfg, `/v10/projects/${cfg.projectId}/domains${q(cfg)}`, {
    method: "POST",
    body: JSON.stringify({ name: domain })
  });
}

/** Récupère l'état de vérification + configuration DNS d'un domaine. */
export async function getDomainStatus(domain: string): Promise<VercelResult<DomainStatus>> {
  const cfg = getConfig();
  if (!cfg) return { ok: false, reason: "not_configured" };

  const project = await call<{ verified: boolean; verification?: DomainVerification[] }>(
    cfg,
    `/v9/projects/${cfg.projectId}/domains/${domain}${q(cfg)}`
  );
  if (!project.ok) return project;

  const config = await call<{ misconfigured: boolean }>(
    cfg,
    `/v6/domains/${domain}/config${q(cfg)}`
  );

  return {
    ok: true,
    data: {
      verified: project.data.verified,
      misconfigured: config.ok ? config.data.misconfigured : true,
      verification: project.data.verification ?? []
    }
  };
}

/** Retire le domaine du projet Vercel. */
export async function removeDomain(domain: string): Promise<VercelResult<unknown>> {
  const cfg = getConfig();
  if (!cfg) return { ok: false, reason: "not_configured" };
  return call(cfg, `/v9/projects/${cfg.projectId}/domains/${domain}${q(cfg)}`, {
    method: "DELETE"
  });
}

export function isVercelConfigured(): boolean {
  return getConfig() !== null;
}

/** Domaine apex (ex: nom.fr) vs sous-domaine (ex: cv.nom.fr) → instructions DNS. */
export function dnsInstructions(domain: string): {
  type: "apex" | "subdomain";
  record: { kind: "A" | "CNAME"; name: string; value: string };
} {
  const labels = domain.split(".");
  const isApex = labels.length <= 2;
  return isApex
    ? { type: "apex", record: { kind: "A", name: "@", value: "76.76.21.21" } }
    : {
        type: "subdomain",
        record: { kind: "CNAME", name: labels[0], value: "cname.vercel-dns.com" }
      };
}
