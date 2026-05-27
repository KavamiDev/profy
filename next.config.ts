import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

// ESM-safe __dirname (package.json a "type": "module").
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Forcer Turbopack à utiliser ce dossier comme root, sinon il remonte
  // jusqu'à ~/package-lock.json (workspace parent) à tort.
  turbopack: {
    root: __dirname
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
