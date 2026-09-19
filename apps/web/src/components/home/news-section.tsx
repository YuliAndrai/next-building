/**
 * @file apps/web/src/components/home/news-section.tsx
 * @layer Presentation Layer / Home UI Component
 * @description Latest News & Streams Section featuring HÖR Berlin YouTube DJ set embed and MEMENTO Spotify mini player.
 */

"use client";

import React from "react";

/**
 * NewsSection Component
 *
 * Renders the featured media section with:
 * - Left column (lg:col-span-7): HÖR Berlin YouTube DJ set responsive video player.
 * - Right column (lg:col-span-5): MEMENTO track featured mini player (Spotify embed) and upcoming EP teaser card.
 *
 * @returns {React.JSX.Element} The rendered NewsSection.
 */
export function NewsSection(): React.JSX.Element {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 py-16 border-t border-neutral-800 w-full">
      {/* Header de la sección */}
      <div className="flex items-center justify-between mb-8 pb-3 border-b border-neutral-800">
        <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">
          <span className="text-[#FF0000]">{"//"}</span> ÚLTIMAS NOTICIAS
        </span>
        <span className="text-[10px] font-mono tracking-widest text-neutral-600 uppercase">
          STREAMING &amp; MÚSICA
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLUMNA IZQUIERDA: VIDEO EMBEBIDO DE HÖR BERLIN */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-[#FF0000] animate-pulse mr-2" />
              HÖR BERLIN <span className="text-[#FF0000] mx-1">{"//"}</span> DJ SET
            </span>
            <span className="text-[11px] font-mono text-neutral-500">24 JULIO 2026</span>
          </div>
          <div className="relative w-full aspect-video rounded-sm overflow-hidden border border-neutral-800 bg-black">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/_xtvbbRCeGU"
              title="Andhray - HÖR Berlin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
            <p className="text-xs font-mono text-neutral-400">
              Transmisión en directo desde los estudios de HÖR en Berlín. Hard Dance, frecuencias ácidas e industrial.
            </p>
            <a
              href="https://www.youtube.com/watch?v=_xtvbbRCeGU"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-xs font-mono text-neutral-300 hover:text-white transition-colors shrink-0"
            >
              <span>VER SET EN VIVO</span>
              <span className="transition-colors group-hover:text-[#FF0000]">&rarr;</span>
            </a>
          </div>
        </div>

        {/* COLUMNA DERECHA: MINI REPRODUCTOR EMBEBIDO SPOTIFY / SOUNDCLOUD DE MEMENTO */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div>
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
              TRACK DESTACADO <span className="text-[#FF0000] mx-1">{"//"}</span> MEMENTO
            </span>
            <p className="text-[11px] font-mono text-neutral-500 mt-1">
              Original Mix • Fast Techno &amp; Groove
            </p>
          </div>
          
          {/* Mini Player iframe (Spotify embed compacto) */}
          <div className="w-full rounded-sm overflow-hidden border border-neutral-800 hover:border-[#FF0000]/60 bg-neutral-950 p-2 transition-colors duration-200">
            <iframe
              style={{ borderRadius: "4px" }}
              src="https://open.spotify.com/embed/track/68KwzzA0ybAGpUALiaJ0Ci?utm_source=generator&theme=0"
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Andhray - Memento"
            />
          </div>

          {/* Tarjeta de Próximos Lanzamientos */}
          <div className="border border-neutral-800 bg-neutral-950 p-4 rounded-sm hover:border-[#FF0000]/60 transition-colors duration-200">
            <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">
              PRÓXIMAMENTE
            </span>
            <h4 className="text-sm font-bold text-white uppercase">
              Nuevo EP Original Mix (2026)
            </h4>
            <p className="text-xs text-neutral-400 mt-1">
              Explorando texturas ácidas, percusión analógica y velocidad.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
