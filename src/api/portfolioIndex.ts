import type { PortfolioItemMeta } from './types';

/** The fields a project page needs to link onward to another project. */
export type PortfolioIndexEntry = {
  slug: string;
  title: string;
  weight: number;
  animatedImage: string;
  externalArticle: string | null;
};

type MetaContext = {
  keys(): string[];
  (key: string): { meta: PortfolioItemMeta };
};

// Client-safe counterpart to getPortfolioItems in ./portfolio.ts, which reads the filesystem and so
// only runs at build time. Webpack bundles every `./<slug>/meta.ts` (and nothing deeper) into this
// context. @types/webpack-env isn't installed, hence the cast.
const metaContext: MetaContext = (require as any).context('../pages/portfolio', true, /^\.\/[^/]+\/meta\.ts$/);

const slugFromKey = (key: string) => key.split('/')[1];

/** Non-draft projects in homepage order: weight ascending (missing = 0), ties by slug as readdir lists them. */
export const portfolioIndex: PortfolioIndexEntry[] = metaContext
  .keys()
  .map((key) => ({ slug: slugFromKey(key), key }))
  // Compare slugs, not whole keys: Node's readdir (libuv strcmp) puts `apotheneum` before
  // `apotheneum-live`, but the keys `./apotheneum-live/meta.ts` < `./apotheneum/meta.ts` since '-' < '/'.
  .sort((a, b) => (a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0))
  .map(({ slug, key }) => ({ slug, meta: metaContext(key).meta }))
  .filter(({ meta }) => !meta.draft)
  .map(({ slug, meta }) => ({
    slug,
    title: meta.title,
    weight: meta.weight || 0,
    animatedImage: meta.animatedImage,
    externalArticle: meta.links.externalArticle ?? null,
  }))
  .sort((x, y) => x.weight - y.weight);

/** The project after `slug` in homepage order, wrapping around; the first project when `slug` isn't listed (a draft). */
export const nextProject = (slug: string): PortfolioIndexEntry | null => {
  if (portfolioIndex.length === 0) return null;
  const next = portfolioIndex[(portfolioIndex.findIndex((p) => p.slug === slug) + 1) % portfolioIndex.length];
  return next.slug === slug ? null : next;
};
