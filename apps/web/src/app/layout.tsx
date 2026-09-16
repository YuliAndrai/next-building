/**
 * @file apps/web/src/app/layout.tsx
 * @description Root layout for ANDHRAY official website.
 */

import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";
import "./globals.css";

export const metadata: Metadata = {
  title: `${siteConfig.artist.name} | Official Website`,
  description: siteConfig.artist.tagline,
  keywords: [
    "Andhray",
    "Sara Landry",
    "Techno",
    "Hard Techno",
    "Industrial Techno",
    "Tour Dates",
    "DJ",
    "Hekate",
    "Awakenings",
    "Verknipt",
    "Electronic Music"
  ],
  openGraph: {
    title: `${siteConfig.artist.name} | Official Website`,
    description: siteConfig.artist.tagline,
    type: "website",
    locale: "en_US",
    siteName: siteConfig.artist.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.artist.name} | Official Website`,
    description: siteConfig.artist.tagline,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark bg-black">
      <body className="bg-black text-neutral-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
