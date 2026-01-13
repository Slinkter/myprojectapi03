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
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-cyan-500">Mis Favoritos</h2>
        <ul className="space-y-3">
          {favorites.map((fav) => (
            <li
              key={fav.id}
              className="flex justify-between items-center bg-slate-100 dark:bg-slate-900 p-3 rounded-md animate-fade-in"
            >
              <span className="font-semibold text-lg">{fav.name}</span>
              <button
                className="p-2 text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
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
