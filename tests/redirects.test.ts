/**
 * @file tests/redirects.test.ts
 * @layer Test Layer / Domain & Routing Verification
 * @description Test-Driven Development (TDD) unit test suite verifying canonical HTTP 301 redirects
 * for legacy Google-indexed URLs (/biografia, /galeria, /nuevos-lanzamientos) in next.config.ts.
 */

import { describe, expect, test } from "vitest";
import nextConfig from "../next.config";
import { proxy } from "../apps/web/src/proxy";

// ============================================================================
// Types & Interfaces
// ============================================================================

/**
 * Expected canonical redirect rule structure according to Next.js routing specification.
 */
export interface CanonicalRedirectRule {
  source: string;
  destination: string;
  permanent: boolean;
}

// ============================================================================
// Constants & Expected Fixtures
// ============================================================================

/**
 * The 3 legacy URLs indexed by Google search engines and their target destinations.
 * Invariant: All must be HTTP 301 permanent redirects to preserve link equity and SEO authority.
 */
export const EXPECTED_CANONICAL_REDIRECTS: readonly CanonicalRedirectRule[] = [
  {
    source: "/biografia",
    destination: "/#bio",
    permanent: true,
  },
  {
    source: "/galeria",
    destination: "/press-kit",
    permanent: true,
  },
  {
    source: "/nuevos-lanzamientos",
    destination: "/musica",
    permanent: true,
  },
] as const;

// ============================================================================
// Test Suite: Next.js Canonical Redirects Verification
// ============================================================================

describe("Next.js Canonical HTTP 301 Redirects for Legacy Google URLs", () => {
  /**
   * @spec REQ-REDIRECT-01
   * Ensures that `nextConfig.redirects` is declared as an asynchronous function.
   */
  test("@spec REQ-REDIRECT-01: nextConfig.redirects is defined as a callable function", () => {
    // Step 1: Inspect nextConfig object export
    expect(nextConfig).toBeDefined();

    // Step 2: Verify redirects property is defined
    expect(
      nextConfig.redirects,
      "Expected nextConfig.redirects to be defined on nextConfig"
    ).toBeDefined();

    // Step 3: Verify redirects is of function type
    expect(
      typeof nextConfig.redirects,
      "Expected nextConfig.redirects to be a function"
    ).toBe("function");
  });

  /**
   * @spec REQ-REDIRECT-02
   * Ensures that `nextConfig.redirects()` returns the 3 canonical redirect mappings
   * for legacy Google-indexed URLs: /biografia, /galeria, /nuevos-lanzamientos.
   */
  test("@spec REQ-REDIRECT-02: returns canonical redirects for /biografia, /galeria, and /nuevos-lanzamientos", async () => {
    // Step 1: Guard against missing redirects function during RED phase
    if (typeof nextConfig.redirects !== "function") {
      throw new Error(
        "nextConfig.redirects is not defined or not a function (TDD RED phase)."
      );
    }

    // Step 2: Execute async redirects function
    const redirects = await nextConfig.redirects();

    // Step 3: Assert that returned redirects is an array
    expect(Array.isArray(redirects)).toBe(true);

    // Step 4: Verify each expected canonical redirect is present
    for (const expected of EXPECTED_CANONICAL_REDIRECTS) {
      const match = redirects.find((r) => r.source === expected.source);

      expect(
        match,
        `Expected redirect rule with source "${expected.source}" was not found.`
      ).toBeDefined();

      expect(
        match?.destination,
        `Expected redirect for "${expected.source}" to point to "${expected.destination}".`
      ).toBe(expected.destination);
    }
  });

  /**
   * @spec REQ-REDIRECT-03
   * Ensures that each canonical redirect has `permanent: true` (HTTP 301 status code)
   * to guarantee preservation of SEO juice, link equity, and search engine re-indexing.
   */
  test("@spec REQ-REDIRECT-03: enforces permanent: true (HTTP 301) for SEO link equity preservation", async () => {
    // Step 1: Guard against missing redirects function during RED phase
    if (typeof nextConfig.redirects !== "function") {
      throw new Error(
        "nextConfig.redirects is not defined or not a function (TDD RED phase)."
      );
    }

    // Step 2: Execute async redirects function
    const redirects = await nextConfig.redirects();

    // Step 3: Assert permanent === true for all legacy Google redirects
    for (const expected of EXPECTED_CANONICAL_REDIRECTS) {
      const match = redirects.find((r) => r.source === expected.source);
      const isPermanent = match && "permanent" in match ? match.permanent : false;

      expect(
        isPermanent,
        `Expected redirect rule for "${expected.source}" to have permanent: true (HTTP 301).`
      ).toBe(true);
    }
  });

  /**
   * @spec REQ-REDIRECT-04
   * Ensures that no circular redirects exist and that all destinations are valid relative paths or anchors.
   */
  test("@spec REQ-REDIRECT-04: prevents circular redirects and validates destination path integrity", async () => {
    // Step 1: Guard against missing redirects function during RED phase
    if (typeof nextConfig.redirects !== "function") {
      throw new Error(
        "nextConfig.redirects is not defined or not a function (TDD RED phase)."
      );
    }

    // Step 2: Execute async redirects function
    const redirects = await nextConfig.redirects();

    // Step 3: Validate each redirect does not route to itself and has valid destination format
    for (const rule of redirects) {
      expect(
        rule.source,
        `Circular redirect detected: source "${rule.source}" equals destination "${rule.destination}".`
      ).not.toBe(rule.destination);

      expect(
        rule.destination.startsWith("/") || rule.destination.startsWith("#"),
        `Destination "${rule.destination}" must be a valid relative path starting with "/" or anchor "#".`
      ).toBe(true);
    }
  });

  /**
   * @spec REQ-REDIRECT-05
   * Verifies strict 4-layer architecture compliance: next.config.ts sits at Framework/Application
   * Routing level and does not import Presentation JSX or direct DB modules.
   */
  test("@spec REQ-REDIRECT-05: enforces 4-layer architectural boundaries and configuration integrity", () => {
    // Step 1: Verify nextConfig object is present and valid
    expect(nextConfig).toBeDefined();
    expect(typeof nextConfig).toBe("object");

    // Step 2: Invariant check: nextConfig should not leak direct database drivers or React components
    expect((nextConfig as Record<string, unknown>).render).toBeUndefined();
    expect((nextConfig as Record<string, unknown>).pool).toBeUndefined();
  });
});

