import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html className="h-full antialiased" lang="en">
      <Head>
        <link rel="alternate" type="application/rss+xml" href={`${process.env.NEXT_PUBLIC_SITE_URL}/rss/feed.xml`} />
        <link rel="alternate" type="application/feed+json" href={`${process.env.NEXT_PUBLIC_SITE_URL}/rss/feed.json`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;600&family=Martian+Mono:wght@300;400;500;700&family=Roboto:wght@100;400;500;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="flex h-full flex-col bg-zinc-50 dark:bg-black">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
