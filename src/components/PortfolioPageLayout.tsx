import { PortfolioItemMeta } from '@/api/types';
import { Container } from './Container';
import Layout from './Layout';
import { Prose } from './shared/Prose';
import { GiOfficeChair } from 'react-icons/gi';
import { AiFillCode } from 'react-icons/ai';
import { BsFillPeopleFill } from 'react-icons/bs';
import { MdCategory } from 'react-icons/md';
import Head from 'next/head';
import { FaGithub } from 'react-icons/fa';
import { BsDoorOpenFill } from 'react-icons/bs';
import { IconType } from 'react-icons';
import clsx from 'clsx';

export function formatDate(date: number) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

const headerItemClass = 'mt-2 flex items-center text-sm ';
const iconItemClass = 'mr-1.5 h-5 w-5 flex-shrink-0';

const MetaInfo = ({ meta }: { meta: PortfolioItemMeta }) => (
  <>
    <div className="mt-1 font-mono  flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6 text-zinc-900 dark:text-zinc-100 justify-center">
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
    </div>
  </>
);

const ProjectLink = ({ link, text, icon }: { link: string; text: string; icon: JSX.Element }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" className="mono mt-8 mb-0 underline flex">
    <>
      {icon} {text}
    </>
  </a>
);

const Links = ({ meta }: { meta: PortfolioItemMeta }) => (
  <>
    <div className="mt-1 font-mono  flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6 text-zinc-900 dark:text-zinc-100 justify-center">
      {meta.links.github && (
        <ProjectLink link={meta.links.github} text="code" icon={<FaGithub className={clsx(iconItemClass, 'mt-1')} />} />
      )}
      {meta.links.demo && (
        <ProjectLink
          link={meta.links.demo}
          text="live demo"
          icon={<BsDoorOpenFill className={clsx(iconItemClass, 'mt-1')} />}
        />
      )}
    </div>
  </>
);

const Header = ({ meta }: { meta: PortfolioItemMeta }) => (
  <div className="mx-auto max-w-prose text-lg">
    <time
      // dateTime={meta.date}
      className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500"
    >
      {/* <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" /> */}
      {/* <span className="ml-3"> */}
      {formatDate(meta.dateStart)} {meta.dateEnd && `- ${formatDate(meta.dateEnd)}`}
      {/* </span> */}
    </time>
    <h1>
      <span className="mt-2 block text-center text-3xl font-bold font-mono  leading-8 tracking-tight text-gray-900 dark:text-zinc-100 sm:text-4xl">
        {meta.title}
      </span>
    </h1>
    <MetaInfo meta={meta} />
    <Links meta={meta} />

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
        <title>{`${meta.title} - Dan Oved's portfolio`}</title>
        <meta name="description" content={meta.summary} />
        <meta name="og:title" content={`${meta.title} - Dan Oved's portfolio`} />
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
