import { getPortfolioItems, MetaWithSlug } from '@/api/portfolio';
import { Card, CardDescription, CardLink } from '@/components/Card';
import Filters from '@/components/Filters';
import Layout from '@/components/Layout';
import { SimpleLayout } from '@/components/SimpleLayout';
import { useFilteredProjects, useFilters } from '@/hooks/useFilters';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

interface Props {
  portfolioItems: MetaWithSlug[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const portfolioItems = await getPortfolioItems();

  return {
    props: {
      portfolioItems,
    },
  };
};

function LinkIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        d="M15.712 11.823a.75.75 0 1 0 1.06 1.06l-1.06-1.06Zm-4.95 1.768a.75.75 0 0 0 1.06-1.06l-1.06 1.06Zm-2.475-1.414a.75.75 0 1 0-1.06-1.06l1.06 1.06Zm4.95-1.768a.75.75 0 1 0-1.06 1.06l1.06-1.06Zm3.359.53-.884.884 1.06 1.06.885-.883-1.061-1.06Zm-4.95-2.12 1.414-1.415L12 6.344l-1.415 1.413 1.061 1.061Zm0 3.535a2.5 2.5 0 0 1 0-3.536l-1.06-1.06a4 4 0 0 0 0 5.656l1.06-1.06Zm4.95-4.95a2.5 2.5 0 0 1 0 3.535L17.656 12a4 4 0 0 0 0-5.657l-1.06 1.06Zm1.06-1.06a4 4 0 0 0-5.656 0l1.06 1.06a2.5 2.5 0 0 1 3.536 0l1.06-1.06Zm-7.07 7.07.176.177 1.06-1.06-.176-.177-1.06 1.06Zm-3.183-.353.884-.884-1.06-1.06-.884.883 1.06 1.06Zm4.95 2.121-1.414 1.414 1.06 1.06 1.415-1.413-1.06-1.061Zm0-3.536a2.5 2.5 0 0 1 0 3.536l1.06 1.06a4 4 0 0 0 0-5.656l-1.06 1.06Zm-4.95 4.95a2.5 2.5 0 0 1 0-3.535L6.344 12a4 4 0 0 0 0 5.656l1.06-1.06Zm-1.06 1.06a4 4 0 0 0 5.657 0l-1.061-1.06a2.5 2.5 0 0 1-3.535 0l-1.061 1.06Zm7.07-7.07-.176-.177-1.06 1.06.176.178 1.06-1.061Z"
        fill="currentColor"
      />
    </svg>
  );
}

const projectLink = (project: MetaWithSlug) => {
  if (project.links.externalArticle) return project.links.externalArticle;

  return `/portfolio/${project.slug}`;
};

const Index: NextPage<Props> = ({ portfolioItems }) => {
  const filters = useFilters(portfolioItems);

  const filteredProjects = useFilteredProjects(filters.activeFilters, portfolioItems);

  return (
    <Layout>
      <Head>
        <title>Projects - Dan Oved</title>
        <meta name="description" content="Dan Oved's Portfolio" />
      </Head>
      <SimpleLayout
        title="Dan Oved: creative full-stack engineer and founder exploring the soon-to-be possible"
        intro="Here are curated selection projects I've worked on:"
      >
        <Filters {...filters} />
        <ul role="list" className="grid grid-cols-1 gap-x-12 gap-y-16 m:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card as="li" key={project.title}>
              <div className="relative z-10 flex items-center justify-center rounded-lg bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
                <Image
                  src={require(`./portfolio/${project.slug}/${project.animatedImage.replace('./', '')}`)}
                  alt=""
                  className="rounded-lg"
                  unoptimized
                />
              </div>
              <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                <CardLink href={projectLink(project)}>{project.title}</CardLink>
              </h2>
              <CardDescription>{project.summary}</CardDescription>
              {/* {project.links && (
                <p className="relative z-50 text-xl mt-6 flex transition dark:text-zinc-200">
                  {project.links.github && (
                    <a href={project.links.github} className="relative z-50">
                      <BsGithub />
                    </a>
                  )}
                </p>
              )} */}
            </Card>
          ))}
        </ul>
      </SimpleLayout>
    </Layout>
  );
};

export default Index;
