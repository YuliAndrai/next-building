"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { ChevronDown, Play, Calendar } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-black grain-overlay">
      {/* Background Graphic & Atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-black/80 to-black z-10" />

      {/* Atmospheric dark moody lighting & laser/smoke simulation */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-950/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] bg-neutral-800/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Central Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        {/* Subtle sub-badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 border border-neutral-800 bg-black/60 text-[10px] sm:text-xs uppercase tracking-ultra text-neutral-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
          <span>WORLD TOUR 2026 // NOW LIVE</span>
        </div>

        {/* Monumental Headline */}
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-ultra text-white uppercase select-none drop-shadow-2xl">
          {siteConfig.artist.name}
        </h1>

        {/* Subtitle / Techno Philosophy */}
        <p className="mt-4 sm:mt-6 max-w-2xl text-xs sm:text-sm uppercase tracking-widest text-neutral-400 font-medium leading-relaxed">
          {siteConfig.artist.tagline}
        </p>

        {/* High-Contrast Action Buttons (Sara Landry Style) */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
          <Link
            href="/#tour"
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-all duration-200 flex items-center justify-center gap-2.5 shadow-lg"
          >
            <Calendar className="w-4 h-4" />
            <span>TOUR DATES</span>
          </Link>

          <Link
            href="/#music"
            className="w-full sm:w-auto px-8 py-3.5 border border-white/30 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/10 hover:border-white transition-all duration-200 flex items-center justify-center gap-2.5 backdrop-blur-sm"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>LISTEN NOW</span>
          </Link>
        </div>

        {/* Latest Release Quick Mention */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-neutral-900/80 w-full max-w-md flex items-center justify-between text-[11px] font-mono text-neutral-500 uppercase tracking-widest">
          <span>OUT NOW:</span>
          <span className="text-neutral-200 font-bold">OBSIDIAN AWAKENING EP</span>
          <Link href="/#music" className="text-neutral-400 hover:text-white underline">
            STREAM
          </Link>
        </div>
      </div>

      {/* Down Arrow / Scroll Prompt */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <Link 
          href="/#tour" 
          aria-label="Scroll to tour dates"
          className="text-neutral-600 hover:text-white transition-colors"
        >
          <ChevronDown className="w-6 h-6" />
        </Link>
      </div>
    </section>
  );
}
