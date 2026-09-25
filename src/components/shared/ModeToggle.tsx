import type { SVGProps } from 'react';
import { useDarkMode } from '@/hooks/useDarkMode';

function SunIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
    </svg>
  );
}

function MoonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
    </svg>
  );
}

/** Theme switch. The icon shows the theme a click switches to: a sun while dark, a moon while light. */
function ModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const Icon = isDarkMode ? SunIcon : MoonIcon;
  return (
    <button
      type="button"
      aria-label={isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'}
      className="grid h-[34px] w-[34px] place-items-center rounded-lg border border-line text-ink-2 transition hover:border-ink-3 hover:text-ink focus-ring"
      onClick={toggleDarkMode}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}

export default ModeToggle;
