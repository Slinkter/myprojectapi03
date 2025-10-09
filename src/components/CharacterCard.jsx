/**
 * @file Componente de UI puro para mostrar la tarjeta de un personaje.
 */
import React from "react";

/**
 * Renderiza la tarjeta de un personaje con su información y un botón de acción.
 *
 * @param {{ character: object, favorites: Array<object>, onToggleFavorite: (character: object) => void }} props
 * @returns {JSX.Element}
 */
export const CharacterCard = React.memo(
    ({ character, favorites, onToggleFavorite }) => {
        const { image, name, species, status } = character;

        const isFavorite = favorites.some((fav) => fav.id === character.id);

        const statusColors = {
            Alive: "bg-green-500",
            Dead: "bg-accent",
            unknown: "bg-secondary",
        };

        return (
            <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-transform duration-300 ease-in-out animate-fade-in">
                <div className="relative">
                    <img
                        className="w-full h-64 object-cover"
                        src={image}
                        alt={`Image of ${name}`}
                    />
                    <span
                        className={`absolute top-2 left-2 text-xs font-bold text-white px-2 py-1 rounded-full ${statusColors[status]}`}
                    >
                        {status}
                    </span>
                </div>
                <div className="p-4 flex flex-col h-40 justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark truncate">
                            {name}
                        </h3>
                        <p className="text-text-secondary-light dark:text-text-secondary-dark">
                            {species}
                        </p>
                    </div>
                    <button
                        onClick={() => onToggleFavorite(character)}
                        className={`w-full mt-4 py-2 px-4 rounded-lg font-semibold text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                            isFavorite
                                ? "bg-accent hover:bg-red-700 focus:ring-accent"
                                : "bg-primary hover:bg-cyan-700 focus:ring-primary"
                        }`}
                    >
                        {isFavorite
                            ? "Quitar de Favoritos"
                            : "Añadir a Favoritos"}
                    </button>
                </div>
            </div>
        );
    }
);
