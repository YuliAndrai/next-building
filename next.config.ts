/**
 * @file next.config.ts
 * @layer Application / Framework Routing Layer
 * @description Next.js configuration module managing edge routing rules, canonical SEO
 * redirects, security headers, and asset optimization parameters.
 */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  outputFileTracingRoot: process.cwd(),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      }
    ]
  },
  /**
   * Configures canonical HTTP 301 permanent redirects for legacy Google-indexed URLs.
   *
   * HTTP 301 (Moved Permanently) instructs search engine crawlers (such as Googlebot) to pass
   * full link equity, PageRank authority, and ranking signals from legacy URL structures to
   * current canonical paths, preventing 404 crawl errors and preserving search engine positioning.
   *
   * @returns {Promise<Array<{ source: string; destination: string; permanent: boolean }>>}
   * An array of canonical redirect descriptors.
   */
  async redirects() {
    // Step 1: Define canonical mapping rules for legacy indexed routes
    const legacyRedirects = [
      {
        source: "/biografia",
        destination: "/#bio",
        permanent: true
      },
      {
        source: "/galeria",
        destination: "/press-kit",
        permanent: true
      },
      {
        source: "/nuevos-lanzamientos",
        destination: "/musica",
        permanent: true
      }
    ];

    // Step 2: Return compiled canonical redirects array
    return legacyRedirects;
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }
        ]
      }
    ];
  }
};

export default nextConfig;

