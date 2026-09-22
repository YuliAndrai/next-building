/**
 * @file scripts/migrate-photos-to-blob.ts
 * @layer Infrastructure / Migration & DevOps Layer
 * @description Operational script that uploads local high-resolution photography assets
 * from apps/web/public/ into Vercel Blob Storage, recording public CDN URLs.
 *
 * Usage:
 *   node --env-file=.env.local -r tsx scripts/migrate-photos-to-blob.ts
 *   or:
 *   pnpm tsx scripts/migrate-photos-to-blob.ts
 */

import fs from "fs";
import path from "path";
import { put, list, type PutBlobResult } from "@vercel/blob";

/**
 * Migration target descriptor.
 */
interface MediaMigrationTarget {
  /** Relative path on local disk from monorepo root */
  localPath: string;
  /** Destination pathname in Vercel Blob store */
  blobPath: string;
  /** Human-readable label for progress reporting */
  label: string;
}

/**
 * Validates that local files exist and compiles the list of assets to migrate.
 *
 * @returns {MediaMigrationTarget[]} Array of migration targets.
 */
function getMigrationTargets(): MediaMigrationTarget[] {
  // Step 1: Initialize list with hero background image
  const targets: MediaMigrationTarget[] = [
    {
      localPath: "apps/web/public/hero-bg.jpg",
      blobPath: "hero-bg.jpg",
      label: "Hero Editorial Background",
    },
  ];

  // Step 2: Scan press kit photos directory
  const pressKitDir = path.join(process.cwd(), "apps/web/public/press-kit/photos");
  if (fs.existsSync(pressKitDir)) {
    const photoFiles = fs
      .readdirSync(pressKitDir)
      .filter((file) => /\.(jpe?g|png|webp)$/i.test(file));

    for (const file of photoFiles) {
      targets.push({
        localPath: `apps/web/public/press-kit/photos/${file}`,
        blobPath: `press-kit/photos/${file}`,
        label: `Press Kit Photo: ${file}`,
      });
    }
  }

  return targets;
}

/**
 * Executes the upload of all migration targets to Vercel Blob storage.
 *
 * Invariant: Every upload uses access: 'public' and addRandomSuffix: false to maintain
 * deterministic, canonical URL mappings.
 */
async function runMigration(): Promise<void> {
  console.log("=== Vercel Blob Media Migration ===");

  // Step 1: Invariant check - Verify BLOB_READ_WRITE_TOKEN is configured
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token || token.trim().length === 0) {
    console.error("❌ ERROR: BLOB_READ_WRITE_TOKEN is not defined in environment.");
    console.error("Please ensure .env.local contains a valid Vercel Blob token.");
    process.exit(1);
  }

  console.log("✓ BLOB_READ_WRITE_TOKEN detected.");

  // Step 2: Compile assets to migrate
  const targets = getMigrationTargets();
  console.log(`Found ${targets.length} asset(s) to process.\n`);

  const results: Array<{ label: string; blobPath: string; url: string; size: number }> = [];

  // Step 3: Iterate through targets and upload via @vercel/blob put()
  for (const target of targets) {
    const absolutePath = path.join(process.cwd(), target.localPath);
    if (!fs.existsSync(absolutePath)) {
      console.warn(`⚠️ Skipping missing file: ${target.localPath}`);
      continue;
    }

    const fileBuffer = fs.readFileSync(absolutePath);
    const stats = fs.statSync(absolutePath);
    const sizeMb = (stats.size / (1024 * 1024)).toFixed(2);

    console.log(`Uploading ${target.label} (${sizeMb} MB) -> ${target.blobPath}...`);

    try {
      const blob: PutBlobResult = await put(target.blobPath, fileBuffer, {
        access: "public",
        addRandomSuffix: false,
        token,
      });

      console.log(`  ✓ Uploaded: ${blob.url}`);
      results.push({
        label: target.label,
        blobPath: target.blobPath,
        url: blob.url,
        size: stats.size,
      });
    } catch (err: unknown) {
      console.error(`  ❌ Failed to upload ${target.blobPath}:`, err instanceof Error ? err.message : err);
    }
  }

  // Step 4: Verification pass - query list() to confirm store state
  console.log("\n=== Verifying Store Assets ===");
  try {
    const storeState = await list({ token });
    console.log(`Total blobs in store: ${storeState.blobs.length}`);
    for (const blob of storeState.blobs) {
      console.log(`  - [${blob.pathname}] ${blob.url} (${(blob.size / 1024 / 1024).toFixed(2)} MB)`);
    }
  } catch (err: unknown) {
    console.warn("⚠️ Could not list store blobs for verification:", err instanceof Error ? err.message : err);
  }

  console.log("\n✅ Migration complete!");
}

// Step 5: Execute migration runner
runMigration().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
