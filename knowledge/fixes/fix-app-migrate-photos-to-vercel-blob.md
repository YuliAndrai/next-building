# Problem Spec: migrate-photos-to-vercel-blob

## What problem exists
High-resolution artist photography assets (`hero-bg.jpg` [1.2 MB], `ANDHRAY1.jpg` [5.2 MB], `IMG_4123.JPG` [5.6 MB], `IMG_8451.JPG` [9.0 MB]) are currently bundled directly in the Git repository and local filesystem under `apps/web/public/`. 

Furthermore:
1. `apps/web/src/app/press-kit/page.tsx` reads media by calling Node.js filesystem APIs (`fs.readdirSync(path.join(process.cwd(), "apps/web/public/press-kit/photos"))`). In modern serverless and edge hosting architectures (Vercel Fluid Compute / Edge Network), relying on runtime `process.cwd()` disk access can cause cold-start latency, memory bloat, or deployment discrepancies if local assets are not traced into the bundle.
2. `next.config.ts` only allows `images.unsplash.com` in `images.remotePatterns`. The Vercel Blob public CDN domain (`*.public.blob.vercel-storage.com`) is not registered, blocking `next/image` from optimizing external Blob images into WebP/AVIF.
3. Git repository weight is unnecessarily increased by committing multi-megabyte binary photo assets.

## Why it matters
1. **Performance & Global Latency**: Moving photos to Vercel Blob serves them through Vercel's Edge CDN (Blob Data Transfer & Fast Data Transfer), drastically reducing First Contentful Paint (FCP) and Largest Contentful Paint (LCP) across global regions.
2. **Repository & Build Hygiene**: Decoupling binary assets from Git keeps git cloning fast, prevents repository bloat, and aligns with modern cloud-native best practices.
3. **Architectural Reliability**: Serverless route handlers and Server Components should not depend on local disk filesystem inspection (`fs.readdirSync`) to serve dynamic or static media assets.

## What outcome is expected
1. A dedicated infrastructure adapter (`blob-storage.ts`) and application media pipeline (`media-pipeline.ts`) resolve artist photos and press kit assets via `@vercel/blob` (using `BLOB_READ_WRITE_TOKEN`), with a zero-crash fallback to local paths when offline or in test environments.
2. `next.config.ts` registers `*.public.blob.vercel-storage.com` under `images.remotePatterns`.
3. An automated migration/upload utility (`scripts/migrate-photos-to-blob.ts`) uploads local photos to the Vercel Blob store (`andhray-media-blob`) with `access: 'public'`.
4. `apps/web/src/app/press-kit/page.tsx` and `apps/web/src/app/page.tsx` display photos directly from Vercel Blob, optimized through Next.js `<Image />`.
5. 100% of unit tests pass, and `pnpm validate` finishes with 0 errors.

## What gaps exist today
1. No infrastructure layer abstraction exists for `@vercel/blob` in `apps/web/src/lib/infrastructure/`.
2. `next.config.ts` rejects Blob image URLs as unauthorized hosts.
3. `press-kit/page.tsx` is tightly coupled to Node.js `fs` module.
4. No automated migration script exists to populate the Blob store.

## What questions remain open
1. Are the heavy video files in `apps/web/public/press-kit/videos/` in scope for this fix? (Current scope is strictly focused on photography as requested: `hero-bg.jpg` and `press-kit/photos/*`).
