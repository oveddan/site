import { join } from 'path';
import { readdirAsync, readFileAsync } from './util';
import matterReader from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const portfolioFolder = join(process.cwd(), 'content/portfolio');

export type PortfolioItem = {
  title: string;
  date: number;
  draft?: boolean;
  weight: number;
  image: string;
  animatedImage?: string;
  showonlyimage?: boolean;
  content: string;
  summary: string;
};

const getPortfolioItem = async (slug: string) => {
  // read the portfolio file
  const portfolioFile = await readFileAsync(join(portfolioFolder, slug, 'index.md'), 'utf8');
  // parse its matter
  const { data, content } = await matterReader(portfolioFile);

  const processedContent = (await remark().use(html).process(content)).toString();

  const portfolioItem: PortfolioItem = {
    ...(data as Omit<PortfolioItem, 'content'>),
    date: Date.parse(data.date),
    content: processedContent,
  };

  return portfolioItem;
};

export const getPortfolioItems = async () => {
  const portfolioItems = await readdirAsync(portfolioFolder);

  const nonDrafts = (await Promise.all(portfolioItems.map(getPortfolioItem))).filter((x) => !x.draft);

  return nonDrafts.sort((x, y) => (x.weight || 0) - (y.weight || 0));
};
