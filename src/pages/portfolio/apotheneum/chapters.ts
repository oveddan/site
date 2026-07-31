import { mediaUrl } from '@/api/media';

export type Chapter = {
  /** Stable id, also used by the llms.txt generator to describe the embed. */
  id: string;
  title: string;
  /** Human readable runtime, shown on the facade before the video is fetched. */
  duration: string;
  /** Absolute URL of the MP4 on the media host. */
  src: string;
  /**
   * Absolute URL of the first-frame preview still, shown in the facade before the video is
   * fetched. Object keys are versioned like the videos — see docs/media-pipeline.md.
   */
  previewImage: string;
};

function chapter(id: string, title: string, duration: string, objectKey: string, previewImageKey: string): Chapter {
  return { id, title, duration, src: mediaUrl(objectKey), previewImage: mediaUrl(previewImageKey) };
}

/**
 * Chapters of "Treetop Transmissions", the Apotheneum piece. Object keys are versioned so the
 * `immutable` cache-control on the bucket stays correct — re-exporting a chapter means a new key.
 */
export const chapters = {
  hyperspace: chapter(
    'hyperspace',
    'Hyperspace — Entry',
    '5:10',
    'apotheneum/01-hyperspace-v3.mp4',
    'apotheneum/previews/01-hyperspace-first-frame-v1.avif'
  ),
  'night-chorus': chapter(
    'night-chorus',
    'Night Chorus — Nocturnal Forest',
    '4:06',
    'apotheneum/02-night-chorus-v3.mp4',
    'apotheneum/previews/02-night-chorus-first-frame-v1.avif'
  ),
  rain: chapter(
    'rain',
    'Rain — Canopy Weather',
    '3:09',
    'apotheneum/03-rain-v3.mp4',
    'apotheneum/previews/03-rain-first-frame-v1.avif'
  ),
  thunderstorm: chapter(
    'thunderstorm',
    'Thunderstorm — Peak Drama',
    '3:07',
    'apotheneum/04-thunderstorm-v3.mp4',
    'apotheneum/previews/04-thunderstorm-first-frame-v1.avif'
  ),
  sunrise: chapter(
    'sunrise',
    'Sunrise — Resolution',
    '3:48',
    'apotheneum/05-sunrise-v3.mp4',
    'apotheneum/previews/05-sunrise-first-frame-v1.avif'
  ),
} satisfies Record<string, Chapter>;

export type ChapterId = keyof typeof chapters;
