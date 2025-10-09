/**
 * @file Contiene la lógica del reducer para gestionar la lista de personajes favoritos.
 */

/**
 * Tipos de acciones para el reducer de favoritos.
 * @property {string} ADD_TO_FAVORITES - Acción para añadir un personaje a favoritos.
 * @property {string} DELETE_FROM_FAVORITES - Acción para eliminar un personaje de favoritos.
 */
export const actionTypes = {
    ADD_TO_FAVORITES: "ADD_TO_FAVORITES",
    DELETE_FROM_FAVORITES: "DELETE_FROM_FAVORITES",
};

/**
 * Estado inicial para el reducer de favoritos.
 * @property {Array} favorites - Lista de personajes marcados como favoritos.
 */
export const initialState = {
    favorites: [],
};

/**
 * Reducer para gestionar el estado de los personajes favoritos.
 *
 * @param {object} state - El estado actual, que contiene la lista de favoritos.
 * @param {object} action - La acción a procesar, con un `type` y un `payload`.
 * @returns {object} El nuevo estado.
 */
export const favoritesReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_FAVORITES: {
            const character = action.payload;
            const isFavorite = state.favorites.find(
                (fav) => fav.id === character.id
            );

            // Evita añadir duplicados
            if (isFavorite) {
                return state;
            }

            return {
                ...state,
                favorites: [...state.favorites, character],
            };
        }

        case actionTypes.DELETE_FROM_FAVORITES: {
            const character = action.payload;
            return {
                ...state,
                favorites: state.favorites.filter(
                    (fav) => fav.id !== character.id
                ),
            };
        }

        default:
            return state;
    }
};
