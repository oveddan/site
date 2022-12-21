import { MetaWithSlug } from '@/api/portfolio';
import { HasPortfolioItemFilters, PortfolioItemMeta } from '@/api/types';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const getFilters = (projects: PortfolioItemMeta[]) => {
  const categories = new Set(projects.map(({ categories }) => categories).flat());
  const tech = new Set(projects.map(({ tech }) => tech).flat());
  // const projectType = new Set(projects.map(({ projectType }) => projectType).filter((x) => !!x) as ProjectType[]);
  // const role = new Set(projects.map(({ role }) => role).filter((x) => !!x) as Role[]);

  const filters = {
    category: Array.from(categories.values()) as string[],
    tech: Array.from(tech.values()) as string[],
  };

  return filters;
};

export type Filters = ReturnType<typeof getFilters>;

type ActiveFilters = {
  [key in keyof Filters]?: Set<string>;
};

export const useFilters = (projects: PortfolioItemMeta[]) => {
  const filters = useMemo(() => getFilters(projects), [projects]);

  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({});

  const toggleFilter = useCallback((filterType: keyof Filters, value: string) => {
    setActiveFilters((existing) => {
      if (!existing[filterType]) {
        return { ...existing, [filterType]: new Set([value]) };
      }

      const clonedSet = new Set(existing[filterType]);

      if (clonedSet.has(value)) {
        clonedSet.delete(value);
      } else {
        clonedSet.add(value);
      }

      // if result is empty, then remove from list
      if (clonedSet.size === 0) {
        const { [filterType]: _, ...rest } = existing;
        return rest;
      }

      return {
        ...existing,
        [filterType]: clonedSet,
      };
    });
  }, []);

  return {
    activeFilters,
    filters,
    toggleFilter,
  };
};

export type FilterProps = ReturnType<typeof useFilters>;

const matchesFilter = (attributes: string[], filter: Set<string> | undefined): boolean => {
  if (!filter) return true;

  return attributes.some((attribute) => filter.has(attribute));
};

const filterProjects = <T extends HasPortfolioItemFilters>(projects: T[], activeFilters: ActiveFilters) => {
  return projects.filter((project) => {
    if (!matchesFilter(project.categories, activeFilters.category)) {
      return false;
    }
    if (!matchesFilter(project.tech, activeFilters.tech)) {
      return false;
    }
    return true;
  });
};

export const useFilteredProjects = <T extends HasPortfolioItemFilters>(activeFilters: ActiveFilters, projects: T[]) => {
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    const filtered = filterProjects(projects, activeFilters);
    console.log({
      filtered,
      activeFilters,
    });
    setFilteredProjects(filtered);
  }, [projects, activeFilters]);

  return filteredProjects;
};
