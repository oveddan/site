import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import clsx from 'clsx';

type Slide = { src: string; alt: string; caption: string };

const SLIDESHOW_MS = 4000;

/** Images inside `root` that open in the viewer. Video facades opt out with `data-no-lightbox`. */
function viewableImages(root: HTMLElement): HTMLImageElement[] {
  return Array.from(root.querySelectorAll('img')).filter((img) => !img.closest('[data-no-lightbox], button, a'));
}

function toSlide(img: HTMLImageElement): Slide {
  const figure = img.closest('figure');
  const caption = figure?.querySelector('figcaption')?.textContent?.trim() ?? '';
  return { src: img.dataset.full || img.currentSrc || img.src, alt: img.alt, caption };
}

const ControlButton = ({
  label,
  onClick,
  className,
  children,
}: {
  label: string;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    aria-label={label}
    onClick={onClick}
    className={clsx(
      'rounded-full border border-white/25 bg-black/50 px-3.5 py-2 font-mono text-[13px] leading-none text-white',
      'transition-colors hover:border-white/60 focus-ring',
      className
    )}
  >
    {children}
  </button>
);

/**
 * Click any image inside `rootRef` to view it full screen, with previous/next, arrow keys, swipe and
 * a slideshow. Delegated on the root, so it covers MDX images, the header image and lazily added ones.
 */
export function ImageLightbox({ rootRef }: { rootRef: RefObject<HTMLElement | null> }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const touchX = useRef<number | null>(null);

  const open = useCallback((imgs: HTMLImageElement[], at: number) => {
    setSlides(imgs.map(toSlide));
    setIndex(at);
    setPlaying(false);
    dialogRef.current?.showModal();
    document.documentElement.style.overflow = 'hidden';
  }, []);

  const close = useCallback(() => {
    setPlaying(false);
    if (dialogRef.current?.open) dialogRef.current.close();
  }, []);

  const step = useCallback(
    (delta: number) => setIndex((i) => (slides.length ? (i + delta + slides.length) % slides.length : 0)),
    [slides.length]
  );

  // Make the images look clickable, and open the viewer on click.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const mark = () => viewableImages(root).forEach((img) => img.classList.add('cursor-zoom-in'));
    mark();
    const observer = new MutationObserver(mark);
    observer.observe(root, { childList: true, subtree: true });
    const onClick = (event: MouseEvent) => {
      const img = (event.target as HTMLElement).closest('img');
      if (!img) return;
      const imgs = viewableImages(root);
      const at = imgs.indexOf(img);
      if (at === -1) return;
      event.preventDefault();
      open(imgs, at);
    };
    root.addEventListener('click', onClick);
    return () => {
      observer.disconnect();
      root.removeEventListener('click', onClick);
    };
  }, [rootRef, open]);

  // Restore page scroll however the dialog closes (button, Esc, backdrop).
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      document.documentElement.style.overflow = '';
      setPlaying(false);
    };
    dialog.addEventListener('close', onClose);
    return () => dialog.removeEventListener('close', onClose);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => step(1), SLIDESHOW_MS);
    return () => window.clearInterval(timer);
  }, [playing, step]);

  // Warm the next image so stepping forward doesn't flash.
  useEffect(() => {
    const next = slides[(index + 1) % (slides.length || 1)];
    if (next) new window.Image().src = next.src;
  }, [index, slides]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowRight') step(1);
    else if (event.key === 'ArrowLeft') step(-1);
    else if (event.key === ' ' && !(event.target instanceof HTMLButtonElement)) {
      event.preventDefault();
      setPlaying((p) => !p);
    } else return;
    if (event.key !== ' ') setPlaying(false);
  };

  const slide = slides[index];

  return (
    <dialog
      ref={dialogRef}
      aria-label="Image viewer"
      onKeyDown={onKeyDown}
      onClick={(event) => event.target === event.currentTarget && close()}
      onTouchStart={(event) => (touchX.current = event.touches[0].clientX)}
      onTouchEnd={(event) => {
        if (touchX.current === null) return;
        const dx = event.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 40) {
          setPlaying(false);
          step(dx < 0 ? 1 : -1);
        }
      }}
      className="m-0 h-[100dvh] max-h-none w-screen max-w-none bg-black p-0 text-white backdrop:bg-black/80"
    >
      {slide && (
        <div className="grid h-full grid-rows-[auto_minmax(0,1fr)_auto]" onClick={(e) => e.target === e.currentTarget && close()}>
          <div className="flex items-center gap-2 p-3 sm:p-4">
            <span className="font-mono text-[13px] tabular-nums text-white/70" aria-live="polite">
              {index + 1} / {slides.length}
            </span>
            <div className="ml-auto flex gap-2">
              {slides.length > 1 && (
                <ControlButton label={playing ? 'Pause slideshow' : 'Play slideshow'} onClick={() => setPlaying((p) => !p)}>
                  {playing ? 'pause' : 'slideshow'}
                </ControlButton>
              )}
              <ControlButton label="Close" onClick={close}>
                ✕
              </ControlButton>
            </div>
          </div>

          <div
            className="relative flex min-h-0 items-center justify-center px-3 sm:px-16"
            onClick={(e) => e.target === e.currentTarget && close()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img key={slide.src} src={slide.src} alt={slide.alt} className="max-h-full max-w-full object-contain" />
            {slides.length > 1 && (
              <>
                <ControlButton
                  label="Previous image"
                  onClick={() => {
                    setPlaying(false);
                    step(-1);
                  }}
                  className="absolute left-2 top-1/2 hidden -translate-y-1/2 sm:block"
                >
                  ←
                </ControlButton>
                <ControlButton
                  label="Next image"
                  onClick={() => {
                    setPlaying(false);
                    step(1);
                  }}
                  className="absolute right-2 top-1/2 hidden -translate-y-1/2 sm:block"
                >
                  →
                </ControlButton>
              </>
            )}
          </div>

          <p className="mx-auto min-h-[3.5rem] max-w-[72ch] px-4 pb-5 pt-3 text-center text-sm leading-relaxed text-white/80">
            {slide.caption}
          </p>
        </div>
      )}
    </dialog>
  );
}
