/**
 * @file apps/web/src/components/home/media-press-kit-section.tsx
 * @layer Presentation Layer / Home UI Component
 * @description Media & Press Kit section featuring responsive high-resolution photo placeholders, live video clip teaser, and official EPK download button.
 */

"use client";

import React from "react";
import { Download, Play, Camera, Film } from "lucide-react";

/**
 * MediaPressKitSection Component
 *
 * Renders the Media & Press Kit visual skeleton for promoters, press, and festival organizers.
 * Displays a 4-slot stylized dark grid (3 hi-res photos and 1 live video clip) with download EPK CTA.
 *
 * @returns {React.JSX.Element} The rendered Media & Press Kit section.
 */
export function MediaPressKitSection() {
  return (
    <section id="media" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-black border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        {/* Step 1: Section Header & Descriptive Subtitle */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-6 border-b border-neutral-900">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-ultra text-red-600 font-semibold block mb-2">
              {"// PROMOTERS & PRESS ASSETS"}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-widest text-white">
              MEDIA // PRESS KIT
            </h2>
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-neutral-400 mt-2 sm:mt-0 max-w-md text-left sm:text-right">
            Material visual y prensa oficial para promotores y medios.
          </p>
        </div>

        {/* Step 2: Responsive Visual Grid of 4 Stylized Placeholders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {/* Item 1: Photo Placeholder 1 */}
          <div className="group relative aspect-[4/5] bg-neutral-950 border border-neutral-900 flex flex-col items-center justify-between p-6 hover:border-neutral-700 transition-all duration-300 overflow-hidden">
            <div className="w-full flex items-center justify-between text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
              <span>PHOTO // 01</span>
              <span>HI-RES</span>
            </div>
            
            <div className="flex flex-col items-center gap-3 text-neutral-600 group-hover:text-neutral-300 transition-colors">
              <div className="w-12 h-12 rounded-full border border-neutral-800 flex items-center justify-center bg-neutral-900/60">
                <Camera className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 group-hover:text-neutral-300 transition-colors">
                PORTRAIT SHOT
              </span>
            </div>

            <div className="w-full text-center">
              <span className="text-[9px] font-mono text-neutral-700 uppercase tracking-wider block">
                ASPECT 4:5 • 300 DPI
              </span>
            </div>
          </div>

          {/* Item 2: Photo Placeholder 2 */}
          <div className="group relative aspect-[4/5] bg-neutral-950 border border-neutral-900 flex flex-col items-center justify-between p-6 hover:border-neutral-700 transition-all duration-300 overflow-hidden">
            <div className="w-full flex items-center justify-between text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
              <span>PHOTO // 02</span>
              <span>HI-RES</span>
            </div>
            
            <div className="flex flex-col items-center gap-3 text-neutral-600 group-hover:text-neutral-300 transition-colors">
              <div className="w-12 h-12 rounded-full border border-neutral-800 flex items-center justify-center bg-neutral-900/60">
                <Camera className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 group-hover:text-neutral-300 transition-colors">
                STAGE &amp; CROWD
              </span>
            </div>

            <div className="w-full text-center">
              <span className="text-[9px] font-mono text-neutral-700 uppercase tracking-wider block">
                ASPECT 4:5 • 300 DPI
              </span>
            </div>
          </div>

          {/* Item 3: Photo Placeholder 3 */}
          <div className="group relative aspect-[4/5] bg-neutral-950 border border-neutral-900 flex flex-col items-center justify-between p-6 hover:border-neutral-700 transition-all duration-300 overflow-hidden">
            <div className="w-full flex items-center justify-between text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
              <span>PHOTO // 03</span>
              <span>HI-RES</span>
            </div>
            
            <div className="flex flex-col items-center gap-3 text-neutral-600 group-hover:text-neutral-300 transition-colors">
              <div className="w-12 h-12 rounded-full border border-neutral-800 flex items-center justify-center bg-neutral-900/60">
                <Camera className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 group-hover:text-neutral-300 transition-colors">
                STUDIO / EDITORIAL
              </span>
            </div>

            <div className="w-full text-center">
              <span className="text-[9px] font-mono text-neutral-700 uppercase tracking-wider block">
                ASPECT 4:5 • 300 DPI
              </span>
            </div>
          </div>

          {/* Item 4: Live Video Clip Placeholder (Centered Play Button) */}
          <div className="group relative aspect-[4/5] bg-neutral-950 border border-neutral-900 flex flex-col items-center justify-between p-6 hover:border-neutral-700 transition-all duration-300 overflow-hidden cursor-pointer">
            <div className="w-full flex items-center justify-between text-[10px] font-mono text-neutral-600 uppercase tracking-widest">
              <span className="text-red-500 flex items-center gap-1.5 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                LIVE CLIP
              </span>
              <Film className="w-3.5 h-3.5" />
            </div>

            {/* Centered Play Button */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all duration-300 shadow-2xl">
                <Play className="w-6 h-6 fill-current ml-1" />
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors">
                VER TRANSMISIÓN EN VIVO
              </span>
            </div>

            <div className="w-full text-center">
              <span className="text-[9px] font-mono text-neutral-700 uppercase tracking-wider block">
                FHD 1080P • REEL TEASER
              </span>
            </div>
          </div>
        </div>

        {/* Step 3: Centered EPK Download Action & Explanatory Metadata */}
        <div className="flex flex-col items-center text-center">
          <a
            href="#"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black text-xs sm:text-sm font-bold uppercase tracking-widest hover:bg-neutral-200 transition-all duration-200 shadow-xl"
          >
            <Download className="w-4 h-4" />
            <span>DESCARGAR PRESS KIT OFICIAL (EPK)</span>
          </a>
          <p className="mt-3 text-[11px] sm:text-xs font-mono uppercase tracking-wider text-neutral-500">
            Incluye: Fotos Hi-Res, Biografía en PDF, Logos vectoriales y Rider Técnico.
          </p>
        </div>
      </div>
    </section>
  );
}
