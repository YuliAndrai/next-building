"use client";

/**
 * @file apps/web/src/components/home/podcasts-section.tsx
 * @layer Presentation Layer / Home UI Component
 * @description Curated Recordings & Podcasts Section featuring a 2-column YouTube live video grid (HÖR Berlin & Riöt.scampia) and embedded SoundCloud mini-players with pure red accents.
 */

import React from "react";

/**
 * PodcastsSection Component
 *
 * Renders the curated audio-visual recordings of ANDHRAY:
 * 1. Grid of 2 responsive YouTube video sessions with red on-air live pulse badge.
 * 2. Responsive compact SoundCloud stream players with official red theme branding.
 *
 * @param {object} [props] Component properties.
 * @param {string} [props.className] Optional custom class string.
 * @returns {React.JSX.Element} The rendered Podcasts & Recordings section.
 */
export function PodcastsSection({ className = "" }: { className?: string } = {}): React.JSX.Element {
  return (
    <section className={`max-w-7xl mx-auto px-6 md:px-8 py-16 w-full border-t border-neutral-800 ${className}`}>
      {/* Step 1: Encabezado de sección con prefijos técnicos */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-3 border-b border-neutral-800 gap-2">
        <div>
          <span className="text-xs font-mono tracking-widest text-[#FF0000] uppercase">
            {"//"} RECORDINGS &amp; PODCASTS
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight mt-1">
            PODCASTS &amp; DJ SETS
          </h2>
        </div>
        <span className="text-[11px] font-mono tracking-wider text-neutral-400 uppercase">
          SESIONES EN VIVO • EMISIONES Y PODCASTS EXCLUSIVOS
        </span>
      </div>

      {/* Step 2: Grid de 2 Videos de YouTube */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Video 1: HÖR Berlin */}
        <div className="border border-neutral-800 hover:border-[#FF0000]/60 bg-neutral-950 p-4 rounded-sm flex flex-col justify-between transition-colors duration-200">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF0000] animate-pulse inline-block" />
                <span className="text-[10px] font-mono text-[#FF0000] tracking-wider uppercase">
                  SESIÓN EN VIVO {"//"} YOUTUBE
                </span>
              </div>
              <span className="text-[11px] font-mono text-neutral-400">24 Julio 2026</span>
            </div>

            <div className="relative w-full aspect-video rounded-sm overflow-hidden border border-neutral-800 bg-black mb-3">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/_xtvbbRCeGU?autoplay=0"
                title="Andhray | HÖR Berlin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <h3 className="text-base font-bold text-white uppercase">ANDHRAY | HÖR BERLIN</h3>
          </div>

          <a
            href="https://www.youtube.com/watch?v=_xtvbbRCeGU"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
          >
            <span>VER EN YOUTUBE</span>
            <span className="text-[#FF0000]">&nearr;</span>
          </a>
        </div>

        {/* Video 2: Riöt.scampia 360 DJ Set */}
        <div className="border border-neutral-800 hover:border-[#FF0000]/60 bg-neutral-950 p-4 rounded-sm flex flex-col justify-between transition-colors duration-200">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF0000] animate-pulse inline-block" />
                <span className="text-[10px] font-mono text-[#FF0000] tracking-wider uppercase">
                  SESIÓN EN VIVO {"//"} YOUTUBE
                </span>
              </div>
              <span className="text-[11px] font-mono text-neutral-400">SET DESTACADO</span>
            </div>

            <div className="relative w-full aspect-video rounded-sm overflow-hidden border border-neutral-800 bg-black mb-3">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/SZTMVVqo-HA?autoplay=0"
                title="Andhray | Riöt.scampia 360 DJ Set"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <h3 className="text-base font-bold text-white uppercase">ANDHRAY | SPECIAL SHOWCASE</h3>
          </div>

          <a
            href="https://www.youtube.com/watch?v=SZTMVVqo-HA"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
          >
            <span>VER EN YOUTUBE</span>
            <span className="text-[#FF0000]">&nearr;</span>
          </a>
        </div>
      </div>

      {/* Step 3: Reproductores SoundCloud compactos */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-neutral-800">
          <span className="text-xs font-mono tracking-wider text-neutral-400 uppercase">
            {"//"} ARCHIVO DE PODCASTS &amp; MIXES (SOUNDCLOUD)
          </span>
          <a
            href="https://soundcloud.com/andhray"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-mono text-[#FF0000] hover:underline"
          >
            SOUNDCLOUD COMPLETO &rarr;
          </a>
        </div>

        {/* GRID MODULAR SOUNDCLOUD: 3 COLUMNAS EN ORDEN ESPECÍFICO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {/* 1. Techno Germany */}
          <div className="border border-neutral-800 hover:border-[#FF0000]/60 bg-neutral-950 p-2 rounded-sm transition-colors duration-200 flex flex-col justify-between">
            <iframe
              width="100%"
              height="120"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              title="ANDHRAY - Techno Germany Podcast 127"
              className="border-0 w-full"
              src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/technogermany/andhray-techno-germany-podcast-127&color=%23ff0000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"
            />
            <span className="font-mono text-[10px] text-neutral-400 mt-2 block tracking-wider uppercase">
              <span className="text-[#FF0000]">{"//"}</span> 01. TECHNO GERMANY PODCAST 127
            </span>
          </div>

          {/* 2. Comme Dans Les Films by Parfait */}
          <div className="border border-neutral-800 hover:border-[#FF0000]/60 bg-neutral-950 p-2 rounded-sm transition-colors duration-200 flex flex-col justify-between">
            <iframe
              width="100%"
              height="120"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              title="ANDHRAY - Comme Dans Les Films #16"
              className="border-0 w-full"
              src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/parfaitparfait/comme-dans-les-films-16-andhray&color=%23ff0000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"
            />
            <span className="font-mono text-[10px] text-neutral-400 mt-2 block tracking-wider uppercase">
              <span className="text-[#FF0000]">{"//"}</span> 02. COMME DANS LES FILMS #16
            </span>
          </div>

          {/* 3. The Meaning Of Rave (TMOR) */}
          <div className="border border-neutral-800 hover:border-[#FF0000]/60 bg-neutral-950 p-2 rounded-sm transition-colors duration-200 flex flex-col justify-between">
            <iframe
              width="100%"
              height="120"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              title="TMORCAST115 | ANDHRAY"
              className="border-0 w-full"
              src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/themeaningofrave/tmorcast115-andhray&color=%23ff0000&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"
            />
            <span className="font-mono text-[10px] text-neutral-400 mt-2 block tracking-wider uppercase">
              <span className="text-[#FF0000]">{"//"}</span> 03. THE MEANING OF RAVE (TMOR)
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
