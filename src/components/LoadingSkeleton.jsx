/**
 * @file Componente de esqueleto de carga para simular el layout de una tarjeta.
 */
import React from "react";

/**
 * Muestra una animación de esqueleto para una tarjeta de personaje.
 */
export const LoadingSkeleton = React.memo(() => {
  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden animate-fade-in">
      <div className="animate-pulse flex flex-col">
        {/* Placeholder para la imagen: h-64 coincide con la imagen de CharacterCard */}
        <div className="bg-gray-300 dark:bg-gray-700 h-64 w-full rounded-t-lg"></div>
        {/* Placeholder para el contenido: h-40 coincide con el div de contenido de CharacterCard */}
        <div className="w-full p-4 bg-white dark:bg-gray-800 rounded-b-lg shadow-lg h-40 flex flex-col justify-between">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
          <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
        </div>
      </div>
    </div>
  );
});

LoadingSkeleton.displayName = "LoadingSkeleton";
