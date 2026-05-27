import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Forcer Turbopack à utiliser ce dossier comme root, sinon il remonte
  // jusqu'à ~/package-lock.json (workspace parent) à tort.
  turbopack: {
    root: path.resolve(__dirname)
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
