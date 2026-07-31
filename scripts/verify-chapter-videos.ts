#!/usr/bin/env -S pnpm tsx
/**
 * Static guard for the chapter-video invariants (see docs/media-pipeline.md).
 *
 * The repo has no test runner, so this is a dependency-free check rather than a suite. Run it
 * after `pnpm build` to also validate the prerendered markup:
 *
 *   pnpm build && pnpm verify:media
 */
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const read = (p: string): string => readFileSync(join(root, p), 'utf-8');

const failures: string[] = [];
const check = (ok: boolean, message: string): void => {
  if (!ok) failures.push(message);
};

type ExpectedChapter = [id: string, key: string, duration: string, previewKey: string];

const EXPECTED: ExpectedChapter[] = [
  ['hyperspace', 'apotheneum/01-hyperspace-v2.mp4', '5:10', 'apotheneum/previews/01-hyperspace-first-frame-v1.avif'],
  ['night-chorus', 'apotheneum/02-night-chorus.mp4', '4:06', 'apotheneum/previews/02-night-chorus-first-frame-v1.avif'],
  ['rain', 'apotheneum/03-rain.mp4', '3:09', 'apotheneum/previews/03-rain-first-frame-v1.avif'],
  ['thunderstorm', 'apotheneum/04-thunderstorm.mp4', '3:07', 'apotheneum/previews/04-thunderstorm-first-frame-v1.avif'],
  ['sunrise', 'apotheneum/05-sunrise.mp4', '3:48', 'apotheneum/previews/05-sunrise-first-frame-v1.avif'],
];

// 1. Chapter metadata is the single source of truth, and hosts are never hardcoded.
const chapters = read('src/pages/portfolio/apotheneum/chapters.ts');
for (const [id, key, duration, previewKey] of EXPECTED) {
  check(chapters.includes(`'${key}'`), `chapters.ts is missing object key ${key}`);
  check(chapters.includes(`'${duration}'`), `chapters.ts is missing duration ${duration} (${id})`);
  check(chapters.includes(`'${previewKey}'`), `chapters.ts is missing preview image key ${previewKey} (${id})`);
}
check(!/https?:\/\//.test(chapters), 'chapters.ts hardcodes a URL — build it from mediaUrl() instead');
check(
  chapters.includes('previewImage: mediaUrl('),
  'chapters.ts must build previewImage from mediaUrl(), not hardcode it'
);

const media = read('src/api/media.ts');
check(media.includes('NEXT_PUBLIC_MEDIA_BASE_URL'), 'media.ts no longer reads NEXT_PUBLIC_MEDIA_BASE_URL');

// 2. Exactly one <ClickToPlayVideo /> per chapter in the article, and the YouTube overview is intact.
const mdx = read('src/pages/portfolio/apotheneum/index.mdx');
const embeds = mdx.match(/<ClickToPlayVideo\b[^>]*\/>/g) ?? [];
check(embeds.length === EXPECTED.length, `expected ${EXPECTED.length} ClickToPlayVideo embeds, found ${embeds.length}`);
for (const [id] of EXPECTED) {
  const uses = embeds.filter((tag) => tag.includes(`chapters.${id}`) || tag.includes(`chapters['${id}']`));
  check(uses.length === 1, `expected exactly one ClickToPlayVideo for "${id}", found ${uses.length}`);
}
check(/<YouTube videoId="lkWg-qsuenw" \/>/.test(mdx), 'the YouTube overview embed was modified');

// 3. The player never ships an eager source.
const player = read('src/components/ClickToPlayVideo.tsx');
check(player.includes('preload="none"'), 'ClickToPlayVideo lost preload="none"');
check(!/<video[^>]*\ssrc=/.test(player), 'ClickToPlayVideo renders a src attribute on <video>');
check(!/<video[^>]*\sposter=/.test(player), 'ClickToPlayVideo renders a native poster attribute');
check(!player.includes('crossOrigin'), 'ClickToPlayVideo sets crossOrigin');
check(player.includes('loading="lazy"'), 'the preview image is no longer lazy');
check(
  player.includes('tabIndex={showFacade ? -1 : undefined}'),
  'the hidden native player can enter keyboard tab order before activation'
);

// 4. The preview image renders in the clickable facade, not on the <video>, with a label that
// describes the image rather than repeating the button's accessible name.
check(player.includes('previewImage'), 'ClickToPlayVideo no longer accepts a previewImage prop');
check(/<img\b[^>]*\bsrc=\{previewImage\}/.test(player), 'ClickToPlayVideo does not render previewImage as an <img>');
check(!/<img\b[^>]*\salt=""/.test(player), 'the preview image has an empty alt — it must carry a useful label');
check(
  !/<img\b[^>]*\baria-hidden="true"/.test(player),
  'the preview image is hidden from assistive tech — it should be announced, not the decorative fallback'
);
check(
  /<img\b[^>]*\balt=\{`[^`]*\$\{title\}[^`]*`\}/.test(player),
  'the preview image alt text should describe the frame (and reference the chapter title) without repeating "Play …"'
);
check(!/\balt=\{`Play /.test(player), "the preview image alt text duplicates the play button's accessible name");

// 5. llms.txt renders chapter references instead of stripping them.
const llms = read('src/api/llmsContent.ts');
const convertIndex = llms.indexOf('<ClickToPlayVideo');
const stripIndex = llms.indexOf('[A-Z]\\w+\\s+[\\s\\S]*?');
check(convertIndex !== -1, 'llmsContent.ts no longer converts ClickToPlayVideo tags');
check(
  stripIndex === -1 || convertIndex < stripIndex,
  'ClickToPlayVideo conversion must run before the generic JSX strip'
);
check(llms.includes('(?!ClickToPlayVideo\\b)'), 'the generic JSX strip lost its ClickToPlayVideo guard');

// 6. If a build is present, the prerendered DOM must contain no MP4 at all, and the preview image
// (lazily loaded, unlike the video which waits for a click) must have a src built from the media host.
const html = '.next/server/pages/portfolio/apotheneum.html';
if (existsSync(join(root, html))) {
  const rendered = read(html);
  const videos = rendered.match(/<video[^>]*>/g) ?? [];
  check(videos.length === EXPECTED.length, `prerendered HTML has ${videos.length} <video> elements`);
  check(!rendered.includes('.mp4'), 'prerendered HTML references an .mp4 — it must not until activation');
  check(
    videos.every((tag) => !/\ssrc=/.test(tag) && !/\sposter=/.test(tag)),
    'a prerendered <video> carries a src or poster attribute'
  );

  for (const [id, , , previewKey] of EXPECTED) {
    check(rendered.includes(previewKey), `prerendered HTML is missing the preview image for "${id}" (${previewKey})`);
  }
} else {
  console.log(`(skipped prerender checks — ${html} not found; run \`pnpm build\` first)`);
}

if (failures.length) {
  console.error('chapter-video verification FAILED:');
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
console.log('chapter-video verification passed');
