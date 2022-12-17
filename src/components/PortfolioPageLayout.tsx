import { PortfolioItemMeta } from '@/api/types';
import { Container } from './Container';
import Layout from './Layout';
import { Prose } from './Prose';
import { GiOfficeChair } from 'react-icons/gi';
import { AiFillCalendar, AiFillCode } from 'react-icons/ai';
import { BsFillPeopleFill } from 'react-icons/bs';
import { MdCategory } from 'react-icons/md';
import Head from 'next/head';

export const Pattern = () => (
  <div className="hidden lg:absolute lg:inset-y-0 lg:block lg:h-full lg:w-full lg:[overflow-anchor:none]">
    <div className="relative mx-auto h-full max-w-prose text-lg" aria-hidden="true">
      <svg
        className="absolute top-12 left-full translate-x-32 transform"
        width={404}
        height={384}
        fill="none"
        viewBox="0 0 404 384"
      >
        <defs>
          <pattern
            id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
            x={0}
            y={0}
            width={20}
            height={20}
            patternUnits="userSpaceOnUse"
          >
            <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
          </pattern>
        </defs>
        <rect width={404} height={384} fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)" />
      </svg>
      <svg
        className="absolute top-1/2 right-full -translate-y-1/2 -translate-x-32 transform"
        width={404}
        height={384}
        fill="none"
        viewBox="0 0 404 384"
      >
        <defs>
          <pattern
            id="f210dbf6-a58d-4871-961e-36d5016a0f49"
            x={0}
            y={0}
            width={20}
            height={20}
            patternUnits="userSpaceOnUse"
          >
            <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
          </pattern>
        </defs>
        <rect width={404} height={384} fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
      </svg>
      <svg
        className="absolute bottom-12 left-full translate-x-32 transform"
        width={404}
        height={384}
        fill="none"
        viewBox="0 0 404 384"
      >
        <defs>
          <pattern
            id="d3eb07ae-5182-43e6-857d-35c643af9034"
            x={0}
            y={0}
            width={20}
            height={20}
            patternUnits="userSpaceOnUse"
          >
            <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
          </pattern>
        </defs>
        <rect width={404} height={384} fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)" />
      </svg>
    </div>
  </div>
);

export function formatDate(date: number) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

const headerItemClass = 'mt-2 flex items-center text-sm ';
const iconItemClass = 'mr-1.5 h-5 w-5 flex-shrink-0';

const Header = ({ meta }: { meta: PortfolioItemMeta }) => (
  <div className="mx-auto max-w-prose text-lg">
    {/* <time
      // dateTime={meta.date}
      className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
    >
      <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
      <span className="ml-3">{formatDate(meta.date)}</span>
    </time> */}
    <h1>
      <span className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 dark:text-zinc-100 sm:text-4xl">
        {meta.title}
      </span>
    </h1>
    <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6 text-zinc-900 dark:text-zinc-100 justify-center">
      {meta.projectType && (
        <div className={headerItemClass}>
          <GiOfficeChair className={iconItemClass} aria-hidden="true" title="Project Type" />
          {meta.projectType}
        </div>
      )}
      {meta.role && (
        <div className={headerItemClass}>
          <BsFillPeopleFill className={iconItemClass} aria-hidden="true" title="Role" />
          {meta.role}
        </div>
      )}
      <div className={headerItemClass}>
        <MdCategory className={iconItemClass} aria-hidden="true" title="Tech" />
        {meta.categories.join(', ')}
      </div>

      <div className={headerItemClass}>
        <AiFillCode className={iconItemClass} aria-hidden="true" title="Tech" />
        {meta.tech.join(', ')}
      </div>
      {/* <div className={headerItemClass}>
        <AiFillCalendar className={iconItemClass} aria-hidden="true" title="Date" />
        {formatDate(meta.dateStart)}
        {meta.dateEnd && ` - ${formatDate(meta.dateEnd)}`}
      </div> */}
    </div>

    <p className="mt-8 text-xl leading-8 prose dark:prose-invert">{meta.summary}</p>
  </div>
);

export const PortfolioPageLayout = ({
  meta,
  children,
}: {
  meta: PortfolioItemMeta;
  children: JSX.Element | JSX.Element[];
}) => (
  <>
    <Layout>
      <Head>
        <title>{`Dan Oved's portfolio - ${meta.title}`}</title>
        <meta name="description" content={meta.summary} />
        <meta name="og:title" content={`Dan Oved's portfolio - ${meta.title}`} />
        <meta name="og:description" content={meta.summary} />
        {/* <meta name="og:image" content={require(meta.image)} /> */}
      </Head>
      <Container className="mt-16 lg:mt-32">
        <div className="xl:relative">
          <div className="mx-auto max-w-2xl">
            <article>
              <Header meta={meta} />

              <Prose className="mt-8">{children}</Prose>
            </article>
          </div>
        </div>
      </Container>
    </Layout>
  </>
);
