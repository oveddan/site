import { Category, PortfolioItemMeta, ProjectType, Role, Tech } from '@/api/types';

export const meta: PortfolioItemMeta = {
  title: 'w@y_p01nt',
  dateStart: Date.parse('2022-07-01T22:52:10-04:00'),
  dateEnd: Date.parse('2022-07-30T22:52:10-04:00'),
  draft: false,
  animatedImage: './images/waypoint.gif',
  image: './images/waypoint-image.jpg',
  weight: -2,
  summary:
    'Built for the EthGlobal HackFS online hackathon, and selected to be a finalist, w@y_p01nt is an open-source application and protocol that lets 3d artists and online communities build decentralized networks of ownable and interoperable virtual worlds',
  tech: [Tech.React, Tech.Javascript, Tech.Threejs, Tech.Solidity /*Tech.Firebase, Tech.WebRTC*/],
  categories: [Category.Metaverse, Category.Web3],
  role: Role.TeamLead,
  links: {
    github: 'https://github.com/landaxr/waypoint',
    demo: 'https://waypoint.on.fleek.co/',
    externalArticle: null,
  },
  projectType: ProjectType.hackathonProject,
};
