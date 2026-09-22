/**
 * @file apps/web/src/lib/infrastructure/blob-storage.ts
 * @layer Infrastructure Layer / External Storage Adapter
 * @description Layer 4: Infrastructure - Vercel Blob Storage Client Adapter.
 * Encapsulates remote asset listing, retrieval, and error handling for Vercel Blob CDN.
 */

import { list, type ListBlobResultBlob } from "@vercel/blob";

/**
 * Item descriptor returned by Blob storage operations.
 */
export interface BlobStorageItem {
  /** Full public HTTPS URL */
  url: string;
  /** Storage pathname / key within the blob store */
  pathname: string;
  /** Size in bytes */
  size: number;
  /** Date asset was uploaded to Blob storage */
  uploadedAt: Date;
  /** MIME content type if available */
  contentType?: string;
  /** Direct download URL provided by Blob CDN */
  downloadUrl?: string;
}

/**
 * Checks whether Vercel Blob credentials are configured in the current runtime environment.
 * Security Invariant: Never exposes or leaks token values; only verifies presence.
 *
 * @returns {boolean} True if BLOB_READ_WRITE_TOKEN is defined and non-empty.
 */
export function isBlobConfigured(): boolean {
  // Step 1: Inspect runtime environment token
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  // Step 2: Validate token format and presence
  return typeof token === "string" && token.trim().length > 0;
}

/**
 * Lists blobs matching an optional prefix folder path.
 * In Gate 1, this provides the physical contract stub.
 *
 * @param {string} [prefix] - Optional prefix directory filter (e.g., 'press-kit/photos/').
 * @returns {Promise<BlobStorageItem[]>} List of resolved blob metadata descriptors.
 */
export async function listBlobs(prefix?: string): Promise<BlobStorageItem[]> {
  // Step 1: Security Invariant - Validate credentials exist before making external calls
  if (!isBlobConfigured()) {
    return [];
  }

  try {
    // Step 2: Query Vercel Blob storage via official SDK
    const response = await list({
      prefix,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    // Step 3: Transform SDK blob descriptors to domain-ready infrastructure items
    return response.blobs.map((item: ListBlobResultBlob): BlobStorageItem => ({
      url: item.url,
      pathname: item.pathname,
      size: item.size,
      uploadedAt: item.uploadedAt,
      downloadUrl: item.downloadUrl,
    }));
  } catch (err: unknown) {
    // Step 4: Defense in depth - Log failure and return empty list to trigger pipeline fallback
    console.warn(
      "[blob-storage] Failed to query Vercel Blob:",
      err instanceof Error ? err.message : "Unknown error"
    );
    return [];
  }
}

/**
 * Resolves a single blob URL by pathname.
 *
 * @param {string} pathname - The exact key/pathname in the blob store.
 * @returns {Promise<string | null>} Public HTTPS URL or null if not found/unreachable.
 */
export async function getBlobUrl(pathname: string): Promise<string | null> {
  // Step 1: Query blob storage with prefix
  const items = await listBlobs(pathname);
  // Step 2: Match exact pathname
  const exact = items.find((item) => item.pathname === pathname);
  return exact ? exact.url : null;
}
