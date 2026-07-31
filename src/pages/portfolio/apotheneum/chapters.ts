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
   * Optional poster still. None exist yet; when one is added it is lazily loaded, so it never
   * costs anything on initial render. Store posters alongside the video in R2.
   */
  poster?: string | null;
};

function chapter(id: string, title: string, duration: string, objectKey: string, poster?: string | null): Chapter {
  return { id, title, duration, src: mediaUrl(objectKey), poster: poster ?? null };
}

/**
 * Chapters of "Treetop Transmissions", the Apotheneum piece. Object keys are versioned so the
 * `immutable` cache-control on the bucket stays correct — re-exporting a chapter means a new key.
 */
export const chapters = {
  hyperspace: chapter('hyperspace', 'Hyperspace — Entry', '5:10', 'apotheneum/01-hyperspace-v2.mp4'),
  'night-chorus': chapter('night-chorus', 'Night Chorus — Nocturnal Forest', '4:06', 'apotheneum/02-night-chorus.mp4'),
  rain: chapter('rain', 'Rain — Canopy Weather', '3:09', 'apotheneum/03-rain.mp4'),
  thunderstorm: chapter('thunderstorm', 'Thunderstorm — Peak Drama', '3:07', 'apotheneum/04-thunderstorm.mp4'),
  sunrise: chapter('sunrise', 'Sunrise — Resolution', '3:48', 'apotheneum/05-sunrise.mp4'),
} satisfies Record<string, Chapter>;

export type ChapterId = keyof typeof chapters;
