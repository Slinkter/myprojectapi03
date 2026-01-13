/**
 * @file Hook para acceder fácilmente al contexto del tema.
 * Proporciona una interfaz conveniente para consumir el ThemeContext.
 */
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

/**
 * Custom hook para acceder al contexto del tema.
 * Debe ser usado dentro de un componente envuelto por ThemeProvider.
 *
 * @returns {object} Objeto del contexto del tema
 * @returns {'light'|'dark'} returns.theme - Tema actual de la aplicación
 * @returns {() => void} returns.toggleTheme - Función para alternar entre temas claro y oscuro
 *
 * @throws {Error} Si se usa fuera de un ThemeProvider
 *
 * @example
 * function MyComponent() {
 *   const { theme, toggleTheme } = useTheme();
 *   return <button onClick={toggleTheme}>Current: {theme}</button>;
 * }
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme debe ser usado dentro de un ThemeProvider");
  }
  return context;
};
