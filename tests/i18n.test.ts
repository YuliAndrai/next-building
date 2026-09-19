/**
 * @file tests/i18n.test.ts
 * @layer Test Layer / Unit Verification
 * @description TDD unit & integration test suite for 8-language internationalization (i18n), path routing, dictionary schema parity, and Next.js 16 proxy.
 */

import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";

import {
  DEFAULT_LOCALE,
  isSupportedLocale,
  LOCALE_LABELS,
  LOCALE_METADATA,
  resolveSafeLocale,
  SUPPORTED_LOCALES,
} from "@/i18n/constants";
import {
  getLocalizedHref,
  localizedPathnames,
  routingConfig,
} from "@/i18n/routing";
import type { MessagesSchema, SupportedLocale } from "@/i18n/types";

// ============================================================================
// Test Suite Helpers & Fixtures
// ============================================================================

/**
 * Safely loads and parses a locale dictionary from the filesystem.
 *
 * @param locale - Target locale identifier.
 * @returns Parsed JSON object if file exists and is valid, or null otherwise.
 */
function loadLocaleDictionary(locale: string): MessagesSchema | null {
  const filePath = path.resolve(process.cwd(), `apps/web/src/messages/${locale}.json`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  try {
    const rawContent = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(rawContent) as MessagesSchema;
  } catch {
    return null;
  }
}

/**
 * Recursively flattens an object into dotted leaf key paths.
 *
 * @param obj - Object to extract keys from.
 * @param prefix - Accumulated key prefix.
 * @returns Array of fully-qualified key paths.
 */
function extractLeafKeys(obj: Record<string, unknown>, prefix = ""): string[] {
  return Object.entries(obj).flatMap(([key, value]) => {
    const currentPath = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      return extractLeafKeys(value as Record<string, unknown>, currentPath);
    }
    return [currentPath];
  });
}

/**
 * Interface contract representing the expected Next.js 16 proxy module.
 */
interface ProxyModuleContract {
  readonly proxy: (request: Request) => Promise<Response | undefined> | Response | undefined;
}

/**
 * Attempts to dynamically import the Next.js 16 proxy module without breaking bundle resolution.
 *
 * @returns Loaded proxy module or null if file does not exist or cannot be loaded.
 */
async function loadProxyModule(): Promise<ProxyModuleContract | null> {
  const proxyPath = path.resolve(process.cwd(), "apps/web/src/proxy.ts");
  if (!fs.existsSync(proxyPath)) {
    return null;
  }
  try {
    const mod = await import(proxyPath);
    return mod as ProxyModuleContract;
  } catch {
    return null;
  }
}

// ============================================================================
// REQ-I18N-01: Supported Locales & Fallback Resolver
// ============================================================================

