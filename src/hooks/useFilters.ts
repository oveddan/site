import { HasPortfolioItemFilters } from '@/api/types';
import { NextRouter, useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

type Field = keyof HasPortfolioItemFilters;

/** Distinct values of `field` → how many projects have each. */
const countValues = (projects: HasPortfolioItemFilters[], field: Field) => {
  const counts = new Map<string, number>();
  projects.forEach((project) => {
    const values: readonly string[] = project[field];
    values.forEach((value, i) => {
      if (values.indexOf(value) === i) counts.set(value, (counts.get(value) ?? 0) + 1);
    });
  });
  return counts;
};

/**
 * Plain UTF-16 code-unit order. `localeCompare` follows the runtime's default locale, so the build and a visitor's
 * browser could order a tie differently (Welsh sorts "th" after "to") and fail hydration; this is the same everywhere.
 */
const byCodeUnit = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);

/** Every value of `field`, most-used first, ties alphabetical by the lowercased label the chip shows. */
const orderedValues = (projects: HasPortfolioItemFilters[], field: Field) => {
  const counts = countValues(projects, field);
  return Array.from(counts.keys()).sort(
    (a, b) =>
      (counts.get(b) ?? 0) - (counts.get(a) ?? 0) || byCodeUnit(a.toLowerCase(), b.toLowerCase()) || byCodeUnit(a, b)
  );
};

export const getFilters = (projects: HasPortfolioItemFilters[]) => ({
  category: orderedValues(projects, 'categories'),
  tech: orderedValues(projects, 'tech'),
});

export type Filters = ReturnType<typeof getFilters>;
export type FilterKey = keyof Filters;

export type ActiveFilters = {
  [key in FilterKey]?: Set<string>;
};

/** The project field each filter group reads. */
export const FILTER_FIELDS: Record<FilterKey, Field> = { category: 'categories', tech: 'tech' };
const FILTER_KEYS = Object.keys(FILTER_FIELDS) as FilterKey[];

/**
 * OR within a group, AND across groups. `skip` leaves one group out, which is what a faceted count needs: how
 * many projects a chip would show given everything else that is selected.
 */
export const matchesActiveFilters = (
  project: HasPortfolioItemFilters,
  activeFilters: ActiveFilters,
  skip?: FilterKey
) =>
  FILTER_KEYS.every((key) => {
    const active = activeFilters[key];
    if (key === skip || !active || active.size === 0) return true;
    const values: readonly string[] = project[FILTER_FIELDS[key]];
    return values.some((value) => active.has(value));
  });

/** For each value of group `key`: the projects that match every other group's active filters and include it. */
export const facetCounts = (projects: HasPortfolioItemFilters[], activeFilters: ActiveFilters, key: FilterKey) =>
  countValues(
    projects.filter((project) => matchesActiveFilters(project, activeFilters, key)),
    FILTER_FIELDS[key]
  );

const toggled = (existing: ActiveFilters, filterType: FilterKey, value: string): ActiveFilters => {
  const values = new Set(existing[filterType]);
  if (values.has(value)) {
    values.delete(value);
  } else {
    values.add(value);
  }

  if (values.size === 0) {
    const { [filterType]: _, ...rest } = existing;
    return rest;
  }
  return { ...existing, [filterType]: values };
};

// ---------- URL state: ?medium=installation,performance&tools=led ----------

type Query = NextRouter['query'];

const QUERY_PARAMS: Record<FilterKey, string> = { category: 'medium', tech: 'tools' };
const OWN_PARAMS = FILTER_KEYS.map((key) => QUERY_PARAMS[key]);

/** Maps each param's comma-separated, lowercased values back to the real ones; unknown values are dropped. */
const readQuery = (query: Query, filters: Filters): ActiveFilters => {
  const active: ActiveFilters = {};
  FILTER_KEYS.forEach((key) => {
    const known = new Map(filters[key].map((value): [string, string] => [value.toLowerCase(), value]));
    const selected = new Set<string>();
    ([] as string[]).concat(query[QUERY_PARAMS[key]] ?? []).forEach((param) =>
      param.split(',').forEach((part) => {
        const value = known.get(part.trim().toLowerCase());
        if (value) selected.add(value);
      })
    );
    if (selected.size > 0) active[key] = selected;
  });
  return active;
};

/** The filter params for a selection, in chip order; a group with nothing selected is omitted. */
const filterParams = (activeFilters: ActiveFilters, filters: Filters) => {
  const params: Record<string, string> = {};
  FILTER_KEYS.forEach((key) => {
    const active = activeFilters[key];
    const values = active ? filters[key].filter((value) => active.has(value)) : [];
    if (values.length > 0) params[QUERY_PARAMS[key]] = values.map((value) => value.toLowerCase()).join(',');
  });
  return params;
};

/**
 * Other params (utm tags and the like) are kept. Built as a string rather than handed to Next as a `query` object,
 * because Next serializes that through URLSearchParams, which writes each comma as `%2C`; a literal comma is legal in
 * a query and decodes identically, and it keeps a shared link readable.
 */
const toSearch = (query: Query, params: Record<string, string>) => {
  const search = new URLSearchParams();
  Object.keys(query).forEach((name) => {
    if (OWN_PARAMS.indexOf(name) !== -1) return;
    ([] as string[]).concat(query[name] ?? []).forEach((value) => search.append(name, value));
  });
  OWN_PARAMS.forEach((name) => {
    if (params[name]) search.set(name, params[name]);
  });
  const encoded = search.toString().replace(/%2C/gi, ',');
  return encoded ? `?${encoded}` : '';
};

/** Just the filter part of the query a selection maps to, e.g. `?medium=installation`: equal means the same filters. */
const filterSearch = (activeFilters: ActiveFilters, filters: Filters) =>
  toSearch({}, filterParams(activeFilters, filters));

