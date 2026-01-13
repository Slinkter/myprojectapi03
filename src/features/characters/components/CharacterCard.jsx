/**
 * @file Componente de UI puro para mostrar la tarjeta de un personaje.
 */
import React from "react";
import PropTypes from "prop-types";
import { StatusBadge } from "./StatusBadge";

/**
 * Renderiza la tarjeta de un personaje con su información y un botón de acción.
 *
 * @param {{ character: object, isFavorite: boolean, onToggleFavorite: (character: object) => void }} props
 * @returns {JSX.Element}
 */
export const CharacterCard = React.memo(
  ({ character, isFavorite, onToggleFavorite }) => {
    const { image, name, species } = character;

    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out animate-fade-in">
        <div className="relative">
          <img
            className="w-full h-64 object-cover"
            src={image}
            alt={`Image of ${name}`}
          />
          <StatusBadge status={character.status} />
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
};
