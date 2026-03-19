import { Category, PortfolioItemMeta, ProjectType, Role, Tech } from '@/api/types';

export const meta: PortfolioItemMeta = {
  title: 'Presence',
  dateStart: Date.parse('2019-01-28T22:39:13-05:00'),
  draft: false,
  image: './images/presence-makerfaire.png',
  animatedImage: './images/presence-makerfaire.gif',
  weight: 0,
  summary:
    'What does it mean for a sculpture to see you? Presence is a kinetic sculpture that uses PoseNet-powered pose estimation to perceive and mimic the viewer\'s form in real time. Shown at the 2018 Makerfaire.',
  links: {
    demo: null,
    externalArticle: null,
    github: null,
  },
  projectType: ProjectType.gradSchool,
  role: Role.Artist,
  categories: [Category.MachineLearning, Category.Installation],
  tech: [Tech.DigitalFab, Tech.Python, Tech.Tensorflowjs, Tech.TouchDesigner, Tech.Hardware],
};
