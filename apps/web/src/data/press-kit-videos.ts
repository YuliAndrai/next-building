/**
 * @file apps/web/src/data/press-kit-videos.ts
 * @layer Domain / Models Layer
 * @description Layer 3: Domain / Models - Canonical registry and data contracts for official ANDHRAY EPK YouTube video showcases.
 * Defines immutable metadata, aspect ratios, and format classifications for press kit video embeds.
 */

/**
 * Format classification: vertical short (9:16) vs standard landscape video (16:9).
 */
export type VideoKind = "short" | "standard";

/**
 * Supported aspect ratio identifiers for responsive embed containers.
 */
export type VideoAspectRatio = "9:16" | "16:9";

/**
 * Immutable contract describing an official press kit YouTube video item.
 */
export interface PressKitVideo {
  /** Unique stable slug or identifier for the video */
  readonly id: string;
  /** YouTube 11-character video ID */
  readonly youtubeId: string;
  /** Human-readable title or description of the video */
  readonly title: string;
  /** Format classification: vertical short vs standard landscape */
  readonly kind: VideoKind;
  /** Aspect ratio format string */
  readonly aspectRatio: VideoAspectRatio;
  /** Canonical direct watch URL on YouTube */
  readonly watchUrl: string;
}

/**
 * Canonical registry of official ANDHRAY Electronic Press Kit (EPK) videos.
 *
 * Execution flow:
 * Step 1: Enumerate the 5 canonical YouTube video showcases in exact prioritized sequence.
 * Step 2: Bind native aspect ratios (9:16 for vertical Shorts, 16:9 for landscape footage).
 * Step 3: Provide validated YouTube identifiers for zero-cookie secure embedding.
 *
 * Security Invariants:
 * - All youtubeId tokens are strictly verified 11-character YouTube IDs to prevent URL injection.
 * - Array is declared as readonly to guarantee domain data immutability at runtime.
 */
export const PRESS_KIT_VIDEOS: readonly PressKitVideo[] = Object.freeze([
  {
    id: "andhray-short-01",
    youtubeId: "nVKHhhkLOF0",
    title: "ANDHRAY - Live Reel 01",
    kind: "short",
    aspectRatio: "9:16",
    watchUrl: "https://youtube.com/shorts/nVKHhhkLOF0",
  },
  {
    id: "andhray-short-02",
    youtubeId: "zZ40FMDKgL8",
    title: "ANDHRAY - Live Reel 02",
    kind: "short",
    aspectRatio: "9:16",
    watchUrl: "https://youtube.com/shorts/zZ40FMDKgL8",
  },
  {
    id: "andhray-short-03",
    youtubeId: "iUUqvl6Bc2M",
    title: "ANDHRAY - Live Reel 03",
    kind: "short",
    aspectRatio: "9:16",
    watchUrl: "https://youtube.com/shorts/iUUqvl6Bc2M",
  },
  {
    id: "andhray-live-01",
    youtubeId: "7k-WS8nDfhA",
    title: "ANDHRAY - Live Concert Performance 01",
    kind: "standard",
    aspectRatio: "16:9",
    watchUrl: "https://youtu.be/7k-WS8nDfhA",
  },
  {
    id: "andhray-live-02",
    youtubeId: "0cv6JDcuJgI",
    title: "ANDHRAY - Live Concert Performance 02",
    kind: "standard",
    aspectRatio: "16:9",
    watchUrl: "https://youtu.be/0cv6JDcuJgI",
  },
  {
    id: "andhray-live-03",
    youtubeId: "zycfjPiSrT0",
    title: "ANDHRAY - Live Concert Performance 03",
    kind: "standard",
    aspectRatio: "16:9",
    watchUrl: "https://youtu.be/zycfjPiSrT0",
  },
]);
