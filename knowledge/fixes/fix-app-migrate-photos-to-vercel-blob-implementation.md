# Solution Spec: migrate-photos-to-vercel-blob Implementation

## 1. Governance & Agent Assignment
- **Initiative Planner**: `planner`
- **Lead Implementation Specialist**: `frontend`
- **Architect Gatekeeper**: `architect` (Gate 1 & Gate 2)
- **Quality & Review**: `qa` & `reviewer`
- **Security Auditor**: `security`

## 2. Solution Overview & 4-Layer Architecture
The implementation follows strict 4-layer functional boundaries without mixing concerns or exposing raw filesystem calls to presentation components:

1. **Presentation Layer (`apps/web/src/app/`, `apps/web/src/components/`)**:
   - `apps/web/src/app/press-kit/page.tsx`: Consumes media items provided by the application pipeline (`resolvePressKitPhotos()`). Does NOT invoke `fs.readdirSync`. Renders next/image with Blob CDN URLs.
   - `apps/web/src/app/page.tsx`: Uses the resolved hero image URL from the media pipeline.
2. **Application / Consumption Layer (`apps/web/src/lib/pipelines/`)**:
   - `apps/web/src/lib/pipelines/media-pipeline.ts`: Pipeline orchestration functions:
     - `getPressKitPhotos()`: Requests photos from the infrastructure layer adapter with defensive fallback to predefined static fallback lists.
     - `getHeroImageUrl()`: Returns the remote Blob URL or local fallback.
3. **Domain / Services Layer (`apps/web/src/data/media-registry.ts`)**:
   - Defines domain types (`MediaPhotoAsset`, `PressKitMediaResponse`) and fallback constants. Pure data and contracts; zero framework or SDK dependencies.
4. **Infrastructure Layer (`apps/web/src/lib/infrastructure/blob-storage.ts`, `next.config.ts`, `scripts/`)**:
   - `apps/web/src/lib/infrastructure/blob-storage.ts`: Encapsulates `@vercel/blob` SDK calls (`list()`, `head()`). Handles missing token or network errors gracefully with try/catch fallback.
   - `next.config.ts`: Adds `*.public.blob.vercel-storage.com` to `images.remotePatterns`.
   - `scripts/migrate-photos-to-blob.ts`: One-time / reproducible Node.js script using `@vercel/blob` `put()` to upload local photos (`apps/web/public/press-kit/photos/` and `hero-bg.jpg`) to Vercel Blob store.

## 3. Atomic Slices & Logical Sequence
- **SPEC-1: Media Pipeline & Vercel Blob Infrastructure Adapter** (Branch: `fix/app-migrate-photos-to-vercel-blob`):
  1. **RED (TDD)**: Create `tests/blob-media.test.ts` testing domain contracts, fallback resolution, remote pattern authorization, and Blob client error resilience.
  2. **GREEN (Implementation)**:
     - Update `next.config.ts` to allow `*.public.blob.vercel-storage.com`.
     - Implement `apps/web/src/data/media-registry.ts` (Domain contracts).
     - Implement `apps/web/src/lib/infrastructure/blob-storage.ts` (Infrastructure adapter).
     - Implement `apps/web/src/lib/pipelines/media-pipeline.ts` (Application pipeline).
     - Update `apps/web/src/app/press-kit/page.tsx` and `apps/web/src/app/page.tsx` (Presentation layer).
     - Create `scripts/migrate-photos-to-blob.ts` (Migration utility).
     - Run migration script with local `BLOB_READ_WRITE_TOKEN`.
  3. **REFACTOR (Clean Code)**: Audit in-code commentary (layer roles, JSDoc, step-by-step indicators `// Step N:`), verify 0 eslint/typecheck issues.

## 4. TDD (Test-Driven Development) Strategy
### Unit/Integration Tests (Fase RED)
- **Test File Path**: `tests/blob-media.test.ts`
- **Command**: `pnpm test tests/blob-media.test.ts`
- **Assertion Goals**:
  1. `next.config.ts` includes `*.public.blob.vercel-storage.com` in `remotePatterns`.
  2. Domain `media-registry.ts` exposes valid fallback image structures.
  3. Infrastructure `blob-storage.ts` resolves remote blobs and gracefully falls back to static list on network or configuration failure.
  4. Pipeline `media-pipeline.ts` produces well-formed image URLs suitable for `next/image`.

## 5. Local Definition of Done (DoD)
- [ ] La fase actual del tracker de estado es `PHASE_8_HUMAN_MERGE_APPROVED`.
- [ ] La suite de pruebas de regresión pasa al 100% (verde).
- [ ] `pnpm validate` se ejecuta con 0 errores y 0 warnings.
- [ ] Las fotos están cargadas y accesibles en el Blob store `andhray-media-blob`.
- [ ] Aprobación explícita del humano registrada.

## 6. Spec Artifact Traceability
- **Problem Spec**: [fix-app-migrate-photos-to-vercel-blob.md](file:///c:/Users/info/OneDrive/Documentos/desarrollo/pag-andhray/knowledge/fixes/fix-app-migrate-photos-to-vercel-blob.md)
- **Solution Spec**: [fix-app-migrate-photos-to-vercel-blob-implementation.md](file:///c:/Users/info/OneDrive/Documentos/desarrollo/pag-andhray/knowledge/fixes/fix-app-migrate-photos-to-vercel-blob-implementation.md)
