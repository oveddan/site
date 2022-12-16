export enum ProjectType {
  startup = 'startup',
  hackathonProject = 'hackathon project',
  personal = 'personal',
  teaching = 'teaching',
  gradSchool = 'grad school',
  clientWork = 'client work',
}
export enum Category {
  MachineLearning = 'machine learning',
  Web3 = 'web3',
  Performance = 'performance',
  Sound = 'sound',
  Metaverse = 'metaverse',
  Installation = 'installation',
}

export enum Tech {
  React = 'React',
  Javascript = 'Javascript',
  Tensorflow = 'Tensorflow',
  Tensorflowjs = 'TensorflowJs',
  Python = 'Python',
  Threejs = 'Three.js',
  DigitalFab = 'Digital Fabrication',
  Hardware = 'Hardware',
  Firebase = 'Firebase',
  WebRTC = 'WebRTC',
  TouchDesigner = 'TouchDesigner',
  Led = 'led',
  OpenCV = 'OpenCV',
  NodeJS = 'Node.js',
}

export enum Role {
  MlEngineer = 'Machine Learning Engineer',
  TeamLead = 'Team Lead',
  Builder = 'Builder',
  CTOCoFounder = 'CTO & Co-Founder',
  Artist = 'Artist',
}

export type PortfolioItemMeta = {
  title: string;
  dateStart: number;
  dateEnd?: number | null;
  draft?: boolean;
  weight: number;
  image: string;
  animatedImage: string;
  showonlyimage?: boolean;
  summary: string;
  categories: Category[];
  tech: Tech[];
  links: {
    github: string | null;
    demo: string | null;
    externalArticle: string | null;
  };
  role: Role;
  projectType: ProjectType | null;
};
