import type { JSX } from 'react';
import { Footer } from '@/components/shared/Footer';
import { Header } from '@/components/shared/Header';
import clsx from 'clsx';
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';

// tailwind.config.js maps `font-sans` / `font-mono` to these variables.
const sans = IBM_Plex_Sans({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});
const mono = IBM_Plex_Mono({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

const Layout = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    // Full-bleed shell. `min-h-screen` is the fallback for browsers without `svh`; the column keeps the
    // footer at the bottom of short pages. (#__next sits between <body> and this, so `min-h-full` can't reach.)
    <div className={clsx(sans.variable, mono.variable, 'flex min-h-screen min-h-svh flex-col font-sans')}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
