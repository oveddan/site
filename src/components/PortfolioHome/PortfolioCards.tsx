import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projectYears } from '@/api/dates';
import { MetaWithSlug } from '@/api/portfolio';
import { projectImageSrc } from '@/hooks/useProjectImageSrc';

// The whole card is one link: the title's ::after stretches over the card (the li is its containing block,
// so neither the h2 nor the a may be positioned) and carries the focus ring. bottom-11 keeps it off the
// summary's bottom padding, which is the row spacing.
const linkClassName =
  "after:absolute after:-left-3 after:-right-3 after:-top-3 after:bottom-11 after:rounded-xl after:content-[''] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-accent";

function ProjectTitleLink({ project }: { project: MetaWithSlug }) {
  // Out of flow (static position, right after the title) so the hidden arrow can never wrap a line.
  const arrow = (
    <span
      aria-hidden="true"
      className="absolute ml-1.5 text-accent opacity-0 transition-[opacity,transform] duration-[250ms] group-focus-within:translate-x-0 group-focus-within:opacity-100 group-hover:translate-x-0 group-hover:opacity-100 motion-safe:-translate-x-1"
    >
      →
    </span>
  );
  const { externalArticle } = project.links;

  if (!externalArticle) {
    return (
      <Link href={`/portfolio/${project.slug}`} className={linkClassName}>
        {project.title}
        {arrow}
      </Link>
    );
  }

  // A relative externalArticle (e.g. /itp-blog/…) is proxied by Netlify on this domain, so it opens in place,
  // with a full page load because Next doesn't know the route.
  if (!externalArticle.startsWith('http')) {
    return (
      <a href={externalArticle} className={linkClassName}>
        {project.title}
        {arrow}
      </a>
    );
  }

  return (
    <a href={externalArticle} target="_blank" rel="noopener noreferrer" className={linkClassName}>
      {project.title}
      &nbsp;
      <span aria-hidden="true" className="text-ink-3">
        ↗
      </span>
      <span className="sr-only"> (opens external article)</span>
      {arrow}
    </a>
  );
}

function ProjectCard({ project }: { project: MetaWithSlug }) {
  // The light spill is a second, blurred copy of the GIF. It is mounted on the first hover or focus rather
  // than up front so the homepage doesn't decode every GIF twice. Its wrapper is always rendered and owns the
  // opacity transition, so even that first hover fades in.
  const [spill, setSpill] = useState(false);
  const src = projectImageSrc({ slug: project.slug, fileName: project.animatedImage });
  const eyebrow = [projectYears(project), project.categories.join(', ')].filter(Boolean).join(' · ');

  return (
    <li
      className="group relative isolate row-span-4 grid grid-rows-subgrid"
      style={{ viewTransitionName: `card-${project.slug}` }}
      onPointerEnter={(event) => {
        // A finger landing on a card while scrolling isn't hover intent.
        if (event.pointerType !== 'touch') setSpill(true);
      }}
      onFocus={() => setSpill(true)}
    >
      <div className="relative">
        {/* -z-10 paints behind the frame and the text but stays inside the li's stacking context (isolate). */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-[5%] top-[8%] -z-10 h-[96%] w-[90%] opacity-0 transition-opacity duration-500 group-focus-within:opacity-[var(--glow-opacity)] group-hover:opacity-[var(--glow-opacity)]"
        >
          {spill && (
            <Image src={src} alt="" className="h-full w-full object-cover blur-[34px] saturate-150" unoptimized />
          )}
        </div>
        {/* isolate keeps Safari clipping the zoomed (composited) GIF to the rounded corners. */}
        <div className="isolate aspect-[360/277] overflow-hidden rounded-md bg-surface">
          <Image
            src={src}
            alt=""
            className="h-full w-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-safe:group-focus-within:scale-[1.035] motion-safe:group-hover:scale-[1.035]"
            unoptimized
          />
        </div>
      </div>
      <p className="pt-[18px] font-mono text-[11px] uppercase leading-[1.4] tracking-[0.07em] text-ink-3">{eyebrow}</p>
      <h2 className="text-balance pt-1.5 font-mono text-base font-medium leading-[1.35] tracking-[-0.01em] text-ink">
        <ProjectTitleLink project={project} />
      </h2>
      <p className="text-pretty pb-16 pt-2 text-[14.5px] leading-[1.62] text-ink-2">{project.summary}</p>
    </li>
  );
}

export const PortfolioCards = ({ projects }: { projects: MetaWithSlug[] }) => (
  <ul role="list" className="grid grid-cols-1 gap-x-9 gap-y-0 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
    {projects.map((project) => (
      <ProjectCard key={project.slug} project={project} />
    ))}
  </ul>
);
