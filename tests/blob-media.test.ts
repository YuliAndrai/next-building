/**
 * @file tests/blob-media.test.ts
 * @layer Test Layer / Unit Verification
 * @description TDD test suite validating domain media registry, Vercel Blob infrastructure adapter,
 * application media pipelines, and Next.js remotePatterns image authorization.
 */

import { describe, expect, test, vi, beforeEach, afterEach } from "vitest";
import nextConfig from "../next.config";
import {
  FALLBACK_HERO_IMAGE,
  FALLBACK_PRESS_KIT_PHOTOS,
  FALLBACK_PRESS_KIT_VIDEOS,
  type MediaPhotoAsset,
} from "@/data/media-registry";
import {
  isBlobConfigured,
  listBlobs,
  getBlobUrl,
} from "@/lib/infrastructure/blob-storage";
import {
  getHeroImageUrl,
  getPressKitPhotos,
  resolvePressKitMedia,
} from "@/lib/pipelines/media-pipeline";

describe("Migrate Photos to Vercel Blob Architecture Suite", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.restoreAllMocks();
  });

  // ==========================================================================
  // 1. Next.js Remote Patterns Authorization
  // ==========================================================================
  describe("Next.js Remote Patterns Configuration", () => {
    test("@spec SPEC-1: next.config.ts authorizes *.public.blob.vercel-storage.com in images.remotePatterns", () => {
      // Step 1: Extract remote patterns from nextConfig
      const remotePatterns = nextConfig.images?.remotePatterns || [];

      // Step 2: Invariant check - Blob storage CDN must be authorized for Next.js image optimization
      const blobPattern = remotePatterns.find(
        (pattern) =>
          pattern.protocol === "https" &&
          (pattern.hostname === "*.public.blob.vercel-storage.com" ||
            pattern.hostname.includes("blob.vercel-storage.com"))
      );

      expect(blobPattern).toBeDefined();
      expect(blobPattern?.hostname).toMatch(/blob\.vercel-storage\.com/);
    });
  });

  // ==========================================================================
  // 2. Domain Media Registry (Layer 3)
  // ==========================================================================
  describe("Domain Layer: Media Registry Contracts & Fallbacks", () => {
    test("exposes valid FALLBACK_HERO_IMAGE contract", () => {
      expect(FALLBACK_HERO_IMAGE.id).toBe("hero-bg");
      expect(FALLBACK_HERO_IMAGE.url).toBe("/hero-bg.jpg");
      expect(FALLBACK_HERO_IMAGE.source).toBe("local");
    });

    test("exposes complete baseline FALLBACK_PRESS_KIT_PHOTOS", () => {
      expect(FALLBACK_PRESS_KIT_PHOTOS.length).toBeGreaterThanOrEqual(3);

      const ids = FALLBACK_PRESS_KIT_PHOTOS.map((p) => p.id);
      expect(ids).toContain("ANDHRAY1.jpg");
      expect(ids).toContain("IMG_4123.JPG");
      expect(ids).toContain("IMG_8451.JPG");

      FALLBACK_PRESS_KIT_PHOTOS.forEach((photo) => {
        expect(photo.url).toMatch(/^\/press-kit\/photos\//);
        expect(photo.source).toBe("local");
      });
    });

    test("exposes fallback press kit video catalog", () => {
      expect(FALLBACK_PRESS_KIT_VIDEOS.length).toBeGreaterThanOrEqual(5);
      expect(FALLBACK_PRESS_KIT_VIDEOS).toContain("Andhray 1.mp4");
    });
  });

  // ==========================================================================
  // 3. Infrastructure Adapter (Layer 4)
  // ==========================================================================
  describe("Infrastructure Layer: Blob Storage Adapter", () => {
    test("isBlobConfigured() returns false when BLOB_READ_WRITE_TOKEN is missing or empty", () => {
      delete process.env.BLOB_READ_WRITE_TOKEN;
      expect(isBlobConfigured()).toBe(false);

      process.env.BLOB_READ_WRITE_TOKEN = "   ";
      expect(isBlobConfigured()).toBe(false);
    });

    test("isBlobConfigured() returns true when valid token is present", () => {
      process.env.BLOB_READ_WRITE_TOKEN = "vercel_blob_rw_test_token_12345";
      expect(isBlobConfigured()).toBe(true);
    });

    test("listBlobs() returns empty array safely without credentials", async () => {
      delete process.env.BLOB_READ_WRITE_TOKEN;
      const result = await listBlobs("press-kit/photos");
      expect(result).toEqual([]);
    });

    test("getBlobUrl() returns null safely without credentials", async () => {
      delete process.env.BLOB_READ_WRITE_TOKEN;
      const result = await getBlobUrl("hero-bg.jpg");
      expect(result).toBeNull();
    });
  });

  // ==========================================================================
  // 4. Application Pipeline (Layer 3)
  // ==========================================================================
  describe("Application Pipeline: Media Resolution & Defensive Fallbacks", () => {
    test("getHeroImageUrl() falls back to local /hero-bg.jpg when unconfigured", async () => {
      delete process.env.BLOB_READ_WRITE_TOKEN;
      const heroUrl = await getHeroImageUrl();
      expect(heroUrl).toBe("/hero-bg.jpg");
    });

    test("getPressKitPhotos() falls back to baseline static photo catalog when unconfigured", async () => {
      delete process.env.BLOB_READ_WRITE_TOKEN;
      const photos = await getPressKitPhotos();
      expect(photos).toHaveLength(FALLBACK_PRESS_KIT_PHOTOS.length);
      expect(photos[0].source).toBe("local");
      expect(photos[0].url).toMatch(/^\/press-kit\/photos\//);
    });

    test("resolvePressKitMedia() returns complete media package with photos and videos", async () => {
      delete process.env.BLOB_READ_WRITE_TOKEN;
      const media = await resolvePressKitMedia();
      expect(media.photos).toBeDefined();
      expect(media.videos).toBeDefined();
      expect(media.photos.length).toBeGreaterThanOrEqual(3);
      expect(media.videos.length).toBeGreaterThanOrEqual(5);
    });
  });
});
