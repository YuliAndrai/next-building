/**
 * @file apps/web/src/components/layout/header.tsx
 * @layer Presentation Layer / Layout Component
 * @description Fixed floating header for ANDHRAY official platform.
 * Features monochromatic typography, responsive navigation, LanguageSwitcher, and social links.
 */

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { OfficialSocialLinksBar } from "@/components/ui/social-icons";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useI18n } from "@/i18n/client";
import { Menu, X } from "lucide-react";

/**
 * Header Component
 *
 * Renders the top navigation bar with:
 * 1. Minimalist brand typography.
 * 2. Localized navigation links.
 * 3. 8-Language switcher (desktop and mobile).
 * 4. Official social links bar.
 *
 * @returns {React.JSX.Element} Rendered header element.
 */
export function Header(): React.JSX.Element {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { locale, t } = useI18n();

  // Step 1: Track window scroll position to apply background blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Step 2: Build localized navigation links with current locale prefix
  const navLinks = [
    { label: t.nav.home, href: `/${locale}` },
    { label: t.nav.music, href: `/${locale}/musica` },
    { label: t.nav.events, href: `/${locale}/#tour` },
    { label: t.nav.press, href: `/${locale}/press-kit` },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 bg-transparent border-none transition-all duration-300 ${
        isScrolled ? "py-3 bg-black/85 backdrop-blur-md border-b border-neutral-900" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo - Minimalist Bold Monochromatic Typography */}
        <Link 
          href={`/${locale}`} 
          className="group flex flex-col items-start focus:outline-none"
        >
          <span className="text-xl sm:text-2xl font-black uppercase tracking-ultra text-white group-hover:text-neutral-300 transition-colors">
            {siteConfig.artist.name}
          </span>
          <span className="text-[9px] uppercase tracking-widest text-neutral-500 font-mono">
            {t.home.heroSubtitle}
          </span>
          <span className="block text-xs font-mono tracking-widest text-neutral-400 uppercase mt-1">
            &ldquo;{t.home.slogan}&rdquo;
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group text-xs uppercase tracking-widest font-mono text-neutral-400 hover:text-[#FF0000] transition-colors relative py-1 flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000] opacity-0 group-hover:opacity-100 transition-all duration-200 transform scale-50 group-hover:scale-100" />
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        {/* Desktop Controls: Language Switcher & Socials */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          <LanguageSwitcher variant="header" />
          <div className="h-4 w-px bg-neutral-800 hidden lg:block" />
          <div className="hidden lg:flex items-center">
            <OfficialSocialLinksBar
              className="flex items-center gap-3 xl:gap-3.5"
              iconClassName="w-4 h-4"
            />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <LanguageSwitcher variant="header" />
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
        <div className="md:hidden bg-black/98 border-b border-neutral-800 px-6 pt-4 pb-8 space-y-5 animate-in fade-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3 pt-2 font-mono">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="group text-xs uppercase tracking-widest font-mono text-neutral-400 hover:text-[#FF0000] py-2 border-b border-neutral-900 transition-colors flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000] opacity-0 group-hover:opacity-100 transition-all duration-200 transform scale-50 group-hover:scale-100" />
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Language Switcher Section */}
          <div className="pt-2 border-t border-neutral-900">
            <LanguageSwitcher variant="mobile" />
          </div>

          <div className="pt-4 flex items-center justify-center border-t border-neutral-800">
            <OfficialSocialLinksBar
              className="flex items-center gap-4 flex-wrap justify-center"
              iconClassName="w-4.5 h-4.5"
            />
          </div>
        </div>
      )}
    </header>
  );
}
