import type { NextConfig } from "next";

// Hosted on Vercel, not as a static export: the /admin form needs a real
// server action (to call the GitHub API), which a purely static site
// (e.g. GitHub Pages) can't run.
const nextConfig: NextConfig = {};

export default nextConfig;
