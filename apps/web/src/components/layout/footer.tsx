"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { 
  InstagramIcon, 
  YoutubeIcon, 
  SoundcloudIcon, 
  SpotifyIcon 
} from "@/components/ui/social-icons";
import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black/60 backdrop-blur-md border-t border-neutral-900/80 text-neutral-400 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-neutral-900">
        {/* Col 1: Artist branding */}
        <div className="space-y-4 md:col-span-2">
          <span className="text-2xl font-black uppercase tracking-ultra text-white block">
            {siteConfig.artist.name}
          </span>
          <p className="text-xs text-neutral-500 uppercase tracking-widest max-w-sm leading-relaxed">
            {siteConfig.artist.tagline}
          </p>
          <div className="flex items-center space-x-5 pt-2">
            <a
              href={siteConfig.socials.soundcloud}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
              aria-label="SoundCloud"
            >
              <SoundcloudIcon className="w-5 h-5" />
            </a>
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a
              href={siteConfig.socials.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
              aria-label="Spotify"
            >
              <SpotifyIcon className="w-5 h-5" />
            </a>
            <a
              href={siteConfig.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-white transition-colors"
              aria-label="YouTube"
            >
              <YoutubeIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-white">
            NAVIGATION
          </h4>
          <ul className="space-y-2 text-xs uppercase tracking-widest">
            <li>
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
            </li>
            <li>
              <Link href="/musica" className="hover:text-white transition-colors">Música &amp; Discografía</Link>
            </li>
            <li>
              <Link href="/#events" className="hover:text-white transition-colors">Tour Dates</Link>
            </li>
            <li>
              <Link href="/fotos-videos" className="hover:text-white transition-colors">Fotos &amp; Videos</Link>
            </li>
            <li>
              <Link href="/#contact" className="hover:text-white transition-colors">Contacto &amp; Booking</Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Booking & Inquiries */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-white">
            BOOKING &amp; INQUIRIES
          </h4>
          <p className="text-xs text-neutral-500 font-mono">
            Booking Assistant:
            <span className="block text-neutral-200 font-bold mt-0.5">
              Laura &mdash; Asistente, logística travel
            </span>
            <a 
              href="https://wa.me/573137721671" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-white transition-colors mt-1"
            >
              <span>Escribir por WhatsApp &rarr;</span>
            </a>
          </p>
          <p className="text-xs text-neutral-500 font-mono pt-1">
            Email Oficial:
            <a 
              href="mailto:industrialgirls.techno@gmail.com" 
              className="block text-neutral-300 hover:text-white transition-colors mt-1"
            >
              industrialgirls.techno@gmail.com
            </a>
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-600 gap-4">
        <p className="uppercase tracking-widest text-[10px]">
          &copy; {new Date().getFullYear()} {siteConfig.artist.name}. ALL RIGHTS RESERVED.
        </p>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-neutral-400 hover:text-white text-[10px] uppercase tracking-widest transition-colors"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
