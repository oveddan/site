# CLAUDE.md

## Project Overview

Personal portfolio site for danoved.xyz, built with Next.js 13 (TypeScript) and deployed on Netlify.

## Tech Stack

- **Framework**: Next.js 13.2.1 with TypeScript 5.0
- **Styling**: React 18.2.0
- **Content**: MDX support via `@next/mdx`, mermaid diagrams via `mdx-mermaid`
- **Deployment**: Netlify (with `@netlify/plugin-nextjs`), Node 20 (set in `.nvmrc`)
- **Build**: `pnpm build`

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
3. **Verify**: Run `pnpm build` locally to confirm the fix doesn't break the build.

**Self-update rule:** Whenever you learn something new about deployment, build configuration, common errors, or project conventions, immediately add it to this file — in the appropriate section (known issues, rules, tech stack, etc.). This file is the project's institutional memory.

### Known issues and fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| ERR_TOO_MANY_REDIRECTS on `/itp-blog` | Duplicate proxy rules in both `netlify.toml` and `next.config.js`. `@netlify/plugin-nextjs` converts Next.js rewrites to Netlify redirects, conflicting with manual `netlify.toml` rules. | Remove the Next.js rewrite for any path already handled in `netlify.toml`. Only configure the proxy in one place. |
| `undefined` cannot be serialized as JSON | Portfolio meta uses `undefined` for optional fields like `dateEnd`. Next.js `getStaticProps` requires all values to be JSON-serializable. | Use `null` instead of `undefined` in portfolio meta files. |
| Conflicting lockfiles | Running `npm install` or `yarn install` creates a second lockfile alongside `pnpm-lock.yaml`, causing resolution inconsistencies on Netlify. | Only use pnpm in this project. If `package-lock.json` or `yarn.lock` appears, delete it. |
| TypeScript type errors from d3/mermaid | `mermaid`'s transitive d3 type dependencies use TypeScript 5.0+ features (`const` type parameters). | Keep TypeScript at 5.0+. Do not downgrade. |
| Netlify build fails on `pnpm install` with engine incompatibility | `.nvmrc` specified Node 18 but a dependency (`marked@16`) requires Node >= 20. Netlify prioritizes `.nvmrc` over `NODE_VERSION` in `netlify.toml`. | Update `.nvmrc` to `20`. Only set Node version in `.nvmrc` — do not duplicate in `netlify.toml` `[build.environment]`. |

### Rules to prevent regressions

- Never duplicate a proxy/redirect in both `netlify.toml` and `next.config.js` — pick one.
- For paths that need Netlify's `signed` auth header, always use `netlify.toml` (Next.js rewrites can't add custom headers to proxy requests).
- After any routing change, verify with `curl -sIL https://danoved.xyz/<path>` that no redirect loop exists.
- Use `null` (not `undefined`) for optional fields in portfolio meta — Next.js cannot serialize `undefined` in `getStaticProps`.
- Only use pnpm. Never run `npm install` or `yarn install` — they create conflicting lockfiles alongside `pnpm-lock.yaml` on Netlify.
- Portfolio animated GIFs should be ~360×277px, typically 1-3MB.
- `externalArticle` in portfolio meta overrides the card link target — only set it when the project has no on-site MDX page. If the project has its own `index.mdx`, leave `externalArticle` as `null`.
- Node version is set in `.nvmrc` only — do not also set `NODE_VERSION` in `netlify.toml` (Netlify prioritizes `.nvmrc`, so duplicating causes confusion when they drift apart).

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

- `pnpm dev` — Start dev server
- `pnpm build` — Production build
- `pnpm start` — Start production server
