/**
 * @file apps/web/src/components/home/bio-section.tsx
 * @layer Presentation Layer / Home UI Component
 * @description Editorial Biography section for ANDHRAY featuring a 2-column layout:
 * narrative biography and collective mission on the left, and editorial impact metrics card on the right.
 * Fully localized across 8 languages.
 */

"use client";

import React from "react";
import Link from "next/link";
import { useI18n } from "@/i18n/client";

/**
 * Editorial metric item interface.
 */
interface MetricItem {
  value: string;
  label: string;
  isAccent?: boolean;
}

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
  const { locale, t } = useI18n();

  const impactMetrics: readonly MetricItem[] = [
    { value: "12", label: t.bio.countriesLabel },
    { value: "2", label: t.bio.continentsLabel },
    { value: "+33.5K", label: t.bio.streamsLabel },
    { value: "HÖR BERLIN", label: t.bio.showcaseLabel, isAccent: true },
  ] as const;

  return (
    <section id="bio" className="w-full bg-transparent relative z-10">
      {/* Anchor identifier support for legacy #about links */}
      <span id="about" className="sr-only -top-20 relative" />

      {/* Step 1: 2-Column Editorial Grid Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Step 2: Columna Izquierda (lg:col-span-7) - Texto y Visión */}
        <div className="lg:col-span-7">
          <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase block">
            <span className="text-[#FF0000]">{"//"}</span> {t.bio.title}
          </span>

          <p className="text-sm font-mono tracking-wider text-neutral-400 uppercase mt-2 mb-6">
            {t.bio.subtitle}
          </p>

          <div className="text-neutral-300 text-base md:text-lg leading-relaxed font-light space-y-5">
            <p className="font-sans">
              {t.bio.statement}
            </p>
            <p className="font-sans">
              {t.bio.collective}
            </p>
            <p className="font-sans text-sm text-neutral-400 font-mono">
              {t.bio.soundDescription}
            </p>
          </div>

          <div>
            <a 
              href="https://industrialgirls.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 mt-8 px-6 py-3 border border-[#FF0000] bg-black text-white hover:bg-[#FF0000] hover:text-black transition-all duration-300 shadow-none hover:shadow-[0_0_20px_rgba(255,0,0,0.3)] text-xs font-mono tracking-widest uppercase rounded-sm"
            >
              <span>{t.bio.visitCollectiveButton}</span>
              <span className="transition-colors group-hover:text-black">&rarr;</span>
            </a>
          </div>
        </div>

        {/* Step 3: Columna Derecha (lg:col-span-5) - Tarjeta de Impacto Editorial */}
        <div className="lg:col-span-5">
          <div className="border border-neutral-800 border-l-2 border-l-[#FF0000] bg-neutral-950 p-6 md:p-8 rounded-sm hover:border-[#FF0000]/60 transition-colors duration-200">
            <h3 className="text-xs font-mono tracking-widest text-neutral-400 uppercase mb-6 pb-3 border-b border-neutral-800">
              <span className="text-[#FF0000]">{"//"}</span> {t.bio.impactTitle}
            </h3>

            <div className="grid grid-cols-2 gap-6">
              {impactMetrics.map((metric, index) => (
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

            <Link 
              href={`/${locale}/press-kit`} 
              className="group mt-6 inline-block w-full text-center py-2.5 border border-[#FF0000] bg-black text-white hover:bg-[#FF0000] hover:text-black transition-all duration-300 shadow-none hover:shadow-[0_0_20px_rgba(255,0,0,0.3)] text-[11px] font-mono tracking-widest uppercase rounded-sm"
            >
              {t.bio.downloadEpkButton} <span className="transition-colors group-hover:text-black">&darr;</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
