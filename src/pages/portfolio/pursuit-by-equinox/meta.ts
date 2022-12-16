import { PortfolioItemMeta, ProjectType } from '@/api/types';

export const meta: PortfolioItemMeta = {
  title: 'The Pursuit by Equinox',
  dateStart: Date.parse('2018-01-21T21:27:06-05:00'),
  draft: false,
  weight: 2,
  image: './images/pursuit_sized_image.gif',
  animatedImage: './images/pursuit_sized.gif',
  showonlyimage: true,
  summary:
    'The Pursuit by Equinox is a gamified group cycling class driven by 500,000 records of data per session to display a Canne’s Lion winning visual experience. 700+ classes are hosted per month at Equinox locations across the United States.  I was the lead developer on this project.',
  links: {
    externalArticle: null,
    github: null,
    demo: null,
  },
  projectType: ProjectType.clientWork,
  role: 'Lead Developer',
  tags: [],
};
