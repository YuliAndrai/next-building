/**
 * @file apps/web/src/components/home/hero-section.tsx
 * @layer Presentation Layer / Home UI Component
 * @description Minimalist 100vh editorial hero section featuring Sara Landry aesthetic, bottom-left anchored content leaving the artist face and silhouette completely unobstructed.
 */

"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { Mail } from "lucide-react";
import {
  InstagramIcon,
  SoundcloudIcon,
  SpotifyIcon,
} from "@/components/ui/social-icons";

/**
 * HeroSection Component
 *
 * Renders the minimalist 100vh editorial hero section inspired by Sara Landry aesthetic.
 * All text and controls are anchored in the bottom-left corner of the viewport to keep
 * the face, eyes, hair, and central silhouette completely unobstructed.
 *
 * @returns {React.JSX.Element} The rendered hero section.
 */
export function HeroSection(): React.JSX.Element {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-end px-4 sm:px-6 lg:px-8 pb-12 md:pb-16 bg-transparent"
    >
      {/* Anchor identifier support for navbar #home link */}
      <span id="home" className="sr-only -top-20 relative" />

      {/* Screen reader heading for accessibility without visual obstruction */}
      <h1 className="sr-only">{siteConfig.artist.name} - Official Website</h1>

      {/* Bloque alineado estrictamente con el margen vertical de Tour Dates */}
      <div className="w-full max-w-6xl mx-auto">
        <div className="relative z-10 max-w-xl space-y-3.5 flex flex-col items-start text-left filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.95)]">
          {/* 1. Badge de Gira */}
          <Link href="/#events" className="inline-block">
            <span className="inline-flex items-center gap-1.5 border border-neutral-800 bg-black/60 backdrop-blur-md px-3.5 py-1 rounded-full text-[11px] font-mono tracking-widest text-neutral-300 hover:border-neutral-600 transition-colors">
              EURO TOUR (NOV - DIC) &rarr;
            </span>
          </Link>

          {/* 2. Badges de género en fila horizontal */}
          <div className="flex flex-wrap gap-2">
            {["HARD DANCE", "ACID", "GROOVE"].map((genre) => (
              <span
                key={genre}
                className="text-[10px] font-mono px-2.5 py-1 rounded bg-black/70 border border-neutral-800 text-neutral-300 uppercase"
              >
                {genre}
              </span>
            ))}
          </div>

          {/* 3. Fila de redes sociales alineada a la izquierda con hover:text-white */}
          <div className="flex items-center gap-4 text-neutral-400">
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a
              href={siteConfig.socials.soundcloud}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="SoundCloud"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <SoundcloudIcon className="w-5 h-5" />
            </a>
            <a
              href={siteConfig.socials.spotify}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Spotify"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <SpotifyIcon className="w-5 h-5" />
            </a>
            <Link
              href="/#contact"
              aria-label="Contacto de Booking"
              className="text-neutral-400 hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
