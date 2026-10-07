import { utcYear } from '@/api/dates';
import { getPortfolioItems, MetaWithSlug } from '@/api/portfolio';
import { Container } from '@/components/Container';
import Layout from '@/components/Layout';
import Filters from '@/components/PortfolioHome/Filters';
import { PortfolioCards } from '@/components/PortfolioHome/PortfolioCards';
import { useFilteredProjects, useFilters } from '@/hooks/useFilters';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

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

/** "14 projects · 2018–2026" */
const projectsSummary = (projects: MetaWithSlug[]) => {
  const first = Math.min(...projects.map(({ dateStart }) => utcYear(dateStart)));
  const last = Math.max(...projects.map(({ dateStart, dateEnd }) => utcYear(dateEnd || dateStart)));
  const years = first === last ? `${first}` : `${first}–${last}`;

  return `${projects.length} projects · ${years}`;
};

const Index: NextPage<Props> = ({ portfolioItems }) => {
  const filters = useFilters(portfolioItems);

  const filteredProjects = useFilteredProjects(filters.activeFilters, portfolioItems);

  return (
    <Layout>
      <Head>
        <title>Dan Oved&apos;s portfolio</title>
        <meta name="description" content="Dan Oved's portfolio" />
      </Head>
      <Container>
        <header className="pb-7 pt-14 md:pb-9 md:pt-[88px]">
          <p className="mb-[18px] font-mono text-[12px] uppercase leading-none tracking-[0.08em] text-ink-3 tabular-nums">
            {projectsSummary(portfolioItems)}
          </p>
          <h1 className="max-w-[18ch] text-balance font-mono text-[length:clamp(2rem,6.4vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-ink">
            Dan Oved&apos;s portfolio
          </h1>
        </header>
        <Filters {...filters} projects={portfolioItems} shown={filteredProjects.length} />
        <PortfolioCards projects={filteredProjects} />
      </Container>
    </Layout>
  );
};

export default Index;
