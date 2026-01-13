/**
 * @file Proveedor de contexto que gestiona la lógica del cambio de tema.
 */
import { useState, useMemo, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";
import PropTypes from "prop-types";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Comprueba si hay un tema guardado en localStorage o prefiere el del sistema
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "light";
  });

  useEffect(() => {
    // Aplica la clase al body y guarda la preferencia
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
