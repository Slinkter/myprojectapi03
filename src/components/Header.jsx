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
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <a href="/">API RICK & MORTIN </a>
        </div>
        <nav className="header__nav">
          <ThemeToggleButton />
        </nav>
      </div>
    </header>
  );
};
