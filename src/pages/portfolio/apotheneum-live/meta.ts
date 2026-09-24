import { Category, PortfolioItemMeta, ProjectType, Role, Tech } from '@/api/types';

export const meta: PortfolioItemMeta = {
  title: 'Apotheneum: Live',
  dateStart: Date.parse('2026-05-19'),
  dateEnd: Date.parse('2026-09-05'),
  // Draft until the markdown is done and the clips are on R2.
  draft: false,
  weight: -4,
  image: './images/og.jpg',
  animatedImage: './images/treetop-live.gif',
  summary:
    'Two live nights of light on the Apotheneum at Burning Man 2026, with Robot Heart and with FOSS. To make it possible I built two open-source tools, chromatik-mcp and mft-api, so I can express an idea and have it quickly implemented in collaboration with agents while I continue composing.',
  role: Role.Artist,
  projectType: ProjectType.personal,
  links: {
    demo: null,
    externalArticle: null,
    github: 'https://github.com/oveddan/chromatik-mcp',
  },
  categories: [Category.Installation, Category.Performance],
  tech: [Tech.Java, Tech.Led, Tech.Hardware],
};
