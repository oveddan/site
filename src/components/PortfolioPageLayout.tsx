import { PortfolioItemMeta } from '@/api/portfolio';
import { Container } from './Container';
import Layout from './Layout';
import { Prose } from './Prose';

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

const Wrapper = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <div className="relative overflow-hidden py-16">
    <div className="relative px-4 sm:px-6 lg:px-8 prose dark:prose-invert">{children}</div>
  </div>
);

export function formatDate(date: number) {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

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
      <span className="block text-center text-lg font-semibold text-indigo-600">Introducing</span>
      <span className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 dark:text-zinc-100 sm:text-4xl">
        {meta.title}
      </span>
    </h1>

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
