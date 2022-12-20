import { useCallback, useMemo, useState } from 'react';
import clsx from 'clsx';
import { PortfolioItemMeta } from '@/api/types';
import { FilterProps, Filters } from '@/hooks/useFilters';

const FilterChipComponent = ({
  chip,
  toggle,
  anySelected,
  selected,
}: {
  chip: FilterChip;
  toggle: FilterProps['toggleFilter'];
  anySelected: boolean;
  selected: boolean;
}) => {
  const notSelected = !selected && anySelected;
  return (
    <button
      className={clsx(
        'inline-flex items-center px-3 text-sm font-medium m-1 py-1 rounded-lg border border-solid border-black',
        { 'bg-orange-500': selected, 'bg-gray-200 text-gray-500': notSelected }
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

const Filters = ({ filters, activeFilters, toggleFilter }: FilterProps) => {
  const filterChips = useMemo(() => getFilterChips(filters), [filters]);

  const filterKeys = Object.keys(activeFilters);

  const anySelected = filterKeys.length > 0;

  return (
    <div className="my-4">
      {filterChips.map((chip) => {
        const key = `${chip.filterType}-${chip.value}`;
        return (
          <FilterChipComponent
            key={key}
            chip={chip}
            toggle={toggleFilter}
            anySelected={anySelected}
            selected={!!activeFilters[chip.filterType]?.has(chip.value)}
          />
        );
      })}
    </div>
  );
};

export default Filters;
