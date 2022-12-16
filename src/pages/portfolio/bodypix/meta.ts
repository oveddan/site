import { PortfolioItemMeta, ProjectType } from '@/api/types';

export const meta: PortfolioItemMeta = {
  title: 'BodyPix in Tensorflow.js',
  date: Date.parse('2018-05-28T15:15:18-04:00'),
  draft: false,
  weight: 2,
  image: './images/bodypix.png',
  animatedImage: './images/bodypix.gif',
  showonlyimage: true,
  summary:
    'BodyPix in an open-source machine learning model which allows for person and body-part segmentation. In collaboration with researchers at Google I open-sourced a Tensorflow.js version of the model.',
  links: {
    externalArticle:
      'https://medium.com/tensorflow/introducing-bodypix-real-time-person-segmentation-in-the-browser-with-tensorflow-js-f1948126c2a0',
    github: 'https://github.com/tensorflow/tfjs-models/tree/196152783e8e7786e3f09182ca48153fad3b6b52/body-pix',
    demo: 'https://storage.googleapis.com/tfjs-models/demos/body-pix/index.html',
  },
  projectType: ProjectType.clientWork,
  role: 'Computer Vision Engineer',
  tags: ['computer vision', 'tensorflow', 'open source'],
};
