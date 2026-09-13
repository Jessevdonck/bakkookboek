import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every page here is static (no API routes, no server actions), so we
  // export plain HTML/CSS/JS. That means this site can be uploaded to
  // any free static host — Vercel, Netlify, GitHub Pages, Cloudflare
  // Pages — with zero server-side config.
  output: "export",
};

export default nextConfig;
