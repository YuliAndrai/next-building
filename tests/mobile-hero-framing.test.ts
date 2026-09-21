/**
 * @file tests/mobile-hero-framing.test.ts
 * @layer Test Layer / Unit Verification
 * @description TDD unit test suite verifying mobile hero background image responsive focal alignment,
 * desktop viewport preservation, visual gradient integrity, and 4-layer architectural boundaries.
 */

import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";

// ============================================================================
// Fixtures & Helper Utilities
// ============================================================================

/**
 * Reads the canonical Home Page component source file.
 *
 * @returns {string} Raw source code of apps/web/src/app/page.tsx.
 */
function getHomePageSource(): string {
  const filePath = path.resolve(process.cwd(), "apps/web/src/app/page.tsx");
  return fs.readFileSync(filePath, "utf-8");
}

/**
 * Extracts the className string assigned to the hero background Image element.
 *
 * @param {string} source - Source code of the component.
 * @returns {string} Extracted className string.
 */
function extractHeroImageClassName(source: string): string {
  // Matches <Image ... src="/hero-bg.jpg" ... className="..." ... />
  const imageRegex = /<Image[\s\S]*?src=["']\/hero-bg\.jpg["'][\s\S]*?className=["']([^"']+)["'][\s\S]*?\/>/;
  const match = source.match(imageRegex);
  if (!match || !match[1]) {
    throw new Error("Hero Image element with src='/hero-bg.jpg' and className was not found in source.");
  }
  return match[1];
}

// ============================================================================
// Test Suite: Mobile Hero Framing & Responsive Focal Point Alignment
// ============================================================================

describe("Hero Background Mobile Framing & Responsive Focal Point Alignment", () => {
  /**
   * @spec REQ-HERO-FRAMING-01
   * Ensures that on mobile viewports (< md), the hero background image applies a calibrated
   * focal point positioning centered on the artist face (x ≈ 70%), preventing face cut-offs.
   */
  test("@spec REQ-HERO-FRAMING-01: applies responsive mobile focal point positioning centered on artist face", () => {
    // Step 1: Arrange - load source code of Home Page
    const source = getHomePageSource();

    // Step 2: Act - extract className from hero Image component
    const className = extractHeroImageClassName(source);

    // Step 3: Assert - verify that mobile has a calibrated focal point (x ≈ 70% or 68%-72%)
    // and does NOT rely solely on static un-prefixed `object-top` which centers horizontally at 50%
    const hasCalibratedMobileFocalPoint = /object-\[(?:6[5-9]|7[0-5])%_/.test(className);
    
    expect(
      hasCalibratedMobileFocalPoint,
      `Expected hero image to have mobile calibrated focal point class matching /object-[(65-75)%_/ (e.g. object-[70%_top]), but found: "${className}"`
    ).toBe(true);
  });

  /**
   * @spec REQ-HERO-FRAMING-02
   * Ensures that desktop viewports (md: and above) preserve the original top-anchored panoramic
   * alignment without regression.
   */
  test("@spec REQ-HERO-FRAMING-02: preserves desktop object-top alignment on md breakpoint", () => {
    // Step 1: Arrange - load source code
    const source = getHomePageSource();

    // Step 2: Act - extract className
    const className = extractHeroImageClassName(source);

    // Step 3: Assert - verify explicit md:object-top class
    expect(className).toContain("md:object-top");
  });

  /**
   * @spec REQ-HERO-FRAMING-03
   * Verifies that the Hero Image retains core performance attributes and visual gradient layers.
   */
  test("@spec REQ-HERO-FRAMING-03: retains core Next.js Image optimization properties and mask gradients", () => {
    // Step 1: Arrange - load source code
    const source = getHomePageSource();

    // Step 2: Act & Assert - check Image props
    expect(source).toContain('src="/hero-bg.jpg"');
    expect(source).toContain('alt="Andhray"');
    expect(source).toContain("fill");
    expect(source).toContain("priority");

    // Verify dark gradient masks for seamless visual transition to black
    expect(source).toContain("bg-gradient-to-r from-black via-transparent to-black");
    expect(source).toContain("bg-gradient-to-b from-transparent via-black/70 to-black");
  });

  /**
   * @spec REQ-HERO-FRAMING-04
   * Verifies strict 4-layer architecture compliance: apps/web/src/app/page.tsx is in Layer 1
   * (Presentation Layer) and must never import Domain or Infrastructure Web3 packages.
   */
  test("@spec REQ-HERO-FRAMING-04: enforces 4-layer architecture annotation and boundary isolation", () => {
    // Step 1: Arrange - load source code
    const source = getHomePageSource();

    // Step 2: Act & Assert - verify mandatory layer comment header
    expect(source).toContain("@layer Presentation Layer / Page Component");

    // Verify zero forbidden lower-layer direct imports
    expect(source).not.toMatch(/(?:import|from)\s+['"]@solana\/kit['"]/);
    expect(source).not.toMatch(/(?:import|from)\s+['"]@solana\/web3\.js['"]/);
    expect(source).not.toMatch(/(?:import|from)\s+['"]pg['"]/);
    expect(source).not.toContain("from '@/lib/pipelines'");
    expect(source).not.toContain("from '@/lib/db'");
  });
});
