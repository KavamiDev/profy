import { promises as fs } from "node:fs";
import path from "node:path";
import type { ProfileContent } from "@/types/profile";

type StoredProfile = {
  username: string;
  content: ProfileContent;
  updatedAt: string;
};

const dataDir = path.join(process.cwd(), "data");
const dbPath = path.join(dataDir, "profiles.json");

async function ensureDb() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(dbPath);
  } catch {
    await fs.writeFile(dbPath, "[]", "utf8");
  }
}

async function readAll(): Promise<StoredProfile[]> {
  await ensureDb();
  const raw = await fs.readFile(dbPath, "utf8");
  return JSON.parse(raw) as StoredProfile[];
}

async function writeAll(profiles: StoredProfile[]) {
  await ensureDb();
  await fs.writeFile(dbPath, JSON.stringify(profiles, null, 2), "utf8");
}

export async function getProfileByUsername(username: string) {
  const profiles = await readAll();
  return profiles.find((profile) => profile.username === username) ?? null;
}

export async function saveProfileByUsername(username: string, content: ProfileContent) {
  const profiles = await readAll();
  const idx = profiles.findIndex((profile) => profile.username === username);
  const payload: StoredProfile = {
    username,
    content,
    updatedAt: new Date().toISOString()
  };

  if (idx >= 0) {
    profiles[idx] = payload;
  } else {
    profiles.push(payload);
  }

  await writeAll(profiles);
}
