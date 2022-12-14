import { getPortfolioItems, PortfolioItem } from '@/api/portfolio';
import { Container } from '@/components/Container';
import Layout from '@/components/Layout';
import { GetStaticProps, NextPage } from 'next';

interface Props {
  portfolioItems: PortfolioItem[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const portfolioItems = await getPortfolioItems();

  return {
    props: {
      portfolioItems,
    },
  };
};

const Index: NextPage<Props> = ({ portfolioItems }) => {
  return (
    <Layout>
      <Container className="mt-16 sm:mt-32">
        <ul>
          {portfolioItems.map((item) => (
            <li key={item.title}>
              <b>{item.title}</b>
              <p>{item.summary}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Layout>
  );
};

export default Index;
