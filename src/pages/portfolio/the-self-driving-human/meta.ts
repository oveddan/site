import { Category, PortfolioItemMeta, ProjectType, Role, Tech } from '@/api/types';

export const meta: PortfolioItemMeta = {
  title: 'The Self-Driving Human',
  dateStart: Date.parse('2019-05-20T22:52:10-04:00'),
  draft: false,
  animatedImage: './images/self_driving_human.gif',
  image: './images/self-driving-human-image.jpg',
  weight: 1,
  summary:
    'The self-driving human is a device and performance where an intelligent portable agent makes decisions for participants in the real world. It is my masters thesis at ITP.',
  links: {
    demo: null,
    externalArticle: null,
    github: null,
  },
  projectType: ProjectType.gradSchool,
  role: Role.Artist,
  categories: [Category.Performance, Category.MachineLearning],
  tech: [Tech.Python, Tech.DigitalFab, Tech.Hardware, /*, Tech.OpenCV,*/ Tech.Python, Tech.Tensorflow],
};
