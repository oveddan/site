#!/usr/bin/env node
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
const read = (p) => readFileSync(join(root, p), 'utf-8');

const failures = [];
const check = (ok, message) => {
  if (!ok) failures.push(message);
};

const EXPECTED = [
  ['hyperspace', 'apotheneum/01-hyperspace-v2.mp4', '5:10'],
  ['night-chorus', 'apotheneum/02-night-chorus.mp4', '4:06'],
  ['rain', 'apotheneum/03-rain.mp4', '3:09'],
  ['thunderstorm', 'apotheneum/04-thunderstorm.mp4', '3:07'],
  ['sunrise', 'apotheneum/05-sunrise.mp4', '3:48'],
];

// 1. Chapter metadata is the single source of truth, and hosts are never hardcoded.
const chapters = read('src/pages/portfolio/apotheneum/chapters.ts');
for (const [id, key, duration] of EXPECTED) {
  check(chapters.includes(`'${key}'`), `chapters.ts is missing object key ${key}`);
  check(chapters.includes(`'${duration}'`), `chapters.ts is missing duration ${duration} (${id})`);
}
check(!/https?:\/\//.test(chapters), 'chapters.ts hardcodes a URL — build it from mediaUrl() instead');

const media = read('src/api/media.ts');
check(media.includes('NEXT_PUBLIC_MEDIA_BASE_URL'), 'media.ts no longer reads NEXT_PUBLIC_MEDIA_BASE_URL');

// 2. Exactly one <ChapterVideo /> per chapter in the article, and the YouTube overview is intact.
const mdx = read('src/pages/portfolio/apotheneum/index.mdx');
const embeds = mdx.match(/<ChapterVideo\b[^>]*\/>/g) ?? [];
check(embeds.length === EXPECTED.length, `expected ${EXPECTED.length} ChapterVideo embeds, found ${embeds.length}`);
for (const [id] of EXPECTED) {
  const uses = embeds.filter((tag) => tag.includes(`chapters.${id}`) || tag.includes(`chapters['${id}']`));
  check(uses.length === 1, `expected exactly one ChapterVideo for "${id}", found ${uses.length}`);
}
check(/<YouTube videoId="lkWg-qsuenw" \/>/.test(mdx), 'the YouTube overview embed was modified');

// 3. The player never ships an eager source.
const player = read('src/components/ChapterVideo.tsx');
check(player.includes('preload="none"'), 'ChapterVideo lost preload="none"');
check(!/<video[^>]*\ssrc=/.test(player), 'ChapterVideo renders a src attribute on <video>');
check(!/<video[^>]*\sposter=/.test(player), 'ChapterVideo renders a native poster attribute');
check(!player.includes('crossOrigin'), 'ChapterVideo sets crossOrigin');
check(player.includes('loading="lazy"'), 'the optional poster image is no longer lazy');

// 4. llms.txt renders chapter references instead of stripping them.
const llms = read('src/api/llmsContent.ts');
const convertIndex = llms.indexOf('<ChapterVideo');
const stripIndex = llms.indexOf('[A-Z]\\w+\\s+[\\s\\S]*?');
check(convertIndex !== -1, 'llmsContent.ts no longer converts ChapterVideo tags');
check(stripIndex === -1 || convertIndex < stripIndex, 'ChapterVideo conversion must run before the generic JSX strip');
check(llms.includes('(?!ChapterVideo\\b)'), 'the generic JSX strip lost its ChapterVideo guard');

// 5. If a build is present, the prerendered DOM must contain no MP4 at all.
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
} else {
  console.log(`(skipped prerender checks — ${html} not found; run \`pnpm build\` first)`);
}

if (failures.length) {
  console.error('chapter-video verification FAILED:');
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
console.log('chapter-video verification passed');
