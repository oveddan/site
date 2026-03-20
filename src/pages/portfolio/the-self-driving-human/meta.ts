import { Category, PortfolioItemMeta, ProjectType, Role, Tech } from '@/api/types';

export const meta: PortfolioItemMeta = {
  title: 'The Self-Driving Human',
  dateStart: Date.parse('2019-05-20T22:52:10-04:00'),
  draft: false,
  animatedImage: './images/self_driving_human.gif',
  image: './images/self-driving-human-image.jpg',
  weight: -2,
  summary:
    'What happens when we cede our everyday decisions to a machine? The Self-Driving Human is a wearable device and performance where a portable intelligent agent makes real-world decisions for its human participants. Built as my masters thesis at ITP.',
  links: {
    demo: null,
    externalArticle: null,
    github: null,
  },
  projectType: ProjectType.gradSchool,
  role: Role.Artist,
  categories: [Category.Performance, Category.MachineLearning],
  tech: [Tech.Python, Tech.PhysicalComputing, Tech.Tensorflow],
};
