import { Category, PortfolioItemMeta, ProjectType, Role, Tech } from '@/api/types';

export const meta: PortfolioItemMeta = {
  title: 'NIME: The Liquisynth',
  dateStart: Date.parse('2018-12-12T13:43:46-05:00'),
  draft: false,
  image: './images/nime.png',
  animatedImage: './images/nime_performance.gif',
  weight: -1,
  summary:
    'The Liquisynth is a musical instrument and live performance that modulates sounds in response to the characteristics of liquids as they mix, as a combination of randomness and control.',
  role: Role.Artist,
  projectType: ProjectType.gradSchool,
  links: {
    demo: null,
    externalArticle: null,
    github: null,
  },
  categories: [Category.Performance, Category.Sound],
  tech: [Tech.TouchDesigner, Tech.DigitalFab, Tech.Hardware],
};
