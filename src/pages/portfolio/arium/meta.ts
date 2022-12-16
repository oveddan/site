import { Category, PortfolioItemMeta, ProjectType, Role, Tech } from '@/api/types';

export const meta: PortfolioItemMeta = {
  title: 'Arium',
  dateStart: Date.parse('2020-09-01T22:52:10-04:00'),
  dateEnd: Date.parse('2022-06-01T22:52:10-04:00'),
  draft: false,
  animatedImage: './images/arium-highlights.gif',
  image: './images/arium-image.jpg',
  weight: -2,
  summary:
    'Arium is a browser-based, real-time collaborative platform for NFT artists and creators to build 3D virtual worlds. It features spatial video and audio chat, providing a connected and serendipitous social experience for users.',
  tech: [Tech.React, Tech.Javascript, Tech.Threejs, Tech.Firebase, Tech.WebRTC],
  categories: [Category.Metaverse, Category.Web3],
  role: Role.CTOCoFounder,
  links: {
    github: 'https://github.com/arium-digital/arium-builder',
    demo: 'https://arium.xyz/spaces/portal',
    externalArticle: null,
  },
  projectType: ProjectType.startup,
};
