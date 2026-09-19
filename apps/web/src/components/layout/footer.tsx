/**
 * @file apps/web/src/components/layout/footer.tsx
 * @layer Presentation Layer / Layout Component
 * @description Official footer for ANDHRAY featuring localized navigation, management contacts, and legal notices.
 * Fully localized across 8 languages.
 */

"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { OfficialSocialLinksBar } from "@/components/ui/social-icons";
import { useI18n } from "@/i18n/client";
import { ArrowUp } from "lucide-react";

/**
 * Footer Component
 *
 * Renders the localized footer with artist branding, quick links, booking credentials, and back-to-top control.
 *
 * @returns {React.JSX.Element} Rendered footer element.
 */
export function Footer(): React.JSX.Element {
  const { locale, t } = useI18n();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black border-t border-neutral-800 text-neutral-400 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-neutral-800">
        {/* Col 1: Artist branding */}
        <div className="space-y-4 md:col-span-2">
          <span className="text-2xl font-black uppercase tracking-ultra text-white block">
            {siteConfig.artist.name}
          </span>
          <p className="text-xs font-mono text-neutral-500 uppercase tracking-widest max-w-sm leading-relaxed">
            {siteConfig.artist.tagline}
          </p>
          <OfficialSocialLinksBar className="flex items-center gap-5 flex-wrap pt-2" />
        </div>

        {/* Col 2: Quick Links */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-white font-mono">
            {t.footer.navigationTitle}
          </h4>
          <ul className="space-y-2 text-xs uppercase tracking-widest font-mono">
            <li>
              <Link href={`/${locale}`} className="hover:text-[#FF0000] transition-colors">
                {t.nav.home}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/musica`} className="hover:text-[#FF0000] transition-colors">
                {t.nav.music}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/#tour`} className="hover:text-[#FF0000] transition-colors">
                {t.nav.events}
              </Link>
            </li>
            <li>
              <Link href={`/${locale}/press-kit`} className="hover:text-[#FF0000] transition-colors">
                {t.nav.press}
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Booking & Inquiries */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-white font-mono">
            {t.footer.inquiriesTitle}
          </h4>
          <p className="text-xs text-neutral-500 font-mono">
            {t.booking.managementAssistantRole}:
            <span className="block text-neutral-200 font-bold mt-0.5">
              {t.booking.managerName}
            </span>
            <a 
              href="https://wa.me/573137721671" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-[#FF0000] hover:text-white transition-colors mt-1"
            >
              <span>{t.booking.whatsappButton} &rarr;</span>
            </a>
          </p>
          <p className="text-xs text-neutral-500 font-mono pt-1">
            Email:
            <a 
              href={`mailto:${t.booking.managerEmail}`} 
              className="block text-neutral-300 hover:text-[#FF0000] transition-colors mt-1"
            >
              {t.booking.managerEmail}
            </a>
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-600 gap-4">
        <p className="uppercase tracking-widest text-[10px] font-mono">
          &copy; {new Date().getFullYear()} {siteConfig.artist.name}. {t.footer.rights}
        </p>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-neutral-400 hover:text-[#FF0000] text-[10px] uppercase tracking-widest transition-colors font-mono"
        >
          <span>{t.footer.backToTop}</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
