/**
 * @file tests/music-catalog.test.ts
 * @layer Test Layer / Unit Verification
 * @description Unit tests for official channels, chronological track catalog, and podcasts/DJ sets.
 */

import { describe, test, expect } from "vitest";
import { siteConfig } from "@/data/site-config";

describe("Music Discography, Channels & Podcasts", () => {
  describe("Official Channels", () => {
    test("contains all 5 required official streaming & purchase channels", () => {
      // Step 1: Verify presence of all required platforms
      const platforms = siteConfig.officialChannels.map((c) => c.platform);
      expect(platforms).toContain("spotify");
      expect(platforms).toContain("soundcloud");
      expect(platforms).toContain("appleMusic");
      expect(platforms).toContain("beatport");
      expect(platforms).toContain("bandcamp");
      expect(siteConfig.officialChannels.length).toBeGreaterThanOrEqual(5);
    });

    test("all official channels have valid URLs", () => {
      siteConfig.officialChannels.forEach((c) => {
        expect(c.url).toMatch(/^https?:\/\//);
        expect(c.name.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Chronological Track Catalog", () => {
    const expectedTitles = [
      "MEMENTO",
      "EN NAPL",
      "Danseo Mental",
      "ILUSION",
      "EN UN RAVE",
      "Feline Blink (con DEBBIE IT)",
      "SENSUAL",
      "MI",
      "MAYBE, WE ARE CRAZY",
      "FKN RYTHM",
      "DAGA ADICTA RE EDIT",
      "Girl From the Dark",
      "Sin Miedo",
      "Resignificar"
    ];

    test("contains exactly 14 tracks in chronological order (newest to oldest)", () => {
      // Step 2: Verify total count and chronological sequence
      expect(siteConfig.tracks).toHaveLength(14);
      const actualTitles = siteConfig.tracks.map((t) => t.title);
      expect(actualTitles).toEqual(expectedTitles);
    });

    test("MEMENTO contains embedded mini-player configurations", () => {
      const memento = siteConfig.tracks.find((t) => t.title === "MEMENTO");
      expect(memento).toBeDefined();
      expect(memento?.year).toBe("2025");
      expect(memento?.hasMiniPlayer).toBe(true);
      expect(memento?.spotifyEmbedUrl).toContain("open.spotify.com/embed");
      expect(memento?.soundcloudEmbedUrl).toContain("w.soundcloud.com/player");
    });

    test("does not expose any numerical stream or play counters (metrics-free)", () => {
      // Step 3: Security & aesthetic invariant: zero stream metrics
      siteConfig.tracks.forEach((track) => {
        const keys = Object.keys(track);
        expect(keys).not.toContain("streams");
        expect(keys).not.toContain("playCount");
        expect(keys).not.toContain("plays");
        expect(keys).not.toContain("listeners");
      });
    });
  });

  describe("Podcasts & DJ Sets", () => {
    test("contains all 5 curated performances and podcasts in chronological order", () => {
      // Step 4: Verify podcasts and DJ sets sequence
      expect(siteConfig.podcastsAndSets).toHaveLength(5);

      const titles = siteConfig.podcastsAndSets.map((p) => p.title);
      expect(titles[0]).toContain("HÖR Berlin");
      expect(titles[1]).toContain("Riöt.scampia");
      expect(titles[2]).toContain("Techno Germany Podcast 127");
      expect(titles[3]).toContain("TMORCAST115");
      expect(titles[4]).toContain("COMME DANS LES FILMS #16");
    });

    test("video performances include valid YouTube embed URLs", () => {
      const videoSets = siteConfig.podcastsAndSets.filter((p) => p.platform === "youtube");
      expect(videoSets.length).toBe(2);
      videoSets.forEach((set) => {
        expect(set.embedUrl).toContain("youtube.com/embed");
        expect(set.url).toContain("youtube.com/watch");
      });
    });

    test("audio podcasts include valid SoundCloud embed and destination URLs", () => {
      const audioPodcasts = siteConfig.podcastsAndSets.filter((p) => p.platform === "soundcloud");
      expect(audioPodcasts.length).toBe(3);
      audioPodcasts.forEach((pod) => {
        expect(pod.embedUrl).toContain("soundcloud.com/player");
        expect(pod.url).toContain("soundcloud.com");
      });
    });
  });
});
