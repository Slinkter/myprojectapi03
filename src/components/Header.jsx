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
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg sticky top-0 z-10 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-cyan-500">
          <a href="/">API RICK & MORTIN </a>
        </div>
        <nav className="flex items-center gap-4">
          <ThemeToggleButton />
        </nav>
      </div>
    </header>
  );
};
