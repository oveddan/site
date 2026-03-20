import { Category, PortfolioItemMeta, ProjectType, Role, Tech } from '@/api/types';

export const meta: PortfolioItemMeta = {
  title: 'w@y_p01nt',
  dateStart: Date.parse('2022-07-01T22:52:10-04:00'),
  // dateEnd: Date.parse('2022-07-30T22:52:10-04:00'),
  draft: false,
  animatedImage: './images/waypoint.gif',
  image: './images/waypoint-image.jpg',
  weight: -2,
  summary:
    'What if virtual worlds could be truly owned and connected by the communities that build them? w@y_p01nt is an open-source protocol that lets 3D artists and communities create decentralized networks of interoperable virtual worlds. Selected as a finalist at EthGlobal HackFS.',
  tech: [Tech.React, Tech.Javascript, Tech.Threejs, Tech.Solidity /*Tech.Firebase, Tech.WebRTC*/],
  categories: [Category.Web3Metaverse],
  role: Role.TeamLead,
  links: {
    github: 'https://github.com/landaxr/waypoint',
    demo: 'https://waypoint.on.fleek.co/',
    externalArticle: null,
  },
  projectType: ProjectType.hackathonProject,
};
