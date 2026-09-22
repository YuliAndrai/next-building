/**
 * @file apps/web/src/data/media-registry.ts
 * @layer Domain / Models Layer
 * @description Layer 3: Domain / Models - Media asset registry contracts and static fallback definitions.
 * Provides immutable schemas, fallback media catalogs, and storage origin markers for artist photography.
 */

/**
 * Contract describing an artist photography asset in the system.
 */
export interface MediaPhotoAsset {
  /** Unique identifier or filename of the photo asset */
  id: string;
  /** Human-readable title or descriptive caption */
  title: string;
  /** Fully qualified public CDN URL or relative local path */
  url: string;
  /** Direct download URL (falls back to url if omitted) */
  downloadUrl?: string;
  /** Storage origin marker indicating remote Vercel Blob or local static bundle */
  source: "blob" | "local";
  /** File size in bytes (optional) */
  size?: number;
  /** MIME content type (e.g. 'image/jpeg') */
  contentType?: string;
}

/**
 * Contract describing the complete media response bundle for the Press Kit.
 */
export interface PressKitMediaResponse {
  /** Resolved list of press kit photos */
  photos: MediaPhotoAsset[];
  /** Video file names or URLs */
  videos: string[];
}

/**
 * Default fallback hero background photo asset.
 * Guarantees zero-blank rendering if remote Blob store is unreachable.
 */
export const FALLBACK_HERO_IMAGE: MediaPhotoAsset = {
  id: "hero-bg",
  title: "Hero Background Portrait",
  url: "/hero-bg.jpg",
  downloadUrl: "/hero-bg.jpg",
  source: "local",
};

/**
 * Default fallback press kit photography catalog.
 * Represents the baseline press kit photography packaged within the repository.
 */
export const FALLBACK_PRESS_KIT_PHOTOS: readonly MediaPhotoAsset[] = [
  {
    id: "ANDHRAY1.jpg",
    title: "ANDHRAY Press Portrait 01",
    url: "/press-kit/photos/ANDHRAY1.jpg",
    downloadUrl: "/press-kit/photos/ANDHRAY1.jpg",
    source: "local",
  },
  {
    id: "IMG_4123.JPG",
    title: "ANDHRAY Press Portrait 02",
    url: "/press-kit/photos/IMG_4123.JPG",
    downloadUrl: "/press-kit/photos/IMG_4123.JPG",
    source: "local",
  },
  {
    id: "IMG_8451.JPG",
    title: "ANDHRAY Press Portrait 03",
    url: "/press-kit/photos/IMG_8451.JPG",
    downloadUrl: "/press-kit/photos/IMG_8451.JPG",
    source: "local",
  },
];

/**
 * Default fallback press kit video catalog.
 */
export const FALLBACK_PRESS_KIT_VIDEOS: readonly string[] = [
  "Andhray 1.mp4",
  "C4811_00661212.mp4",
  "IMG_0012.MOV",
  "IMG_1468.mov",
  "IMG_2191.MOV",
];