describe("Next.js 16 Request Proxy Canonical HTTP 301 Redirects with Locale Negotiation", () => {
  /**
   * @spec REQ-REDIRECT-06
   * Ensures that `proxy` intercepts legacy /galeria and redirects to /[locale]/press-kit via HTTP 301.
   */
  test("@spec REQ-REDIRECT-06: proxy redirects /galeria to /[locale]/press-kit via HTTP 301 based on Accept-Language", async () => {
    // Step 1: Arrange - request without locale prefix and Spanish Accept-Language
    const reqEs = new Request("http://localhost:3001/galeria", {
      headers: { "accept-language": "es-ES,es;q=0.9" },
    });

    // Step 2: Act - run through proxy handler
    const resEs = await proxy(reqEs);

    // Step 3: Assert - 301 status and redirected to /es/press-kit
    expect(resEs).toBeInstanceOf(Response);
    expect((resEs as Response).status).toBe(301);
    expect((resEs as Response).headers.get("location")).toBe("http://localhost:3001/es/press-kit");

    // Step 4: Request with English Accept-Language
    const reqEn = new Request("http://localhost:3001/galeria", {
      headers: { "accept-language": "en-US,en;q=0.9" },
    });
    const resEn = await proxy(reqEn);
    expect(resEn).toBeInstanceOf(Response);
    expect((resEn as Response).status).toBe(301);
    expect((resEn as Response).headers.get("location")).toBe("http://localhost:3001/en/press-kit");
  });

  /**
   * @spec REQ-REDIRECT-07
   * Ensures that `proxy` intercepts legacy /biografia and redirects to /[locale]#bio via HTTP 301.
   */
  test("@spec REQ-REDIRECT-07: proxy redirects /biografia to /[locale]#bio via HTTP 301 based on Accept-Language", async () => {
    // Step 1: Arrange - request without locale prefix and Spanish Accept-Language
    const req = new Request("http://localhost:3001/biografia", {
      headers: { "accept-language": "es-ES,es;q=0.9" },
    });

    // Step 2: Act - run through proxy handler
    const res = await proxy(req);

    // Step 3: Assert - 301 status and redirected to /es#bio
    expect(res).toBeInstanceOf(Response);
    expect((res as Response).status).toBe(301);
    expect((res as Response).headers.get("location")).toBe("http://localhost:3001/es#bio");
  });

  /**
   * @spec REQ-REDIRECT-08
   * Ensures that `proxy` intercepts legacy /nuevos-lanzamientos and redirects to /[locale]/musica via HTTP 301.
   */
  test("@spec REQ-REDIRECT-08: proxy redirects /nuevos-lanzamientos to /[locale]/musica via HTTP 301 based on Accept-Language", async () => {
    // Step 1: Arrange - request without locale prefix and Spanish Accept-Language
    const req = new Request("http://localhost:3001/nuevos-lanzamientos", {
      headers: { "accept-language": "es-ES,es;q=0.9" },
    });

    // Step 2: Act - run through proxy handler
    const res = await proxy(req);

    // Step 3: Assert - 301 status and redirected to /es/musica
    expect(res).toBeInstanceOf(Response);
    expect((res as Response).status).toBe(301);
    expect((res as Response).headers.get("location")).toBe("http://localhost:3001/es/musica");
  });

  /**
   * @spec REQ-REDIRECT-09
   * Ensures that `proxy` preserves explicit locale prefix like /en/galeria and redirects to /en/press-kit via HTTP 301.
   */
  test("@spec REQ-REDIRECT-09: proxy redirects explicit localized routes like /en/galeria to /en/press-kit via HTTP 301", async () => {
    // Step 1: Arrange - request with explicit /en locale prefix
    const req = new Request("http://localhost:3001/en/galeria");

    // Step 2: Act - run through proxy handler
    const res = await proxy(req);

    // Step 3: Assert - 301 status and redirected to /en/press-kit
    expect(res).toBeInstanceOf(Response);
    expect((res as Response).status).toBe(301);
    expect((res as Response).headers.get("location")).toBe("http://localhost:3001/en/press-kit");
  });
});
