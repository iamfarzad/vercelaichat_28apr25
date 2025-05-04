'use client';

import { useTheme } from 'next-themes';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="toggle flex items-center justify-center"
    >
      {theme === 'dark' ? (
        // Moon icon with brand orange
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M17 13.5A7 7 0 0 1 7.5 3a.5.5 0 0 0-.5-.5A7.5 7.5 0 1 0 17.5 14a.5.5 0 0 0-.5-.5Z"
            fill="oklch(0.686 0.219 41.6)"
          />
        </svg>
      ) : (
        // Sun icon with brand orange
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="5" fill="oklch(0.686 0.219 41.6)" />
          <g stroke="oklch(0.686 0.219 41.6)" strokeWidth="1.5">
            <line x1="10" y1="1" x2="10" y2="3" />
            <line x1="10" y1="17" x2="10" y2="19" />
            <line x1="1" y1="10" x2="3" y2="10" />
            <line x1="17" y1="10" x2="19" y2="10" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="14.36" y1="14.36" x2="15.78" y2="15.78" />
            <line x1="4.22" y1="15.78" x2="5.64" y2="14.36" />
            <line x1="14.36" y1="5.64" x2="15.78" y2="4.22" />
          </g>
        </svg>
      )}
    </button>
  );
}
