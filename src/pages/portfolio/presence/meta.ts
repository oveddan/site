import { Category, PortfolioItemMeta, ProjectType, Role, Tech } from '@/api/types';

export const meta: PortfolioItemMeta = {
  title: 'Presence - Gaze Detection Version 1',
  dateStart: Date.parse('2018-01-21T16:08:45-05:00'),
  draft: false,
  weight: 2,
  image: './images/presence_image.png',
  animatedImage: './images/presence.gif',
  showonlyimage: true,
  summary:
    '"Presence" is a kinetic sculpture that uses computer vision to watch how a person stands or moves, and then changes its own shape to match the person\'s body. It was on display at the 2018 Maker Faire event.',
  projectType: ProjectType.gradSchool,
  links: {
    externalArticle: null,
    github: 'https://github.com/oveddan/presence',
    demo: null,
  },
  role: Role.Artist,
  categories: [Category.Installation, Category.MachineLearning],
  tech: [Tech.Python, /*Tech.OpenCV, */ Tech.DigitalFab, Tech.Hardware],
};
