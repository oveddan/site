import Link from 'next/link';

import { InnerContainer, OuterContainer } from '@/components/Container';
import { navItems } from '@/api/navItems';

function NavLink({ href, children }: { href: string; children: JSX.Element | JSX.Element[] | string }) {
  return (
    <Link href={href} className="transition hover:text-teal-500 dark:hover:text-teal-400">
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="mt-32">
      <OuterContainer>
        <div className="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40">
          <InnerContainer>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {navItems.map((item) => (
                  <NavLink key={item.path} href={item.path}>
                    {item.text}
                  </NavLink>
                ))}
              </div>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                &copy; {new Date().getFullYear()} Dan Oved. All rights reserved.
              </p>
            </div>
          </InnerContainer>
        </div>
      </OuterContainer>
    </footer>
  );
}
