import { join } from 'path';
import { readdirAsync } from './util';

const portfolioFolder = join(process.cwd(), 'src/pages/portfolio');

export type PortfolioItemMeta = {
  title: string;
  date: number;
  draft?: boolean;
  weight: number;
  image: string;
  animatedImage: string;
  showonlyimage?: boolean;
  summary: string;
};

export type MetaWithSlug = PortfolioItemMeta & { slug: string };

const getPortfolioItem = async (slug: string): Promise<MetaWithSlug> => {
  // read the portfolio file
  const data = await import(`../pages/portfolio/${slug}/index.mdx`);
  // parse its matter

  const meta = data.meta as PortfolioItemMeta;

  return {
    ...meta,
    slug,
  };
};

export const getPortfolioItems = async () => {
  const portfolioItems = await readdirAsync(portfolioFolder);

  const nonDrafts = (await Promise.all(portfolioItems.map(getPortfolioItem))).filter((x) => !x.draft);

  return nonDrafts.sort((x, y) => (x.weight || 0) - (y.weight || 0));
};
