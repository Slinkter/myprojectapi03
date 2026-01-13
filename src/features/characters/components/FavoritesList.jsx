/**
 * @file Muestra la lista de personajes favoritos y permite eliminarlos.
 */

import { TrashIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";

export const FavoritesList = ({ favorites, onRemoveFavorite }) => {
  if (favorites.length === 0) {
    return null; // No mostrar nada si no hay favoritos
  }

  return (
    <div className="favorites-list">
      <div className="favorites-list__container">
        <h2 className="favorites-list__title">Mis Favoritos</h2>
        <ul className="favorites-list__items">
          {favorites.map((fav) => (
            <li key={fav.id} className="favorites-list__item">
              <span className="favorites-list__name">{fav.name}</span>
              <button
                className="favorites-list__remove-btn"
                aria-label={`Eliminar a ${fav.name} de favoritos`}
                onClick={() => onRemoveFavorite(fav)}
              >
                <TrashIcon className="h-6 w-6" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

FavoritesList.propTypes = {
  favorites: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  onRemoveFavorite: PropTypes.func.isRequired,
};
