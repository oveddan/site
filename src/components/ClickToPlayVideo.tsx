import clsx from 'clsx';
import { useCallback, useRef, useState } from 'react';

export type ClickToPlayVideoProps = {
  /** Absolute URL of the MP4. Never attached to the <video> until the visitor asks for it. */
  src: string;
  title: string;
  /** Human readable runtime, e.g. "3:09". */
  duration: string;
  /**
   * Optional first-frame still, shown in the facade before the video is fetched. Lazily loaded as
   * the facade approaches the viewport; unlike the MP4, it does not wait for a click. Never passed
   * to the native `poster` attribute — the facade renders it as an <img> instead.
   */
  previewImage?: string | null;
};

type Status = 'idle' | 'loading' | 'playing' | 'error';

/**
 * Every mounted player, so starting one can pause the others. Module scope rather than context:
 * these are dropped into MDX prose with no common provider.
 */
const players = new Set<HTMLVideoElement>();

/**
 * A click-to-play video that makes zero network requests until activated.
 *
 * The <video> is always mounted (so the click handler can start playback inside the user-gesture
 * stack, which is what mobile Safari requires) but carries no `src` and no `poster` attribute, so
 * `preload="none"` has nothing to fetch. A CSS facade covers it until playback actually begins.
 */
export function ClickToPlayVideo({ src, title, duration, previewImage }: ClickToPlayVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [status, setStatus] = useState<Status>('idle');

  const setVideoRef = useCallback((node: HTMLVideoElement | null) => {
    if (videoRef.current) players.delete(videoRef.current);
    videoRef.current = node;
    if (node) players.add(node);
  }, []);

  // Synchronous: assign the source and call play() in the same user-gesture stack. Deferring
  // either to an effect loses the gesture and playback is blocked on iOS.
  const activate = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    setStatus('loading');
    if (!video.src) video.src = src;

    // Hand control to the native controls before the facade unmounts, so focus is never dropped
    // to <body>.
    video.focus({ preventScroll: true });

    const started = video.play();
    if (started && typeof started.catch === 'function') {
      started.catch(() => {
        // Autoplay policy or a user-initiated abort: fall back to the facade so it can be retried.
        // A genuine load failure surfaces through onError instead.
        if (videoRef.current?.paused) setStatus((current) => (current === 'loading' ? 'idle' : current));
      });
    }
  }, [src]);

  const pauseOthers = useCallback(() => {
    players.forEach((other) => {
      if (other !== videoRef.current && !other.paused) other.pause();
    });
  }, []);

  const showFacade = status === 'idle' || status === 'loading';

  return (
    <figure className="not-prose my-10">
      <div className="relative isolate aspect-video w-full overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-zinc-900/10 dark:ring-white/10">
        <video
          ref={setVideoRef}
          controls
          playsInline
          preload="none"
          tabIndex={showFacade ? -1 : undefined}
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full bg-black"
          onPlay={pauseOthers}
          onPlaying={() => setStatus('playing')}
          onError={() => setStatus('error')}
        />

        {showFacade && (
          <div
            className={clsx(
              'absolute inset-0 flex flex-col justify-end',
              status === 'loading' && 'pointer-events-none'
            )}
          >
            {previewImage ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewImage}
                  alt={`First frame of "${title}"`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/30 to-zinc-950/50" />
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black" />
                <div
                  className="absolute inset-0 opacity-70"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 30% 20%, rgb(20 184 166 / 0.28), transparent 55%), radial-gradient(circle at 75% 80%, rgb(94 234 212 / 0.16), transparent 50%)',
                  }}
                />
              </>
            )}

            <button
              type="button"
              onClick={activate}
              disabled={status === 'loading'}
              className="group absolute inset-0 flex items-center justify-center focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-teal-400"
            >
              <span className="sr-only">{`Play ${title} (${duration})`}</span>
              <span
                aria-hidden="true"
                className={clsx(
                  'flex h-14 w-14 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/40 backdrop-blur-sm transition',
                  status === 'loading' ? 'animate-pulse' : 'group-hover:bg-white/20 group-hover:ring-white/70'
                )}
              >
                <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-white" role="presentation">
                  <path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l11.2-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14Z" />
                </svg>
              </span>
            </button>

            <div className="pointer-events-none relative flex items-baseline justify-between gap-4 px-5 pb-4 pt-10">
              <span className="font-mono text-sm font-semibold text-white sm:text-base">{title}</span>
              <span className="font-mono text-xs tabular-nums text-zinc-300">
                {status === 'loading' ? 'Loading…' : duration}
              </span>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-zinc-950/90 px-6 text-center">
            <p className="font-mono text-sm text-zinc-200">{`${title} couldn’t be loaded.`}</p>
            <a
              href={src}
              className="font-mono text-sm font-semibold text-teal-400 underline decoration-teal-400/40 underline-offset-4 hover:decoration-teal-400"
            >
              Open the video directly
            </a>
          </div>
        )}
      </div>
    </figure>
  );
}
