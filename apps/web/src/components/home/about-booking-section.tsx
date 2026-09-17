"use client";

import React from "react";
import { siteConfig } from "@/data/site-config";
import { Download, Mail, Quote, Phone } from "lucide-react";

export function AboutBookingSection() {
  return (
    <section id="about" className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-transparent relative z-10">
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
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-black/40 backdrop-blur-md border border-neutral-800/60 rounded-xl text-xs font-bold uppercase tracking-widest text-neutral-300 hover:text-white hover:border-white transition-colors"
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
            {/* Booking Agent Laura */}
            <div className="p-6 bg-black/40 backdrop-blur-md border border-neutral-800/60 rounded-xl space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-semibold block">
                BOOKING AGENT
              </span>
              <h4 className="text-sm font-bold uppercase tracking-wide text-white">
                LAURA &bull; MANAGEMENT
              </h4>
              <p className="text-xs text-neutral-400">
                Representación global, contrataciones y fechas de gira.
              </p>
              <div className="space-y-1.5 pt-2">
                <a
                  href="tel:+573202572002"
                  className="flex items-center gap-2 text-xs font-mono text-neutral-200 hover:text-white"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>+57 320 257 2002</span>
                </a>
                <a
                  href="mailto:industrialgirls.techno@gmail.com"
                  className="flex items-center gap-2 text-xs font-mono text-neutral-200 hover:text-white hover:underline"
                >
                  <Mail className="w-3.5 h-3.5 text-red-500" />
                  <span className="break-all">industrialgirls.techno@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Platform / Sello */}
            <div className="p-6 bg-black/40 backdrop-blur-md border border-neutral-800/60 rounded-xl space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                SELLO &amp; PLATAFORMA
              </span>
              <h4 className="text-sm font-bold uppercase tracking-wide text-white">
                INDUSTRIAL GIRLS
              </h4>
              <p className="text-xs text-neutral-400">
                Para lanzamientos, colaboraciones y eventos temáticos del colectivo.
              </p>
              <a
                href="mailto:industrialgirls.techno@gmail.com"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-white hover:underline pt-2"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>industrialgirls.techno@gmail.com</span>
              </a>
            </div>

            {/* Euro Tour 2026 */}
            <div className="p-6 bg-black/40 backdrop-blur-md border border-neutral-800/60 rounded-xl space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                GIRA CONFIRMADA
              </span>
              <h4 className="text-sm font-bold uppercase tracking-wide text-white">
                EURO TOUR 2026
              </h4>
              <p className="text-xs text-neutral-400">
                Italia, Alemania y resto de Europa (Noviembre &ndash; Diciembre 2026).
              </p>
              <a
                href="/contacto"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-white hover:underline pt-2"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>FORMULARIO DE CONTACTO &rarr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
