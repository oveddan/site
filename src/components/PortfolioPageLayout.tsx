import { PortfolioItemMeta } from '@/api/portfolio';
import { Container } from './Container';
import Layout from './Layout';

export const PortfolioPageLayout = ({
  meta,
  children,
}: {
  meta: PortfolioItemMeta;
  children: JSX.Element | JSX.Element[];
}) => (
  <>
    <Layout>
      <Container>
        <p>{meta.summary}</p>
        {children}
      </Container>
    </Layout>
  </>
);
