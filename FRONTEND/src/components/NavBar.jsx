import React from 'react';
import { Link } from '@tanstack/react-router';
import { Link2, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import MagneticButton from './MagneticButton';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 shadow-sm supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 transition-colors duration-300">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left side - App Name */}
          <div className="flex items-center">
            <Link to="/" className="group flex items-center gap-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                <Link2 className="h-6 w-6" />
              </div>
              <span>URL Shortener</span>
            </Link>
          </div>

          {/* Right side - Auth buttons & Theme Toggle */}
          <div className="flex items-center gap-4">
            <MagneticButton
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </MagneticButton>
            <Link
              to="/auth"
              className="inline-flex items-center justify-center rounded-xl bg-gray-900 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-gray-900 shadow hover:bg-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all hover:-translate-y-0.5"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;