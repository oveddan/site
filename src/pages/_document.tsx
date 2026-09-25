import { Head, Html, Main, NextScript } from 'next/document';

// Runs before first paint so the theme is right on the first frame: a remembered choice in
// localStorage wins, and anything else (no choice, storage blocked) falls back to dark, the default.
// useDarkMode writes the same `theme` key when a visitor toggles.
const themeScript = `(function(){var t=null;try{t=localStorage.getItem('theme')}catch(e){}document.documentElement.classList.toggle('dark',t!=='light')})()`;

export default function Document() {
  return (
    // `dark` is server-rendered as the default (it also covers visitors without JavaScript); the
    // script above removes it for a remembered light choice, so the client class can differ.
    <Html className="dark h-full antialiased" lang="en" suppressHydrationWarning>
      <Head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="alternate" type="application/rss+xml" href={`${process.env.NEXT_PUBLIC_SITE_URL}/rss/feed.xml`} />
        <link rel="alternate" type="application/feed+json" href={`${process.env.NEXT_PUBLIC_SITE_URL}/rss/feed.json`} />
      </Head>
      <body className="bg-ground text-ink">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
