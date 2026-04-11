/**
 * @file Componente de búsqueda reutilizable.
 * Proporciona un input de búsqueda con accesibilidad integrada.
 */
import PropTypes from "prop-types";

/**
 * Componente de barra de búsqueda controlado.
 * Renderiza un input de tipo search con estilos predefinidos y manejo de cambios.
 *
 * @param {object} props - Propiedades del componente
 * @param {string} [props.value=""] - Valor actual del input de búsqueda
 * @param {function} props.onChange - Callback que se ejecuta cuando cambia el valor del input
 * @returns {JSX.Element} Input de búsqueda estilizado
 *
 * @example
 * <SearchBar
 *   value={searchTerm}
 *   onChange={(value) => setSearchTerm(value)}
 * />
 */
export function SearchBar({ value = "", onChange }) {
  return (
    <div className="relative group max-w-2xl mx-auto w-full">
      <input
        className="w-full px-6 py-4 text-lg border-2 border-slate-200 dark:border-slate-700 rounded-2xl focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 dark:bg-slate-800 transition-all duration-300 placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-sm"
        type="search"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder="Search for your favorite characters..."
        aria-label="Search for characters"
      />
    </div>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
