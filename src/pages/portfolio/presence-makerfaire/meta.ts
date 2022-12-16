import { PortfolioItemMeta, ProjectType } from '@/api/types';

export const meta: PortfolioItemMeta = {
  title: 'Presence',
  date: Date.parse('2019-01-28T22:39:13-05:00'),
  draft: false,
  image: './images/presence-makerfaire.png',
  animatedImage: './images/presence-makerfaire.gif',
  weight: 0,
  summary:
    'Presence is a kinetic scultpure that use pose estimation powered by PoseNet to perceive and mimic the form of the viewer.  It was shown at the 2018 Makerfaire.',
  links: {
    demo: null,
    externalArticle: null,
    github: null,
  },
  projectType: ProjectType.gradSchool,
  role: 'Creator',
  tags: ['computer vision'],
};
