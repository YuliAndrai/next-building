/**
 * @file apps/web/src/components/ui/language-switcher.tsx
 * @layer Presentation Layer / UI Component
 * @description Minimalist editorial language switcher dropdown for ANDHRAY official platform.
 * Supports 8 languages with dark aesthetic, native endonyms, and route preservation.
 */

"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe, ChevronDown, Check } from "lucide-react";
import {
  SUPPORTED_LOCALES,
  LOCALE_METADATA,
  LOCALE_LABELS,
  DEFAULT_LOCALE,
  isSupportedLocale,
} from "@/i18n/constants";
import type { SupportedLocale } from "@/i18n/types";

interface LanguageSwitcherProps {
  className?: string;
  variant?: "header" | "mobile";
}

/**
 * LanguageSwitcher Component
 *
 * Renders an editorial-styled language switcher adhering to ANDHRAY's dark techno visual aesthetic.
 *
 * @param props Component configuration options.
 * @returns {React.JSX.Element} Rendered language switcher element.
 */
export function LanguageSwitcher({
  className = "",
  variant = "header",
}: LanguageSwitcherProps): React.JSX.Element {
  const router = useRouter();
  const rawPathname = usePathname() || "/";
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Step 1: Detect current active locale from pathname (e.g. "/es/musica" -> "es")
  const pathSegments = rawPathname.split("/").filter(Boolean);
  const firstSegment = pathSegments[0];
  const currentLocale: SupportedLocale = isSupportedLocale(firstSegment)
    ? firstSegment
    : DEFAULT_LOCALE;

  const currentLabel = LOCALE_LABELS[currentLocale];

  // Step 2: Handle clicks outside the dropdown to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Step 3: Handle language selection and path transition
  const handleSelectLanguage = (newLocale: SupportedLocale) => {
    if (newLocale === currentLocale) {
      setIsOpen(false);
      return;
    }

    // Replace current locale prefix with new locale prefix
    let newPath: string;
    if (isSupportedLocale(firstSegment)) {
      const rest = pathSegments.slice(1).join("/");
      newPath = `/${newLocale}${rest ? `/${rest}` : ""}`;
    } else {
      newPath = `/${newLocale}${rawPathname === "/" ? "" : rawPathname}`;
    }

    setIsOpen(false);
    router.push(newPath);
  };

  // Mobile layout variant (rendered inside the mobile navigation drawer)
  if (variant === "mobile") {
    return (
      <div className={`space-y-3 font-mono ${className}`}>
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-neutral-400">
          <Globe className="w-3.5 h-3.5 text-[#FF0000]" />
          <span>IDIOMA / LANGUAGE:</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {SUPPORTED_LOCALES.map((loc) => {
            const meta = LOCALE_METADATA[loc];
            const label = LOCALE_LABELS[loc];
            const isActive = loc === currentLocale;
            return (
              <button
                key={loc}
                type="button"
                onClick={() => handleSelectLanguage(loc)}
                className={`flex items-center justify-between px-3 py-2 text-xs rounded-sm border transition-colors ${
                  isActive
                    ? "border-[#FF0000] bg-neutral-900 text-white font-semibold"
                    : "border-neutral-800 bg-black/60 text-neutral-400 hover:border-neutral-700 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs">{meta.flag}</span>
                  <span className="text-[11px] tracking-wider">{label}</span>
                </div>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#FF0000]" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Header desktop layout variant (minimalist dropdown)
  return (
    <div className={`relative inline-block text-left font-mono ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="group flex items-center gap-2 px-2.5 py-1.5 rounded-sm border border-neutral-800 bg-black/70 hover:border-[#FF0000]/60 hover:bg-neutral-950 transition-all text-xs font-mono text-neutral-300 focus:outline-none"
      >
        <Globe className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#FF0000] transition-colors" />
        <span className="font-bold tracking-widest text-white">{currentLabel}</span>
        <ChevronDown
          className={`w-3 h-3 text-neutral-500 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-white" : "group-hover:text-neutral-300"
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 origin-top-right rounded-sm border border-neutral-800 bg-neutral-950/95 backdrop-blur-md shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 border-b border-neutral-900 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-ultra text-neutral-500 font-semibold">
              SELECT LANGUAGE
            </span>
            <span className="text-[10px] text-[#FF0000] font-mono">8 REGIONS</span>
          </div>

          <div className="py-1 max-h-72 overflow-y-auto" role="listbox">
            {SUPPORTED_LOCALES.map((loc) => {
              const meta = LOCALE_METADATA[loc];
              const label = LOCALE_LABELS[loc];
              const isActive = loc === currentLocale;

              return (
                <button
                  key={loc}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => handleSelectLanguage(loc)}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                    isActive
                      ? "bg-neutral-900/90 text-white font-semibold"
                      : "text-neutral-400 hover:bg-neutral-900/50 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm">{meta.flag}</span>
                    <div className="flex flex-col">
                      <span className="text-xs text-white leading-tight">{meta.nativeName}</span>
                      <span className="text-[9px] uppercase tracking-widest text-neutral-500">
                        {meta.name} ({label})
                      </span>
                    </div>
                  </div>

                  {isActive ? (
                    <Check className="w-3.5 h-3.5 text-[#FF0000]" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-800 group-hover:bg-neutral-600" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
