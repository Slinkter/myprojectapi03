/**
 * @file Botón para cambiar entre tema claro y oscuro.
 */

import { useTheme } from "../hooks/useTheme";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid"; // Necesitarás instalar @heroicons/react

export const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle-btn"
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
