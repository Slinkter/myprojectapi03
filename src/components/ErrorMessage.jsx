/**
 * @file Componente para mostrar un mensaje de error con opción de reintentar.
 */
import PropTypes from "prop-types";

/**
 * Muestra un mensaje de error y un botón para reintentar una acción.
 *
 * @param {{ message: string, onRetry: () => void }} props
 * @param {string} props.message - El mensaje de error a mostrar.
 * @param {() => void} props.onRetry - La función a llamar cuando se hace clic en el botón de reintento.
 * @returns {JSX.Element}
 */
export const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg shadow-md max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
        Oops! Algo salió mal.
      </h3>
      <p className="text-red-600 dark:text-red-300 mt-2 mb-4">{message}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors"
      >
        Reintentar
      </button>
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func.isRequired,
};
