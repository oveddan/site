import { Category, PortfolioItemMeta, ProjectType, Role, Tech } from '@/api/types';

export const meta: PortfolioItemMeta = {
  title: 'Spatial Sound and Light Stream',
  dateStart: Date.parse('2020-08-08T22:52:10-04:00'),
  draft: false,
  animatedImage: './images/sound-move-space.gif',
  image: './images/sound-move-space.jpg',
  weight: -1,
  summary:
    'Spatial Sound and Light Stream is a performance that combines multi-channel sound and 3D visual elements in a live stream. The sound is linked to balls of light that move around in real-time, controlled by the performer and modulated by the sound. This creates an immersive, visual, and binaural listening experience. I performed it in a virtual environment called Yorb as part of the ITP residents show.',
  tech: [Tech.Javascript, Tech.Threejs, Tech.TouchDesigner],
  categories: [Category.Metaverse, Category.Performance, Category.Sound],
  role: Role.Builder,
  links: {
    github: null,
    demo: 'https://sound-move.space',
    externalArticle: null,
  },
  projectType: ProjectType.personal,
};
