import { join } from 'path';
import { PortfolioItemMeta } from './types';
import { readdirAsync } from './util';

const portfolioFolder = join(process.cwd(), 'src/pages/portfolio');

export type MetaWithSlug = PortfolioItemMeta & { slug: string };

const getPortfolioItem = async (slug: string): Promise<MetaWithSlug> => {
  // read the portfolio file
  const data = await import(`../pages/portfolio/${slug}/meta.ts`);
  // parse its matter

  const meta = data.meta as PortfolioItemMeta;

  return {
    ...meta,
    slug,
  };
};

async function getFoldersInPath(path: string) {
  const fileOrFolder = await readdirAsync(path, { withFileTypes: true });

  return fileOrFolder.filter((x) => x.isDirectory()).map((x) => x.name);
  // .filter(dirent => dirent.isDirectory())
  // .map(dirent => dirent.name)
}

export const getPortfolioItems = async () => {
  const portfolioItems = await getFoldersInPath(portfolioFolder);

  const nonDrafts = (await Promise.all(portfolioItems.map(getPortfolioItem))).filter((x) => !x.draft);

  return nonDrafts.sort((x, y) => (x.weight || 0) - (y.weight || 0));
};
