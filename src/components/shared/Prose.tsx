import type { JSX } from 'react';
import clsx from 'clsx';

/** Typography for MDX bodies. The caller sets the column width; `max-w-none` drops prose's 65ch cap so it can. */
export function Prose({ children, className }: { children: JSX.Element | JSX.Element[]; className?: string }) {
  return <div className={clsx(className, 'prose max-w-none dark:prose-invert')}>{children}</div>;
}
