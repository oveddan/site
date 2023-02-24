import { MetaWithSlug } from '@/api/portfolio';
import { Card, CardDescription, CardLink } from './Card';
import Image from 'next/image';

export const PortfolioCards = ({
  filteredProjects,
  projectLink,
}: {
  filteredProjects: MetaWithSlug[];
  projectLink: (meta: MetaWithSlug) => string;
}) => (
  <ul role="list" className="grid grid-cols-1 gap-x-12 gap-y-16 m:grid-cols-2 lg:grid-cols-3">
    {filteredProjects.map((project) => (
      <Card as="li" key={project.title}>
        <div className="relative z-10 flex items-center justify-center rounded-lg bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
          <Image
            src={require(`@/pages/portfolio/${project.slug}/${project.animatedImage.replace('./', '')}`)}
            alt=""
            className="rounded-lg"
            unoptimized
          />
        </div>
        <h2 className="mt-6 text-base font-mono font-semibold text-zinc-800 dark:text-zinc-100">
          <CardLink href={projectLink(project)}>{project.title}</CardLink>
        </h2>
        <CardDescription>{project.summary}</CardDescription>
        {/* {project.links && (
                <p className="relative z-50 text-xl mt-6 flex transition dark:text-zinc-200">
                  {project.links.github && (
                    <a href={project.links.github} className="relative z-50">
                      <BsGithub />
                    </a>
                  )}
                </p>
              )} */}
      </Card>
    ))}
  </ul>
);
