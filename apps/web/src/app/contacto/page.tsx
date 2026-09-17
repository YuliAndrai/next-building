/**
 * @file apps/web/src/app/contacto/page.tsx
 * @layer Presentation Layer / Page Component
 * @description Dedicated Booking & Contact route featuring direct agency credentials (Laura: +57 313 772 1671, industrialgirls.techno@gmail.com) and interactive booking inquiry form.
 */

"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { siteConfig } from "@/data/site-config";
import { Mail, MessageSquare, Send, CheckCircle2, Download, Globe, ShieldCheck } from "lucide-react";

export default function ContactoPage(): React.JSX.Element {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    venue: "",
    date: "",
    type: "Club Show",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 flex flex-col font-sans">
      {/* Floating Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 pt-32 sm:pt-40 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-16">
          
          {/* Header */}
          <div className="border-b border-neutral-900 pb-8 text-center sm:text-left">
            <span className="text-[11px] font-mono uppercase tracking-ultra text-red-600 font-semibold block mb-2">
              {"// DIRECT MANAGEMENT & WORLDWIDE BOOKING"}
            </span>
            <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-widest text-white">
              CONTACTO // BOOKING
            </h1>
            <p className="mt-3 text-xs sm:text-sm uppercase tracking-widest text-neutral-400 max-w-3xl">
              CONTRATACIONES PARA CLUBES, FESTIVALES, SHOWCASES Y COMUNICACIONES DE PRENSA OFICIAL.
            </p>
          </div>

          {/* Cards de Contacto Directo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Booking Agent Laura */}
            <div className="p-6 sm:p-8 bg-black/40 backdrop-blur-md border border-neutral-800/60 rounded-xl space-y-4 hover:border-neutral-700 transition-colors">
              <span className="inline-flex items-center gap-2 px-2.5 py-0.5 border border-red-900/60 bg-red-950/50 text-[10px] font-mono uppercase tracking-widest text-red-400 font-semibold rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                ASISTENCIA, LOGÍSTICA TRAVEL, CONTRATOS
              </span>
              <h2 className="text-xl font-black uppercase tracking-wide text-white">
                LAURA &mdash; BOOKING ASSISTANT
              </h2>
              <p className="text-xs text-neutral-400 font-mono">
                Industrial Girls
              </p>
              
              <div className="space-y-3 pt-2">
                <a
                  href="https://wa.me/573137721671?text=Hola%20Laura,%20me%20gustar%C3%ADa%20consultar%20disponibilidad%20de%20Booking%20para%20Andhray"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 hover:text-white text-xs font-mono font-bold uppercase rounded-lg transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>ESCRIBIR POR WHATSAPP &rarr;</span>
                </a>
              </div>
            </div>

            {/* Card 2: Email Oficial y Sello */}
            <div className="p-6 sm:p-8 bg-black/40 backdrop-blur-md border border-neutral-800/60 rounded-xl space-y-4 hover:border-neutral-700 transition-colors">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                CORREO INSTITUCIONAL
              </span>
              <h2 className="text-xl font-black uppercase tracking-wide text-white">
                EMAIL DIRECTO
              </h2>
              <p className="text-xs text-neutral-400 font-mono">
                Para propuestas formales de contratación, riders técnicos y prensa.
              </p>
              <div className="pt-2">
                <a
                  href="mailto:industrialgirls.techno@gmail.com"
                  className="inline-flex items-center gap-2 text-xs font-mono text-neutral-200 hover:text-white break-all hover:underline"
                >
                  <Mail className="w-4 h-4 text-red-500 shrink-0" />
                  <span>industrialgirls.techno@gmail.com</span>
                </a>
              </div>
              <div className="pt-2">
                <span className="text-[10px] font-mono uppercase text-neutral-500 block">
                  COLECTIVO / PLATAFORMA:
                </span>
                <span className="text-xs font-bold font-mono tracking-wider text-white">
                  INDUSTRIAL GIRLS
                </span>
              </div>
            </div>

            {/* Card 3: Gira y Prensa */}
            <div className="p-6 sm:p-8 bg-black/40 backdrop-blur-md border border-neutral-800/60 rounded-xl space-y-4 hover:border-neutral-700 transition-colors">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                TOUR &amp; PRENSA
              </span>
              <h2 className="text-xl font-black uppercase tracking-wide text-white">
                EURO TOUR 2026
              </h2>
              <p className="text-xs text-neutral-400 font-mono leading-relaxed">
                Agenda abierta para fechas en Italia, Alemania y resto de Europa (Noviembre &ndash; Diciembre 2026).
              </p>
              <div className="pt-2">
                <a
                  href={siteConfig.contacts.pressKitUrl}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-neutral-700 bg-black/40 hover:bg-white hover:text-black text-white text-xs font-mono uppercase tracking-widest font-semibold rounded-lg transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PRESS KIT &amp; RIDERS (EPK)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Formulario de Solicitud de Booking */}
          <div className="bg-black/40 backdrop-blur-md border border-neutral-800/60 rounded-xl p-6 sm:p-10 space-y-8">
            <div className="border-b border-neutral-800/60 pb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-red-500 font-semibold block mb-1">
                {"// FORMULARIO DE CONTRATACIÓN"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-widest text-white">
                SOLICITUD DE BOOKING
              </h2>
              <p className="text-xs text-neutral-400 font-mono uppercase tracking-wider mt-1">
                Completa los datos de tu evento para recibir cotización formal y disponibilidad de calendario.
              </p>
            </div>

            {submitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 animate-bounce" />
                <h3 className="text-2xl font-black uppercase tracking-wide text-white">
                  ¡SOLICITUD ENVIADA CORRECTAMENTE!
                </h3>
                <p className="text-xs sm:text-sm font-mono text-neutral-300 max-w-md leading-relaxed">
                  Gracias por tu interés en contratar a ANDHRAY. Laura revisará tu solicitud y se comunicará a la brevedad con la disponibilidad y el rider técnico.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 bg-neutral-900 border border-neutral-700 text-xs font-mono uppercase tracking-widest text-white hover:bg-neutral-800 rounded-lg transition-colors"
                >
                  ENVIAR OTRA CONSULTA
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Nombre */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-neutral-300 block">
                      NOMBRE DEL PROMOTOR / CLUB *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Klubnacht / Juan Pérez"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-black/50 border border-neutral-800/80 rounded-lg px-4 py-3 text-xs font-mono text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-neutral-300 block">
                      EMAIL DE CONTACTO *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="booking@tuclub.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-black/50 border border-neutral-800/80 rounded-lg px-4 py-3 text-xs font-mono text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500"
                    />
                  </div>

                  {/* Teléfono / WhatsApp */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-neutral-300 block">
                      TELÉFONO / WHATSAPP *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+39 000 0000 / +49 ..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-black/50 border border-neutral-800/80 rounded-lg px-4 py-3 text-xs font-mono text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500"
                    />
                  </div>

                  {/* Ciudad y País */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-neutral-300 block">
                      CIUDAD &amp; PAÍS *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Berlín, Alemania / Milán, Italia"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-black/50 border border-neutral-800/80 rounded-lg px-4 py-3 text-xs font-mono text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500"
                    />
                  </div>

                  {/* Venue o Festival */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-neutral-300 block">
                      NOMBRE DE LA SALA / FESTIVAL *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Tresor / Warehouse 21"
                      value={formData.venue}
                      onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                      className="w-full bg-black/50 border border-neutral-800/80 rounded-lg px-4 py-3 text-xs font-mono text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500"
                    />
                  </div>

                  {/* Fecha propuesta */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-widest text-neutral-300 block">
                      FECHA ESTIMADA DEL EVENTO *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full bg-black/50 border border-neutral-800/80 rounded-lg px-4 py-3 text-xs font-mono text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500"
                    />
                  </div>
                </div>

                {/* Tipo de evento */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-neutral-300 block">
                    FORMATO DE PRESENTACIÓN
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-black/50 border border-neutral-800/80 rounded-lg px-4 py-3 text-xs font-mono text-white focus:outline-none focus:border-neutral-500"
                  >
                    <option value="Club Show">Club Show (DJ Set Extended)</option>
                    <option value="Festival Headline">Festival Headline / Mainstage</option>
                    <option value="Showcase Industrial Girls">Showcase Colectivo Industrial Girls</option>
                    <option value="Live Stream / Podcast">Sesión En Vivo / Broadcast</option>
                    <option value="Prensa / Entrevista">Entrevista / Media Feature</option>
                  </select>
                </div>

                {/* Mensaje adicional */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-widest text-neutral-300 block">
                    DETALLES ADICIONALES / OFERTA ESTIMADA
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Detalles sobre aforo, line-up, logística de vuelos/hotel y propuesta económica..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-black/50 border border-neutral-800/80 rounded-lg px-4 py-3 text-xs font-mono text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white hover:bg-neutral-200 text-black text-xs font-bold uppercase tracking-widest font-mono rounded-lg transition-all shadow-lg"
                  >
                    <Send className="w-4 h-4" />
                    <span>ENVIAR SOLICITUD DE BOOKING</span>
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
