/**
 * @file Componente de UI puro para mostrar la tarjeta de un personaje.
 */
import React, { useState } from "react";
import PropTypes from "prop-types";
import { StatusBadge } from "./StatusBadge";

/**
 * Renderiza la tarjeta de un personaje con su información y un botón de acción.
 * Incluye animación de entrada con delay escalonado basado en el índice.
 *
 * @param {{ character: object, isFavorite: boolean, onToggleFavorite: (character: object) => void, index: number }} props
 * @returns {JSX.Element}
 */
export const CharacterCard = React.memo(
  ({ character, isFavorite, onToggleFavorite, index = 0 }) => {
    const { image, name, species } = character;
    const [imageLoaded, setImageLoaded] = useState(false);

    // Calculate staggered animation delay (50ms per card, max 1000ms)
    const animationDelay = `${Math.min(index * 50, 1000)}ms`;

    return (
      <div
        className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out animate-slide-up"
        style={{ animationDelay, animationFillMode: "backwards" }}
      >
        <div className="relative h-64 bg-slate-200 dark:bg-slate-700">
          {/* Skeleton placeholder while image loads */}
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700" />
          )}

          {/* Actual image with fade-in effect */}
          <img
            className={`w-full h-64 object-cover transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            src={image}
            alt={`Image of ${name}`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />

          {/* Status badge - only show when image is loaded */}
          {imageLoaded && <StatusBadge status={character.status} />}
        </div>
        <div className="p-4 flex flex-col h-40 justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 truncate">
              {name}
            </h3>
            <p className="text-slate-500 dark:text-slate-400">{species}</p>
          </div>
          <button
            className={`w-full mt-4 py-2 px-4 rounded-lg font-semibold text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
              isFavorite
                ? "bg-red-500 hover:bg-red-700 focus:ring-red-500"
                : "bg-cyan-500 hover:bg-cyan-700 focus:ring-cyan-500"
            }`}
            onClick={() => onToggleFavorite(character)}
          >
            {isFavorite ? "Quitar de Favoritos" : "Añadir a Favoritos"}
          </button>
        </div>
      </div>
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
  index: PropTypes.number,
};
