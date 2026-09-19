/**
 * @file apps/web/src/proxy.ts
 * @layer Infrastructure Layer / Request Proxy
 * @description Next.js 16 Request Proxy for locale negotiation, redirection, and localized route rewriting.
 * Replaces deprecated Next.js middleware with official proxy.ts convention.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, isSupportedLocale } from "@/i18n/constants";
import { localizedPathnames } from "@/i18n/routing";
import type { SupportedLocale } from "@/i18n/types";

/**
 * Parses Accept-Language header and determines the best matched supported locale.
 *
 * @param acceptLanguage The raw Accept-Language header string.
 * @returns The best matching SupportedLocale or null if no match.
 */
function parseAcceptLanguage(acceptLanguage: string | null): SupportedLocale | null {
  // Step 1: Guard against missing or empty header
  if (!acceptLanguage || acceptLanguage.trim().length === 0) {
    return null;
  }

  // Step 2: Parse language preferences with quality values (e.g. "es-ES,es;q=0.9,en;q=0.8")
  const entries = acceptLanguage
    .split(",")
    .map((item) => {
      const [lang, qPart] = item.trim().split(";");
      const q = qPart && qPart.startsWith("q=") ? parseFloat(qPart.slice(2)) : 1.0;
      return { lang: lang.trim().toLowerCase(), q: isNaN(q) ? 1.0 : q };
    })
    .sort((a, b) => b.q - a.q);

  // Step 3: Match candidates against supported locales
  for (const entry of entries) {
    // Check exact match (e.g. "es", "de")
    if (isSupportedLocale(entry.lang)) {
      return entry.lang;
    }
    // Check primary subtag (e.g. "es" from "es-es", "zh" from "zh-cn")
    const primaryTag = entry.lang.split("-")[0];
    if (isSupportedLocale(primaryTag)) {
      return primaryTag;
    }
  }

  return null;
}

/**
 * Checks if a pathname represents a static asset or Next.js internal path that should bypass proxy.
 *
 * @param pathname The URL pathname to check.
 * @returns True if the path should bypass proxy routing.
 */
function isStaticOrInternalAsset(pathname: string): boolean {
  // Step 1: Check Next.js internal paths and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml"
  ) {
    return true;
  }

  // Step 2: Check static asset folders or file extensions (images, audio, media)
  if (
    pathname.startsWith("/images") ||
    pathname.startsWith("/audio") ||
    pathname.startsWith("/press-kit/photos") ||
    /\.(jpg|jpeg|png|webp|svg|gif|ico|mp3|wav|mp4|webm|pdf|css|js|txt|xml|json)$/i.test(pathname)
  ) {
    return true;
  }

  return false;
}

/**
 * Next.js 16 Request Proxy Handler.
 *
 * Intercepts incoming requests at the network boundary to handle:
 * 1. Static asset and internal bypass.
 * 2. Root path ('/') Accept-Language locale negotiation and redirection.
 * 3. Localized route rewrites.
 *
 * @param request The incoming Request or NextRequest.
 * @returns Response with redirect/rewrite, or undefined to pass through.
 */
export async function proxy(request: Request | NextRequest): Promise<Response | undefined> {
  // Step 1: Extract URL and pathname
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Step 2: Exclude static assets and internals from proxy handling
  if (isStaticOrInternalAsset(pathname)) {
    return undefined;
  }

  // Step 3: Handle root path ('/') detection and redirection
  if (pathname === "/" || pathname === "") {
    const acceptLanguage = request.headers.get("accept-language");
    const detectedLocale = parseAcceptLanguage(acceptLanguage) || DEFAULT_LOCALE;
    const targetUrl = new URL(`/${detectedLocale}${url.search}`, url.origin);

    return Response.redirect(targetUrl.toString(), 307);
  }

  // Step 4: Check if path starts with a supported locale
  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (isSupportedLocale(firstSegment)) {
    const locale = firstSegment;
    const restPath = `/${segments.slice(1).join("/")}`;

    // Step 5: Check if restPath matches a localized slug to rewrite to canonical internal route
    for (const [canonicalPath, localizedMap] of Object.entries(localizedPathnames)) {
      if (typeof localizedMap === "object" && localizedMap !== null) {
        const record = localizedMap as Record<SupportedLocale, string>;
        const localizedSlug = record[locale];
        if (localizedSlug && restPath === localizedSlug && localizedSlug !== canonicalPath) {
          // Rewrite to internal route preserving search params
          const internalUrl = new URL(`/${locale}${canonicalPath}${url.search}`, url.origin);
          return NextResponse.rewrite(internalUrl);
        }
      }
    }

    return undefined;
  }

  // Step 6: If path has no supported locale prefix, redirect to default locale with path
  const targetUrl = new URL(`/${DEFAULT_LOCALE}${pathname}${url.search}`, url.origin);
  return Response.redirect(targetUrl.toString(), 307);
}

export default proxy;

/**
 * Next.js 16 Proxy configuration matcher.
 */
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"]
};
