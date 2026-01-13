/**
 * @file Utility functions for favorites persistence.
 * Implements Repository Pattern for localStorage access.
 */

const STORAGE_KEY = "rickmorty_favorites";

/**
 * Loads favorites from localStorage.
 * Returns empty array if no data or on error.
 *
 * @returns {Array<object>} Array of favorite characters
 */
export const loadFavoritesFromStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.warn("Failed to load favorites from localStorage:", error);
    return [];
  }
};

/**
 * Saves favorites to localStorage.
 *
 * @param {Array<object>} favorites - Array of favorite characters
 * @returns {boolean} True if successful, false otherwise
 */
export const saveFavoritesToStorage = (favorites) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    return true;
  } catch (error) {
    console.warn("Failed to save favorites to localStorage:", error);
    return false;
  }
};

/**
 * Clears all favorites from localStorage.
 *
 * @returns {boolean} True if successful, false otherwise
 */
export const clearFavoritesFromStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.warn("Failed to clear favorites from localStorage:", error);
    return false;
  }
};
