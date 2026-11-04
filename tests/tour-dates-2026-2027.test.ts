/**
 * @file tests/tour-dates-2026-2027.test.ts
 * @layer Test Layer / Unit Verification
 * @description TDD test suite validating the international tour dates "Closing 2026 // Opening 2027"
 * across site configuration (Layer 3) and multilingual i18n dictionaries (Layer 2).
 */

import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";
import { siteConfig, pastTourDates } from "../apps/web/src/data/site-config";

// ============================================================================
// Fixtures & Helper Utilities
// ============================================================================

/**
 * Reads a JSON message dictionary from apps/web/src/messages.
 *
 * @param {string} locale - The 2-letter language code (e.g. 'es', 'en').
 * @returns {Record<string, any>} Parsed message dictionary.
 */
function readDictionary(locale: string): Record<string, any> {
  const filePath = path.resolve(process.cwd(), `apps/web/src/messages/${locale}.json`);
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content);
}

// ============================================================================
// Test Suite: ANDHRAY Closing 2026 // Opening 2027 Tour Calibration
// ============================================================================

describe("ANDHRAY Tour 2026-2027: 'Closing 2026 // Opening 2027'", () => {
  /**
   * @spec REQ-TOUR-DATES-01: Canonical Site Configuration
   * Verifies that heroBanner, featuredTour, and announcement declare 'CLOSING 2026 // OPENING 2027'.
   */
  test("@spec REQ-TOUR-DATES-01: site-config.ts declares 'Closing 2026 // Opening 2027' across featuredTour and banners", () => {
    // Step 1: Arrange & Act - Inspect siteConfig artist and tour declarations
    const { artist, announcement, tourConfig } = siteConfig;

    // Step 2: Assert - Verify banner titles reflect the new tour campaign
    expect(artist.heroBanner).toContain("CLOSING 2026 // OPENING 2027");
    expect(announcement.text).toContain("CLOSING 2026 // OPENING 2027");
    expect(tourConfig.featuredTour?.title).toBe("CLOSING 2026 // OPENING 2027");
  });

  /**
   * @spec REQ-TOUR-DATES-02: Past Tour Dates Isolation
   * Verifies that past events (Pereira 24.10, Pasto 31.10) are registered in pastTourDates as completed shows.
   */
  test("@spec REQ-TOUR-DATES-02: pastTourDates contains Pereira (24.10) and Pasto (31.10) as completed dates", () => {
    // Step 1: Arrange & Act - Extract past tour dates from siteConfig
    const pastDates = pastTourDates || (siteConfig as any).pastTourDates;

    // Step 2: Assert - Must be defined and contain the 2 completed Colombian shows
    expect(pastDates).toBeDefined();
    expect(Array.isArray(pastDates)).toBe(true);
    expect(pastDates.length).toBeGreaterThanOrEqual(2);

    const pereira = pastDates.find((d: any) => d.city.includes("Pereira"));
    expect(pereira).toBeDefined();
    expect(pereira?.venue).toContain("Tunnel x Station Group");
    expect(pereira?.status).toBe("completed");

    const pasto = pastDates.find((d: any) => d.city.includes("Pasto"));
    expect(pasto).toBeDefined();
    expect(pasto?.venue).toContain("Void Psy x Macabro");
    expect(pasto?.status).toBe("completed");
  });

  /**
   * @spec REQ-TOUR-DATES-03: Upcoming Tour Dates
   * Verifies that tourDates contains upcoming live shows across LATAM, Europe, and Middle East.
   */
  test("@spec REQ-TOUR-DATES-03: tourDates contains upcoming tour dates across Ecuador, Europe, and Middle East", () => {
    // Step 1: Arrange & Act - Extract active tour dates
    const { tourDates } = siteConfig;

    // Step 2: Assert - Must have upcoming international dates
    expect(tourDates.length).toBeGreaterThanOrEqual(8);

    // LATAM: Ecuador
    const quito = tourDates.find((d) => d.city === "Quito");
    expect(quito).toBeDefined();
    expect(quito?.venue).toContain("Kønqüeêr x Antrum");

    const cuenca = tourDates.find((d) => d.city === "Cuenca");
    expect(cuenca).toBeDefined();
    expect(cuenca?.venue).toContain("Hideout");

    // Europe: Barcelona, Italy, Tenerife, Madrid
    const barcelonaM7 = tourDates.find((d) => d.city === "Barcelona" && d.venue.includes("M7 Club"));
    expect(barcelonaM7).toBeDefined();

    const florence = tourDates.find((d) => d.city === "Florence" || d.venue.includes("Warehouse 303"));
    expect(florence).toBeUndefined();

    const nalgotika = tourDates.find((d) => d.venue.includes("Nalgotika"));
    expect(nalgotika).toBeDefined();
    expect(nalgotika?.city).toBe("Barcelona");
    expect(nalgotika?.date).toBe("09.12.2026");
    expect(nalgotika?.venue).toContain("City Hall");

    const padua = tourDates.find((d) => d.city === "Padua");
    expect(padua).toBeDefined();
    expect(padua?.venue).toContain("Loco Club x Industrial Girls 7th Anniv.");

    const lyon = tourDates.find((d) => d.city === "Lyon");
    expect(lyon).toBeDefined();
    expect(lyon?.country).toBe("France");
    expect(lyon?.venue).toBe("TBA");

    const tenerife = tourDates.find((d) => d.city === "Tenerife");
    expect(tenerife).toBeDefined();
    expect(tenerife?.venue).toContain("ElDiabloCanario x Industrial Girls 7th Anniv.");

    // Middle East: Dubai
    const dubai = tourDates.find((d) => d.city === "Dubai");
    expect(dubai).toBeDefined();
    expect(dubai?.country).toBe("UAE");

    // Spain: Madrid
    const madrid = tourDates.find((d) => d.city === "Madrid");
    expect(madrid).toBeDefined();
    expect(madrid?.venue).toContain("UnderHell x LegionTechno, Sala Muv");
  });

  /**
   * @spec REQ-TOUR-DATES-04: Discography Milestone Events
   * Verifies that milestone releases (EP 02 ++GATTA and Birthday Track) are tracked in the tour calendar.
   */
  test("@spec REQ-TOUR-DATES-04: special milestone events (EP Release 02 ++GATTA and Birthday Track) are registered", () => {
    // Step 1: Arrange & Act - Search for release milestones in tourDates
    const { tourDates } = siteConfig;

    const epRelease = tourDates.find((d) => d.venue.includes("02 ++GATTA") || d.city.includes("EP RELEASE"));
    expect(epRelease).toBeDefined();
    expect(epRelease?.type).toBe("release");

    const birthdayRelease = tourDates.find((d) => d.venue.includes("BIRTHDAY TRACK") || d.city.includes("BIRTHDAY TRACK"));
    expect(birthdayRelease).toBeDefined();
    expect(birthdayRelease?.type).toBe("release");
  });

  /**
   * @spec REQ-TOUR-DATES-05: Tour Flyer Image Asset Verification
   * Verifies that the flyer image path is registered and exists on the filesystem.
   */
  test("@spec REQ-TOUR-DATES-05: flyer asset is referenced and exists on disk", () => {
    // Step 1: Arrange - Relative flyer path declared in tour config
    const flyerPath = (siteConfig.tourConfig.featuredTour as any)?.flyerImage;
    expect(flyerPath).toBeDefined();
    expect(flyerPath).toContain("ANDHRAY_TOUR 2026 2027.jpg");

    // Step 2: Act & Assert - Verify the physical file exists in apps/web/public
    const absolutePath = path.resolve(process.cwd(), "apps/web/public", flyerPath.replace(/^\//, ""));
    expect(fs.existsSync(absolutePath)).toBe(true);
  });

  /**
   * @spec REQ-TOUR-DATES-06: Multilingual Dictionary Parity
   * Verifies that Spanish and English dictionaries declare the new tour campaign title and past dates labels.
   */
  test("@spec REQ-TOUR-DATES-06: multilingual dictionary parity for tour headlines and status labels", () => {
    // Step 1: Arrange - Read es and en dictionaries
    const dictEs = readDictionary("es");
    const dictEn = readDictionary("en");

    // Step 2: Assert - Check campaign title in Spanish and English
    expect(dictEs.tour.campaignTitle).toContain("CLOSING 2026 // OPENING 2027");
    expect(dictEn.tour.campaignTitle).toContain("CLOSING 2026 // OPENING 2027");

    // Check past tour section labels
    expect(dictEs.tour.pastShowsTitle).toBeDefined();
    expect(dictEn.tour.pastShowsTitle).toBeDefined();
  });
});
