/**
 * @file Componente de esqueleto de carga para simular el layout de una tarjeta.
 */
import React from "react";
import { motion } from "framer-motion";

/**
 * Muestra una animación de esqueleto para una tarjeta de personaje.
 * Optimizado para dispositivos de gama baja: 
 * Utiliza opacidad simple y se evita animar múltiples nodos simultáneamente de forma compleja.
 */
export const LoadingSkeleton = React.memo(() => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden flex flex-col"
    >
      <motion.div 
        className="flex flex-col h-full"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        {/* Placeholder para la imagen: h-64 coincide con la imagen de CharacterCard */}
        <div className="bg-gray-300 dark:bg-gray-700 h-64 w-full"></div>
        {/* Placeholder para el contenido: p-6 y min-h-[160px] coincide con CharacterCard */}
        <div className="w-full p-6 bg-white dark:bg-gray-800 flex flex-col min-h-[160px] justify-between gap-4">
          <div className="space-y-3">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-lg w-3/4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded-lg w-1/4"></div>
          </div>
          <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded-xl w-full"></div>
        </div>
      </motion.div>
    </motion.div>
  );
});

LoadingSkeleton.displayName = "LoadingSkeleton";

LoadingSkeleton.displayName = "LoadingSkeleton";
