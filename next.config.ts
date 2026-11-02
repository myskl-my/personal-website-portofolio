import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export → hasil build berupa folder `out/` berisi HTML/CSS/JS murni.
  // Bisa dihosting di Cloudflare Pages, Netlify, dsb.
  // Syarat: tidak boleh memakai fitur yang butuh server Node.js
  // (server actions, cookies, rewrites, ISR, proxy).
  //
  // Catatan: `cacheComponents` (PPR) tidak kompatibel dengan export mode,
  // sehingga keduanya tidak bisa diaktifkan bersamaan.
  output: "export",
  trailingSlash: true,
  images: {
    // Optimasi gambar butuh server; untuk static export di-skip,
    // gambar disajikan apa adanya oleh CDN hosting.
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
