import { forwardRef } from 'react';
import clsx from 'clsx';

/** The site's one content column: 1200px max, 20px gutters on phones, 40px from `md` up. */
export const Container = forwardRef(function Container({ className, children, ...props }: any, ref) {
  return (
    <div ref={ref} className={clsx('mx-auto w-full max-w-[75rem] px-5 md:px-10', className)} {...props}>
      {children}
    </div>
  );
});
