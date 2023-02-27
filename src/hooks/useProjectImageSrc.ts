import { MetaWithSlug } from '@/api/portfolio';

export const projectImageSrc = ({ fileName, slug }: { fileName: string; slug: string }) => {
  return require(`@/pages/portfolio/${slug}/${fileName.replace('./', '')}`);
};
