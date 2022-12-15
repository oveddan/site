import { useCallback, useEffect, useMemo, useState } from 'react';

function disableTransitionsTemporarily() {
  document.documentElement.classList.add('[&_*]:!transition-none');
  window.setTimeout(() => {
    document.documentElement.classList.remove('[&_*]:!transition-none');
  }, 0);
}

export function useDarkMode() {
  const darkModeMediaQuery = useMemo(() => window.matchMedia('(prefers-color-scheme: dark)'), []);

  useEffect(() => {
    setTimeout(() => {});
  }, []);

  const [isDarkMode, setIsDarkMode] = useState(darkModeMediaQuery.matches);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((existing) => !existing);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const updateMode = useCallback(() => {
    setIsDarkMode(darkModeMediaQuery.matches);
  }, []);

  const updateModeWithoutTransitions = useCallback(() => {
    disableTransitionsTemporarily();
    updateMode();
  }, [updateMode]);

  useEffect(() => {
    darkModeMediaQuery.addEventListener('change', updateModeWithoutTransitions);
  }, [darkModeMediaQuery, updateModeWithoutTransitions]);

  return { isDarkMode, setIsDarkMode, toggleDarkMode };
}
