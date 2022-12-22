export enum ProjectType {
  startup = 'startup',
  hackathonProject = 'hackathon project',
  personal = 'personal project',
  teaching = 'teaching',
  gradSchool = 'Grad school project',
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
  Solidity = 'Solidity',
  Javascript = 'Javascript',
  Tensorflow = 'Tensorflow',
  Tensorflowjs = 'TensorflowJs',
  Python = 'Python',
  Threejs = 'Three.js',
  DigitalFab = 'Fabrication',
  Hardware = 'Hardware',
  // Firebase = 'Firebase',
  // WebRTC = 'WebRTC',
  TouchDesigner = 'TouchDesigner',
  Led = 'LED',
  // OpenCV = 'OpenCV',
  // NodeJS = 'Node.js',
}

export enum Role {
  MlEngineer = 'Machine Learning Engineer',
  TeamLead = 'Team Lead',
  Builder = 'Builder',
  CTOCoFounder = 'CTO & Co-Founder',
  Artist = 'Artist',
}

export type HasPortfolioItemFilters = {
  categories: Category[];
  tech: Tech[];
};

export type PortfolioItemMeta = HasPortfolioItemFilters & {
  title: string;
  dateStart: number;
  dateEnd?: number | null;
  draft?: boolean;
  weight: number;
  image: string;
  animatedImage: string;
  showonlyimage?: boolean;
  summary: string;
  links: {
    github: string | null;
    demo: string | null;
    externalArticle: string | null;
  };
  role: Role;
  projectType: ProjectType | null;
};
