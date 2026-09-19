/**
 * @file apps/web/src/app/loading.tsx
 * @description Layer 1: Presentation - Starter loading boundary skeleton.
 */

export default function Loading() {
  // Step 1: Render loading spinner centered in page
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#FF0000] border-t-transparent" />
    </div>
  );
}
