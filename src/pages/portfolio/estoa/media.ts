import { mediaUrl } from '@/api/media';

/**
 * Estoa's page media, on the `danoved-media` R2 bucket under `estoa/` (see docs/media-pipeline.md).
 * Only the homepage card and the share image live in this repo, in ./images. Keys are versioned
 * because the objects are served immutable: a changed file gets a new `-vN` key, never an overwrite.
 */
export type Still = { src: string; width: number; height: number };
export type Clip = { src: string; title: string; duration: string; previewImage: string; aspect: 'portrait' };

const still = (key: string, width: number, height: number): Still => ({ src: mediaUrl(`estoa/${key}`), width, height });

// Phone clips: trimmed, audio removed, H.264 1080×1920 with moov before mdat.
const clip = (name: string, title: string, duration: string): Clip => ({
  src: mediaUrl(`estoa/${name}-v1.mp4`),
  title,
  duration,
  previewImage: mediaUrl(`estoa/previews/${name.split('/').pop()}-first-frame-v1.avif`),
  aspect: 'portrait',
});

// Simulator renders, animated WebP.
export const renders = {
  waves: still('renders/waves-calm-visit-60s-v1.webp', 300, 300),
  clouds: still('renders/clouds-visit-sunset2-v1.webp', 300, 300),
  caustics: still('renders/caustics-visit-after-v1.webp', 300, 300),
  pleamar: still('renders/pleamar-visit-v1.webp', 280, 280),
  candle: still('renders/candle-kinds-visit-v1.webp', 260, 260),
  vortex: still('renders/vortex-visit-v1.webp', 320, 320),
  tunnel: still('renders/tunnel-visit-v1.webp', 320, 320),
  explode: still('renders/explode-v1.webp', 760, 365),
};

export const photos = {
  hiddenEyes: still('photos/hidden-eyes-v1.jpg', 1230, 530),
  ledDisk: still('photos/led-disk-v1.jpg', 900, 1200),
  glassGlow: still('photos/glass-glow-v1.jpg', 675, 1200),
  wallGlowSanded: still('photos/wall-glow-sanded-v1.jpg', 900, 1200),
  wallQuarters: still('photos/wall-quarters-v2.jpg', 1600, 900),
  frontAssembled: still('photos/front-assembled-v2.jpg', 1600, 900),
  spiderInWall: still('photos/spider-in-wall-v1.jpg', 1600, 900),
  installHallway: still('photos/install-hallway-v1.jpg', 900, 1600),
  puttingFrontTogether: still('photos/putting-front-together-v1.jpg', 900, 1600),
  drillingSteelPan: still('photos/drilling-steel-pan-v1.jpg', 1600, 900),
  gluingSeams: still('photos/gluing-seams-v1.jpg', 1600, 900),
  glassOffcut: still('photos/glass-offcut-v1.jpg', 1200, 1600),
  boardInGroove: still('photos/board-in-groove-v1.jpg', 900, 1200),
  mirrorCrackedHole: still('photos/mirror-cracked-hole-v1.jpg', 900, 1200),
  mirrorCleanHole: still('photos/mirror-clean-hole-v2.jpg', 1200, 1600),
  radarInPosition: still('photos/radar-in-position-v1.jpg', 900, 1200),
  radarInPlaceRender: still('photos/radar-in-place-render-v1.jpg', 1000, 524),
  exploded: still('photos/exploded-v1.jpg', 1778, 854),
  diskInWall: still('photos/enclosure-01-v1.jpg', 1200, 1600),
  wallUnsanded: still('photos/enclosure-02-v1.jpg', 1200, 1600),
  backWithLid: still('photos/enclosure-03-v1.jpg', 1200, 1600),
  spiderOnBed: still('photos/enclosure-05-v1.jpg', 1200, 1600),
  bulgedPost: still('photos/enclosure-06-v1.jpg', 1200, 1600),
  fixesTestPrint: still('photos/enclosure-07-v1.jpg', 1200, 1600),
  backBoxFresh: still('photos/enclosure-08-v1.jpg', 1200, 1600),
  radarInTray: still('photos/hidden-sensor-01-v1.jpg', 1200, 1600),
  frontOnMirror: still('photos/mirror-01-v1.jpg', 1200, 1600),
  mirror: still('photos/mirror-02-v1.jpg', 1200, 1600),
  steelPanHole: still('photos/mirror-03-v1.jpg', 1200, 1600),
  warmPatternBench: still('photos/patterns-01-v1.jpg', 900, 1600),
};

