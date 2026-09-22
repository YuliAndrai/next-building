# Problem Spec: add-press-kit-short-video

## What problem exists
The Electronic Press Kit (EPK) videos catalog needs an additional live short showcase (`https://youtube.com/shorts/iUUqvl6Bc2M`) to expand the vertical reels presentation. In addition, the external watch link in `apps/web/src/components/media/youtube-embed.tsx` renders the literal string `&nearr;` rather than the unicode arrow glyph `↗`, causing a visual defect on mobile and desktop viewports.

## Why it matters
1. **Curated Showcase Expansion**: Adding the new live reel (`iUUqvl6Bc2M`) gives promoters, booking agents, and festival curators direct vertical footage of ANDHRAY's performance.
2. **Visual Polish & Clean Typography**: Replacing the raw HTML entity string `&nearr;` with the clean arrow symbol `↗` preserves brutalist aesthetic consistency.

## What outcome is expected
1. `apps/web/src/data/press-kit-videos.ts` registers `https://youtube.com/shorts/iUUqvl6Bc2M` (ID: `iUUqvl6Bc2M`, kind: `short`, aspect ratio: `9:16`) as the 3rd Short item.
2. `apps/web/src/components/media/youtube-embed.tsx` renders the clean visual arrow `↗` instead of the literal entity text `&nearr;`.
3. The video pipeline and `press-kit/page.tsx` render all 6 videos (3 Shorts in 9:16 + 3 Live Performances in 16:9).
4. All unit tests pass, including updated tests in `tests/youtube-media.test.ts`.
5. `pnpm validate` finishes with 0 errors.

## What gaps exist today
1. `PRESS_KIT_VIDEOS` currently contains only 5 videos (2 Shorts, 3 Live Performances).
2. `YouTubeEmbed` renders `&nearr;` as literal text.

## What questions remain open
None. Scope is strictly defined and verified.
