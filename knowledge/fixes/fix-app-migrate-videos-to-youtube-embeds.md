# Problem Spec: migrate-videos-to-youtube-embeds

## What problem exists
Currently, heavy raw video files totaling ~700 MB (`IMG_0012.MOV` [368.9 MB], `IMG_2191.MOV` [119.7 MB], `C4811_00661212.mp4` [80.8 MB], `IMG_1468.mov` [64.3 MB], `Andhray 1.mp4` [64.2 MB]) are committed directly in the Git repository under `apps/web/public/press-kit/videos/`.

Furthermore:
1. `apps/web/src/app/press-kit/page.tsx` reads media from disk at runtime using Node.js `fs.readdirSync()`, which is inefficient and error-prone in serverless edge runtimes.
2. Serving raw 368 MB and 120 MB video files directly from Vercel public routes exhausts Vercel's Fast Data Transfer bandwidth allowance (100 GB/month on Hobby tier) in less than ~250 views/downloads, exposing the platform to service downtime or bandwidth overages.
3. Git clones, builds, and Vercel deployments are severely slowed down by 700 MB of binary video files in the repository.
4. The raw video files include uncompressed iPhone MOV formats that do not provide adaptive bitrate streaming, causing buffering and poor mobile UX for press promoters and festival bookers.

## Why it matters
1. **Zero Bandwidth Exhaustion on Vercel**: Offloading video delivery to YouTube embeds (`youtube-nocookie.com`) shifts 100% of video bandwidth and streaming computation to Google's CDN infrastructure at \$0 cost, keeping Vercel's bandwidth consumption for video playback at 0 bytes.
2. **Superior Mobile & Global Streaming Experience**: YouTube provides automatic adaptive bitrate streaming (1080p, 720p, 480p), ensuring instant playback across all network conditions and devices.
3. **Proper Aspect Ratio Presentation**: The 5 press kit videos include both vertical shorts (9:16) and horizontal landscape videos (16:9). A dedicated embed player structure respects each video's native framing without letterboxing distortion.
4. **Clean Monorepo Hygiene**: Removing 700 MB of binary video files from `apps/web/public/` and tracking them via `.gitignore` dramatically reduces repository footprint and deployment times.

## What outcome is expected
1. A structured domain video registry defines the 5 official press-kit videos in exact order:
   - Video 1: `https://youtube.com/shorts/nVKHhhkLOF0` (Short, 9:16)
   - Video 2: `https://youtube.com/shorts/zZ40FMDKgL8` (Short, 9:16)
   - Video 3: `https://youtu.be/7k-WS8nDfhA` (Landscape, 16:9)
   - Video 4: `https://youtu.be/0cv6JDcuJgI` (Landscape, 16:9)
   - Video 5: `https://youtu.be/zycfjPiSrT0` (Landscape, 16:9)
2. `apps/web/src/lib/pipelines/media-pipeline.ts` provides `getPressKitVideos()` returning strongly-typed video descriptors with title, YouTube ID, format (`short` vs `standard`), and aspect ratio.
3. `apps/web/src/app/press-kit/page.tsx` renders the videos using a clean, accessible `YouTubeEmbed` component that respects native aspect ratios (9:16 cards for Shorts, 16:9 cards for standard videos) and provides external watch links to YouTube.
4. The legacy raw files in `apps/web/public/press-kit/videos/` are removed from Git tracking and protected via `.gitignore`.
5. 100% of unit tests pass, and `pnpm validate` finishes with 0 errors.

## What gaps exist today
1. `apps/web/src/app/press-kit/page.tsx` is hardcoded to scan `public/press-kit/videos` via `fs.readdirSync()`.
2. No YouTube embed component exists to render responsive 9:16 and 16:9 frames.
3. The video registry in `media-pipeline.ts` only handles photo assets from Vercel Blob and lacks video definitions.

## What questions remain open
1. Are raw download links required for press? 
   - Decision confirmed with user: No raw file downloads needed on Vercel; videos will be embedded with direct "Ver en YouTube / Watch on YouTube" links.
