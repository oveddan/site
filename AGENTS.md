# Project instructions

This is the canonical operational guide for every coding agent working in this repository. Read it before changing code or infrastructure. `CLAUDE.md` imports this file so Codex and Claude share these rules; update this file, rather than duplicating project rules elsewhere.

## Project

Personal portfolio site for [danoved.xyz](https://danoved.xyz), built with Next.js (TypeScript and MDX) and deployed on Netlify. Use pnpm. The production build is `pnpm build`; Node 24 is selected by `.nvmrc`.

Useful operational references:

- [Media pipeline](docs/media-pipeline.md) — video export, R2 upload, and page integration.
- [Service operations](docs/service-operations.md) — Premiere, Cloudflare, Netlify, DNS, and verification.

## Routing and deploy rules

- External content is proxied by Netlify redirects in `netlify.toml`, not by duplicate Next.js rewrites. `@netlify/plugin-nextjs` converts Next.js rewrites into Netlify redirects; defining the same path in both causes redirect loops.
- `/itp-blog*` is configured in `netlify.toml`. `/resume*` needs its existing `netlify.toml` rule and the Next.js rewrite that uses `RESUME_BASE_URL`; do not introduce a second equivalent rule.
- Paths needing Netlify's `signed` auth header belong in `netlify.toml`, because a Next.js rewrite cannot add that request header.
- After a routing change, check `curl -sIL https://danoved.xyz/<path>` for loops.
- Keep the build Node version only in `.nvmrc`; do not add `NODE_VERSION` to `netlify.toml`.
- `AWS_LAMBDA_JS_RUNTIME` is a separate Netlify environment variable for the API-function runtime.
  Set it through Netlify, never under `[build.environment]` in `netlify.toml`, and keep it aligned
  with `.nvmrc`.
- Use pnpm only. Do not create `package-lock.json` or `yarn.lock` alongside `pnpm-lock.yaml`.

## Next.js and content rules

- `pageExtensions` deliberately excludes `ts` and `js`, so a route under `src/pages/api/` must use an included extension such as `.tsx`. Adding `ts` back makes colocated portfolio `meta.ts` files invalid pages.
- `getStaticProps` data must be JSON-serializable: use `null`, not `undefined`, for optional portfolio metadata.
- `externalArticle` overrides a portfolio card's target. Leave it `null` when the project has an on-site `index.mdx`.
- Portfolio animated GIFs should normally be roughly 360 × 277 px and 1–3 MB.
- Keep TypeScript at 5.0 or later: Mermaid's transitive d3 types require its newer type-system features.
- Keep the `outputFileTracingExcludes` rule for portfolio source images in `next.config.js`.
  `llmsContent` reads the portfolio tree dynamically, so Next otherwise traces those static images
  into Netlify's server handler and can exceed Lambda's 250 MiB uncompressed bundle limit.

## AI-readable site content

- `/llms.txt` is the lightweight portfolio index and `/llms-full.txt` is the complete generated content view.
- The API routes are `src/pages/api/llms.tsx` and `src/pages/api/llms-full.tsx`; generation lives in `src/api/llmsContent.ts`.
- `next.config.js` maps the public `.txt` paths to those routes. This mapping is safe because there is no equivalent `netlify.toml` redirect.
- Responses are cached with `s-maxage=3600, stale-while-revalidate=86400` and are generated from portfolio metadata and raw MDX. The about page is linked rather than inlined.

## Video and media rules

- Never commit video masters (`*.mp4` / `*.mov` are ignored). Store them in the Cloudflare R2 bucket `danoved-media` and refer to object keys through `mediaUrl()` in `src/api/media.ts`.
- Do not hardcode a media host in page code. The public base is `NEXT_PUBLIC_MEDIA_BASE_URL`; its production value is `https://media.danoved.xyz`. The r2.dev address remains the deliberate fallback for development/recovery.
- R2 video objects are immutable. A changed export needs a new, versioned object key, not an overwrite.
- A `ChapterVideo` must make no MP4 request before a visitor clicks: no `src`, no native `poster`, `preload="none"`, and assign/play the source synchronously from the click handler. Validate with `pnpm build && pnpm verify:media`.

## Institutional memory

When a durable project convention or a service-specific failure mode is discovered, record the resolution here or in the relevant document above. Do not record tokens, cookies, API keys, account credentials, or personal access URLs in tracked files.
