/**
 * @file Componente de esqueleto de carga para simular el layout de una tarjeta.
 */
import React from 'react';

/**
 * Muestra una animación de esqueleto para una tarjeta de personaje.
 */
export const LoadingSkeleton = () => {
  return (
    <div className="w-full max-w-sm mx-auto p-4 md:p-0">
      <div className="animate-pulse flex flex-col items-center">
        <div className="bg-gray-300 dark:bg-gray-700 h-64 w-full rounded-t-lg"></div>
        <div className="w-full p-4 bg-white dark:bg-gray-800 rounded-b-lg shadow-lg">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
};
