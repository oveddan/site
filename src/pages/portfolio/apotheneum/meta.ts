import { Category, PortfolioItemMeta, ProjectType, Role, Tech } from '@/api/types';

export const meta: PortfolioItemMeta = {
  title: 'Apotheneum: Treetop Transmissions',
  dateStart: Date.parse('2025-06-01'),
  dateEnd: null,
  draft: false,
  weight: -3,
  image: './images/apoth.jpg',
  animatedImage: './images/apoth.gif',
  summary:
    'Field recordings from the Congo Basin and Amazon capture rainforests as they sound now — ecosystems being reshaped by climate change and human activity. With no visual reference, generative algorithms interpret the sounds into light inside the Apotheneum, a building-scale multi-sensory instrument with 13,280 LED nodes and a haptic bed. Deployed at Burning Man 2025 and Art Basel Miami 2025.',
  role: Role.Artist,
  projectType: ProjectType.personal,
  links: {
    demo: null,
    externalArticle: null,
    github: null,
  },
  categories: [Category.Installation, Category.Sound, Category.Performance],
  tech: [Tech.Java, Tech.Led, Tech.Hardware],
};
