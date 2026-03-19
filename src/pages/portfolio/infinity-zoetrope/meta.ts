import { Category, PortfolioItemMeta, ProjectType, Role, Tech } from '@/api/types';

export const meta: PortfolioItemMeta = {
  title: 'Infinity Zoetrope',
  dateStart: Date.parse('2018-12-17T10:28:56-05:00'),
  draft: false,
  weight: 3,
  // image: './images/zoetrope_image.png',
  animatedImage: './images/zoetrope.gif',
  summary:
    'The Infinity Zoetrope bridges analog and digital: a camera captures a rotating physical disk at a precise frame rate, creating an infinite loop that appears to extend into another dimension through color and transformation. Shown at the Museum of the Moving Image for a class taught by Shantell Martin.',
  categories: [Category.Performance],
  links: {
    demo: null,
    externalArticle: null,
    github: null,
  },
  projectType: ProjectType.gradSchool,
  role: Role.Artist,
  tech: [Tech.TouchDesigner, Tech.DigitalFab],
};