// ---------- View Transitions ----------

// TypeScript 5.0's lib.dom predates the View Transitions API, so this declares only the parts used here.
type MaybeViewTransitions = { startViewTransition?: (update: () => void) => unknown };
type TransitionPromises = {
  ready?: Promise<unknown>;
  finished?: Promise<unknown>;
  updateCallbackDone?: Promise<unknown>;
};

const ignore = () => {};

/**
 * Runs a state update inside a view transition, so the grid animates between filter states. flushSync makes React
 * commit before the browser captures the new state. Without the API, or with reduced motion, it just updates.
 */
const withViewTransition = (update: () => void) => {
  const doc = document as Document & MaybeViewTransitions;
  if (typeof doc.startViewTransition !== 'function' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    update();
    return;
  }
  const transition = doc.startViewTransition(() => flushSync(update)) as TransitionPromises | undefined;
  // A transition that is skipped (another chip clicked mid-animation) or can't start (a hidden tab) rejects these
  // promises with an AbortError or InvalidStateError. The update still runs, so there is nothing to handle; don't let
  // them log as uncaught.
  transition?.ready?.catch(ignore);
  transition?.finished?.catch(ignore);
  transition?.updateCallbackDone?.catch(ignore);
};

/** Removes the oldest occurrence of `search`, if any. */
const removeFirst = (list: string[], search: string) => {
  const index = list.indexOf(search);
  if (index !== -1) list.splice(index, 1);
};

export const useFilters = (projects: HasPortfolioItemFilters[]) => {
  const router = useRouter();
  const filters = useMemo(() => getFilters(projects), [projects]);

  // Always starts unfiltered: the page is statically generated, so the first render has to match the unfiltered HTML.
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({});

  // Refs rather than state: they coordinate the URL sync and never change what renders on their own.
  // - `activeRef` mirrors the latest selection, so handlers and the effect never read a stale render's copy.
  // - `inFlight` is every filter search this hook has sent with router.replace that hasn't landed yet, oldest first.
  //   When the URL changes to one of them it's our own write arriving (possibly an older one, overtaken by a later
  //   click); any other URL is a real navigation (the header's "work" link, Back/Forward, a pasted link) and wins.
  // - `seenSearch` is the URL's filter part as last handled, so a re-render without a URL change does nothing.
  // - `writeOnReady` marks a visitor choice made before the router parsed the query; it's written once it has.
  const routerRef = useRef(router);
  routerRef.current = router;
  const activeRef = useRef<ActiveFilters>({});
  const inFlight = useRef<string[]>([]);
  const seenSearch = useRef<string | null>(null);
  const writeOnReady = useRef(false);

  // Mirror a visitor's selection into the URL. Adopting the URL never writes, so an incoming link stays exactly as it
  // arrived until someone touches a filter.
  const writeUrl = useCallback(
    (active: ActiveFilters) => {
      const current = routerRef.current;
      if (!current.isReady) {
        writeOnReady.current = true;
        return;
      }
      const params = filterParams(active, filters);
      const search = toSearch({}, params);
      if (search === seenSearch.current && inFlight.current.length === 0) return;
      inFlight.current.push(search);
      // Next cancels a replace when another navigation starts (a later click, or "work"), rejecting its promise; a
      // failed or cancelled write never lands, so it stops counting as in flight. Nothing else needs handling.
      current
        .replace({ pathname: current.pathname, search: toSearch(current.query, params) }, undefined, {
          shallow: true,
          scroll: false,
        })
        .then(
          (ok) => {
            if (!ok) removeFirst(inFlight.current, search);
          },
          () => removeFirst(inFlight.current, search)
        );
    },
    [filters]
  );

  // A page component isn't remounted by a navigation to its own route, so this re-runs on every URL change.
  useEffect(() => {
    if (!router.isReady) return;
    const fromUrl = readQuery(router.query, filters);
    const urlSearch = filterSearch(fromUrl, filters);
    if (urlSearch === seenSearch.current) return;
    seenSearch.current = urlSearch;

    const landed = inFlight.current.indexOf(urlSearch);
    if (landed !== -1) {
      // Our own write arriving; anything sent before it has been superseded.
      inFlight.current.splice(0, landed + 1);
      return;
    }
    if (writeOnReady.current) {
      writeOnReady.current = false;
      writeUrl(activeRef.current);
      return;
    }
    inFlight.current = [];
    if (filterSearch(activeRef.current, filters) !== urlSearch) {
      activeRef.current = fromUrl;
      setActiveFilters(fromUrl);
    }
  }, [router.isReady, router.query, filters, writeUrl]);

  const update = useCallback(
    (next: (existing: ActiveFilters) => ActiveFilters) => {
      const current = activeRef.current;
      const active = next(current);
      if (active === current) return;
      activeRef.current = active;
      withViewTransition(() => setActiveFilters(active));
      writeUrl(active);
    },
    [writeUrl]
  );

  const toggleFilter = useCallback(
    (filterType: FilterKey, value: string) => update((existing) => toggled(existing, filterType, value)),
    [update]
  );

  const clearFilters = useCallback(
    () => update((existing) => (Object.keys(existing).length > 0 ? {} : existing)),
    [update]
  );

  return {
    activeFilters,
    filters,
    toggleFilter,
    clearFilters,
  };
};

export type FilterProps = ReturnType<typeof useFilters>;

export const useFilteredProjects = <T extends HasPortfolioItemFilters>(activeFilters: ActiveFilters, projects: T[]) =>
  useMemo(() => projects.filter((project) => matchesActiveFilters(project, activeFilters)), [projects, activeFilters]);
