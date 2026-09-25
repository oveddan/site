import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import clsx from 'clsx';

import { Container } from '@/components/Container';
import avatarImage from '@/images/avatar.jpg';
import { navItems } from '@/api/navItems';

const ModeToggle = dynamic(() => import('./ModeToggle'), { ssr: false });

/** "work" (the index) also owns every project page under /portfolio. */
function isActivePath(path: string, pathname: string) {
  if (path === '/') return pathname === '/' || pathname === '/portfolio' || pathname.startsWith('/portfolio/');
  return pathname === path || pathname.startsWith(`${path}/`);
}

function NavLink({
  text,
  path,
  external,
  active,
}: {
  text: string;
  path: string;
  external?: boolean;
  active: boolean;
}) {
  const className = clsx(
    // External items drop below `sm` so the phone header keeps only "work" and the toggle.
    external ? 'hidden sm:inline-flex' : 'inline-flex',
    'items-center whitespace-nowrap rounded-md px-[9px] py-2 transition-colors',
    active
      ? "text-ink before:mr-[7px] before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent before:shadow-[0_0_8px_rgb(var(--accent))] before:content-['']"
      : 'text-ink-2 hover:text-ink',
    'focus-ring'
  );

  if (external) {
    return (
      <a href={path} target="_blank" rel="noopener noreferrer" className={className}>
        {text}
        <span aria-hidden="true" className="ml-0.5 opacity-[0.55]">
          ↗
        </span>
      </a>
    );
  }

  return (
    <Link href={path} aria-current={active ? 'page' : undefined} className={className}>
      {text}
    </Link>
  );
}

export function Header() {
  const { pathname } = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 border-b bg-ground/80 backdrop-blur-md backdrop-saturate-150 transition-colors duration-200',
        scrolled ? 'border-line' : 'border-transparent'
      )}
    >
      <Container className="flex h-[60px] items-center justify-between gap-3">
        <Link
          href="/"
          className={clsx(
            'flex items-center gap-2.5 whitespace-nowrap rounded-md font-mono text-sm font-medium leading-none tracking-[-0.01em] text-ink',
            'focus-ring'
          )}
        >
          <Image
            src={avatarImage}
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 rounded-full"
            priority
            unoptimized
          />
          {/* Below `sm` the avatar stands alone, so the name stays available to screen readers. */}
          <span className="sr-only sm:not-sr-only">dan oved</span>
        </Link>
        <nav aria-label="Site" className="flex items-center gap-0.5 font-mono text-[13px] leading-none">
          {navItems.map((item) => (
            <NavLink key={item.path} {...item} active={!item.external && isActivePath(item.path, pathname)} />
          ))}
          {/* Reserve the toggle's footprint so the nav does not shift when the client-only button hydrates. */}
          <div className="ml-1.5 h-[34px] w-[34px]">
            <ModeToggle />
          </div>
        </nav>
      </Container>
    </header>
  );
}
