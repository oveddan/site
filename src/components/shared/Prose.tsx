import clsx from 'clsx';

export function Prose({ children, className }: { children: JSX.Element | JSX.Element[]; className?: string }) {
  return <div className={clsx(className, 'prose dark:prose-invert')}>{children}</div>;
}
