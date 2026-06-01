import { useState } from 'react';

interface HeaderProps {
  dark: boolean;
  onToggleDark: () => void;
}

export default function Header({ dark, onToggleDark }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Converter', href: '#converter' },
    { label: 'Percentiles', href: '#percentiles' },
    { label: 'Charts', href: '#charts' },
    { label: 'Resources', href: '#table' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 font-bold text-xl text-blue-600 dark:text-blue-400">
          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" strokeLinecap="round"/>
            <rect x="9" y="3" width="6" height="4" rx="1" strokeLinecap="round"/>
            <path d="M9 12h6M9 16h4" strokeLinecap="round"/>
          </svg>
          ACT Score Converter
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(l => (
            <a key={l.href} href={l.href}
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Dark mode toggle */}
          <button
            onClick={onToggleDark}
            aria-label="Toggle dark mode"
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300">
            {dark ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeLinecap="round"/>
              </svg>
            )}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              {menuOpen
                ? <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round"/>
                : <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round"/>}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 flex flex-col gap-3">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-1">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
