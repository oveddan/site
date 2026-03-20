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
  Web3Metaverse = 'web3 / metaverse',
  Performance = 'performance',
  Installation = 'installation',
}

export enum Tech {
  React = 'React',
  Solidity = 'Solidity',
  Javascript = 'Javascript',
  Tensorflow = 'TensorFlow',
  Python = 'Python',
  Threejs = 'Three.js',
  PhysicalComputing = 'Physical Computing',
  TouchDesigner = 'TouchDesigner',
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
  image?: string;
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