describe("REQ-I18N-01: Supported Locales & Fallback Resolver", () => {
  test("@spec REQ-I18N-01: Supported Locales & Fallback Resolver - declares exactly 8 canonical supported locales in immutable order", () => {
    // Step 1: Arrange - define the expected canonical order of languages
    const expectedLocales: readonly SupportedLocale[] = [
      "en",
      "es",
      "de",
      "it",
      "fr",
      "pt",
      "zh",
      "ja",
    ];

    // Step 2: Act - read SUPPORTED_LOCALES constant from domain layer
    const actualLocales = SUPPORTED_LOCALES;

    // Step 3: Assert - verify exact count, order, and element integrity
    expect(actualLocales).toHaveLength(8);
    expect(actualLocales).toEqual(expectedLocales);
  });

  test("@spec REQ-I18N-01: Supported Locales & Fallback Resolver - designates English as canonical default fallback locale", () => {
    // Step 1: Arrange - expected global default fallback
    const expectedDefault: SupportedLocale = "en";

    // Step 2: Act - access DEFAULT_LOCALE constant
    const actualDefault = DEFAULT_LOCALE;

    // Step 3: Assert - verify default locale is English and is first in tuple
    expect(actualDefault).toBe(expectedDefault);
    expect(SUPPORTED_LOCALES[0]).toBe(expectedDefault);
  });

  test("@spec REQ-I18N-01: Supported Locales & Fallback Resolver - registers complete metadata with native endonyms, BCP 47 codes, and flags for all 8 locales", () => {
    // Step 1: Arrange - define expected native names and BCP 47 tags
    const expectedMetadataSpec: Record<
      SupportedLocale,
      { nativeName: string; bcp47: string; flag: string; isDefault?: boolean }
    > = {
      en: { nativeName: "English", bcp47: "en-US", flag: "🇬🇧", isDefault: true },
      es: { nativeName: "Español", bcp47: "es-ES", flag: "🇪🇸" },
      de: { nativeName: "Deutsch", bcp47: "de-DE", flag: "🇩🇪" },
      it: { nativeName: "Italiano", bcp47: "it-IT", flag: "🇮🇹" },
      fr: { nativeName: "Français", bcp47: "fr-FR", flag: "🇫🇷" },
      pt: { nativeName: "Português", bcp47: "pt-PT", flag: "🇵🇹" },
      zh: { nativeName: "简体中文", bcp47: "zh-CN", flag: "🇨🇳" },
      ja: { nativeName: "日本語", bcp47: "ja-JP", flag: "🇯🇵" },
    };

    // Step 2: Act - read LOCALE_METADATA registry
    const metadata = LOCALE_METADATA;

    // Step 3: Assert - verify each of the 8 locales has fully populated descriptors
    for (const locale of SUPPORTED_LOCALES) {
      const entry = metadata[locale];
      const spec = expectedMetadataSpec[locale];

      expect(entry, `Metadata for locale "${locale}" must be defined`).toBeDefined();
      expect(entry.code).toBe(locale);
      expect(entry.nativeName).toBe(spec.nativeName);
      expect(entry.bcp47).toBe(spec.bcp47);
      expect(entry.flag).toBe(spec.flag);
      expect(entry.direction).toBe("ltr");
      if (spec.isDefault) {
        expect(entry.isDefault).toBe(true);
      }
    }
  });

  test("@spec REQ-I18N-01: Supported Locales & Fallback Resolver - defines compact 2-letter uppercase labels for UI selectors", () => {
    // Step 1: Arrange - expected 2-character uppercase labels
    const expectedLabels: Record<SupportedLocale, string> = {
      en: "EN",
      es: "ES",
      de: "DE",
      it: "IT",
      fr: "FR",
      pt: "PT",
      zh: "ZH",
      ja: "JA",
    };

    // Step 2: Act - read LOCALE_LABELS constant
    const actualLabels = LOCALE_LABELS;

    // Step 3: Assert - verify complete 1-to-1 match
    expect(actualLabels).toEqual(expectedLabels);
  });

  test("@spec REQ-I18N-01: Supported Locales & Fallback Resolver - isSupportedLocale type guard accepts valid locales and normalizes case/whitespace", () => {
    // Step 1: Arrange - test matrix of valid codes in diverse casings and surrounding whitespace
    const validCandidates = [
      "en",
      "es",
      "de",
      "it",
      "fr",
      "pt",
      "zh",
      "ja",
      "EN",
      "Es",
      "  de  ",
      "IT ",
      "ZH",
    ];

    // Step 2: Act & Step 3: Assert - verify all valid candidates return true
    for (const candidate of validCandidates) {
      expect(
        isSupportedLocale(candidate),
        `Candidate "${candidate}" should be recognized as supported locale`,
      ).toBe(true);
    }
  });

  test("@spec REQ-I18N-01: Supported Locales & Fallback Resolver - isSupportedLocale type guard rejects unsupported languages, invalid formats, and non-string inputs", () => {
    // Step 1: Arrange - test matrix of unsupported languages, empty inputs, and non-string types
    const invalidInputs: unknown[] = [
      "ru",
      "ko",
      "ar",
      "nl",
      "sv",
      "",
      "   ",
      "english",
      null,
      undefined,
      123,
      {},
      [],
      true,
      false,
    ];

    // Step 2: Act & Step 3: Assert - verify all return false
    for (const input of invalidInputs) {
      expect(
        isSupportedLocale(input),
        `Input "${String(input)}" must be rejected by isSupportedLocale`,
      ).toBe(false);
    }
  });

  test("@spec REQ-I18N-01: Supported Locales & Fallback Resolver - resolveSafeLocale resolves known locales and safely falls back to English for unknown/falsy inputs", () => {
    // Step 1: Arrange - define resolution expectations
    const testCases: Array<{ input: string | null | undefined; expected: SupportedLocale }> = [
      { input: "es", expected: "es" },
      { input: "de", expected: "de" },
      { input: "fr", expected: "fr" },
      { input: "zh", expected: "zh" },
      { input: "ja", expected: "ja" },
      { input: "ru", expected: "en" },
      { input: "ko", expected: "en" },
      { input: "", expected: "en" },
      { input: null, expected: "en" },
      { input: undefined, expected: "en" },
      { input: "malicious/path", expected: "en" },
    ];

    // Step 2: Act & Step 3: Assert - verify safe resolution and fallback
    for (const { input, expected } of testCases) {
      const result = resolveSafeLocale(input);
      expect(
        result,
        `resolveSafeLocale("${String(input)}") must resolve to "${expected}"`,
      ).toBe(expected);
    }
  });
});

