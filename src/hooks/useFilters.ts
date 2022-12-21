import { Category, HasPortfolioItemFilters, PortfolioItemMeta, Tech } from '@/api/types';
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

type ActiveFilter = { filterType: keyof Filters; value: string } | undefined;

export const useFilters = (projects: PortfolioItemMeta[]) => {
  const filters = useMemo(() => getFilters(projects), [projects]);

  const [activeFilter, setActiveFilter] = useState<ActiveFilter>(undefined);

  const toggleFilter = useCallback((filterType: keyof Filters, value: string) => {
    setActiveFilter((existing) => {
      if (existing) {
        if (existing.filterType === filterType && existing.value === value) {
          return undefined;
        }
      }
      return {
        filterType,
        value,
      };
    });
  }, []);

  return {
    activeFilter,
    filters,
    toggleFilter,
  };
};

export type FilterProps = ReturnType<typeof useFilters>;

const filterProjects = <T extends HasPortfolioItemFilters>(projects: T[], activeFilter: ActiveFilter) => {
  if (!activeFilter) return projects;

  return projects.filter((project) => {
    if (activeFilter.filterType === 'category') {
      return project.categories.includes(activeFilter.value as Category);
    }
    if (activeFilter.filterType === 'tech') {
      return project.tech.includes(activeFilter.value as Tech);
    }
  });
};

export const useFilteredProjects = <T extends HasPortfolioItemFilters>(activeFilter: ActiveFilter, projects: T[]) => {
  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    const filtered = filterProjects(projects, activeFilter);
    console.log({
      filtered,
      activeFilters: activeFilter,
    });
    setFilteredProjects(filtered);
  }, [projects, activeFilter]);

  return filteredProjects;
};
