import { readdirSync } from 'fs';
import { writeFileSync } from 'fs';
import { join } from 'path';

const SITE_URL = 'https://danoved.xyz';

const portfolioDir = join(process.cwd(), 'src/pages/portfolio');
const folders = readdirSync(portfolioDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

const staticPages = ['', 'about'];

const urls = [
  ...staticPages.map((page) => `  <url><loc>${SITE_URL}/${page}</loc></url>`),
  ...folders.map(
    (slug) => `  <url><loc>${SITE_URL}/portfolio/${slug}</loc></url>`
  ),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`;

writeFileSync(join(process.cwd(), 'public/sitemap.xml'), sitemap);
console.log(`Sitemap generated with ${urls.length} URLs`);
