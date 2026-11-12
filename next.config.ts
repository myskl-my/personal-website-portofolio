import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export → build output is `out/` folder containing pure HTML/CSS/JS.
  // Can be hosted on Cloudflare Pages, Netlify, etc.
  // Requirement: cannot use features that need Node.js server
  // (server actions, cookies, rewrites, ISR, proxy).
  //
  // Note: `cacheComponents` (PPR) is not compatible with export mode,
  // so both cannot be enabled at the same time.
  output: "export",
  trailingSlash: true,
  images: {
    // Image optimization needs server; for static export skipped, images
    // served as-is by CDN hosting.
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
