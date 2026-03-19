import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { getPortfolioItems, MetaWithSlug } from './portfolio';

const SITE_URL = 'https://danoved.xyz';

function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
}

function formatLinks(links: MetaWithSlug['links']): string {
  const parts: string[] = [];
  if (links.github) parts.push(`[GitHub](${links.github})`);
  if (links.demo) parts.push(`[Demo](${links.demo})`);
  if (links.externalArticle) parts.push(`[Article](${links.externalArticle})`);
  return parts.join(' | ');
}

function cleanMdxContent(raw: string): string {
  return raw
    .split('\n')
    // Remove import lines
    .filter((line) => !line.match(/^import\s+/))
    // Remove export default line
    .filter((line) => !line.match(/^export default/))
    .join('\n')
    // Convert YouTube embeds to links
    .replace(/<YouTube\s+videoId="([^"]+)"\s*\/>/g, '[Video: https://youtube.com/watch?v=$1]')
    // Convert Vimeo embeds to links
    .replace(/<Vimeo\s+videoId="([^"]+)"\s*\/>/g, '[Video: https://vimeo.com/$1]')
    // Remove Twitter embeds
    .replace(/<Twitter\s+[^/]*\/>/g, '')
    // Remove Instagram embeds
    .replace(/<Instagram\s+[^/]*\/>/g, '')
    // Remove ResizedImageWithCaption and other self-closing JSX components
    .replace(/<[A-Z]\w+\s+[\s\S]*?\/>/g, '')
    // Convert <b> to bold
    .replace(/<b>([\s\S]*?)<\/b>/g, '**$1**')
    // Convert <i> to italic
    .replace(/<i>([\s\S]*?)<\/i>/g, '*$1*')
    // Clean up excessive blank lines
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function readMdxContent(slug: string): string | null {
  const mdxPath = join(process.cwd(), 'src/pages/portfolio', slug, 'index.mdx');
  if (!existsSync(mdxPath)) return null;
  const raw = readFileSync(mdxPath, 'utf-8');
  return cleanMdxContent(raw);
}

function formatPortfolioMeta(item: MetaWithSlug): string {
  const lines: string[] = [];

  lines.push(`- **Role**: ${item.role}`);
  if (item.projectType) lines.push(`- **Type**: ${item.projectType}`);
  lines.push(`- **Tech**: ${item.tech.join(', ')}`);
  if (item.categories.length) lines.push(`- **Categories**: ${item.categories.join(', ')}`);

  const dateStr = formatDate(item.dateStart);
  const endStr = item.dateEnd ? formatDate(item.dateEnd) : 'Present';
  lines.push(`- **Date**: ${dateStr} – ${endStr}`);

  const linksStr = formatLinks(item.links);
  if (linksStr) lines.push(`- **Links**: ${linksStr}`);

  return lines.join('\n');
}

export async function generateLlmsTxt(): Promise<string> {
  const items = await getPortfolioItems();

  const projectLines = items
    .map((item) => `- [${item.title}](${SITE_URL}/portfolio/${item.slug}): ${item.summary}`)
    .join('\n');

  return `# Dan Oved - danoved.xyz

> Polyglot Pioneer at the Intersection of Art and Technology. Full-stack engineer and founder working across machine learning, web3, the metaverse, and interactive installations.

## About

- [About Dan Oved](${SITE_URL}/about): Full-stack engineer and founder at the intersection of art and technology.

## Portfolio

${projectLines}

## Full Content

- [llms-full.txt](${SITE_URL}/llms-full.txt): Complete portfolio content with full project details and descriptions
`;
}

export async function generateLlmsFullTxt(): Promise<string> {
  const items = await getPortfolioItems();

  const projectSections = items.map((item) => {
    const meta = formatPortfolioMeta(item);
    const mdxContent = readMdxContent(item.slug);

    let section = `### ${item.title}\n\n${meta}\n\n${item.summary}`;
    if (mdxContent) {
      section += `\n\n${mdxContent}`;
    }
    return section;
  });

  return `# Dan Oved - danoved.xyz

> Portfolio of projects spanning machine learning, web3, the metaverse, and interactive installations.

## About

- [About Dan Oved](${SITE_URL}/about)

## Portfolio

${projectSections.join('\n\n---\n\n')}
`;
}
