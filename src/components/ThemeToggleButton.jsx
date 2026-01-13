/**
 * @file Botón para cambiar entre tema claro y oscuro.
 */

import { useTheme } from "../hooks/useTheme";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid"; // Necesitarás instalar @heroicons/react

export const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-cyan-500"
      aria-label="Cambiar tema"
      onClick={toggleTheme}
    >
      {theme === "light" ? (
        <MoonIcon className="h-6 w-6" />
      ) : (
        <SunIcon className="h-6 w-6" />
      )}
    </button>
  );
};
