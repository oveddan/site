import { Container } from '@/components/Container';

const elsewhere = [
  { name: 'github', href: 'https://github.com/oveddan' },
  { name: 'instagram', href: 'https://www.instagram.com/dan_oved/' },
  { name: 'linkedin', href: 'https://www.linkedin.com/in/danoved/' },
  { name: 'twitter', href: 'https://twitter.com/oveddan' },
];

export function Footer() {
  return (
    <footer className="mt-24">
      <Container>
        {/* The hairline sits inside the container so it lines up with the content column. */}
        <div className="grid gap-[26px] border-t border-line pb-11 pt-9 font-mono text-[13px] leading-normal md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <div>
            <h2 className="label mb-3.5">elsewhere</h2>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {elsewhere.map(({ name, href }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-sm text-ink transition-colors hover:text-accent focus-ring"
                >
                  {name}{' '}
                  <span aria-hidden="true" className="text-ink-3">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-x-[18px] gap-y-1.5 text-ink-3">
            {/* The year is baked in at build time and recomputed on hydration; they differ after Jan 1 until a rebuild. */}
            <span suppressHydrationWarning>&copy; {new Date().getFullYear()} Dan Oved</span>
            {/* A plain anchor: /llms.txt is a rewrite to an API route, not a client-side page. */}
            <span>
              for machines:{' '}
              <a
                href="/llms.txt"
                className="rounded-sm text-ink-2 underline underline-offset-2 transition-colors hover:text-ink focus-ring"
              >
                llms.txt
              </a>
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
