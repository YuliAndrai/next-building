/**
 * @file tests/youtube-media.test.ts
 * @layer Test Layer / Unit & Contract Verification
 * @description TDD test suite validating domain YouTube video registry, media pipeline orchestration,
 * YouTubeEmbed presentation component contracts, and zero-disk-dependency architecture in press-kit page.
 */

import { describe, expect, test } from "vitest";
import fs from "node:fs";
import path from "node:path";
import {
  PRESS_KIT_VIDEOS,
  type PressKitVideo,
  type VideoKind,
  type VideoAspectRatio,
} from "@/data/press-kit-videos";
import { getPressKitVideos } from "@/lib/pipelines/media-pipeline";

describe("Press Kit YouTube Video Migration Suite (TDD Primal)", () => {
  // ==========================================================================
  // 1. Domain Video Registry (Layer 3)
  // ==========================================================================
  describe("Domain Layer: Canonical Video Registry Contracts", () => {
    test("@spec REQ-VIDEO-01: Exposes exactly 6 canonical YouTube videos in user-requested order", () => {
      // Arrange
      const expectedIds = [
        "nVKHhhkLOF0", // Short 1
        "zZ40FMDKgL8", // Short 2
        "iUUqvl6Bc2M", // Short 3 (New)
        "7k-WS8nDfhA", // Live 1
        "0cv6JDcuJgI", // Live 2
        "zycfjPiSrT0", // Live 3
      ];

      // Act
      const actualIds = PRESS_KIT_VIDEOS.map((v) => v.youtubeId);

      // Assert: Exact count and sequence invariant
      expect(PRESS_KIT_VIDEOS.length).toBe(6);
      expect(actualIds).toEqual(expectedIds);
    });

    test("@spec REQ-VIDEO-02: Enforces strict aspect ratios and classifications (9:16 Shorts vs 16:9 Standard)", () => {
      // Arrange: Target expectations according to user format requirements
      const expectedFormats: Record<string, { kind: VideoKind; aspectRatio: VideoAspectRatio }> = {
        nVKHhhkLOF0: { kind: "short", aspectRatio: "9:16" },
        zZ40FMDKgL8: { kind: "short", aspectRatio: "9:16" },
        iUUqvl6Bc2M: { kind: "short", aspectRatio: "9:16" },
        "7k-WS8nDfhA": { kind: "standard", aspectRatio: "16:9" },
        "0cv6JDcuJgI": { kind: "standard", aspectRatio: "16:9" },
        zycfjPiSrT0: { kind: "standard", aspectRatio: "16:9" },
      };

      // Act & Assert
      for (const video of PRESS_KIT_VIDEOS) {
        const expected = expectedFormats[video.youtubeId];
        expect(expected).toBeDefined();
        expect(video.kind).toBe(expected.kind);
        expect(video.aspectRatio).toBe(expected.aspectRatio);
      }
    });

    test("@spec REQ-VIDEO-03: Security Invariant - All YouTube IDs are valid 11-char alphanumeric tokens", () => {
      // Arrange
      const youtubeIdRegex = /^[a-zA-Z0-9_-]{11}$/;

      // Act & Assert
      for (const video of PRESS_KIT_VIDEOS) {
        expect(video.youtubeId).toMatch(youtubeIdRegex);
        expect(video.watchUrl).toContain(video.youtubeId);
      }
    });
  });

  // ==========================================================================
  // 2. Application Media Pipeline (Layer 2)
  // ==========================================================================
  describe("Application Layer: Media Pipeline Orchestration", () => {
    test("@spec REQ-VIDEO-04: getPressKitVideos() returns defensive copy maintaining domain immutability", () => {
      // Arrange & Act
      const videos1 = getPressKitVideos();
      const videos2 = getPressKitVideos();

      // Assert
      expect(videos1).toHaveLength(6);
      expect(videos1).toEqual(videos2);
      expect(videos1).not.toBe(videos2); // Distinct array reference
    });
  });

  // ==========================================================================
  // 3. Presentation Layer & Typography (Layer 1 & Layer 4)
  // ==========================================================================
  describe("Presentation & Architecture Decoupling (RED Check)", () => {
    test("@spec REQ-VIDEO-05: press-kit/page.tsx does NOT use fs.readdirSync or read local video filesystem", () => {
      // Arrange: Read page source directly
      const pagePath = path.join(process.cwd(), "apps/web/src/app/press-kit/page.tsx");
      const pageContent = fs.readFileSync(pagePath, "utf8");

      // Assert: Invariant - No local video filesystem access allowed in serverless page
      expect(pageContent).not.toContain("apps/web/public/press-kit/videos");
      expect(pageContent).not.toContain("fs.readdirSync(videosDir)");
    });

    test("@spec REQ-VIDEO-06: press-kit/page.tsx integrates getPressKitVideos pipeline and YouTubeEmbed component", () => {
      // Arrange
      const pagePath = path.join(process.cwd(), "apps/web/src/app/press-kit/page.tsx");
      const pageContent = fs.readFileSync(pagePath, "utf8");

      // Assert: Page must consume pipeline and presentation embed
      expect(pageContent).toContain("getPressKitVideos");
      expect(pageContent).toContain("YouTubeEmbed");
    });

    test("@spec REQ-VIDEO-07: YouTubeEmbed renders clean unicode arrow glyph and does not output literal &nearr;", () => {
      // Arrange
      const componentPath = path.join(process.cwd(), "apps/web/src/components/media/youtube-embed.tsx");
      const content = fs.readFileSync(componentPath, "utf8");

      // Assert: Must not contain raw &nearr; entity string, must contain clean glyph ↗
      expect(content).not.toContain("&nearr;");
      expect(content).toContain("↗");
    });
  });
});
