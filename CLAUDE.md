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

## Common Commands

- `yarn dev` — Start dev server
- `yarn build` — Production build
- `yarn start` — Start production server
