# Media pipeline: Premiere → Cloudflare R2 → the site

How the Apotheneum chapter videos (and any future large video) get from an edit to a page on
danoved.xyz. Video masters are **never** committed — `.gitignore` blocks `*.mp4` / `*.mov`.

- **Bucket:** `danoved-media` (Cloudflare R2)
- **Production public base URL:** `https://media.danoved.xyz` (active custom domain on the bucket)
- **Fallback base URL:** `https://pub-f9dd7e8819194ed79df28f317fb60a69.r2.dev` (keep this as the
  development/recovery fallback, not the public site host)
- **Site config:** `src/api/media.ts` is the single source of truth. It reads
  `NEXT_PUBLIC_MEDIA_BASE_URL` and falls back to the r2.dev URL above.

> **Node version.** The repo, Netlify build, Netlify Functions runtime, and Wrangler all use Node 24. `.nvmrc` selects the build version; Netlify's production environment sets
> `AWS_LAMBDA_JS_RUNTIME=nodejs24.x` for Functions. Do not put that environment variable in
> `netlify.toml`.

## 1. Export from Premiere / Adobe Media Encoder

Export H.264 MP4, AAC audio, at the source resolution and frame rate of the sequence. Two settings
matter downstream:

- **Fast start / streamable.** The `moov` atom must sit before `mdat` or the browser has to
  download the whole file before it can show frame one. Verify the exported MP4 rather than
  relying on an AME preset label; if necessary, fix it after the fact with a stream copy (no
  re-encode and no editorial change):

  ```sh
  ffmpeg -i chapter.mp4 -c copy -movflags +faststart chapter-faststart.mp4
  ```

- **Verify the atom order** before uploading:

  ```sh
  ffmpeg -v trace -i chapter.mp4 2>&1 | grep -m 2 -E "type:'(moov|mdat)'"
  ```

  `moov` must print first.

## 2. Upload to R2

Ordinary files (under 300 MB) go up with Wrangler directly. Set the content type and the immutable
cache header at upload time — R2 stores them on the object and serves them back on every request:

```sh
pnpm exec wrangler r2 object put \
  danoved-media/apotheneum/03-rain.mp4 \
  --file=./exports/03-rain.mp4 \
  --content-type=video/mp4 \
  --cache-control="public, max-age=31536000, immutable" \
  --remote
```

`--remote` is required: without it Wrangler writes to the local simulated bucket, not R2.

**Object keys are versioned.** Because the objects are served `immutable`, a re-export must not
reuse a key — bump it (`01-hyperspace-v2.mp4`) and update `chapters.ts`. That is why chapter 1 is
already at `v2`.

### Files over 300 MB

`wrangler r2 object put` goes through the R2 REST API, which caps a single-part upload at **300
MB**; larger files fail. Wrangler has no multipart flag for `r2 object put`, so the large chapters
were uploaded through a **temporary** Worker with an R2 binding that used the multipart API
(`createMultipartUpload` → `uploadPart` → `completeMultipartUpload`) with **64 MiB parts**, run
against the real bucket via a remote preview (`wrangler dev --remote`) and guarded by a
single-use bearer token generated for that upload session.

Rules that go with that approach:

- The Worker is **torn down immediately** after the uploads finish. There is no persistent upload
  endpoint and no long-lived secret anywhere — not in the repo, not in Netlify, not in Cloudflare.
- The token is generated per session, exists only in the temporary ignored upload workspace and
  running processes, and is deleted with that workspace afterward. **Never put a credential or
  token in this file, in tracked files, or in a commit message.**
- The multipart parts are set on the completed object with the same `content-type` and
  `cache-control` as the single-part path, so both routes produce identical objects.

## 3. Verify public delivery

Range support is what makes seeking work. Check it against the public URL, not the API:

```sh
curl -sI -H 'Range: bytes=0-1' \
  https://media.danoved.xyz/apotheneum/03-rain.mp4
```

Expect:

- `HTTP/2 206`
- `accept-ranges: bytes`
- `content-type: video/mp4`
- `cache-control: public, max-age=31536000, immutable`

All five current objects were verified this way against `media.danoved.xyz`; byte-range delivery is working publicly. The r2.dev URL is useful as a fallback diagnostic endpoint.

## 4. Point the site at the media host

- `media.danoved.xyz` is connected to the bucket and `NEXT_PUBLIC_MEDIA_BASE_URL=https://media.danoved.xyz` is set for Netlify production builds.
- `NEXT_PUBLIC_*` values are inlined at build time, so changing this value requires a production redeploy; no code change is needed.

## 5. Add or update a chapter

1. Add the object key to `src/pages/portfolio/apotheneum/chapters.ts` with its title and runtime.
   URLs are built from the key by `mediaUrl()` — never hardcode a host.
2. Drop `<ChapterVideo {...chapters.<id>} />` into `index.mdx` under the matching prose section.
3. Nothing else: `src/api/llmsContent.ts` picks the tag up and renders it into `/llms-full.txt` as
   a readable `[Video: Title (runtime) — url]` reference.

Posters are optional and none exist yet. When one is added, upload it beside the video, set
`poster` on the chapter, and it will lazy-load behind the facade — it never blocks first paint.

## Current object keys

| Chapter id     | Object key                        | Runtime |
| -------------- | --------------------------------- | ------- |
| `hyperspace`   | `apotheneum/01-hyperspace-v2.mp4` | 5:10    |
| `night-chorus` | `apotheneum/02-night-chorus.mp4`  | 4:06    |
| `rain`         | `apotheneum/03-rain.mp4`          | 3:09    |
| `thunderstorm` | `apotheneum/04-thunderstorm.mp4`  | 3:07    |
| `sunrise`      | `apotheneum/05-sunrise.mp4`       | 3:48    |

## How the player behaves

`src/components/ChapterVideo.tsx` makes **zero** MP4 requests until a visitor clicks play: the
`<video>` is mounted with `preload="none"` and no `src` and no `poster` attribute, covered by a CSS
facade. The click handler assigns `video.src` and calls `video.play()` synchronously in the same
user-gesture stack (required by mobile Safari), moves focus to the native controls, and hides the
facade once playback actually starts. Starting one chapter pauses any other on the page. If the
file fails to load, the player offers a direct link to the MP4.
