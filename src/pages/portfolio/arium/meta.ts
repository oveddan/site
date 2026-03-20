import { Category, PortfolioItemMeta, ProjectType, Role, Tech } from '@/api/types';

export const meta: PortfolioItemMeta = {
  title: 'Arium',
  dateStart: Date.parse('2020-09-01T22:52:10-04:00'),
  dateEnd: Date.parse('2022-06-01T22:52:10-04:00'),
  draft: false,
  animatedImage: './images/arium-highlights.gif',
  image: './images/arium-image.jpg',
  weight: 2,
  summary:
    'Flat video calls strip away the serendipity of being in a room together — spatial presence changes how people connect. Arium is a browser-based platform I co-founded where artists and creators build 3D virtual worlds with real-time spatial video and audio chat.',
  tech: [Tech.React, Tech.Javascript, Tech.Threejs /*Tech.Firebase, Tech.WebRTC*/],
  categories: [Category.Web3Metaverse],
  role: Role.CTOCoFounder,
  links: {
    github: 'https://github.com/arium-digital/arium-builder',
    demo: 'https://arium.xyz/spaces/portal',
    externalArticle: null,
  },
  projectType: ProjectType.startup,
};
