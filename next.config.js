/** @type {import('next').NextConfig} */

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [],
    rehypePlugins: [],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});

const resumeBaseUrl = process.env.RESUME_BASE_URL || 'http://localhost:3000';

module.exports = withMDX({
  // Append the default value with md extensions
  pageExtensions: ['tsx', 'jsx', 'mdx'],
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/blog',
        destination: 'https://danblog.netlify.app/blog',
      },
      {
        source: '/blog/:slug',
        destination: 'https://danblog.netlify.app/:slug*', // Matched parameters can be used in the destination
      },
      {
        source: '/cv',
        destination: `${resumeBaseUrl}/resume`, // Matched parameters can be used in the destination
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
