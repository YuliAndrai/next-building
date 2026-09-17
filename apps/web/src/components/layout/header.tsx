"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { 
  InstagramIcon, 
  YoutubeIcon, 
  SoundcloudIcon, 
  SpotifyIcon 
} from "@/components/ui/social-icons";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "HOME", href: "/#home" },
    { label: "MÚSICA", href: "/#music" },
    { label: "SIGUIENTES EVENTOS", href: "/#events" },
    { label: "FOTOS Y VIDEOS", href: "/#media" },
    { label: "CONTACTO", href: "/#contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-black/95 backdrop-blur-md border-b border-neutral-800/80 py-3 shadow-2xl" 
          : "bg-black/70 backdrop-blur-sm border-b border-white/5 py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo - Minimalist Bold Monochromatic Typography */}
        <Link 
          href="/#home" 
          className="group flex flex-col items-start focus:outline-none"
        >
          <span className="text-xl sm:text-2xl font-black uppercase tracking-ultra text-white group-hover:text-neutral-300 transition-colors">
            {siteConfig.artist.name}
          </span>
          <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-mono">
            OFFICIAL
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs uppercase tracking-widest font-mono font-medium text-neutral-400 hover:text-white transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Socials & CTA */}
        <div className="hidden lg:flex items-center space-x-4">
          <a
            href={siteConfig.socials.soundcloud}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors p-1.5"
            aria-label="SoundCloud"
          >
            <SoundcloudIcon className="w-4 h-4" />
          </a>
          <a
            href={siteConfig.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors p-1.5"
            aria-label="Instagram"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>
          <a
            href={siteConfig.socials.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors p-1.5"
            aria-label="Spotify"
          >
            <SpotifyIcon className="w-4 h-4" />
          </a>
          <a
            href={siteConfig.socials.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 hover:text-white transition-colors p-1.5"
            aria-label="YouTube"
          >
            <YoutubeIcon className="w-4 h-4" />
          </a>

          <Link
            href="/#events"
            className="ml-2 px-4 py-1.5 border border-white/40 text-xs font-mono font-semibold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-200"
          >
            LIVE DATES
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-neutral-300 hover:text-white p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/98 border-b border-neutral-800 px-6 pt-4 pb-8 space-y-4 animate-in fade-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3 pt-2 font-mono">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs uppercase tracking-widest font-medium text-neutral-400 hover:text-white py-2 border-b border-neutral-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-neutral-800">
            <div className="flex items-center space-x-4">
              <a
                href={siteConfig.socials.soundcloud}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white"
                aria-label="SoundCloud"
              >
                <SoundcloudIcon className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.socials.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white"
                aria-label="Spotify"
              >
                <SpotifyIcon className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-5 h-5" />
              </a>
            </div>

            <Link
              href="/#events"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 border border-white text-xs font-mono font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black"
            >
              TICKETS
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
