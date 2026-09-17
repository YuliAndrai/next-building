/**
 * @file apps/web/src/components/home/hero-section.tsx
 * @layer Presentation Layer / Home UI Component
 * @description Monumental hero section featuring ANDHRAY branding, editorial atmosphere, statement, music genres, and minimalist social links row.
 */

"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { Mail, ChevronDown } from "lucide-react";
import {
  InstagramIcon,
  SoundcloudIcon,
  SpotifyIcon,
  TiktokIcon,
  FacebookIcon,
} from "@/components/ui/social-icons";

/**
 * HeroSection Component
 *
 * Renders the minimalist monumental top hero for artist ANDHRAY.
 * Displays:
 * - Editorial background / atmosphere layer.
 * - Upper tour banner: "EURO TOUR (NOV - DIC)".
 * - Monumental artist headline: "ANDHRAY".
 * - Subtitle: "DJ • PRODUCTORA • FUNDADORA DE INDUSTRIAL GIRLS".
 * - Statement motto: "Música sensual para almas sensuales".
 * - Genre badges: "HARD DANCE", "ACID", "GROOVE".
 * - Minimalist horizontal social links row (Instagram, TikTok, Facebook, SoundCloud, Spotify, Email).
 *
 * @returns {React.JSX.Element} The rendered hero section.
 */
export function HeroSection(): React.JSX.Element {
  // Pre-configured editorial background photo URL (leave empty for dark atmospheric lighting)
  const editorialPhotoUrl = "";

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-black grain-overlay">
      {/* Step 1: Editorial Photography Background & Atmospheric dark moody lighting */}
      {editorialPhotoUrl ? (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 z-0 scale-105 filter grayscale contrast-125"
          style={{ backgroundImage: `url(${editorialPhotoUrl})` }}
        />
      ) : null}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-black/80 to-black z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-950/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] bg-neutral-800/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Central Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        {/* Step 2: Upper Tour Banner / Badge */}
        <div className="mb-6 inline-flex items-center gap-2 px-3 py-1 border border-neutral-800 bg-black/60 text-[10px] sm:text-xs uppercase tracking-ultra text-neutral-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
          <span>{siteConfig.artist.heroBanner}</span>
        </div>

        {/* Step 3: Monumental Artist Headline */}
        <h1 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-ultra text-white uppercase select-none drop-shadow-2xl">
          {siteConfig.artist.name}
        </h1>

        {/* Step 4: Secondary Texts Directly Below Name */}
        {/* 4.1: Artist Role */}
        <p className="mt-4 sm:mt-5 text-xs sm:text-sm uppercase tracking-widest text-neutral-300 font-medium">
          {siteConfig.artist.role}
        </p>

        {/* 4.2: Statement / Central Motto */}
        <p className="mt-2 sm:mt-2.5 text-sm sm:text-base text-neutral-400 font-light tracking-wider">
          {siteConfig.artist.slogan}
        </p>

        {/* 4.3: Compact Genre Pills / Badges */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {siteConfig.artist.genres.map((genre) => (
            <span
              key={genre}
              className="px-2.5 py-0.5 rounded-full border border-neutral-800 bg-neutral-900/80 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-neutral-300"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Step 5: Minimalist Horizontal Social Icons Row */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center gap-4">
          <a
            href={siteConfig.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="p-2.5 rounded-full border border-neutral-800 bg-neutral-950/80 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>
          <a
            href={siteConfig.socials.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="p-2.5 rounded-full border border-neutral-800 bg-neutral-950/80 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
          >
            <TiktokIcon className="w-4 h-4" />
          </a>
          <a
            href={siteConfig.socials.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="p-2.5 rounded-full border border-neutral-800 bg-neutral-950/80 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
          >
            <FacebookIcon className="w-4 h-4" />
          </a>
          <a
            href={siteConfig.socials.soundcloud}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="SoundCloud"
            className="p-2.5 rounded-full border border-neutral-800 bg-neutral-950/80 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
          >
            <SoundcloudIcon className="w-4 h-4" />
          </a>
          <a
            href={siteConfig.socials.spotify}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Spotify"
            className="p-2.5 rounded-full border border-neutral-800 bg-neutral-950/80 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
          >
            <SpotifyIcon className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${siteConfig.contacts.management}`}
            aria-label="Email de Contacto"
            className="p-2.5 rounded-full border border-neutral-800 bg-neutral-950/80 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Step 6: Down Arrow / Scroll Prompt */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <Link 
          href="/#music" 
          aria-label="Scroll to music section"
          className="text-neutral-600 hover:text-white transition-colors"
        >
          <ChevronDown className="w-6 h-6" />
        </Link>
      </div>
    </section>
  );
}
