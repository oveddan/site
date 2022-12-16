export enum ProjectType {
  startup = 'startup',
  hackathonProject = 'hackathon project',
  personal = 'personal',
  teaching = 'teaching',
  gradSchool = 'grad school project',
  clientWork = 'client work',
  art = 'art',
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
  tags: string[];
  links: {
    github: string | null;
    demo: string | null;
    externalArticle: string | null;
  };
  role: string;
  projectType: ProjectType | null;
};
