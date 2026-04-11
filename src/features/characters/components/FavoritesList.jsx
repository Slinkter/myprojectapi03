/**
 * @file Muestra la lista de personajes favoritos y permite eliminarlos.
 */

import { TrashIcon } from "@heroicons/react/24/solid";
import PropTypes from "prop-types";

export const FavoritesList = ({ favorites, onRemoveFavorite }) => {
  if (favorites.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="bg-white dark:bg-slate-800/50 p-8 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl backdrop-blur-sm">
        <h2 className="text-2xl font-black mb-6 text-cyan-500 tracking-tight">
          YOUR <span className="text-slate-400">COLLECTION</span>
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favorites.map((fav) => (
            <li
              key={fav.id}
              className="flex justify-between items-center bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-cyan-500/30 transition-all duration-300"
            >
              <span className="font-bold text-slate-700 dark:text-slate-200">{fav.name}</span>
              <button
                className="p-3 text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all duration-300"
                aria-label={`Remove ${fav.name} from favorites`}
                onClick={() => onRemoveFavorite(fav)}
              >
                <TrashIcon className="h-5 w-5" />
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
