import type { Metadata } from "next";

// Espace privé : jamais indexé (en plus du Disallow dans robots.ts).
export const metadata: Metadata = {
  robots: { index: false, follow: false }
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