export const clips = {
  frontOnDesk: clip('front-on-desk', 'The front with the glass on, on my desk at night', '0:07'),
  heightBricks: clip('height-bricks', 'A stack of height bricks', '0:04'),
  seaGrass: clip('sea-grass', 'Sea grass on the real disk', '0:08'),
  slowSwirl: clip('slow-swirl', 'A slow swirl inside the finished front', '0:12'),
  benchOct2: clip('bench-oct-2', 'Early patterns on the bench, October 2', '0:13'),
};

// Dan's process picks (2026-10-07), on R2 under estoa/process/.
export const process = {
  dsc02096: still('process/dsc02096-v1.jpg', 1600, 900),
  dsc02117: still('process/dsc02117-v1.jpg', 1600, 900),
  dsc02122: still('process/dsc02122-v1.jpg', 1600, 900),
  dsc02128: still('process/dsc02128-v1.jpg', 1600, 900),
  dsc02127: still('process/dsc02127-v1.jpg', 1600, 900),
  dsc02138: still('process/dsc02138-v1.jpg', 1600, 900),
  dsc02141: still('process/dsc02141-v1.jpg', 900, 1600),
  dsc02145: still('process/dsc02145-v1.jpg', 1600, 900),
  dsc02152: still('process/dsc02152-v1.jpg', 1600, 900),
  dsc02160: still('process/dsc02160-v1.jpg', 1600, 900),
  dsc02165: still('process/dsc02165-v1.jpg', 1600, 900),
  dsc02181: still('process/dsc02181-v1.jpg', 1600, 900),
  dsc02187: still('process/dsc02187-v1.jpg', 1600, 900),
  dsc02190: still('process/dsc02190-v1.jpg', 1600, 900),
  dsc02194: still('process/dsc02194-v1.jpg', 1600, 900),
  dsc02198: still('process/dsc02198-v1.jpg', 1600, 900),
  dsc02201: still('process/dsc02201-v1.jpg', 1600, 1187),
  dsc02204: still('process/dsc02204-v1.jpg', 900, 1600),
  img_4665: still('process/img_4665-v1.jpg', 1200, 1600),
  img_4754: still('process/img_4754-v1.jpg', 1200, 1600),
  img_4763: still('process/img_4763-v1.jpg', 1200, 1600),
  img_4869: still('process/img_4869-v1.jpg', 1200, 1600),
  img_4881: still('process/img_4881-v1.jpg', 1200, 1600),
  img_4880: still('process/img_4880-v1.jpg', 1200, 1600),
  img_4892: still('process/img_4892-v1.jpg', 1200, 1600),
  img_4912: still('process/img_4912-v1.jpg', 1200, 1600),
  img_4939: still('process/img_4939-v1.jpg', 1200, 1600),
  img_4949: still('process/img_4949-v1.jpg', 1200, 1600),
  img_4950: still('process/img_4950-v1.jpg', 1200, 1600),
  img_4955: still('process/img_4955-v1.jpg', 1200, 1600),
  assembly: still('process/assembly-v1.jpg', 1400, 1100),
  back: still('process/back-v1.jpg', 1400, 1100),
  exploded: still('process/exploded-v1.jpg', 1600, 769),
  section: still('process/section-v1.jpg', 1400, 1100),
  radar_in_place: still('process/radar_in_place-v1.jpg', 1400, 1100),
  explode: still('process/explode-v1.webp', 760, 365),
  img_4821: still('process/img_4821-v1.jpg', 1200, 1600),
  img_4817: still('process/img_4817-v1.jpg', 1200, 1600),
};

export const processClips = {
  firstFrostTest: clip('process/img_4913', 'First test with the frosting on', '0:09'),
};
