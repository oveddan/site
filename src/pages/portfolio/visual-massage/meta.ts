import { Category, PortfolioItemMeta, ProjectType, Role, Tech } from '@/api/types';

export const meta: PortfolioItemMeta = {
  title: 'H3LIX - Visual Massage',
  dateStart: Date.parse('2022-01-01T22:52:10-04:00'),
  draft: false,
  animatedImage: './images/visual-massage.gif',
  image: './images/visual-massage.jpg',
  weight: -1,
  summary:
    'What happens when acquiring art changes the space it lives in? H3LIX - Visual Massage is a virtual exhibit of 300 handmade GIF art pieces mintable on Ethereum via a custom ERC721 contract. As pieces are collected, the exhibit itself transforms — door frames illuminate and windows appear on the outside of the room.',
  tech: [Tech.React, Tech.Javascript, Tech.Threejs, Tech.Solidity],
  categories: [Category.Web3Metaverse],
  role: Role.TeamLead,
  links: {
    github: null,
    demo: 'https://arium.xyz/spaces/visual-massage',
    externalArticle: null,
  },
  projectType: ProjectType.startup,
};
