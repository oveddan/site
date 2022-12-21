import { useCallback, useMemo, useState } from 'react';
import clsx from 'clsx';
import { PortfolioItemMeta } from '@/api/types';
import { FilterProps, Filters } from '@/hooks/useFilters';

const FilterChipComponent = ({
  chip,
  toggle,
  selected,
}: {
  chip: FilterChip;
  toggle: FilterProps['toggleFilter'];
  selected: boolean;
}) => {
  return (
    <button
      className={clsx(
        'inline-flex items-center px-3 text-sm font-medium m-1 py-1 rounded-lg border border-solid border-black dark:text-white dark:border-white',
        {
          'bg-orange-500': selected,
        }
      )}
      onClick={() => toggle(chip.filterType, chip.value)}
    >
      {chip.value.toLowerCase()}
    </button>
  );
};

type FilterChip = {
  filterType: keyof Filters;
  value: string;
};

const getFilterChips = (filters: FilterProps['filters']): FilterChip[] => {
  const chips = Object.entries(filters).flatMap(([key, values]) => {
    return values.map((value): FilterChip => ({ filterType: key as keyof Filters, value }));
  });

  return chips;
};

const Filters = ({ filters, activeFilter, toggleFilter }: FilterProps) => {
  const filterChips = useMemo(() => getFilterChips(filters), [filters]);

  return (
    <div className="hidden md:block">
      <div className="my-16">
        {filterChips.map((chip) => {
          const key = `${chip.filterType}-${chip.value}`;
          return (
            <FilterChipComponent
              key={key}
              chip={chip}
              toggle={toggleFilter}
              selected={activeFilter?.filterType === chip.filterType && activeFilter.value === chip.value}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Filters;
