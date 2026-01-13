/**
 * @file Redux middleware for persisting favorites to localStorage.
 * Automatically syncs favorites array to localStorage on every Redux action.
 */

const STORAGE_KEY = "rickmorty_favorites";

/**
 * Middleware that persists favorites to localStorage.
 * Listens to all character-related actions and saves favorites state.
 *
 * @param {object} store - Redux store instance
 * @returns {function} Middleware function
 */
export const favoritesMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  // Only persist on character-related actions
  if (action.type.startsWith("characters/")) {
    const { favorites } = store.getState().characters;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.warn("Failed to save favorites to localStorage:", error);
    }
  }

  return result;
};
