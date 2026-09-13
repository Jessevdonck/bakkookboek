import type { NextConfig } from "next";

// GitHub Pages serves project sites from https://<user>.github.io/<repo>/,
// so every asset needs that `/<repo>` prefix. The deploy workflow
// (.github/workflows/deploy.yml) sets NEXT_BASE_PATH to the repo name at
// build time; locally (npm run dev / build) it's unset, so the site is
// served from `/` as usual.
const basePath = process.env.NEXT_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Every page here is static (no API routes, no server actions), so we
  // export plain HTML/CSS/JS. That means this site can be uploaded to
  // any free static host — GitHub Pages, Vercel, Netlify, Cloudflare
  // Pages — with zero server-side config.
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
};

export default nextConfig;
