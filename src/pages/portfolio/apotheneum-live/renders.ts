import { mediaUrl } from '@/api/media';

/**
 * Headless renders the agents attached to their own Apotheneum PRs in August 2026. They were
 * published to the `danoved-media` bucket at PR time under `apotheneum/<commit>/<hash>/`, so the
 * keys are already immutable and can be referenced as-is. Cube exteriors are 800×180 (the 200×45
 * unwrapped grid), cylinder surfaces 480×172.
 */
export type Render = { src: string; alt: string; width: number; height: number };

function render(objectKey: string, alt: string, width: number, height: number): Render {
  return { src: mediaUrl(objectKey), alt, width, height };
}

export const renders = {
  // PR #94 — Rockfall, merged 2026-08-22
  rockfallCube: render('apotheneum/92d40c3/3a3c6c2f/cube-exterior.gif', 'Rockfall, cube exterior', 800, 180),
  rockfallCylinder: render(
    'apotheneum/92d40c3/d413631b/cylinder-interior.gif',
    'Rockfall, cylinder interior',
    480,
    172
  ),
  // PR #118 — Robot Heart, merged 2026-08-24
  heartModel: render('apotheneum/d026585/ca463725/RobotHeart.png', 'The Robot Heart pattern controls in Chromatik', 608, 336),
  heartCube: render('apotheneum/d026585/5d670e6f/cube-exterior.gif', 'Robot Heart, cube exterior', 800, 180),
  heartCylinder: render('apotheneum/d026585/3eeff5d3/cylinder-exterior.gif', 'Robot Heart, cylinder exterior', 480, 172),
  // PR #122 — Grass, merged 2026-08-26
  grassStormCube: render('apotheneum/599982a/b6e1d129/storm-cube-exterior.gif', 'Grass in a storm, cube exterior', 800, 180),
  grassCalmCylinder: render(
    'apotheneum/599982a/3bff3958/calm-cylinder-exterior.gif',
    'Grass in a light breeze, cylinder exterior',
    480,
    172
  ),
  // PR #124 — Fireball, merged 2026-08-26
  fireballFire: render('apotheneum/127e896/5f7adaef/pr-upload-fireball-fire.gif', 'Fireball, cube exterior', 800, 180),
  fireballHueSweep: render(
    'apotheneum/127e896/53c97ef3/pr-upload-fireball-hue-sweep.gif',
    'Fireball with the palette hue modulated live',
    800,
    180
  ),
  fireballEmber: render(
    'apotheneum/127e896/aa826558/pr-upload-fireball-palette-ember.gif',
    'Fireball on the Ember palette',
    800,
    180
  ),
  // PR #130 — Jungle, merged 2026-08-27
  jungle: render('apotheneum/1e7c3d3/dbe6a7b3/01-default.gif', 'Jungle, cube exterior', 800, 180),
  // PR #129 — Dunes, merged 2026-08-27
  dunes: render('apotheneum/17686eb/67b7a6f6/dunes-travel-cube.gif', 'Dunes travelling, cube exterior', 800, 180),
  // PR #128 — Lava Lamp, merged 2026-08-27
  lavaLamp: render('apotheneum/4191d79/565d04c8/cube-exterior.gif', 'Lava Lamp, cube exterior', 800, 180),
  // PR #95 — Vortex, merged 2026-08-26
  vortexLookup: render('apotheneum/99f5df2/fee008fd/preset-lookup.gif', 'Vortex, looking up from inside', 512, 512),
  vortexCube: render('apotheneum/99f5df2/0ba86941/preset-cube-exterior.gif', 'Vortex, cube exterior', 800, 180),
  // PR #93 — Waterfall, merged 2026-08-27
  waterfall: render('apotheneum/f692402/c2a95753/waterfall-colornative-cube-exterior.gif', 'Waterfall, cube exterior', 800, 180),
} satisfies Record<string, Render>;