// ============================================================================
// REQ-I18N-02: Localized Pathname Mapping & Routing Resolution
// ============================================================================

describe("REQ-I18N-02: Localized Pathname Mapping & Routing Resolution", () => {
  test("@spec REQ-I18N-02: Localized Pathname Mapping & Routing Resolution - routingConfig binds canonical locales with prefix always", () => {
    // Step 1: Arrange - expected configuration parameters
    const expectedLocaleCount = 8;
    const expectedDefault = "en";
    const expectedPrefix = "always";

    // Step 2: Act - inspect routingConfig
    const config = routingConfig;

    // Step 3: Assert - verify configuration structure
    expect(config.locales).toEqual(SUPPORTED_LOCALES);
    expect(config.locales).toHaveLength(expectedLocaleCount);
    expect(config.defaultLocale).toBe(expectedDefault);
    expect(config.localePrefix).toBe(expectedPrefix);
    expect(config.pathnames).toBe(localizedPathnames);
  });

  test("@spec REQ-I18N-02: Localized Pathname Mapping & Routing Resolution - localizedPathnames covers all internal platform routes across 8 locales", () => {
    // Step 1: Arrange - canonical internal route identifiers
    const requiredRoutes = ["/contacto", "/musica", "/eventos", "/bio", "/press"];

    // Step 2: Act - examine localizedPathnames dictionary
    const mappings = localizedPathnames;

    // Step 3: Assert - verify root mapping and internal route dictionaries
    expect(mappings["/"]).toBe("/");

    for (const route of requiredRoutes) {
      const routeMapping = mappings[route];
      expect(routeMapping, `Path mapping for "${route}" must exist`).toBeDefined();
      expect(typeof routeMapping).toBe("object");

      const mappingObj = routeMapping as Record<SupportedLocale, string>;
      for (const locale of SUPPORTED_LOCALES) {
        expect(
          mappingObj[locale],
          `Route "${route}" must have a localized slug for locale "${locale}"`,
        ).toBeDefined();
        expect(mappingObj[locale].startsWith("/")).toBe(true);
        expect(mappingObj[locale].length).toBeGreaterThan(1);
      }
    }
  });

  test("@spec REQ-I18N-02: Localized Pathname Mapping & Routing Resolution - getLocalizedHref resolves route translations with locale prefixes across languages", () => {
    // Step 1: Arrange - test matrix of routes, locales, and expected translated hrefs
    const translationMatrix: Array<{
      route: string;
      locale: SupportedLocale;
      expectedHref: string;
    }> = [
      // Contact page translations
      { route: "/contacto", locale: "en", expectedHref: "/en/contact" },
      { route: "/contacto", locale: "es", expectedHref: "/es/contacto" },
      { route: "/contacto", locale: "de", expectedHref: "/de/kontakt" },
      { route: "/contacto", locale: "it", expectedHref: "/it/contatti" },
      { route: "/contacto", locale: "fr", expectedHref: "/fr/contact" },
      { route: "/contacto", locale: "pt", expectedHref: "/pt/contato" },
      { route: "/contacto", locale: "zh", expectedHref: "/zh/contact" },
      { route: "/contacto", locale: "ja", expectedHref: "/ja/contact" },

      // Music page translations
      { route: "/musica", locale: "en", expectedHref: "/en/music" },
      { route: "/musica", locale: "es", expectedHref: "/es/musica" },
      { route: "/musica", locale: "de", expectedHref: "/de/musik" },
      { route: "/musica", locale: "it", expectedHref: "/it/musica" },
      { route: "/musica", locale: "fr", expectedHref: "/fr/musique" },
      { route: "/musica", locale: "pt", expectedHref: "/pt/musica" },

      // Events / Tour page translations
      { route: "/eventos", locale: "en", expectedHref: "/en/tour" },
      { route: "/eventos", locale: "es", expectedHref: "/es/eventos" },
      { route: "/eventos", locale: "de", expectedHref: "/de/tour-daten" },
      { route: "/eventos", locale: "it", expectedHref: "/it/date-tour" },
      { route: "/eventos", locale: "fr", expectedHref: "/fr/tournee" },
      { route: "/eventos", locale: "pt", expectedHref: "/pt/turne" },

      // Press kit page translations
      { route: "/press", locale: "en", expectedHref: "/en/press" },
      { route: "/press", locale: "es", expectedHref: "/es/prensa" },
      { route: "/press", locale: "de", expectedHref: "/de/presse" },
      { route: "/press", locale: "it", expectedHref: "/it/stampa" },
      { route: "/press", locale: "fr", expectedHref: "/fr/presse" },
      { route: "/press", locale: "pt", expectedHref: "/pt/imprensa" },

      // Bio page translations
      { route: "/bio", locale: "zh", expectedHref: "/zh/bio" },
      { route: "/bio", locale: "ja", expectedHref: "/ja/bio" },
    ];

    // Step 2: Act & Step 3: Assert - verify each route resolution matches specification
    for (const { route, locale, expectedHref } of translationMatrix) {
      const resolved = getLocalizedHref(route, locale);
      expect(
        resolved,
        `getLocalizedHref("${route}", "${locale}") must equal "${expectedHref}"`,
      ).toBe(expectedHref);
    }
  });

  test("@spec REQ-I18N-02: Localized Pathname Mapping & Routing Resolution - getLocalizedHref handles root path and edge case unmapped routes gracefully", () => {
    // Step 1: Arrange - test scenarios for root, empty path, and unmapped custom subroutes
    const edgeCases: Array<{ path: string; locale: SupportedLocale; expectedHref: string }> = [
      { path: "/", locale: "es", expectedHref: "/es" },
      { path: "/", locale: "en", expectedHref: "/en" },
      { path: "/", locale: "de", expectedHref: "/de" },
      { path: "", locale: "fr", expectedHref: "/fr" },
      { path: "/merchandise", locale: "en", expectedHref: "/en/merchandise" },
      { path: "vip-experience", locale: "it", expectedHref: "/it/vip-experience" },
    ];

    // Step 2: Act & Step 3: Assert - verify edge case path formatting
    for (const { path: routePath, locale, expectedHref } of edgeCases) {
      const actualHref = getLocalizedHref(routePath, locale);
      expect(
        actualHref,
        `getLocalizedHref("${routePath}", "${locale}") must format cleanly to "${expectedHref}"`,
      ).toBe(expectedHref);
    }
  });
});

