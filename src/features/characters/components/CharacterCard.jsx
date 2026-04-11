/**
 * @file Componente de UI puro para mostrar la tarjeta de un personaje.
 */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { StatusBadge } from "./StatusBadge";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Renderiza la tarjeta de un personaje con su información y un botón de acción.
 * Utiliza framer-motion para animaciones fluidas y optimizadas (respeta prefers-reduced-motion).
 *
 * @param {{ character: object, isFavorite: boolean, onToggleFavorite: (character: object) => void }} props
 * @returns {JSX.Element}
 */
export const CharacterCard = React.memo(
  ({ character, isFavorite, onToggleFavorite }) => {
    const { image, name, species } = character;
    const [imageLoaded, setImageLoaded] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    return (
      <motion.div
        variants={{
          hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
          show: { opacity: 1, y: 0 },
        }}
        whileHover={
          shouldReduceMotion ? {} : { scale: 1.02, transition: { duration: 0.2 } }
        }
        className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden flex flex-col"
      >
        <div className="relative h-64 bg-slate-200 dark:bg-slate-700 overflow-hidden">
          {/* Skeleton placeholder while image loads. Simplified for low-end devices */}
          {!imageLoaded && (
            <motion.div
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-slate-300 dark:bg-slate-600"
            />
          )}

          {/* Actual image with fade-in effect */}
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-64 object-cover"
            src={image}
            alt={`Image of ${name}`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />

          {/* Status badge - only show when image is loaded */}
          {imageLoaded && <StatusBadge status={character.status} />}
        </div>
        <div className="p-6 flex flex-col min-h-[160px] justify-between gap-4">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight truncate">
              {name}
            </h3>
            <p className="text-sm font-medium uppercase tracking-wider text-slate-400">
              {species}
            </p>
          </div>
          <motion.button
            whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            className={`w-full py-3 px-6 rounded-xl font-bold text-sm uppercase tracking-widest text-white transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-opacity-40 shadow-md ${
              isFavorite
                ? "bg-rose-500 hover:bg-rose-600 hover:shadow-rose-500/20 focus:ring-rose-500"
                : "bg-cyan-500 hover:bg-cyan-600 hover:shadow-cyan-500/20 focus:ring-cyan-500"
            }`}
            onClick={() => onToggleFavorite(character)}
          >
            {isFavorite ? "Remove Favorite" : "Add to Favorites"}
          </motion.button>
        </div>
      </motion.div>
    );
  }
);

CharacterCard.displayName = "CharacterCard";

CharacterCard.propTypes = {
  character: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    species: PropTypes.string.isRequired,
  }).isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};
