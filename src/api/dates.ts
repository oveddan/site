// Project dates are stored as UTC timestamps (meta.ts `Date.parse`), so every label reads them in UTC; a local
// timezone would shift a "2026-05-01" start into April for visitors west of Greenwich.

export const utcYear = (timestamp: number) => new Date(timestamp).getUTCFullYear();

/** "2019", or "2020–2022" when the project ended in a later year. */
export const projectYears = ({ dateStart, dateEnd }: { dateStart: number; dateEnd?: number | null }) => {
  const start = utcYear(dateStart);
  const end = dateEnd ? utcYear(dateEnd) : start;
  return end === start ? `${start}` : `${start}–${end}`;
};

/** "Jun 2025" */
export function formatDate(date: number) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

const formatMonth = (date: number) => new Date(date).toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' });

/** "Jun 2025", "May – Sep 2026" when both ends share a year, otherwise "Sep 2020 – Jun 2022". */
export function formatDateRange(start: number, end?: number | null) {
  if (!end) return formatDate(start);
  const [from, to] = [new Date(start), new Date(end)];
  if (from.getUTCFullYear() !== to.getUTCFullYear()) return `${formatDate(start)} – ${formatDate(end)}`;
  if (from.getUTCMonth() === to.getUTCMonth()) return formatDate(end);
  return `${formatMonth(start)} – ${formatDate(end)}`;
}