// ============================================================================
// REQ-I18N-03: Dictionary Schema Parity & 8-Language Coverage
// ============================================================================

describe("REQ-I18N-03: Dictionary Schema Parity & 8-Language Coverage", () => {
  test("@spec REQ-I18N-03: Dictionary Schema Parity & 8-Language Coverage - all 8 locale dictionary files exist on filesystem", () => {
    // Step 1: Arrange - target messages directory
    const messagesDirectory = path.resolve(process.cwd(), "apps/web/src/messages");

    // Step 2: Act & Step 3: Assert - verify physical presence of JSON dictionaries for each supported locale
    for (const locale of SUPPORTED_LOCALES) {
      const expectedFilePath = path.join(messagesDirectory, `${locale}.json`);
      const fileExists = fs.existsSync(expectedFilePath);
      expect(
        fileExists,
        `Dictionary file for locale "${locale}" must physically exist at "${expectedFilePath}"`,
      ).toBe(true);
    }
  });

  test("@spec REQ-I18N-03: Dictionary Schema Parity & 8-Language Coverage - all 8 dictionaries parse as valid JSON and adhere to MessagesSchema sections", () => {
    // Step 1: Arrange - list of required top-level section keys defined in MessagesSchema
    const expectedSections = [
      "nav",
      "home",
      "bio",
      "tour",
      "news",
      "booking",
      "contactPage",
      "musicPage",
      "mediaPage",
      "pressKitPage",
      "livePage",
      "footer",
    ];

    // Step 2: Act & Step 3: Assert - verify each file is valid JSON and exposes all sections
    for (const locale of SUPPORTED_LOCALES) {
      const dictionary = loadLocaleDictionary(locale);
      expect(
        dictionary,
        `Dictionary for locale "${locale}" must exist and be valid parseable JSON`,
      ).not.toBeNull();

      for (const section of expectedSections) {
        expect(
          dictionary![section as keyof MessagesSchema],
          `Dictionary for "${locale}" must contain section "${section}"`,
        ).toBeDefined();
        expect(
          typeof dictionary![section as keyof MessagesSchema],
          `Section "${section}" in "${locale}.json" must be an object`,
        ).toBe("object");
      }
    }
  });

  test("@spec REQ-I18N-03: Dictionary Schema Parity & 8-Language Coverage - all non-English dictionaries maintain 100% key parity with canonical en.json", () => {
    // Step 1: Arrange - load canonical master dictionary (en.json) and extract its leaf key paths
    const canonicalDictionary = loadLocaleDictionary("en");
    expect(
      canonicalDictionary,
      "Canonical dictionary en.json must exist to establish parity baseline",
    ).not.toBeNull();

    const canonicalKeys = extractLeafKeys(
      canonicalDictionary as unknown as Record<string, unknown>,
    ).sort();

    // Verify baseline contains at least 30 schema translation keys
    expect(
      canonicalKeys.length,
      "Canonical en.json must define a robust set of translation keys",
    ).toBeGreaterThanOrEqual(30);

    // Step 2: Act & Step 3: Assert - verify every other locale dictionary has exact same set of leaf keys
    for (const locale of SUPPORTED_LOCALES) {
      if (locale === "en") continue;

      const targetDictionary = loadLocaleDictionary(locale);
      expect(
        targetDictionary,
        `Target dictionary for locale "${locale}" must exist for parity check`,
      ).not.toBeNull();

      const targetKeys = extractLeafKeys(
        targetDictionary as unknown as Record<string, unknown>,
      ).sort();

      expect(
        targetKeys,
        `Dictionary for locale "${locale}" must have 100% exact key parity with canonical en.json`,
      ).toEqual(canonicalKeys);
    }
  });

  test("@spec REQ-I18N-03: Dictionary Schema Parity & 8-Language Coverage - all translation strings are non-empty and free of placeholder markers", () => {
    // Step 1: Arrange - define forbidden placeholder indicators
    const forbiddenPlaceholders = ["[TODO]", "TODO:", "[TRANSLATE]", "FIXME", "<!-- Describir", "PLACEHOLDER"];

    // Step 2: Act & Step 3: Assert - inspect every string value in all 8 dictionaries
    for (const locale of SUPPORTED_LOCALES) {
      const dictionary = loadLocaleDictionary(locale);
      expect(
        dictionary,
        `Dictionary for locale "${locale}" must exist to audit translation content`,
      ).not.toBeNull();

      const auditStrings = (obj: Record<string, unknown>, parentPath = "") => {
        for (const [key, value] of Object.entries(obj)) {
          const currentPath = parentPath ? `${parentPath}.${key}` : key;
          if (typeof value === "string") {
            expect(
              value.trim().length,
              `Translation string at "${currentPath}" in locale "${locale}" must not be blank`,
            ).toBeGreaterThan(0);

            expect(
              value.trim().toUpperCase() === "TODO",
              `Translation string at "${currentPath}" in locale "${locale}" must not be raw placeholder "TODO"`,
            ).toBe(false);

            for (const placeholder of forbiddenPlaceholders) {
              expect(
                value,
                `Translation string at "${currentPath}" in locale "${locale}" contains placeholder "${placeholder}"`,
              ).not.toContain(placeholder);
            }
          } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
            auditStrings(value as Record<string, unknown>, currentPath);
          }
        }
      };

      auditStrings(dictionary as unknown as Record<string, unknown>);
    }
  });

  test("@spec REQ-I18N-03: Dictionary Schema Parity & 8-Language Coverage - preserves immutable techno artist identity and collective naming across all 8 languages", () => {
    // Step 1: Arrange - required trademarked artist and collective names
    const requiredImmutableTerms = ["ANDHRAY", "Industrial Girls"];

    // Step 2: Act & Step 3: Assert - verify preservation across all language catalogs
    for (const locale of SUPPORTED_LOCALES) {
      const dictionary = loadLocaleDictionary(locale);
      expect(
        dictionary,
        `Dictionary for locale "${locale}" must exist for invariant check`,
      ).not.toBeNull();

      const rawJson = JSON.stringify(dictionary);
      for (const term of requiredImmutableTerms) {
        expect(
          rawJson,
          `Dictionary for locale "${locale}" must preserve immutable techno trademark "${term}"`,
        ).toContain(term);
      }
    }
  });
});

