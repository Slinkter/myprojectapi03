/**
 * @file Define el contexto para la gestión del tema (claro/oscuro).
 * Proporciona el contexto React para compartir el estado del tema
 * y la función de alternancia entre todos los componentes de la aplicación.
 */
import { createContext } from "react";

/**
 * Contexto de tema para la aplicación.
 * Proporciona acceso al tema actual y función para cambiarlo.
 *
 * @typedef {object} ThemeContextValue
 * @property {'light'|'dark'} theme - Tema actual de la aplicación
 * @property {() => void} toggleTheme - Función para alternar entre temas
 *
 * @type {React.Context<ThemeContextValue|null>}
 */
export const ThemeContext = createContext(null);
