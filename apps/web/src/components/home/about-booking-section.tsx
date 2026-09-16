"use client";

import React from "react";
import { siteConfig } from "@/data/site-config";
import { Download, Mail, Quote } from "lucide-react";

export function AboutBookingSection() {
  return (
    <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-black border-t border-neutral-900">
      <div className="max-w-6xl mx-auto">
        {/* Part 1: Biography & Press */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[11px] font-mono uppercase tracking-ultra text-red-600 font-semibold block">
              {"// ARTIST PROFILE"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-widest text-white leading-tight">
              {siteConfig.artist.bioHeadline}
            </h2>
            <div className="pt-2">
              <a
                href={siteConfig.contacts.pressKitUrl}
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-neutral-800 text-xs font-bold uppercase tracking-widest text-neutral-300 hover:text-white hover:border-white transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>DOWNLOAD PRESS KIT (EPK)</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-neutral-300 text-sm leading-relaxed font-sans">
            {siteConfig.artist.bio.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}

            {/* Press Quotes */}
            <div className="mt-8 pt-8 border-t border-neutral-900 space-y-4">
              {siteConfig.artist.pressQuotes.map((item, idx) => (
                <div key={idx} className="flex gap-3 text-xs italic text-neutral-400 font-mono">
                  <Quote className="w-4 h-4 text-neutral-600 shrink-0" />
                  <div>
                    <p className="text-neutral-300">&ldquo;{item.quote}&rdquo;</p>
                    <span className="text-[10px] uppercase font-bold text-neutral-500 not-italic block mt-1">
                      &mdash; {item.source}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Part 2: Booking & Contact Cards */}
        <div id="contact" className="pt-12 border-t border-neutral-900">
          <span className="text-[11px] font-mono uppercase tracking-ultra text-red-600 font-semibold block mb-2">
            {"// REPRESENTATION"}
          </span>
          <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-widest text-white mb-8">
            BOOKING & CONTACTS
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Management */}
            <div className="p-6 bg-neutral-950 border border-neutral-900 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                GLOBAL MANAGEMENT
              </span>
              <h4 className="text-sm font-bold uppercase tracking-wide text-white">
                MANAGEMENT & RECORD LABEL
              </h4>
              <p className="text-xs text-neutral-400">
                For releases, publishing, branding, and major press inquiries.
              </p>
              <a
                href={`mailto:${siteConfig.contacts.management}`}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-white hover:underline pt-2"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{siteConfig.contacts.management}</span>
              </a>
            </div>

            {/* Booking Americas */}
            <div className="p-6 bg-neutral-950 border border-neutral-900 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                TERRITORY: AMERICAS
              </span>
              <h4 className="text-sm font-bold uppercase tracking-wide text-white">
                NORTH & SOUTH AMERICA
              </h4>
              <p className="text-xs text-neutral-400">
                USA, Canada, Mexico, Colombia, Brazil, Argentina.
              </p>
              <a
                href={`mailto:${siteConfig.contacts.bookingAmericas}`}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-white hover:underline pt-2"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{siteConfig.contacts.bookingAmericas}</span>
              </a>
            </div>

            {/* Booking Europe & ROW */}
            <div className="p-6 bg-neutral-950 border border-neutral-900 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                TERRITORY: EUROPE & ROW
              </span>
              <h4 className="text-sm font-bold uppercase tracking-wide text-white">
                EUROPE, UK & ASIA
              </h4>
              <p className="text-xs text-neutral-400">
                Netherlands, Germany, UK, France, Spain, Australia & ROW.
              </p>
              <a
                href={`mailto:${siteConfig.contacts.bookingEurope}`}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-white hover:underline pt-2"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{siteConfig.contacts.bookingEurope}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
