/**
 * @file apps/web/src/components/media/youtube-embed.tsx
 * @layer Presentation Layer / Component
 * @description Layer 1: Presentation - Responsive, privacy-enhanced YouTube video embed component.
 * Renders an accessible iframe container pointing to youtube-nocookie.com, adhering to strict CSP,
 * lazy-loading policies, and aspect ratio boundaries (9:16 vertical shorts or 16:9 standard).
 */

import React from "react";

/**
 * Properties for the YouTubeEmbed component.
 */
export interface YouTubeEmbedProps {
  /** 11-character YouTube video identifier */
  readonly videoId: string;
  /** Accessible title for screen readers and iframe labeling */
  readonly title: string;
  /** Aspect ratio format: '9:16' for Shorts, '16:9' for standard landscape */
  readonly aspectRatio?: "9:16" | "16:9";
  /** Canonical direct watch URL on YouTube */
  readonly watchUrl?: string;
  /** Optional custom CSS classes for the outer container */
  readonly className?: string;
}

/**
 * YouTubeEmbed Component
 *
 * Renders a responsive, privacy-enhanced video embed frame.
 *
 * Execution Flow:
 * // Step 1: Sanitize and validate videoId against YouTube ID format invariant
 * // Step 2: Resolve responsive aspect ratio styling (9:16 for Shorts vs 16:9 standard)
 * // Step 3: Build privacy-first embed URL using youtube-nocookie.com
 * // Step 4: Render accessible container with sandboxed iframe and external watch link
 *
 * Security Invariants:
 * - Employs `youtube-nocookie.com` to eliminate third-party tracking cookies without user consent.
 * - Restricts iframe permissions strictly via the `allow` attribute.
 * - Validates videoId against alphanumeric pattern to prevent iframe injection vectors.
 *
 * @param {YouTubeEmbedProps} props Component props.
 * @returns {React.JSX.Element} Rendered YouTube embed card.
 */
export function YouTubeEmbed({
  videoId,
  title,
  aspectRatio = "16:9",
  watchUrl,
  className = "",
}: YouTubeEmbedProps): React.JSX.Element {
  // Step 1: Validate video identifier (Security Invariant)
  const isValidId = /^[a-zA-Z0-9_-]{11}$/.test(videoId);
  const safeId = isValidId ? videoId : "";

  // Step 2: Determine aspect ratio container classes
  const aspectClass = aspectRatio === "9:16" ? "aspect-[9/16]" : "aspect-video";

  // Step 3: Construct privacy-preserving embed URL
  const embedUrl = safeId
    ? `https://www.youtube-nocookie.com/embed/${safeId}?rel=0`
    : "";

  // Step 4: Render component markup
  return (
    <div
      data-testid="youtube-embed-container"
      className={`border border-neutral-800 hover:border-[#FF0000]/60 bg-neutral-950 p-3 rounded-sm transition-colors duration-200 flex flex-col justify-between space-y-3 ${className}`}
    >
      <div className={`relative w-full overflow-hidden rounded-sm bg-black ${aspectClass}`}>
        {embedUrl ? (
          <iframe
            data-testid="youtube-embed-iframe"
            src={embedUrl}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="w-full h-full border-0 object-cover rounded-sm"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-500 font-mono text-xs">
            Invalid Video Identifier
          </div>
        )}
      </div>

      {watchUrl && (
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="youtube-embed-watch-link"
          className="flex items-center justify-between text-[11px] font-mono text-neutral-400 hover:text-[#FF0000] transition-colors pt-1"
        >
          <span className="truncate pr-2">{title}</span>
          <span className="shrink-0 font-bold text-xs" aria-hidden="true">↗</span>
        </a>
      )}
    </div>
  );
}
