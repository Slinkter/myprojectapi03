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
    <div className="mb-2">
      <input
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring dark:bg-gray-800 dark:border-gray-700"
        type="search"
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder="Buscar personajes..."
        aria-label="Buscar personajes"
      />
    </div>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
