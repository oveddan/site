import { MetaWithSlug } from '@/api/portfolio';
import { Card, CardCta, CardDescription, CardLink } from './Card';
import Image from 'next/image';
import { projectImageSrc } from '@/hooks/useProjectImageSrc';

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
            src={projectImageSrc({ slug: project.slug, fileName: project.animatedImage })}
            alt=""
            className="rounded-lg"
            unoptimized
          />
        </div>
        <h2 className="mt-6 text-base font-mono font-semibold text-zinc-800 dark:text-zinc-100">
          <CardLink href={projectLink(project)}>{project.title}</CardLink>
        </h2>
        <CardDescription>{project.summary}</CardDescription>
        <CardCta>
          {project.links.externalArticle ? (
            <>
              Read article
              <svg viewBox="0 0 12 12" fill="none" aria-hidden="true" className="ml-1 h-3 w-3 stroke-current">
                <path d="M3.5 1.5h7v7M10.5 1.5 1.5 10.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </>
          ) : (
            'View project'
          )}
        </CardCta>
      </Card>
    ))}
  </ul>
);
