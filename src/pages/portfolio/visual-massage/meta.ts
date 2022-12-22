import { Category, PortfolioItemMeta, ProjectType, Role, Tech } from '@/api/types';

export const meta: PortfolioItemMeta = {
  title: 'H3LIX - Visual Massage',
  dateStart: Date.parse('2022-01-01T22:52:10-04:00'),
  draft: false,
  animatedImage: './images/visual-massage.gif',
  image: './images/visual-massage.jpg',
  weight: -1,
  summary:
    'A virtual exhibit featuring 300 handmade GIF art pieces that can be minted onto the Ethereum blockchain using a custom ERC721 contract. The exhibit space changes in response to pieces being acquired, with the door frame illuminating and a white window appearing on the outside of the room.',
  tech: [Tech.React, Tech.Javascript, Tech.Threejs, Tech.Solidity],
  categories: [Category.Metaverse, Category.Web3],
  role: Role.TeamLead,
  links: {
    github: null,
    demo: 'https://arium.xyz/spaces/visual-massage',
    externalArticle: null,
  },
  projectType: ProjectType.startup,
};
