/**
 * @file apps/web/src/components/home/media-press-kit-section.tsx
 * @layer Presentation Layer / Home UI Component
 * @description Fotos y Videos section featuring featured HÖR Berlin video embed/placeholder, editorial stills gallery, and curated media/press podcasts.
 */

"use client";

import React from "react";

/**
 * Editorial still photography placeholder metadata
 */
interface EditorialStillItem {
  id: string;
  label: string;
}

/**
 * Media and press interview/podcast item metadata
 */
interface MediaPressItem {
  id: string;
  title: string;
  subtitle: string;
  url: string;
}

/**
 * Editorial photography stills grid items
 */
const editorialStills: EditorialStillItem[] = [
  { id: "01", label: "EDITORIAL STILL 01" },
  { id: "02", label: "EDITORIAL STILL 02" },
  { id: "03", label: "EDITORIAL STILL 03" },
  { id: "04", label: "EDITORIAL STILL 04" },
];

/**
 * Curated press and podcast interviews
 */
const pressItems: MediaPressItem[] = [
  {
    id: "hor-berlin",
    title: "HÖR Berlin",
    subtitle: "Live Broadcast Session (Berlín)",
    url: "https://www.youtube.com/watch?v=_xtvbbRCeGU",
  },
  {
    id: "techno-germany",
    title: "Techno Germany Podcast",
    subtitle: "Guest Mix",
    url: "https://soundcloud.com/technogermany/andhray-techno-germany-podcast-127",
  },
  {
    id: "comme-dans-les-films",
    title: "Comme Dans Les Films by Parfait",
    subtitle: "Feature Series",
    url: "https://soundcloud.com/parfaitparfait/comme-dans-les-films-16-andhray",
  },
];

/**
 * MediaPressKitSection Component
 *
 * Renders the "FOTOS Y VIDEOS" section with anchor id="media".
 * Contains:
 * - Block 1: Featured HÖR Berlin live video slot with responsive 16:9 container.
 * - Block 2: 4-card editorial photographic gallery with dark placeholders.
 * - Block 3: Media & Press block with curated podcasts and interview sessions.
 *
 * @returns {React.JSX.Element} The rendered Media & Press section.
 */
export function MediaPressKitSection(): React.JSX.Element {
  // Step 1: Pre-configured video embed URL (leave empty for placeholder or provide embed link)
  const videoUrl = "";

  return (
    <section id="media" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-black border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* Step 2: Section Header & Descriptive Industrial Subtitle */}
        <div className="mb-10 pb-6 border-b border-neutral-900">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-widest text-white">
            FOTOS Y VIDEOS
          </h2>
          <p className="mt-2 text-xs font-mono uppercase tracking-widest text-neutral-400">
            {"// ARCHIVO AUDIOVISUAL, SESIONES EN VIVO Y PRENSA"}
          </p>
        </div>

        {/* Step 3: Bloque 1 - SET DESTACADO (HÖR BERLIN) */}
        <div className="w-full">
          <div className="aspect-video w-full rounded-xl border border-neutral-800 overflow-hidden bg-neutral-950 flex items-center justify-center">
            {videoUrl ? (
              <iframe
                src={videoUrl}
                title="Andhray | HÖR Berlin"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center">
                <span className="font-mono text-xs sm:text-sm text-neutral-400 tracking-wider">
                  {"[ VIDEO DESTACADO: ANDHRAY | HÖR BERLIN // JULY 24, 2026 ]"}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Step 4: Bloque 2 - GALERÍA FOTOGRÁFICA EDITORIAL */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {editorialStills.map((still) => (
            <div
              key={still.id}
              className="h-64 rounded-xl border border-neutral-800 bg-neutral-950 flex items-center justify-center p-4 text-center hover:border-neutral-700 transition-colors"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                {still.label}
              </span>
            </div>
          ))}
        </div>

        {/* Step 5: Bloque 3 - MEDIA & PRESS (Entrevistas y Podcasts) */}
        <div className="border-t border-neutral-800 pt-8 mt-12">
          <h3 className="text-sm sm:text-base font-bold font-mono uppercase tracking-widest text-neutral-300 mb-6">
            {"ENTREVISTAS & PODCASTS // PRENSA"}
          </h3>

          <div className="flex flex-col gap-4">
            {pressItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-neutral-950 border border-neutral-800 hover:border-neutral-700 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                  <span className="text-white font-semibold text-sm sm:text-base tracking-wide">
                    {item.title}
                  </span>
                  <span className="hidden sm:inline text-neutral-600">—</span>
                  <span className="font-mono text-xs text-neutral-400">
                    {item.subtitle}
                  </span>
                </div>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 text-xs font-mono font-medium uppercase tracking-wider text-neutral-300 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 rounded-lg transition-all self-start sm:self-auto"
                >
                  {"ESCUCHAR ↗"}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
