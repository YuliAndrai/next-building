/**
 * @file apps/web/src/components/home/news-section.tsx
 * @layer Presentation Layer / Home UI Component
 * @description Latest News Section featuring high-fidelity responsive media embeds (HÖR Berlin YouTube session and MEMENTO Spotify/SoundCloud widgets).
 */

"use client";

import React from "react";
import { ExternalLink, Radio, Disc3 } from "lucide-react";

/**
 * NewsSection Component
 *
 * Displays the artist's featured transmissions and latest releases.
 * Implements fluid, responsive 16:9 aspect-ratio video embedding and compact audio players
 * with zero hydration mismatch and full cross-device accessibility.
 *
 * @returns {React.JSX.Element} The rendered Latest News section.
 */
export function NewsSection() {
  return (
    <section id="news" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-black border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* Step 1: Section Header & Category Eyebrow */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-neutral-900">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-ultra text-red-600 font-semibold block mb-2">
              {"// TRANSMISSIONS & RELEASES"}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-widest text-white">
              ÚLTIMAS NOTICIAS
            </h2>
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-500 mt-2 sm:mt-0">
            TRANSMISIONES EN VIVO &bull; LANZAMIENTOS OFICIALES
          </p>
        </div>

        {/* Step 2: Responsive 2-Column Grid for Featured News Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Step 2.1: Noticia 1 — Sesión HÖR Berlin en Alta Calidad */}
          <article className="bg-neutral-950 border border-neutral-900 p-6 sm:p-8 flex flex-col justify-between hover:border-neutral-800 transition-colors">
            <div>
              {/* Category Badge & Live Indicator */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-red-500 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                  <span>SESIÓN HÖR BERLIN // EN ALTA CALIDAD</span>
                </span>
                <Radio className="w-4 h-4 text-neutral-600" />
              </div>

              {/* News Item Title */}
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wide text-white mb-4">
                Andhray | HÖR Berlin (July 24 / 2026)
              </h3>

              {/* Responsive 16:9 High-Definition YouTube Embed */}
              <div className="relative aspect-video w-full overflow-hidden bg-neutral-950 border border-neutral-800 rounded-sm mb-5 shadow-2xl">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/_xtvbbRCeGU"
                  title="Andhray | HÖR Berlin (July 24 / 2026)"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>

              {/* Context Summary */}
              <p className="text-xs text-neutral-400 leading-relaxed font-sans mb-4">
                Sesión completa de hard dance y texturas ácidas transmitida directamente desde el icónico estudio de HÖR en Berlín.
              </p>
            </div>

            {/* External Action Button */}
            <div className="pt-4 border-t border-neutral-900 flex items-center justify-between">
              <a
                href="https://www.youtube.com/watch?v=_xtvbbRCeGU"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-300 hover:text-white transition-colors"
              >
                <span>VER EN YOUTUBE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <span className="text-[11px] font-mono text-neutral-600 uppercase tracking-wider">
                BERLIN, DE
              </span>
            </div>
          </article>

          {/* Step 2.2: Noticia 2 — Último Lanzamiento: MEMENTO */}
          <article className="bg-neutral-950 border border-neutral-900 p-6 sm:p-8 flex flex-col justify-between hover:border-neutral-800 transition-colors">
            <div>
              {/* Category Badge & Disc Indicator */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-red-500 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                  <span>ÚLTIMO LANZAMIENTO // OUT NOW</span>
                </span>
                <Disc3 className="w-4 h-4 text-neutral-600 animate-spin-slow" />
              </div>

              {/* News Item Title */}
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wide text-white mb-4">
                Último Lanzamiento: MEMENTO
              </h3>

              {/* Context Summary */}
              <p className="text-xs text-neutral-400 leading-relaxed font-sans mb-5">
                Nuevo track original disponible en todas las plataformas de streaming. Reproduce la obra a través de los reproductores oficiales integrados:
              </p>

              {/* Integrated Compact Players (Spotify & SoundCloud) */}
              <div className="space-y-4 mb-5">
                {/* Mini Player Spotify */}
                <div className="w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/40">
                  <iframe
                    style={{ borderRadius: "12px" }}
                    src="https://open.spotify.com/embed/album/4zmRL1DHbEIYsITw4HOYRn?utm_source=generator&theme=0"
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    title="Spotify Mini Player - MEMENTO"
                    className="w-full border-0 block"
                  />
                </div>

                {/* Mini Player SoundCloud */}
                <div className="w-full overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/40">
                  <iframe
                    width="100%"
                    height="166"
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay"
                    src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/andhray/mementosp&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"
                    title="SoundCloud Mini Player - MEMENTO"
                    className="w-full border-0 block"
                  />
                </div>
              </div>
            </div>

            {/* External Platform Links */}
            <div className="pt-4 border-t border-neutral-900 flex flex-wrap items-center justify-between gap-3 text-xs font-mono uppercase tracking-widest text-neutral-400">
              <div className="flex items-center gap-4">
                <a
                  href="https://open.spotify.com/album/4zmRL1DHbEIYsITw4HOYRn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <span>SPOTIFY</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-neutral-800">•</span>
                <a
                  href="https://soundcloud.com/andhray/mementosp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <span>SOUNDCLOUD</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <span className="text-[11px] font-mono text-neutral-600 uppercase tracking-wider">
                ORIGINAL TRACK
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
