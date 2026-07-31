/**
 * Single source of truth for the external media host (Cloudflare R2 bucket `danoved-media`).
 *
 * Large video masters are never committed to this repo (see .gitignore) — they are uploaded to R2
 * and referenced by object key. See docs/media-pipeline.md for the upload/verification workflow.
 *
 * Production sets NEXT_PUBLIC_MEDIA_BASE_URL=https://media.danoved.xyz in Netlify. The fallback is
 * the r2.dev development/recovery URL, which remains verified working.
 */
const FALLBACK_MEDIA_BASE_URL = 'https://pub-f9dd7e8819194ed79df28f317fb60a69.r2.dev';

export const MEDIA_BASE_URL = (process.env.NEXT_PUBLIC_MEDIA_BASE_URL || FALLBACK_MEDIA_BASE_URL).replace(/\/+$/, '');

/** Build an absolute URL for an R2 object key, e.g. mediaUrl('apotheneum/03-rain.mp4'). */
export function mediaUrl(objectKey: string): string {
  return `${MEDIA_BASE_URL}/${objectKey.replace(/^\/+/, '')}`;
}
