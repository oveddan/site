import { Category, PortfolioItemMeta, ProjectType, Role, Tech } from '@/api/types';

export const meta: PortfolioItemMeta = {
  title: 'Infinity Zoetrope',
  dateStart: Date.parse('2018-12-17T10:28:56-05:00'),
  draft: false,
  weight: 3,
  image: './images/zoetrope_image.png',
  animatedImage: './images/zoetrope.gif',
  summary:
    'The infinity zoetrope is a performance that combines real life and the imagination by turning an analog form into something limitless. It was shown at the Museum of the Moving Image for a class taught by Shantell Martin. By using digital technology to capture a rotating disk at the right speed, the infinity zoetrope creates an infinite loop that appears to extend into another dimension through the use of color and transformation.',
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
