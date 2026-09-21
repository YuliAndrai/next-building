/**
 * @file tests/euro-tour-dates.test.ts
 * @layer Test Layer / Unit Verification
 * @description TDD test suite validating the updated European tour dates ("Final Nov - Diciembre" / "Late Nov - Dec")
 * across site configuration (Layer 3) and all 10 i18n dictionaries (Layer 2).
 */

import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";

// ============================================================================
// Fixtures & Helper Utilities
// ============================================================================

/**
 * Reads a JSON message dictionary from apps/web/src/messages.
 *
 * @param {string} locale - The 2-letter language code (e.g. 'es', 'en', 'de').
 * @returns {Record<string, any>} Parsed message dictionary.
 */
function readDictionary(locale: string): Record<string, any> {
  const filePath = path.resolve(process.cwd(), `apps/web/src/messages/${locale}.json`);
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content);
}

/**
 * Reads the canonical site configuration source file.
 *
 * @returns {string} Raw source code of site-config.ts.
 */
function readSiteConfigSource(): string {
  const filePath = path.resolve(process.cwd(), "apps/web/src/data/site-config.ts");
  return fs.readFileSync(filePath, "utf-8");
}

// ============================================================================
// Test Suite: Euro Tour Date Framing & Multilingual Parity
// ============================================================================

