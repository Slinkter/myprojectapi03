/**
 * @file Componente para mostrar un mensaje de error con opción de reintentar.
 */
import React from 'react';

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
    <div className="error-message">
      <h3 className="error-message__title">Oops! Algo salió mal.</h3>
      <p className="error-message__text">{message}</p>
      <button
        onClick={onRetry}
        className="error-message__button"
      >
        Reintentar
      </button>
    </div>
  );
};
