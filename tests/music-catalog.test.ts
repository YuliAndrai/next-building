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
      "DANSEO MENTAL",
      "SENSUAL",
      "MI",
      "MAYBE, WE ARE CRAZY",
      "FKN RYTHM",
      "DAGA ADICTA RE EDIT",
      "ILUSION",
      "EN UN RAVE",
      "FELINE BLINK (CON DEBBIE IT)",
      "GIRL FROM THE DARK (KOBAL AND JAY VOICES)",
      "SIN MIEDO",
      "RESIGNIFICAR"
    ];

    test("contains exactly 14 tracks in chronological order (newest to oldest)", () => {
      // Step 2: Verify total count and chronological sequence
      expect(siteConfig.tracks).toHaveLength(14);
      const actualTitles = siteConfig.tracks.map((t) => t.title);
      expect(actualTitles).toEqual(expectedTitles);
    });

    test("MEMENTO contains embedded Spotify mini-player and official direct links", () => {
      const memento = siteConfig.tracks.find((t) => t.title === "MEMENTO");
      expect(memento).toBeDefined();
      expect(memento?.year).toBe("2025");
      const embedUrl = memento?.spotifyEmbed || memento?.spotifyEmbedUrl;
      expect(embedUrl).toContain("open.spotify.com/embed");
      expect(memento?.links.spotify).toContain("open.spotify.com");
      expect(memento?.links.soundcloud).toContain("soundcloud.com/andhray/memento");
      expect(memento?.links.beatport).toContain("beatport.com");
      expect(memento?.links.appleMusic).toContain("music.apple.com");
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

    test("configures exact spotifyId for all 13 official Spotify tracks and leaves bootleg without it", () => {
      // Step 4: Validate spotifyId presence and values for interactive player
      const expectedSpotifyIds: Record<string, string | null | undefined> = {
        MEMENTO: "68KwzzA0ybAGpUALiaJ0Ci",
        "EN NAPL": "0p10DSavZofwMZyQ02tMSM",
        "DANSEO MENTAL": "73hIIW3p4wuX4HeJNYOGWf",
        ILUSION: "5Vvvbv1GnDLHR47nLo2Dwq",
        "EN UN RAVE": "0EQGafE2qUvAIzLMbSP76C",
        "FELINE BLINK (CON DEBBIE IT)": "30TPs7A1WVHiqR3xCdh2TF",
        SENSUAL: "5A7hfrGS41sSRTv6iQItQ6",
        MI: "6lzYhRcxLNPX6gfveAXh0S",
        "MAYBE, WE ARE CRAZY": "140e7NyEy4Sn5XIZHre9fM",
        "FKN RYTHM": "6pffPRPNH7BF67Qub1ED67",
        "DAGA ADICTA RE EDIT": null,
        "GIRL FROM THE DARK (KOBAL AND JAY VOICES)": "1MzPqm1xWPSXZp9WtZimTp",
        "SIN MIEDO": "4ZcCcVH4Df8GBdvUHXKcLJ",
        RESIGNIFICAR: "1M9QtwVh1Cu4bIfxSVw6Vd"
      };

      siteConfig.tracks.forEach((track) => {
        expect(track.spotifyId).toBe(expectedSpotifyIds[track.title]);
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

    test("video performances include valid YouTube embed or watch destination URLs", () => {
      const horBerlin = siteConfig.podcastsAndSets.find((p) => p.title.includes("HÖR Berlin"));
      expect(horBerlin?.embedUrl).toContain("youtube.com/embed");

      const riotScampia = siteConfig.podcastsAndSets.find((p) => p.title.includes("Riöt.scampia"));
      expect(riotScampia?.url).toContain("youtube.com/watch");
    });

    test("audio podcasts include valid SoundCloud destination URLs", () => {
      const audioPodcasts = siteConfig.podcastsAndSets.filter((p) => p.url?.includes("soundcloud.com"));
      expect(audioPodcasts.length).toBe(3);
      audioPodcasts.forEach((pod) => {
        expect(pod.url).toContain("soundcloud.com");
      });
    });
  });
});
