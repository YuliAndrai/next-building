/**
 * @file apps/web/src/components/home/bio-section.tsx
 * @layer Presentation Layer / Home UI Component
 * @description Editorial Biography section for ANDHRAY featuring a 2-column layout:
 * narrative biography and collective mission on the left, and editorial impact metrics card on the right.
 */

"use client";

import React from "react";
import { siteConfig } from "@/data/site-config";

/**
 * Editorial metric item interface.
 */
interface MetricItem {
  value: string;
  label: string;
  isAccent?: boolean;
}

/**
 * Curated career impact metrics displayed in the editorial presence card (2x2 symmetrical grid).
 */
const IMPACT_METRICS: readonly MetricItem[] = [
  { value: "12", label: "PAÍSES RECORRIDOS" },
  { value: "2", label: "CONTINENTES" },
  { value: "+33.5K", label: "STREAMS SENSUAL (SPOTIFY)" },
  { value: "HÖR BERLIN", label: "SHOWCASE (24 JUL 2026)", isAccent: true },
] as const;

/**
 * BioSection Component
 *
 * Renders the editorial biography section of ANDHRAY with a 2-column layout:
 * - Left column (lg:col-span-7): Technical role subtitle, deep narrative bio paragraphs, and Industrial Girls CTA.
 * - Right column (lg:col-span-5): Minimalist editorial impact card with career metrics grid and EPK download link.
 *
 * @returns {React.JSX.Element} The rendered bio section.
 */
export function BioSection(): React.JSX.Element {
  return (
    <section id="bio" className="w-full bg-transparent relative z-10">
      {/* Anchor identifier support for legacy #about links */}
      <span id="about" className="sr-only -top-20 relative" />

      {/* Step 1: 2-Column Editorial Grid Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Step 2: Columna Izquierda (lg:col-span-7) - Texto y Visión */}
        <div className="lg:col-span-7">
          <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase block">
            <span className="text-[#FF0000]">{"//"}</span> BIO
          </span>

          <p className="text-sm font-mono tracking-wider text-neutral-400 uppercase mt-2 mb-6">
            DJ • PRODUCTORA • FUNDADORA DE INDUSTRIAL GIRLS
          </p>

          <div className="text-neutral-300 text-base md:text-lg leading-relaxed font-light space-y-5">
            {siteConfig.artist.bio.map((paragraph, idx) => (
              <p key={idx} className="font-sans">
                {paragraph}
              </p>
            ))}
          </div>

          <div>
            <a 
              href="https://industrialgirls.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 mt-8 px-6 py-3 border border-neutral-700 bg-neutral-950/60 hover:bg-white hover:text-black hover:border-white transition-all text-xs font-mono tracking-widest uppercase text-neutral-200 rounded-sm"
            >
              <span>VISITAR INDUSTRIAL GIRLS</span>
              <span className="transition-colors group-hover:text-[#FF0000]">&rarr;</span>
            </a>
          </div>
        </div>

        {/* Step 3: Columna Derecha (lg:col-span-5) - Tarjeta de Impacto Editorial */}
        <div className="lg:col-span-5">
          <div className="border border-neutral-800 border-l-2 border-l-[#FF0000] bg-neutral-950/70 p-6 md:p-8 rounded-sm backdrop-blur-sm">
            <h3 className="text-xs font-mono tracking-widest text-neutral-400 uppercase mb-6 pb-3 border-b border-neutral-800">
              <span className="text-[#FF0000]">{"//"}</span> IMPACTO &amp; PRESENCIA
            </h3>

            <div className="grid grid-cols-2 gap-6">
              {IMPACT_METRICS.map((metric, index) => (
                <div key={index} className="space-y-1">
                  <span
                    className={`block font-bold text-white font-mono ${
                      metric.isAccent ? "text-base sm:text-lg" : "text-2xl sm:text-3xl"
                    }`}
                  >
                    {metric.value}
                  </span>
                  <span className="block text-[10px] font-mono tracking-wider text-neutral-400 uppercase leading-snug">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>

            <a 
              href="#epk" 
              className="group mt-6 inline-block w-full text-center py-2.5 border border-neutral-700/60 text-[11px] font-mono tracking-widest uppercase text-neutral-300 hover:text-white hover:border-neutral-500 transition-colors"
            >
              DOWNLOAD EPK (PDF) <span className="transition-colors group-hover:text-[#FF0000]">&darr;</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
