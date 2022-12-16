import { Category, PortfolioItemMeta, ProjectType, Role, Tech } from '@/api/types';

export const meta: PortfolioItemMeta = {
  title: 'PoseNet in Tensorflow.js',
  dateStart: Date.parse('2018-05-28T15:15:18-04:00'),
  draft: false,
  weight: -2,
  image: './images/posenet-multipose-resized.png',
  animatedImage: './images/posenet-multipose-resized.gif',
  showonlyimage: true,
  summary:
    'PoseNet in a machine learning model which allows for real-time human pose estimation with any webcam.  In collaboration with the Google Creative Lab, I open-sourced an easy to use Tensorflow.js version of the model.',
  projectType: ProjectType.clientWork,
  links: {
    externalArticle:
      'https://medium.com/tensorflow/real-time-human-pose-estimation-in-the-browser-with-tensorflow-js-7dd0bc881cd5',
    github: 'https://github.com/tensorflow/tfjs-models/tree/7eec5628f086b8e61dd65f0cfde511a1db8ac103/posenet',
    demo: 'https://storage.googleapis.com/tfjs-models/demos/posenet/camera.html',
  },
  role: Role.MlEngineer,
  categories: [Category.MachineLearning],
  tech: [Tech.Javascript, Tech.Tensorflowjs],
};
