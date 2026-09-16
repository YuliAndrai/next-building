/**
 * @file apps/web/src/app/page.tsx
 * @description Official Home Page for ANDHRAY.
 * Cloned and adapted from the dark industrial aesthetic of saralandry.com
 */

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { NewsSection } from "@/components/home/news-section";
import { TourDatesSection } from "@/components/home/tour-dates-section";
import { MusicSection } from "@/components/home/music-section";
import { MediaPressKitSection } from "@/components/home/media-press-kit-section";
import { MerchSection } from "@/components/home/merch-section";
import { NewsletterSection } from "@/components/home/newsletter-section";
import { AboutBookingSection } from "@/components/home/about-booking-section";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-neutral-100 flex flex-col font-sans selection:bg-white selection:text-black">
      {/* Header with Top Announcement Bar & Sticky Navigation */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-1 flex flex-col">
        <HeroSection />
        <NewsSection />
        <TourDatesSection />
        <MusicSection />
        <MediaPressKitSection />
        <MerchSection />
        <NewsletterSection />
        <AboutBookingSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