describe("Euro Tour Date Calibration: 'Final Nov - Diciembre' / 'Late Nov - Dec'", () => {
  /**
   * @spec REQ-TOUR-DATES-01: Canonical Site Configuration
   * Ensures that apps/web/src/data/site-config.ts specifies 'FINAL NOV - DICIEMBRE' across all tour entries.
   */
  test("@spec REQ-TOUR-DATES-01: site-config.ts declares 'FINAL NOV - DICIEMBRE' across hero, announcement, and tour dates", () => {
    // Step 1: Arrange - load site-config source
    const source = readSiteConfigSource();

    // Step 2: Act & Assert - check heroBanner
    expect(source).toContain('heroBanner: "EURO TOUR (FINAL NOV - DICIEMBRE)"');

    // Check announcement text
    expect(source).toContain('text: "EURO TOUR (FINAL NOV - DICIEMBRE) — BOOKING & SHOWCASES"');

    // Check featuredTour title
    expect(source).toContain('title: "EURO TOUR (FINAL NOV - DICIEMBRE)"');

    // Check tour date item
    expect(source).toContain('date: "FINAL NOV - DICIEMBRE 2026"');
    expect(source).toContain('month: "FINAL NOV - DICIEMBRE"');
  });

  /**
   * @spec REQ-TOUR-DATES-02: Spanish ('es') Dictionary
   * Validates that es.json specifies 'FINAL NOV - DICIEMBRE' in badge, featuredTitle, and tourDate2Month.
   */
  test("@spec REQ-TOUR-DATES-02: es.json reflects 'FINAL NOV - DICIEMBRE' in all sections", () => {
    // Step 1: Arrange - load Spanish messages
    const dict = readDictionary("es");

    // Step 2: Act & Assert - verify home hero badge
    expect(dict.home.badge).toBe("EURO TOUR (FINAL NOV - DICIEMBRE)");

    // Verify tour section featured title
    expect(dict.tour.featuredTitle).toBe("EURO TOUR (FINAL NOV - DICIEMBRE)");

    // Verify tour date 2 month
    expect(dict.tour.tourDate2Month).toBe("FINAL NOV - DICIEMBRE 2026");

    // Verify booking card description
    expect(dict.contactPage.cardTourDescription).toContain("Finales de Noviembre – Diciembre 2026");
  });

  /**
   * @spec REQ-TOUR-DATES-03: English ('en') Dictionary
   * Validates that en.json specifies 'LATE NOV - DEC' in badge, featuredTitle, and tourDate2Month.
   */
  test("@spec REQ-TOUR-DATES-03: en.json reflects 'LATE NOV - DEC' in all sections", () => {
    // Step 1: Arrange - load English messages
    const dict = readDictionary("en");

    // Step 2: Act & Assert - verify home hero badge
    expect(dict.home.badge).toBe("EURO TOUR (LATE NOV - DEC)");

    // Verify tour section featured title
    expect(dict.tour.featuredTitle).toBe("EURO TOUR (LATE NOV - DEC)");

    // Verify tour date 2 month
    expect(dict.tour.tourDate2Month).toBe("LATE NOV - DEC 2026");

    // Verify booking card description
    expect(dict.contactPage.cardTourDescription).toContain("Late November – December 2026");
  });

  /**
   * @spec REQ-TOUR-DATES-04: Multilingual Parity across Remaining 8 Languages
   * Validates calibrated late Nov - Dec strings for de, fr, it, pt, nl, pl, ja, zh.
   */
  test("@spec REQ-TOUR-DATES-04: all 8 additional languages reflect calibrated late Nov - Dec dates", () => {
    // German (de)
    const de = readDictionary("de");
    expect(de.home.badge).toBe("EUROPA-TOUR (ENDE NOV - DEZ)");
    expect(de.tour.featuredTitle).toBe("EUROPA-TOUR (ENDE NOV - DEZ)");
    expect(de.tour.tourDate2Month).toBe("ENDE NOV - DEZ 2026");

    // French (fr)
    const fr = readDictionary("fr");
    expect(fr.home.badge).toBe("TOURNÉE EUROPÉENNE (FIN NOV - DÉC)");
    expect(fr.tour.featuredTitle).toBe("TOURNÉE EUROPÉENNE (FIN NOV - DÉC)");
    expect(fr.tour.tourDate2Month).toBe("FIN NOV - DÉC 2026");

    // Italian (it)
    const it = readDictionary("it");
    expect(it.home.badge).toBe("EURO TOUR (FINE NOV - DIC)");
    expect(it.tour.featuredTitle).toBe("EURO TOUR (FINE NOV - DIC)");
    expect(it.tour.tourDate2Month).toBe("FINE NOV - DIC 2026");

    // Portuguese (pt)
    const pt = readDictionary("pt");
    expect(pt.home.badge).toBe("EURO TOUR (FINAL NOV - DEZ)");
    expect(pt.tour.featuredTitle).toBe("EURO TOUR (FINAL NOV - DEZ)");
    expect(pt.tour.tourDate2Month).toBe("FINAL NOV - DEZ 2026");

    // Dutch (nl)
    const nl = readDictionary("nl");
    expect(nl.home.badge).toBe("EURO TOUR (EIND NOV - DEC)");
    expect(nl.tour.featuredTitle).toBe("EURO TOUR (EIND NOV - DEC)");
    expect(nl.tour.tourDate2Month).toBe("EIND NOV - DEC 2026");

    // Polish (pl)
    const pl = readDictionary("pl");
    expect(pl.home.badge).toBe("EURO TOUR (KONIEC LIS - GRU)");
    expect(pl.tour.featuredTitle).toBe("EURO TOUR (KONIEC LIS - GRU)");
    expect(pl.tour.tourDate2Month).toBe("KONIEC LIS - GRU 2026");

    // Japanese (ja)
    const ja = readDictionary("ja");
    expect(ja.home.badge).toBe("EURO TOUR 2026 (11月下旬〜12月)");
    expect(ja.tour.featuredTitle).toBe("EURO TOUR (11月下旬〜12月)");
    expect(ja.tour.tourDate2Month).toBe("2026年11月下旬〜12月");

    // Chinese (zh)
    const zh = readDictionary("zh");
    expect(zh.home.badge).toBe("2026欧洲巡演 (11月下旬 - 12月)");
    expect(zh.tour.featuredTitle).toBe("欧洲巡演 (11月下旬 - 12月)");
    expect(zh.tour.tourDate2Month).toBe("2026年11月下旬 - 12月");
  });
});
