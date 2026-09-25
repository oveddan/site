import { useCallback, useState } from 'react';

const STORAGE_KEY = 'theme';

const NO_TRANSITIONS = '[&_*]:!transition-none';

/**
 * Applies `change` with every transition switched off, so a theme switch repaints at once instead of animating each
 * color. Reading a computed style forces the browser to resolve styles while the class is still on; without it the
 * class would be removed before any style recalculation saw it, and the transitions would run anyway.
 */
function withoutTransitions(change: () => void) {
  const root = document.documentElement;
  root.classList.add(NO_TRANSITIONS);
  change();
  void window.getComputedStyle(document.body).opacity;
  window.setTimeout(() => root.classList.remove(NO_TRANSITIONS), 0);
}

/**
 * The site theme. The inline script in `_document.tsx` sets `dark` on <html> before paint (a
 * remembered choice wins, otherwise dark), so this reads that class rather than the OS preference.
 * Client-only: ModeToggle loads with `ssr: false`.
 */
export function useDarkMode() {
  const [isDarkMode, setIsDarkModeState] = useState(() => document.documentElement.classList.contains('dark'));

  const setIsDarkMode = useCallback((dark: boolean) => {
    withoutTransitions(() => document.documentElement.classList.toggle('dark', dark));
    try {
      window.localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
    } catch {
      // Storage can be unavailable (private mode, blocked site data); the theme still applies for this page.
    }
    setIsDarkModeState(dark);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(!document.documentElement.classList.contains('dark'));
  }, [setIsDarkMode]);

  return { isDarkMode, setIsDarkMode, toggleDarkMode };
}
