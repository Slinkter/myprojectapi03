/**
 * @file Muestra la lista de personajes favoritos y permite eliminarlos.
 */
import React from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';

export const FavoritesList = ({ favorites, onRemoveFavorite }) => {
    if (favorites.length === 0) {
        return null; // No mostrar nada si no hay favoritos
    }

    return (
        <div className="container mx-auto px-4 py-6">
            <div className="bg-bg-secondary-light dark:bg-bg-secondary-dark p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4 text-primary">Mis Favoritos</h2>
                <ul className="space-y-3">
                    {favorites.map((fav) => (
                        <li
                            key={fav.id}
                            className="flex justify-between items-center bg-bg-primary-light dark:bg-bg-primary-dark p-3 rounded-md animate-fade-in"
                        >
                            <span className="font-semibold text-lg">{fav.name}</span>
                            <button
                                onClick={() => onRemoveFavorite(fav)}
                                className="p-2 text-accent hover:bg-accent/10 rounded-full transition-colors"
                                aria-label={`Eliminar a ${fav.name} de favoritos`}
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
