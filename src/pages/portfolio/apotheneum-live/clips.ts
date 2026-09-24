import { mediaUrl } from '@/api/media';

export type Clip = {
  id: string;
  title: string;
  /** Human readable runtime, shown on the facade before the video is fetched. */
  duration: string;
  /** Absolute URL of the MP4. */
  src: string;
  /** First-frame still for the facade. */
  previewImage: string;
  /** Facade shape: 16:9 or a 9:16 phone clip. */
  aspect: 'video' | 'portrait';
};

/**
 * Set NEXT_PUBLIC_TREETOP_LOCAL_MEDIA=1 in .env.local to serve the same files from
 * public/treetop-live-local/ (gitignored) instead of R2, for previewing cuts before upload.
 */
const LOCAL = process.env.NEXT_PUBLIC_TREETOP_LOCAL_MEDIA === '1';

function clip(id: string, title: string, duration: string, file: string, aspect: Clip['aspect'], srcKey?: string): Clip {
  const preview = `previews/${file.replace(/\.mp4$/, '-first-frame.jpg')}`;
  const base = (k: string) => (LOCAL ? `/treetop-live-local/${k}` : mediaUrl(`treetop-live/${k}`));
  // srcKey: an object already in the bucket under another prefix (published from a PR).
  return { id, title, duration, aspect, src: srcKey ? mediaUrl(srcKey) : base(file), previewImage: base(preview) };
}

/** Object keys are versioned (-v1) so the bucket's immutable cache-control stays correct. */
export const clips = {
  heartControl: clip('heart-control', 'The heart, from the controls to the cube', '0:30', '00-heart-control-v1.mp4', 'portrait'),
  heartOnCube: clip('heart-on-cube', 'The heart on the cube, from the air', '0:40', '01-heart-on-cube-v4.mp4', 'video'),
  grass: clip('grass', 'Grass, from the air', '0:59', '02-grass-v3.mp4', 'video'),
  waterfall: clip('waterfall', 'Waterfall, from the air', '0:25', '03-waterfall-v2.mp4', 'video'),
  mftMapping: clip('mft-mapping', 'Mapping the Twister by talking', '0:21', '04-mft-mapping-v1.mp4', 'video'),
  palette: clip('palette', 'FOSS feedback into a palette, through chromatik-mcp', '1:46', '05-palette-v1.mp4', 'video'),
  cameraCorner: clip('camera-corner', '"move the camera to face a corner"', '0:28', '10-camera-corner-v1.mp4', 'video'),
  bitwig: clip('bitwig', 'FOSS\'s recorded signals driving the visuals', '0:50', '11-bitwig-polygrid-v1.mp4', 'video'),
  tapTempo: clip('tap-tempo', 'Tap tempo', '0:15', '12-tap-tempo-v1.mp4', 'video'),
  sampleHold: clip('sample-hold', 'Sample and hold', '0:17', '13-sample-hold-v1.mp4', 'video'),
  fossSunriseInside: clip('foss-sunrise-inside', 'FOSS, sunrise, inside', '0:10', '20-foss-sunrise-inside-v1.mp4', 'portrait'),
  fossSunriseOutside: clip('foss-sunrise-outside', 'FOSS, sunrise, outside', '0:53', '21-foss-sunrise-outside-v1.mp4', 'portrait'),
  fossThursday: clip('foss-thursday', 'FOSS, Thursday night', '0:16', '22-foss-thursday-rig-v1.mp4', 'portrait'),
  fossSunriseLaptop: clip('foss-sunrise-laptop', 'FOSS, sunrise, at the laptop', '0:18', '23-foss-sunrise-laptop-v1.mp4', 'portrait'),
  fossCrowd: clip('foss-crowd', 'FOSS, the crowd', '0:34', '24-foss-crowd-v1.mp4', 'portrait'),
  fossCylinder: clip('foss-cylinder', 'FOSS, the cylinder', '0:13', '25-foss-cylinder-v1.mp4', 'portrait'),
  fossInsideWarm: clip('foss-inside-warm', 'FOSS, inside', '0:18', '26-foss-inside-warm-v1.mp4', 'portrait'),
  grassChromatik: clip('grass-chromatik', 'Grass, in Chromatik', '0:49', '14-grass-chromatik-v1.mp4', 'video'),
  fossSunriseWide: clip('foss-sunrise-wide', 'FOSS, sunrise', '0:28', '27-foss-sunrise-wide-v1.mp4', 'video'),
  twisterChat: clip(
    'twister-chat',
    'Ask for new knob colors; the Twister changes',
    '0:21',
    '30-twister-chat-demo.mp4',
    'video',
    'mft-api/81fcec7/f9be148f/twister-chat-demo.mp4'
  ),
} satisfies Record<string, Clip>;
