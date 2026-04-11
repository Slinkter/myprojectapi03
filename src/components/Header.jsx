/**
 * @file Widget del Header de la aplicación.
 * Proporciona la navegación principal y controles globales.
 */

import { ThemeToggleButton } from "./ThemeToggleButton";

/**
 * Componente de encabezado de la aplicación.
 * Renderiza el logo/título de la aplicación y la navegación con el botón de cambio de tema.
 *
 * @returns {JSX.Element} Header con logo y navegación
 */
export const Header = () => {
  return (
    <header className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-200/50 dark:border-slate-800/50 transition-colors duration-500">
      <div className="max-w-screen-xl mx-auto px-6 py-5 flex justify-between items-center">
        <div className="text-2xl font-black tracking-tight text-cyan-500 hover:scale-105 transition-transform duration-300">
          <a href="/">
            RICK & MORTY <span className="text-slate-400 font-light hidden sm:inline">EXPLORER</span>
          </a>
        </div>
        <nav className="flex items-center gap-4">
          <ThemeToggleButton />
        </nav>
      </div>
    </header>
  );
};
