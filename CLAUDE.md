# CLAUDE.md

## Project Overview

Personal portfolio site for danoved.xyz, built with Next.js 13 (TypeScript) and deployed on Netlify.

## Tech Stack

- **Framework**: Next.js 13.2.1 with TypeScript
- **Styling**: React 18.2.0
- **Content**: MDX support via `@next/mdx`
- **Deployment**: Netlify (with `@netlify/plugin-nextjs`)
- **Build**: `yarn build`

## Key Architecture Decisions

### External proxying (blog, resume)

External content (itp-blog, resume) is proxied via Netlify redirects configured in `netlify.toml`, **not** via Next.js rewrites in `next.config.js`.

**Important:** Do not add Next.js rewrites in `next.config.js` for paths already handled by `netlify.toml`. The `@netlify/plugin-nextjs` converts Next.js rewrites into Netlify redirect rules at build time, which conflicts with manually configured `netlify.toml` redirects and causes redirect loops (ERR_TOO_MANY_REDIRECTS).

- `/itp-blog*` → proxied to `https://danblog.netlify.app/blog/` via `netlify.toml`
- `/resume*` → proxied to `https://dano-resume.netlify.app/resume/` via both `netlify.toml` and `next.config.js` (resume uses `RESUME_BASE_URL` env var in Next.js for dev/prod switching)

### Routing files

- `netlify.toml` — Netlify redirects (proxy rules with `force = true`, `status = 200`, signed auth headers)
- `next.config.js` — Next.js config (MDX, rewrites for resume only)

## Deployment Troubleshooting

When encountering deployment issues (redirect loops, 404s, proxy failures, build errors), follow this process:

1. **Diagnose**: Check `netlify.toml` and `next.config.js` for conflicting redirect/rewrite rules. Use `curl -sI <url>` to inspect response headers.
2. **Fix**: Apply the fix and update this CLAUDE.md with what went wrong and the resolution so the issue doesn't recur.
3. **Verify**: Run `yarn build` locally to confirm the fix doesn't break the build.

### Known issues and fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| ERR_TOO_MANY_REDIRECTS on `/itp-blog` | Duplicate proxy rules in both `netlify.toml` and `next.config.js`. `@netlify/plugin-nextjs` converts Next.js rewrites to Netlify redirects, conflicting with manual `netlify.toml` rules. | Remove the Next.js rewrite for any path already handled in `netlify.toml`. Only configure the proxy in one place. |

### Rules to prevent regressions

- Never duplicate a proxy/redirect in both `netlify.toml` and `next.config.js` — pick one.
- For paths that need Netlify's `signed` auth header, always use `netlify.toml` (Next.js rewrites can't add custom headers to proxy requests).
- After any routing change, verify with `curl -sIL https://danoved.xyz/<path>` that no redirect loop exists.

### llms.txt API (AI agent content access)

The site serves `/llms.txt` and `/llms-full.txt` endpoints following the [llms.txt standard](https://llmstxt.org/) to make content accessible to AI agents.

- **`/llms.txt`** — Lightweight markdown index with project titles, summaries, and links
- **`/llms-full.txt`** — Complete content dump with all project metadata and cleaned MDX content

**Implementation:**
- API routes at `src/pages/api/llms.ts` and `src/pages/api/llms-full.ts`
- Content generation logic in `src/api/llmsContent.ts`
- Next.js rewrites in `next.config.js` map `/llms.txt` → `/api/llms` and `/llms-full.txt` → `/api/llms-full`
- These rewrites are safe — no conflicting rules in `netlify.toml`
- Responses are cached (`s-maxage=3600, stale-while-revalidate=86400`)
- Content is dynamically generated from portfolio metadata (`src/api/portfolio.ts`) and raw MDX files
- About page content is linked, not inlined (can be added later once the about page is finalized)

## Common Commands

- `yarn dev` — Start dev server
- `yarn build` — Production build
- `yarn start` — Start production server
