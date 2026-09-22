# Solution Spec: migrate-videos-to-youtube-embeds Implementation

## 1. Governance & Agent Assignment
- **Initiative Planner**: `planner`
- **Lead Implementation Specialist**: `frontend`
- **Architect Gatekeeper**: `architect` (Gate 1 & Gate 2)
- **Quality & Review**: `qa` & `reviewer`
- **Security Auditor**: `security`

## 2. Solution Overview & 4-Layer Architecture
The video subsystem is redesigned into a 4-layered decoupled architecture:

1. **Presentation Layer (`apps/web/src/components/media/`, `apps/web/src/app/press-kit/`)**:
   - `apps/web/src/components/media/youtube-embed.tsx`: Reusable, secure, zero-dependency YouTube embed component using `https://www.youtube-nocookie.com/embed/{id}`. Features responsive aspect ratio containers (`aspect-[9/16]` for shorts, `aspect-video` for standard landscape), `loading="lazy"`, strict iframe permissions (`accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture`), and an external link to open directly in YouTube.
   - `apps/web/src/app/press-kit/page.tsx`: Replaces the legacy `fs.readdirSync()` video scanning with the domain pipeline `getPressKitVideos()`. Renders two distinct presentation groups or dynamic grid cards that honor the user-specified order and aspect ratios.

2. **Application/Consumption Layer (`apps/web/src/lib/pipelines/`)**:
   - `apps/web/src/lib/pipelines/media-pipeline.ts`: Adds `getPressKitVideos()` function returning strongly typed `PressKitVideoItem[]` with ID, YouTube ID, title, kind (`short` vs `standard`), aspect ratio, and canonical watch URL.

3. **Domain/Data Layer (`apps/web/src/data/`)**:
   - `apps/web/src/data/press-kit-videos.ts`: Immutable canonical registry containing the 5 official videos in exact user-requested sequence:
     1. `nVKHhhkLOF0` (Short, 9:16)
     2. `zZ40FMDKgL8` (Short, 9:16)
     3. `7k-WS8nDfhA` (Standard, 16:9)
     4. `0cv6JDcuJgI` (Standard, 16:9)
     5. `zycfjPiSrT0` (Standard, 16:9)

4. **Infrastructure Layer (`apps/web/public/`, `.gitignore`)**:
   - Removal of ~700 MB of binary video files from `apps/web/public/press-kit/videos/`.
   - Addition of `apps/web/public/press-kit/videos/` to `.gitignore` to prevent future local uploads from committing binaries to Git or Vercel.

## 3. Atomic Slices & Logical Sequence
- **SPEC-1: Video Registry, Pipeline & YouTube Embed Component** (Branch: `fix/app-migrate-videos-to-youtube-embeds`):
  - **Step 1 (RED)**: Write unit tests in `tests/youtube-media.test.ts` asserting:
    - Data registry contains all 5 videos in exact order with correct YouTube IDs and aspect ratios.
    - `media-pipeline.ts` `getPressKitVideos()` returns valid video items.
    - `YouTubeEmbed` renders accessible, privacy-enhanced iframe with correct src and aspect ratio classes.
  - **Step 2 (GREEN)**: Implement `press-kit-videos.ts`, `youtube-embed.tsx`, and pipeline functions. Update `press-kit/page.tsx` to consume the pipeline.
  - **Step 3 (REFACTOR & CLEANUP)**: Purge binary videos from git staging, add gitignore rule, ensure clean code and mandatory in-code commentary across all files.

## 4. TDD (Test-Driven Development) Strategy
### Unit/Integration Tests (Fase RED)
- **Test File Path**: `apps/web/tests/youtube-media.test.ts`
- **Command**: `pnpm --filter web test`
- **Assertion Goals**:
  1. Verifies the order and metadata of the 5 canonical YouTube videos.
  2. Verifies `aspectRatio` calculation (`9:16` vs `16:9`) matching the requested shorts vs landscape formats.
  3. Verifies zero reliance on `fs.readdirSync()` for video loading.

## 5. Local Definition of Done (DoD)
- [ ] Phase 1 through 8 completed in `.agents/active_task_state.json`.
- [ ] 5 YouTube videos loaded in exact user order with proper aspect ratios (Shorts in 9:16, standard in 16:9).
- [ ] 700 MB binary videos removed from `apps/web/public/press-kit/videos/` and protected in `.gitignore`.
- [ ] Unit tests pass with 100% green status.
- [ ] `pnpm validate` finishes with 0 errors.
- [ ] Human acceptance confirmed prior to PR merge.

## 6. Spec Artifact Traceability
- **Problem Spec**: [fix-app-migrate-videos-to-youtube-embeds.md](file:///c:/Users/info/OneDrive/Documentos/desarrollo/pag-andhray/knowledge/fixes/fix-app-migrate-videos-to-youtube-embeds.md)
- **Solution Spec**: [fix-app-migrate-videos-to-youtube-embeds-implementation.md](file:///c:/Users/info/OneDrive/Documentos/desarrollo/pag-andhray/knowledge/fixes/fix-app-migrate-videos-to-youtube-embeds-implementation.md)
