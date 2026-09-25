import type { JSX } from 'react';
import { formatDateRange } from '@/api/dates';
import type { MetaWithSlug } from '@/api/portfolio';
import { nextProject, type PortfolioIndexEntry } from '@/api/portfolioIndex';
import { Container } from './Container';
import Layout from './Layout';
import { Prose } from './shared/Prose';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { projectImageSrc } from '@/hooks/useProjectImageSrc';
import { useRouter } from 'next/router';

const SITE_URL = 'https://danoved.xyz';

/** Resolve a static-image module (or its unwrapped data) to an absolute URL for share previews. */
function absoluteImageUrl(imageModule: unknown): string | null {
  const mod = imageModule as { default?: { src?: string }; src?: string } | string | null;
  const src = typeof mod === 'string' ? mod : mod?.default?.src ?? mod?.src ?? null;
  if (!src) return null;
  return src.startsWith('http') ? src : `${SITE_URL}${src}`;
}

// The homepage card frame: GIFs are cropped to the same 360 × 277 well everywhere.
const mediaFrame = 'relative aspect-[360/277] overflow-hidden bg-surface';

const ActionLink = ({ href, primary, children }: { href: string; primary: boolean; children: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={clsx(
      'rounded-full border px-3.5 py-2.5 font-mono text-[13px] font-medium leading-none transition-colors',
      primary
        ? 'border-ink bg-ink text-ground hover:border-accent hover:bg-accent hover:text-accent-ink'
        : 'border-line text-ink hover:border-ink-3',
      'focus-ring'
    )}
  >
    {children}
  </a>
);

const Actions = ({ links }: { links: MetaWithSlug['links'] }) => {
  if (!links.github && !links.demo) return null;
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {links.github && (
        <ActionLink href={links.github} primary>
          code on github ↗
        </ActionLink>
      )}
      {links.demo && (
        <ActionLink href={links.demo} primary={!links.github}>
          live demo ↗
        </ActionLink>
      )}
    </div>
  );
};

const Header = ({ meta, slug }: { meta: MetaWithSlug; slug: string }) => (
  <header className="grid gap-7 pb-9 pt-7 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-end lg:gap-14 lg:pb-11 lg:pt-10">
    <div>
      <p className="font-mono text-[12px] uppercase leading-none tracking-[0.08em] text-ink-3">
        {formatDateRange(meta.dateStart, meta.dateEnd)}
      </p>
      <h1 className="mt-4 text-balance font-mono text-[clamp(2rem,4.8vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-ink">
        {meta.title}
      </h1>
      <p className="mt-[18px] max-w-[52ch] text-pretty text-[17px] leading-relaxed text-ink-2">{meta.summary}</p>
      <Actions links={meta.links} />
    </div>
    <div className="w-full max-w-[440px] lg:justify-self-end">
      <div className={clsx(mediaFrame, 'rounded-md')}>
        <Image
          src={projectImageSrc({ slug, fileName: meta.animatedImage })}
          alt=""
          className="h-full w-full object-cover"
          unoptimized
          priority
        />
      </div>
    </div>
  </header>
);

const MetaStrip = ({ meta }: { meta: MetaWithSlug }) => {
  const items = (
    [
      ['role', meta.role],
      ['type', meta.projectType],
      ['medium', meta.categories.join(', ')],
      ['tools', meta.tech.join(', ')],
    ] as const
  ).filter(([, value]) => value);
  if (items.length === 0) return null;
  return (
    <dl className="grid grid-cols-2 gap-x-6 border-y border-line md:grid-cols-4">
      {items.map(([label, value]) => (
        <div key={label} className="py-4">
          <dt className="label">{label}</dt>
          <dd className="mt-2 text-sm leading-snug text-ink">{value}</dd>
        </div>
      ))}
    </dl>
  );
};

const NextProject = ({ project }: { project: PortfolioIndexEntry }) => {
  const external = project.externalArticle;
  const opensNewTab = !!external && /^https?:\/\//.test(external);
  const className = clsx(
    'group mt-[72px] grid grid-cols-[112px_minmax(0,1fr)_auto] items-center gap-5 border-t border-line py-6',
    'focus-ring'
  );
  const content = (
    <>
      <div className={clsx(mediaFrame, 'rounded')}>
        <Image
          src={projectImageSrc({ slug: project.slug, fileName: project.animatedImage })}
          alt=""
          className="h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-safe:group-hover:scale-105 motion-safe:group-focus-visible:scale-105 motion-reduce:transition-none"
          unoptimized
        />
      </div>
      <div>
        <span className="label mb-2 block">next project</span>
        <span className="block font-mono text-[17px] font-medium leading-[1.3] tracking-[-0.01em] text-ink">
          {project.title}
          {opensNewTab && (
            <>
              <span aria-hidden="true"> ↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </>
          )}
        </span>
      </div>
      <span
        aria-hidden="true"
        className="font-mono text-xl leading-none text-accent transition-transform duration-[250ms] motion-safe:group-hover:translate-x-1 motion-safe:group-focus-visible:translate-x-1 motion-reduce:transition-none"
      >
        →
      </span>
    </>
  );

  // An externalArticle is either an off-site URL or a Netlify-proxied path (e.g. /itp-blog/...), which
  // isn't a Next.js route, so it gets a plain anchor rather than client-side navigation.
  if (external) {
    return (
      <a
        href={external}
        className={className}
        {...(opensNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={`/portfolio/${project.slug}`} className={className}>
      {content}
    </Link>
  );
};

export const PortfolioPageLayout = ({
  meta,
  children,
}: {
  meta: MetaWithSlug;
  children: JSX.Element | JSX.Element[];
}) => {
  const router = useRouter();
  const parts = router.pathname.split('/');
  const slug = parts[parts.length - 1];
  const title = `${meta.title} - Dan Oved's portfolio`;
  // projectImageSrc returns the webpack module for a static image; the URL is on `.default.src`
  // (or `.src` when the import is already unwrapped). Share previews need an absolute URL.
  const ogImage = meta.image ? absoluteImageUrl(projectImageSrc({ slug, fileName: meta.image })) : null;
  const next = nextProject(slug);
  return (
    <>
      <Layout>
        <Head>
          <title>{title}</title>
          <meta name="description" content={meta.summary} />
          <meta property="og:type" content="article" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={meta.summary} />
          <meta property="og:url" content={`${SITE_URL}/portfolio/${slug}`} />
          {ogImage && <meta property="og:image" content={ogImage} />}
          <meta name="twitter:card" content={ogImage ? 'summary_large_image' : 'summary'} />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={meta.summary} />
          {ogImage && <meta name="twitter:image" content={ogImage} />}
        </Head>
        <Container>
          <Link
            href="/"
            className={clsx(
              'mt-7 inline-flex gap-2 font-mono text-[13px] leading-none text-ink-2 hover:text-ink',
              'focus-ring'
            )}
          >
            <span aria-hidden="true">←</span>
            all projects
          </Link>
          <article>
            <Header meta={meta} slug={slug} />
            <MetaStrip meta={meta} />
            <div className="mx-auto mt-12 max-w-[680px]">
              <Prose className="text-[16.5px]">{children}</Prose>
            </div>
          </article>
          {next && (
            <nav aria-label="Next project">
              <NextProject project={next} />
            </nav>
          )}
        </Container>
      </Layout>
    </>
  );
};
