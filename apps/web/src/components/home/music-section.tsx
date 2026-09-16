"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/data/site-config";
import { Play, ExternalLink, Radio, Disc } from "lucide-react";

export function MusicSection() {
  return (
    <section id="music" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-neutral-950 border-t border-neutral-900">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4 pb-6 border-b border-neutral-900">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-ultra text-red-600 font-semibold block mb-2">
              {"// DISCOGRAPHY"}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-widest text-white">
              RELEASES & SETS
            </h2>
            <p className="mt-2 text-xs uppercase tracking-widest text-neutral-400">
              Original productions, curated EP releases, and uncompromising hard techno rituals.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <a
              href={siteConfig.socials.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-neutral-800 text-[11px] uppercase tracking-widest text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors"
            >
              SPOTIFY
            </a>
            <a
              href={siteConfig.socials.soundcloud}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 border border-neutral-800 text-[11px] uppercase tracking-widest text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors"
            >
              SOUNDCLOUD
            </a>
          </div>
        </div>

        {/* Releases Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {siteConfig.releases.map((release) => (
            <div
              key={release.id}
              className="group bg-black border border-neutral-900 hover:border-neutral-700 transition-all duration-300 flex flex-col overflow-hidden"
            >
              {/* Cover Artwork */}
              <div className="relative aspect-square w-full overflow-hidden bg-neutral-900">
                <Image
                  src={release.artwork}
                  alt={release.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  {release.links.spotify && (
                    <a
                      href={release.links.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform shadow-xl"
                      aria-label="Stream on Spotify"
                    >
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </a>
                  )}
                  {release.links.soundcloud && (
                    <a
                      href={release.links.soundcloud}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform shadow-xl"
                      aria-label="Stream on SoundCloud"
                    >
                      <Radio className="w-4 h-4" />
                    </a>
                  )}
                </div>

                <span className="absolute top-2 left-2 bg-black/80 backdrop-blur-sm border border-neutral-800 text-[10px] font-mono uppercase tracking-widest text-neutral-300 px-2 py-0.5">
                  {release.type}
                </span>
              </div>

              {/* Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-white group-hover:text-neutral-200">
                    {release.title}
                  </h3>
                  <p className="mt-1 text-[11px] font-mono uppercase tracking-widest text-neutral-500">
                    {release.label} &bull; {release.releaseYear}
                  </p>
                </div>

                {/* Links */}
                <div className="mt-4 pt-3 border-t border-neutral-900 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                  <a
                    href={release.links.spotify || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white uppercase tracking-widest flex items-center gap-1"
                  >
                    <span>STREAM</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                  {release.links.beatport && (
                    <a
                      href={release.links.beatport}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white uppercase tracking-widest"
                    >
                      BEATPORT
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Live DJ Set Showcase */}
        <div className="bg-black border border-neutral-900 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-ultra text-neutral-500 block mb-1">
                FEATURED LIVE PERFORMANCE
              </span>
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-white">
                ANDHRAY | HÖR BERLIN (JULY 24 / 2026)
              </h3>
              <p className="text-xs uppercase tracking-widest text-neutral-400 font-mono mt-1">
                Transmisión en vivo en alta fidelidad grabada en el estudio de HÖR Berlín.
              </p>
            </div>

            <a
              href="https://www.youtube.com/watch?v=_xtvbbRCeGU"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2.5 border border-white text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors shrink-0 text-center"
            >
              WATCH ON YOUTUBE
            </a>
          </div>

          {/* YouTube Video Container with High-Aesthetic Poster fallback */}
          <div className="relative aspect-video w-full overflow-hidden bg-neutral-950 border border-neutral-800">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/_xtvbbRCeGU"
              title="Andhray | HÖR Berlin (July 24 / 2026)"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
