import { ReactNode, useId, useMemo, useRef } from 'react';
import clsx from 'clsx';
import { MetaWithSlug } from '@/api/portfolio';
import { facetCounts, FilterKey, FilterProps } from '@/hooks/useFilters';

type Props = FilterProps & {
  /** Every project, unfiltered: the base for the total and for each chip's count. */
  projects: MetaWithSlug[];
  /** How many projects the current filters leave. */
  shown: number;
};

const GROUPS: { key: FilterKey; label: string }[] = [
  { key: 'category', label: 'medium' },
  { key: 'tech', label: 'tools' },
];

const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? '' : 's'}`;

const FilterRow = ({ label, children }: { label: string; children: ReactNode }) => {
  const labelId = useId();
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-[70px_minmax(0,1fr)] sm:items-start sm:gap-3">
      <span id={labelId} className="label sm:pt-[10px]">
        {label}
      </span>
      {/* Below sm the row scrolls sideways, bleeding into Container's 20px gutter, and fades out at the right edge.
          The vertical padding keeps the chips' focus outlines from being clipped by the scroll box. */}
      <div
        role="group"
        aria-labelledby={labelId}
        className={clsx(
          'flex gap-1.5 sm:flex-wrap',
          'max-sm:-mx-5 max-sm:-my-1 max-sm:overflow-x-auto max-sm:px-5 max-sm:py-1',
          'max-sm:[scrollbar-width:none] max-sm:[&::-webkit-scrollbar]:hidden',
          'max-sm:[mask-image:linear-gradient(90deg,#000_82%,transparent)]'
        )}
      >
        {children}
      </div>
    </div>
  );
};

type ChipProps = {
  value: string;
  count: number;
  selected: boolean;
  onToggle: () => void;
};

const Chip = ({ value, count, selected, onToggle }: ChipProps) => (
  <button
    type="button"
    aria-pressed={selected}
    // A chip that would show nothing is the only one that dims; a selected chip always stays clickable.
    disabled={!selected && count === 0}
    onClick={onToggle}
    className={clsx(
      'inline-flex shrink-0 items-center gap-[7px] whitespace-nowrap rounded-full border px-[11px] py-2',
      'font-mono text-[12.5px] leading-none transition-colors duration-150 motion-reduce:transition-none',
      'disabled:opacity-30',
      'focus-ring',
      selected
        ? 'border-accent bg-accent text-accent-ink'
        : 'border-line text-ink-2 enabled:hover:border-ink-3 enabled:hover:text-ink'
    )}
  >
    {value.toLowerCase()}{' '}
    <span className={clsx('tabular-nums', selected ? 'opacity-[0.65]' : 'text-ink-3')}>
      {count}
      <span className="sr-only">{count === 1 ? ' project' : ' projects'}</span>
    </span>
  </button>
);

const Filters = ({ filters, activeFilters, toggleFilter, clearFilters, projects, shown }: Props) => {
  const rootRef = useRef<HTMLDivElement>(null);

  const counts = useMemo(
    () => ({
      category: facetCounts(projects, activeFilters, 'category'),
      tech: facetCounts(projects, activeFilters, 'tech'),
    }),
    [projects, activeFilters]
  );

  const total = projects.length;
  const anyActive = Object.keys(activeFilters).length > 0;

  const handleClear = () => {
    // The button unmounts along with the filters it clears, so hand keyboard focus to the first chip that can take it.
    rootRef.current?.querySelector<HTMLButtonElement>('[role="group"] button:enabled')?.focus();
    clearFilters();
  };

  return (
    <div ref={rootRef} className="mb-10 grid gap-2.5 border-b border-line pb-[26px] pt-1.5">
      {GROUPS.map(({ key, label }) => (
        <FilterRow key={key} label={label}>
          {filters[key].map((value) => (
            <Chip
              key={value}
              value={value}
              count={counts[key].get(value) ?? 0}
              selected={!!activeFilters[key]?.has(value)}
              onToggle={() => toggleFilter(key, value)}
            />
          ))}
        </FilterRow>
      ))}
      <div className="flex min-h-[20px] items-center gap-3.5 font-mono text-[12px] leading-[1.4] text-ink-3 sm:pl-[82px]">
        <span aria-live="polite" aria-atomic="true" className="tabular-nums">
          {anyActive ? `showing ${shown} of ${total}` : plural(total, 'project')}
        </span>
        {anyActive && (
          <button
            type="button"
            onClick={handleClear}
            className="focus-ring text-accent underline underline-offset-[3px]"
          >
            clear filters
          </button>
        )}
      </div>
    </div>
  );
};

export default Filters;
