/**
 * @file apps/web/src/app/page.tsx
 * @layer Presentation Layer / Page Component
 * @description Official Home Page for ANDHRAY.
 * Continuous fixed background architecture with Hero, Tour Dates, and Booking sections.
 */

import React from "react";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { TourDatesSection } from "@/components/home/tour-dates-section";
import { AboutBookingSection } from "@/components/home/about-booking-section";

/**
 * HomePage Component
 *
 * Renders the official ANDHRAY landing page with:
 * 1. HeroSection editorial style full screen.
 * 2. Tour Dates / Próximos Eventos (Euro Tour 2026: Italia y Alemania).
 * 3. Booking / Contacto.
 * (Música y Fotos/Videos accesibles exclusivamente a través de las rutas del navbar).
 *
 * @returns {React.JSX.Element} The rendered home page.
 */
export default function HomePage(): React.JSX.Element {
  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* CAPA DE FOTOGRAFÍA VERTICAL EXTENDIDA (Desbloqueada para descubrir con scroll) */}
      <div className="absolute top-0 left-0 w-full h-[160vh] md:h-[180vh] min-h-[160vh] md:min-h-[180vh] pointer-events-none z-0 overflow-hidden flex justify-center">
        <div className="relative w-full h-full max-w-6xl mx-auto">
          <Image
            src="/hero-bg.jpg"
            alt="Andhray"
            fill
            priority
            className="object-cover object-top w-full h-full"
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
          {/* Fusión lateral suave hacia negro puro */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black pointer-events-none" />
        </div>
        {/* Fusión sutil y degradado suave inferior hacia negro puro */}
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black pointer-events-none" />
      </div>

      {/* CONTENIDO FLOTANTE Y TRANSLÚCIDO QUE HACE SCROLL SOBRE LA FOTO */}
      <div className="relative z-10 flex flex-col">
        {/* Navbar */}
        <Header />

        {/* 1. Hero editorial */}
        <HeroSection />

        {/* 2. Tour Dates / Próximos Eventos */}
        <TourDatesSection />

        {/* 3. Booking / Contacto */}
        <AboutBookingSection />

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}
