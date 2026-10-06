import { Category, PortfolioItemMeta, ProjectType, Role, Tech } from '@/api/types';

export const meta: PortfolioItemMeta = {
  title: 'Estoa',
  definition: 'estoa (n.): slack water; the moment the tide stops, between flowing in and flowing out.',
  dateStart: Date.parse('2026-09-25'),
  dateEnd: Date.parse('2026-10-06'),
  draft: false,
  // First on the homepage: the gallery label's QR code points here.
  weight: -5,
  image: './images/og.jpg',
  animatedImage: './images/estoa.gif',
  // The artist's wall text, word for word. Keep it as settled.
  summary: "Estoa is endless, like a social media feed, but it only gives you more when you're still.",
  role: Role.Artist,
  projectType: ProjectType.personal,
  links: {
    demo: null,
    externalArticle: null,
    // The source repo stays private until its history is scrubbed.
    github: null,
  },
  categories: [Category.Installation],
  tech: [Tech.Led, Tech.Hardware, Tech.DigitalFab],
};