// ============================================================================
// REQ-I18N-04: Next.js 16 Request Proxy Contract & Asset Exclusion
// ============================================================================

describe("REQ-I18N-04: Next.js 16 Request Proxy Contract & Asset Exclusion", () => {
  test("@spec REQ-I18N-04: Next.js 16 Request Proxy Contract & Asset Exclusion - physical proxy module exists in apps/web/src/proxy.ts", () => {
    // Step 1: Arrange - resolve canonical Next.js 16 proxy path
    const proxyPath = path.resolve(process.cwd(), "apps/web/src/proxy.ts");

    // Step 2: Act - check physical existence on filesystem
    const exists = fs.existsSync(proxyPath);

    // Step 3: Assert - verify proxy.ts exists per Next.js 16 proxy convention
    expect(
      exists,
      `Next.js 16 request proxy implementation must physically exist at "${proxyPath}"`,
    ).toBe(true);
  });

  test("@spec REQ-I18N-04: Next.js 16 Request Proxy Contract & Asset Exclusion - exports callable proxy handler function", async () => {
    // Step 1: Arrange - attempt to load proxy module
    const proxyModule = await loadProxyModule();

    // Step 2: Act - inspect module export
    const proxyHandler = proxyModule?.proxy;

    // Step 3: Assert - verify module is loaded and exports proxy function
    expect(
      proxyModule,
      "apps/web/src/proxy.ts module must exist and be importable",
    ).not.toBeNull();
    expect(
      typeof proxyHandler,
      "apps/web/src/proxy.ts must export a callable 'proxy' function handler",
    ).toBe("function");
  });

  test("@spec REQ-I18N-04: Next.js 16 Request Proxy Contract & Asset Exclusion - excludes static assets, Next internals, and API routes from redirection", async () => {
    // Step 1: Arrange - list of asset and internal URL patterns that must bypass i18n redirection
    const assetUrls = [
      "http://localhost:3000/_next/static/chunks/main-app.js",
      "http://localhost:3000/_next/image?url=%2Fhero.webp&w=1920&q=75",
      "http://localhost:3000/favicon.ico",
      "http://localhost:3000/robots.txt",
      "http://localhost:3000/sitemap.xml",
      "http://localhost:3000/images/bio/press-photo.jpg",
      "http://localhost:3000/audio/memento-preview.mp3",
      "http://localhost:3000/api/health",
    ];

    const proxyModule = await loadProxyModule();
    expect(
      proxyModule,
      "apps/web/src/proxy.ts must exist to evaluate asset exclusion contract",
    ).not.toBeNull();

    // Step 2: Act & Step 3: Assert - verify proxy passes assets through without redirection
    for (const url of assetUrls) {
      const request = new Request(url, {
        headers: { "accept-language": "es-ES,es;q=0.9" },
      });

      const response = await proxyModule!.proxy(request);

      // Asset requests should either return undefined/null (passthrough) or non-redirect response
      if (response instanceof Response) {
        const isRedirect = response.status >= 300 && response.status < 400;
        expect(
          isRedirect,
          `Asset request for "${url}" must NOT be redirected (status: ${response.status})`,
        ).toBe(false);
      } else {
        expect(response).toBeUndefined();
      }
    }
  });

  test("@spec REQ-I18N-04: Next.js 16 Request Proxy Contract & Asset Exclusion - detects Accept-Language header on root and redirects to supported locale", async () => {
    // Step 1: Arrange - mapping of Accept-Language headers to expected redirect prefixes
    const detectionTestCases = [
      { header: "es-ES,es;q=0.9", expectedLocale: "es" },
      { header: "de-DE,de;q=0.9", expectedLocale: "de" },
      { header: "it-IT,it;q=0.9", expectedLocale: "it" },
      { header: "fr-FR,fr;q=0.9", expectedLocale: "fr" },
      { header: "pt-BR,pt;q=0.9", expectedLocale: "pt" },
      { header: "zh-CN,zh;q=0.9", expectedLocale: "zh" },
      { header: "ja-JP,ja;q=0.9", expectedLocale: "ja" },
      { header: "en-US,en;q=0.9", expectedLocale: "en" },
    ];

    const proxyModule = await loadProxyModule();
    expect(
      proxyModule,
      "apps/web/src/proxy.ts must exist to evaluate Accept-Language detection",
    ).not.toBeNull();

    // Step 2: Act & Step 3: Assert - verify each language header redirects to matching subroute
    for (const { header, expectedLocale } of detectionTestCases) {
      const request = new Request("http://localhost:3000/", {
        headers: { "accept-language": header },
      });

      const response = await proxyModule!.proxy(request);
      expect(
        response,
        `Root request with Accept-Language "${header}" must produce a redirect Response`,
      ).toBeInstanceOf(Response);

      const status = (response as Response).status;
      expect(
        status >= 300 && status < 400,
        `Expected redirect status (3xx) but received ${status}`,
      ).toBe(true);

      const location = (response as Response).headers.get("location");
      expect(location, "Redirect response must include Location header").toBeTruthy();
      expect(
        location?.endsWith(`/${expectedLocale}`) || location?.endsWith(`/${expectedLocale}/`),
        `Redirect location "${location}" must end with "/${expectedLocale}"`,
      ).toBe(true);
    }
  });

  test("@spec REQ-I18N-04: Next.js 16 Request Proxy Contract & Asset Exclusion - falls back to English for unsupported languages and missing headers", async () => {
    // Step 1: Arrange - requests with unsupported or missing language headers
    const fallbackRequests = [
      new Request("http://localhost:3000/", { headers: { "accept-language": "ru-RU,ru;q=0.9" } }),
      new Request("http://localhost:3000/", { headers: { "accept-language": "ko-KR,ko;q=0.9" } }),
      new Request("http://localhost:3000/", { headers: { "accept-language": "nl-NL,nl;q=0.9" } }),
      new Request("http://localhost:3000/"),
    ];

    const proxyModule = await loadProxyModule();
    expect(
      proxyModule,
      "apps/web/src/proxy.ts must exist to evaluate language fallback contract",
    ).not.toBeNull();

    // Step 2: Act & Step 3: Assert - verify fallback redirect points to /en
    for (const req of fallbackRequests) {
      const response = await proxyModule!.proxy(req);
      expect(response, "Root request must produce a redirect Response").toBeInstanceOf(Response);

      const location = (response as Response).headers.get("location");
      expect(location, "Redirect location must be defined").toBeTruthy();
      expect(
        location?.endsWith("/en") || location?.endsWith("/en/"),
        `Fallback redirect location "${location}" must point to "/en"`,
      ).toBe(true);
    }
  });

  test("@spec REQ-I18N-04: Next.js 16 Request Proxy Contract & Asset Exclusion - preserves query parameters on locale redirection", async () => {
    // Step 1: Arrange - request with query parameters
    const searchParams = "?utm_source=spotify&ref=berlin_tour&artist=andhray";
    const request = new Request(`http://localhost:3000/${searchParams}`, {
      headers: { "accept-language": "de-DE,de;q=0.9" },
    });

    const proxyModule = await loadProxyModule();
    expect(
      proxyModule,
      "apps/web/src/proxy.ts must exist to evaluate query parameter preservation",
    ).not.toBeNull();

    // Step 2: Act - process request through proxy handler
    const response = await proxyModule!.proxy(request);

    // Step 3: Assert - verify redirected URL retains exact search parameters
    expect(response).toBeInstanceOf(Response);
    const location = (response as Response).headers.get("location");
    expect(location, "Redirect location must be defined").toBeTruthy();
    expect(location).toContain("/de");
    expect(location).toContain("utm_source=spotify");
    expect(location).toContain("ref=berlin_tour");
    expect(location).toContain("artist=andhray");
  });
});
