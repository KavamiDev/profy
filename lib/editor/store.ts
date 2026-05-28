import { create } from "zustand";
import { defaultProfileContent, type ProfileContent } from "@/types/profile";
import { buffersFromContent, type EditorBuffers } from "./normalize";

type ItemArrays = {
  experience: ProfileContent["experience"];
  education: ProfileContent["education"];
  projects: ProfileContent["projects"];
  languages: ProfileContent["languages"];
};
export type ItemKey = keyof ItemArrays;

const EMPTY_ITEM: { [K in ItemKey]: ItemArrays[K][number] } = {
  experience: { company: "", role: "", start: "", end: "", description: "" },
  education: { school: "", degree: "", start: "", end: "" },
  projects: { name: "", link: "", description: "" },
  languages: { name: "", level: "" }
};

export type EditorState = {
  username: string;
  content: ProfileContent;
  buffers: EditorBuffers;
  restoredFromDraft: boolean;

  setUsername(value: string): void;
  setHero<K extends keyof ProfileContent["hero"]>(key: K, value: ProfileContent["hero"][K]): void;
  setContact<K extends keyof ProfileContent["contact"]>(key: K, value: ProfileContent["contact"][K]): void;
  setBuffer<K extends keyof EditorBuffers>(key: K, value: EditorBuffers[K]): void;

  addItem(key: ItemKey): void;
  updateItem<K extends ItemKey>(key: K, idx: number, patch: Partial<ItemArrays[K][number]>): void;
  removeItem(key: ItemKey, idx: number): void;

  hydrate(payload: { username: string; content: ProfileContent; restoredFromDraft?: boolean }): void;
};

function sanitizeUsername(raw: string): string {
  return raw.toLowerCase().replace(/[^a-z0-9-]/g, "");
}

export const useEditorStore = create<EditorState>((set) => ({
  username: "",
  content: defaultProfileContent,
  buffers: buffersFromContent(defaultProfileContent),
  restoredFromDraft: false,

  setUsername: (value) => set({ username: sanitizeUsername(value) }),

  setHero: (key, value) =>
    set((s) => ({ content: { ...s.content, hero: { ...s.content.hero, [key]: value } } })),

  setContact: (key, value) =>
    set((s) => ({ content: { ...s.content, contact: { ...s.content.contact, [key]: value } } })),

  setBuffer: (key, value) =>
    set((s) => ({ buffers: { ...s.buffers, [key]: value } })),

  addItem: (key) =>
    set((s) => ({
      content: { ...s.content, [key]: [...s.content[key], { ...EMPTY_ITEM[key] }] }
    })),

  updateItem: (key, idx, patch) =>
    set((s) => ({
      content: {
        ...s.content,
        [key]: s.content[key].map((item, i) => (i === idx ? { ...item, ...patch } : item))
      }
    })),

  removeItem: (key, idx) =>
    set((s) => ({
      content: { ...s.content, [key]: s.content[key].filter((_, i) => i !== idx) }
    })),

  hydrate: ({ username, content, restoredFromDraft = false }) =>
    set({
      username: sanitizeUsername(username),
      content,
      buffers: buffersFromContent(content),
      restoredFromDraft
    })
}));
