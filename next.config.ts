import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Forcer Turbopack à utiliser ce dossier comme root, sinon il remonte
  // jusqu'à ~/package-lock.json (workspace parent) à tort.
  // process.cwd() = dossier depuis lequel `npm run dev` est lancé (~/profyl).
  turbopack: {
    root: process.cwd()
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  }
};

export default nextConfig;
