import { Category, PortfolioItemMeta, ProjectType, Role, Tech } from '@/api/types';

export const meta: PortfolioItemMeta = {
  title: '3D Pose Estimation for Athletes',
  dateStart: Date.parse('2020-01-01T15:15:18-04:00'),
  draft: false,
  weight: 3,
  image: './images/3d-pose.webp',
  animatedImage: './images/3d-pose.gif',
  showonlyimage: true,
  summary:
    'I worked with the New York Times R&D team to develop algorithms for estimating 3D poses using computer vision at sporting events, utilizing multiple cameras and camera calibration techniques. This technology allowed for the creation of new methods of storytelling using data of athletic motion in sports journalism.',
  projectType: ProjectType.clientWork,
  links: {
    externalArticle: 'https://rd.nytimes.com/projects/estimating-3d-poses-of-athletes-at-live-sporting-events',
    github: null,
    demo: null,
  },
  role: Role.MlEngineer,
  categories: [Category.MachineLearning],
  tech: [Tech.Javascript, Tech.Python, Tech.Tensorflow],
};
