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
    'Presence is a kinetic sculpture that is controlled by a viewer’s gaze. It uses a webcam and computer vision to detect where a user is looking, and alters its shape to reflect this focal point.',
  projectType: ProjectType.gradSchool,
  links: {
    externalArticle: null,
    github: 'https://github.com/oveddan/presence',
    demo: null,
  },
  role: Role.Artist,
  categories: [Category.Installation, Category.MachineLearning],
  tech: [Tech.Python, Tech.OpenCV, Tech.DigitalFab, Tech.Hardware],
};
