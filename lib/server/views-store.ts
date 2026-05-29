import { createSupabaseServerClient } from "@/lib/supabase/server";

export type ViewStats = {
  total: number;
  last7: number;
  last30: number;
  /** Vues par jour sur les 30 derniers jours (ordre chronologique). */
  daily: { date: string; count: number }[];
  topReferers: { host: string; count: number }[];
  topCountries: { country: string; count: number }[];
};

const EMPTY_STATS: ViewStats = {
  total: 0,
  last7: 0,
  last30: 0,
  daily: [],
  topReferers: [],
  topCountries: []
};

function dayKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/**
 * Agrège les vues d'un profil pour le dashboard Pro.
 * Lecture via le client server (RLS : seul le owner voit ses vues).
 * Total = all-time (count head) ; séries & répartitions = 30 derniers jours.
 */
export async function getViewStats(profileId: string): Promise<ViewStats> {
  const supabase = await createSupabaseServerClient();

  const { count: total } = await supabase
    .from("profile_views")
    .select("id", { count: "exact", head: true })
    .eq("profile_id", profileId);

  const since = new Date();
  since.setDate(since.getDate() - 29);
  since.setHours(0, 0, 0, 0);

  const { data, error } = await supabase
    .from("profile_views")
    .select("viewed_at, referer_host, country")
    .eq("profile_id", profileId)
    .gte("viewed_at", since.toISOString())
    .order("viewed_at", { ascending: false })
    .limit(10000);

  if (error) return EMPTY_STATS;

  const rows = data ?? [];

  // Squelette des 30 jours (à 0) pour une courbe continue.
  const dailyMap = new Map<string, number>();
  for (let i = 0; i < 30; i++) {
    const d = new Date(since);
    d.setDate(since.getDate() + i);
    dailyMap.set(dayKey(d), 0);
  }

  const now = Date.now();
  const sevenAgo = now - 7 * 24 * 60 * 60 * 1000;
  let last7 = 0;
  const refererCounts = new Map<string, number>();
  const countryCounts = new Map<string, number>();

  for (const row of rows) {
    const ts = new Date(row.viewed_at).getTime();
    const key = dayKey(new Date(row.viewed_at));
    if (dailyMap.has(key)) dailyMap.set(key, (dailyMap.get(key) ?? 0) + 1);
    if (ts >= sevenAgo) last7++;

    const host = row.referer_host || "direct";
    refererCounts.set(host, (refererCounts.get(host) ?? 0) + 1);
    if (row.country) countryCounts.set(row.country, (countryCounts.get(row.country) ?? 0) + 1);
  }

  const topN = (m: Map<string, number>, n: number) =>
    [...m.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);

  return {
    total: total ?? 0,
    last7,
    last30: rows.length,
    daily: [...dailyMap.entries()].map(([date, count]) => ({ date, count })),
    topReferers: topN(refererCounts, 5).map(([host, count]) => ({ host, count })),
    topCountries: topN(countryCounts, 5).map(([country, count]) => ({ country, count }))
  };
}
