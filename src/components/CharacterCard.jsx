/**
 * @file Componente de UI puro para mostrar la tarjeta de un personaje.
 */
import React from "react";
import PropTypes from "prop-types";

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
            Alive: "character-card__status--alive",
            Dead: "character-card__status--dead",
            unknown: "character-card__status--unknown",
        };

        return (
            <div className="character-card">
                <div className="character-card__image-container">
                    <img
                        className="character-card__image"
                        src={image}
                        alt={`Image of ${name}`}
                    />
                    <span
                        className={`character-card__status ${statusColors[status]}`}
                    >
                        {status}
                    </span>
                </div>
                <div className="character-card__content">
                    <div>
                        <h3 className="character-card__title">{name}</h3>
                        <p className="character-card__subtitle">{species}</p>
                    </div>
                    <button
                        onClick={() => onToggleFavorite(character)}
                        className={`character-card__button ${
                            isFavorite
                                ? "character-card__button--favorite"
                                : "character-card__button--not-favorite"
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

CharacterCard.propTypes = {
    character: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        species: PropTypes.string.isRequired,
    }).isRequired,
    favorites: PropTypes.arrayOf(PropTypes.object).isRequired,
    onToggleFavorite: PropTypes.func.isRequired,
};