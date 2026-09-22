# Solution Spec: add-press-kit-short-video Implementation

## 1. Governance & Agent Assignment
- **Initiative Planner**: `planner`
- **Lead Implementation Specialist**: `frontend`
- **Architect Gatekeeper**: `architect` (Gate 1 & Gate 2)
- **Quality & Review**: `qa` & `reviewer`
- **Security Auditor**: `security`

## 2. Solution Overview & 4-Layer Architecture
1. **Presentation Layer (`apps/web/src/components/media/`)**:
   - `apps/web/src/components/media/youtube-embed.tsx`: Fix the link text glyph from literal text `&nearr;` to the unicode glyph `↗`.
2. **Domain/Data Layer (`apps/web/src/data/`)**:
   - `apps/web/src/data/press-kit-videos.ts`: Append the new Short `andhray-short-03` with YouTube ID `iUUqvl6Bc2M`, kind: `short`, aspect ratio: `9:16`, title: `ANDHRAY - Live Reel 03`, and watchUrl: `https://youtube.com/shorts/iUUqvl6Bc2M`.
3. **Application Layer (`apps/web/src/lib/pipelines/`)**:
   - `media-pipeline.ts`: Automatically exposes all 6 videos through `getPressKitVideos()`.
4. **Presentation Route (`apps/web/src/app/press-kit/`)**:
   - Automatically partitions and displays the 3 Shorts in the 9:16 grid.

## 3. Atomic Slices & Logical Sequence
- **SPEC-1: Register New Short Video & Polish YouTubeEmbed Glyph** (Branch: `fix/app-add-press-kit-short-video`):
  - **Step 1 (RED)**: Update `tests/youtube-media.test.ts` to assert:
    - Exactly 6 videos are registered in `PRESS_KIT_VIDEOS` with `iUUqvl6Bc2M` included as a `short`.
    - `YouTubeEmbed` renders `↗` without literal `&nearr;`.
  - **Step 2 (GREEN)**: Update `press-kit-videos.ts` and `youtube-embed.tsx`.
  - **Step 3 (REFACTOR & VALIDATE)**: Run clean code check and `pnpm validate`.

## 4. TDD (Test-Driven Development) Strategy
### Unit/Integration Tests (Fase RED)
- **Test File Path**: `tests/youtube-media.test.ts`
- **Command**: `pnpm test tests/youtube-media.test.ts`
- **Assertion Goals**:
  1. Validates the 6 videos count and presence of `iUUqvl6Bc2M`.
  2. Validates the arrow glyph `↗` in component source.

## 5. Local Definition of Done (DoD)
- [ ] Phase 1 through 8 completed in `.agents/active_task_state.json`.
- [ ] 6 YouTube videos loaded (3 vertical Shorts 9:16, 3 landscape performances 16:9).
- [ ] Visual arrow `↗` renders cleanly on watch link.
- [ ] Unit tests pass 100% green.
- [ ] `pnpm validate` finishes with 0 errors.
- [ ] Human acceptance confirmed prior to PR merge.

## 6. Spec Artifact Traceability
- **Problem Spec**: [fix-app-add-press-kit-short-video.md](file:///c:/Users/info/OneDrive/Documentos/desarrollo/pag-andhray/knowledge/fixes/fix-app-add-press-kit-short-video.md)
- **Solution Spec**: [fix-app-add-press-kit-short-video-implementation.md](file:///c:/Users/info/OneDrive/Documentos/desarrollo/pag-andhray/knowledge/fixes/fix-app-add-press-kit-short-video-implementation.md)
