/** @type {import('next').NextConfig} */

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [require('mdx-mermaid')],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});

const resumeBaseUrl = process.env.RESUME_BASE_URL;

module.exports = withMDX({
  // Append the default value with md extensions.
  // NOTE: 'ts'/'js' are intentionally omitted so colocated portfolio `meta.ts` files
  // under pages/portfolio/*/ are NOT treated as pages (they have no default component).
  // Consequence: API routes must use a listed extension — name them `.tsx`, not `.ts`,
  // or Next.js silently ignores them and they 404 in prod (e.g. /api/llms).
  pageExtensions: ['tsx', 'jsx', 'mdx'],
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/llms.txt',
        destination: '/api/llms',
      },
      {
        source: '/llms-full.txt',
        destination: '/api/llms-full',
      },
      {
        source: '/resume',
        destination: `${resumeBaseUrl}/resume`, // Matched parameters can be used in the destination
      },
      {
        source: '/resume/:slug*',
        destination: `${resumeBaseUrl}/resume/:slug*`, // Matched parameters can be used in the destination
      },
    ];
  },
});
