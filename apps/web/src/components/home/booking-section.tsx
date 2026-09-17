/**
 * @file apps/web/src/components/home/booking-section.tsx
 * @layer Presentation Layer / Home UI Component
 * @description Official Booking & Management channels and Propuestas & Colaboraciones interactive form for ANDHRAY.
 */

"use client";

import React, { useState } from "react";
import { Mail, MessageSquare, CheckCircle2 } from "lucide-react";

/**
 * BookingSection Component
 *
 * Renders direct representation channel for Laura (Booking Assistant),
 * as well as an interactive form for musical proposals, remixes, press, and streamings.
 *
 * @returns {React.JSX.Element} The rendered booking section.
 */
export function BookingSection(): React.JSX.Element {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "Música / Remixes",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-transparent relative z-10 border-t border-neutral-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact & Management */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h3 className="text-3xl sm:text-4xl font-black uppercase tracking-widest text-white leading-tight">
                BOOKING &amp; MANAGEMENT
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-neutral-400 font-mono leading-relaxed">
                Para lanzamientos, colaboraciones y showcases del colectivo Industrial Girls.
              </p>
            </div>

            {/* Direct Channels Cards */}
            <div className="space-y-4">
              {/* Laura — Booking Assistant */}
              <div className="p-6 bg-black/40 backdrop-blur-md border border-neutral-800/60 rounded-xl space-y-3 hover:border-neutral-700 transition-colors">
                <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-semibold block">
                  Asistencia, logística travel, contratos
                </span>
                <div>
                  <h4 className="text-base font-bold uppercase tracking-wide text-white">
                    Laura &mdash; Booking Assistant
                  </h4>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5">
                    Asistente, logística travel
                  </p>
                </div>
                <div className="space-y-2 pt-1">
                  <a
                    href="mailto:industrialgirls.techno@gmail.com"
                    className="flex items-center gap-2.5 text-xs font-mono text-neutral-300 hover:text-white transition-colors hover:underline"
                  >
                    <Mail className="w-4 h-4 text-red-500 shrink-0" />
                    <span className="break-all">industrialgirls.techno@gmail.com</span>
                  </a>
                  <a
                    href="https://wa.me/573137721671"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-xs font-mono text-neutral-300 hover:text-white transition-colors hover:underline"
                  >
                    <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Escribir por WhatsApp &rarr;</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Propuestas & Colaboraciones Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 bg-black/40 backdrop-blur-md border border-neutral-800/60 rounded-2xl space-y-6">
              <div>
                <h4 className="text-2xl sm:text-3xl font-black uppercase tracking-widest text-white">
                  PROPUESTAS &amp; COLABORACIONES
                </h4>
                <p className="mt-2 text-xs text-neutral-400 font-mono">
                  Espacio para colaboraciones musicales, remixes, prensa, publicidad y streamings.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h5 className="text-xl font-bold uppercase text-white font-mono">
                    ¡PROPUESTA ENVIADA!
                  </h5>
                  <p className="text-xs text-neutral-400 max-w-md mx-auto">
                    Gracias por tu mensaje. El equipo revisará los detalles y te responderá a la brevedad.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        type: "Música / Remixes",
                        message: "",
                      });
                    }}
                    className="mt-4 px-6 py-2 bg-neutral-900 border border-neutral-800 text-xs font-mono uppercase tracking-widest text-neutral-300 hover:text-white rounded-lg transition-colors"
                  >
                    ENVIAR OTRA PROPUESTA
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-1.5">
                      Nombre / Proyecto *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nombre de artista, sello o agencia..."
                      className="w-full bg-black/50 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 font-sans transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-1.5">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="contacto@tudominio.com"
                      className="w-full bg-black/50 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 font-sans transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-1.5">
                      Tipo de Propuesta *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full bg-black/50 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-neutral-500 font-sans transition-colors"
                    >
                      <option value="Música / Remixes" className="bg-neutral-950 text-white">Música / Remixes</option>
                      <option value="Prensa / Publicidad" className="bg-neutral-950 text-white">Prensa / Publicidad</option>
                      <option value="Streamings" className="bg-neutral-950 text-white">Streamings</option>
                      <option value="Showcases Colectivo" className="bg-neutral-950 text-white">Showcases Colectivo</option>
                      <option value="Otro" className="bg-neutral-950 text-white">Otro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-1.5">
                      Mensaje / Detalles de la propuesta *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Escribe aquí los detalles de la propuesta, enlaces a demos, fechas o ideas clave..."
                      className="w-full bg-black/50 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 font-sans transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors rounded-lg font-mono"
                  >
                    ENVIAR PROPUESTA
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
