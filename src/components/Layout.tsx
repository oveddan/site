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
      <div className="relative">
        <Header />
        <main className={clsx(inter.variable, mono.variable, 'font-sans')}>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
