import { Category, PortfolioItemMeta, ProjectType, Role, Tech } from '@/api/types';

export const meta: PortfolioItemMeta = {
  title: 'StarPower',
  dateStart: Date.parse('2019-01-17T19:31:06-05:00'),
  draft: false,
  image: './images/starpower.png',
  animatedImage: './images/starpower.gif',
  weight: 2,
  summary:
    'StarPower is an led sculpture consisting of 12 frosted tubes placed precisely in a circle and high frame-rate addressable leds allowing for smooth animations projected onto a circle.',
  links: {
    demo: null,
    externalArticle: null,
    github: null,
  },
  projectType: ProjectType.personal,
  role: Role.Artist,
  categories: [Category.Installation],
  tech: [Tech.DigitalFab, Tech.Hardware, Tech.TouchDesigner, Tech.Led],
};
