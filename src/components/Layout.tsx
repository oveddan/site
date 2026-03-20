import { Footer } from '@/components/shared/Footer';
import { Header } from '@/components/shared/Header';
import clsx from 'clsx';
import { Inter, Roboto_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const mono = Roboto_Mono({ subsets: ['latin'], variable: '--font-roboto' });

const Layout = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <>
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className={clsx(inter.variable, mono.variable, 'font-sans relative')}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:rounded-md focus:bg-teal-500 focus:px-4 focus:py-2 focus:text-white focus:outline-none"
        >
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
