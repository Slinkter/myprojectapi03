/**
 * @file Proveedor de contexto que gestiona la lógica del cambio de tema.
 * Maneja la persistencia del tema en localStorage y aplica las clases CSS correspondientes.
 */
import { useState, useMemo, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";
import PropTypes from "prop-types";

/**
 * Componente proveedor del contexto de tema.
 * Gestiona el estado del tema (claro/oscuro), persiste la preferencia en localStorage,
 * y aplica las clases CSS correspondientes al elemento raíz del documento.
 *
 * @param {object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos que tendrán acceso al contexto de tema
 * @returns {JSX.Element} Proveedor de contexto con el valor del tema
 *
 * @example
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 */
export const ThemeProvider = ({ children }) => {
  /**
   * Estado del tema actual.
   * Inicializa desde localStorage o usa 'light' como valor por defecto.
   * @type {['light'|'dark', Function]}
   */
  const [theme, setTheme] = useState(() => {
    // Comprueba si hay un tema guardado en localStorage o prefiere el del sistema
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "light";
  });

  /**
   * Efecto que aplica el tema al documento y lo persiste en localStorage.
   * Se ejecuta cada vez que cambia el tema.
   */
  useEffect(() => {
    // Aplica la clase al body y guarda la preferencia
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  /**
   * Función para alternar entre tema claro y oscuro.
   * @returns {void}
   */
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  /**
   * Valor memoizado del contexto para evitar re-renders innecesarios.
   * @type {{theme: 'light'|'dark', toggleTheme: () => void}}
   */
  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
