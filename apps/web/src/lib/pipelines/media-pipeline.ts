/**
 * @file apps/web/src/lib/pipelines/media-pipeline.ts
 * @layer Application / Pipelines Layer
 * @description Layer 3: Application / Pipelines - Media asset orchestration pipeline.
 * Coordinates photo and press kit asset resolution between Vercel Blob infrastructure and
 * local static fallbacks, ensuring zero-downtime resilient delivery.
 */

import {
  type MediaPhotoAsset,
  type PressKitMediaResponse,
  FALLBACK_HERO_IMAGE,
  FALLBACK_PRESS_KIT_PHOTOS,
  FALLBACK_PRESS_KIT_VIDEOS,
} from "@/data/media-registry";
import { PRESS_KIT_VIDEOS, type PressKitVideo } from "@/data/press-kit-videos";
import { isBlobConfigured, listBlobs, getBlobUrl } from "@/lib/infrastructure/blob-storage";

/**
 * Resolves the primary Hero background image URL with defensive fallback.
 *
 * @returns {Promise<string>} Fully qualified CDN URL or local static fallback path.
 */
export async function getHeroImageUrl(): Promise<string> {
  // Step 1: Check if remote Blob storage is configured
  if (!isBlobConfigured()) {
    return FALLBACK_HERO_IMAGE.url;
  }

  try {
    // Step 2: Attempt to resolve remote blob URL for hero-bg.jpg
    const blobUrl = await getBlobUrl("hero-bg.jpg");
    if (blobUrl) {
      return blobUrl;
    }
  } catch (err: unknown) {
    console.warn(
      "[media-pipeline] getHeroImageUrl error, falling back to static asset:",
      err instanceof Error ? err.message : "Unknown error"
    );
  }

  // Step 3: Return local fallback path
  return FALLBACK_HERO_IMAGE.url;
}

/**
 * Resolves the catalog of official Press Kit photography.
 * Fetches assets from Vercel Blob if available; gracefully falls back to static baseline.
 *
 * @returns {Promise<MediaPhotoAsset[]>} List of resolved media photo assets.
 */
export async function getPressKitPhotos(): Promise<MediaPhotoAsset[]> {
  // Step 1: Check whether Blob storage is configured
  if (!isBlobConfigured()) {
    return [...FALLBACK_PRESS_KIT_PHOTOS];
  }

  try {
    // Step 2: Fetch blobs under the 'press-kit/photos' prefix
    const blobItems = await listBlobs("press-kit/photos");

    if (blobItems.length > 0) {
      // Step 3: Map remote blobs to domain MediaPhotoAsset
      return blobItems.map((item): MediaPhotoAsset => {
        const filename = item.pathname.split("/").pop() || item.pathname;
        return {
          id: filename,
          title: `ANDHRAY Press Kit - ${filename}`,
          url: item.url,
          downloadUrl: item.downloadUrl || item.url,
          source: "blob",
          size: item.size,
        };
      });
    }
  } catch (err: unknown) {
    console.warn(
      "[media-pipeline] getPressKitPhotos error, falling back to static catalog:",
      err instanceof Error ? err.message : "Unknown error"
    );
  }

  // Step 4: Gracefully return static fallback photos
  return [...FALLBACK_PRESS_KIT_PHOTOS];
}

/**
 * Resolves the complete Press Kit media bundle (photos and videos).
 *
 * @returns {Promise<PressKitMediaResponse>} Complete EPK media payload.
 */
export async function resolvePressKitMedia(): Promise<PressKitMediaResponse> {
  // Step 1: Resolve photography catalog through pipeline
  const photos = await getPressKitPhotos();

  // Step 2: Assemble complete media response with fallback video archive
  return {
    photos,
    videos: [...FALLBACK_PRESS_KIT_VIDEOS],
  };
}

/**
 * Resolves the catalog of official Press Kit YouTube video showcases.
 * Retrieves canonical video metadata configured with responsive aspect ratios.
 *
 * Execution Flow:
 * // Step 1: Read canonical video descriptors from domain registry
 * // Step 2: Return defensive copy to guarantee domain immutability
 *
 * Security Invariants:
 * - Returns a shallow copy of the immutable domain registry, preventing external runtime mutations.
 *
 * @returns {PressKitVideo[]} Strongly typed press kit video descriptors.
 */
export function getPressKitVideos(): PressKitVideo[] {
  // Step 1: Read canonical video descriptors from domain registry
  // Step 2: Return defensive copy to guarantee domain immutability
  return [...PRESS_KIT_VIDEOS];
}

