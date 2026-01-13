/**
 * @file Redux store configuration.
 * Configures and exports the Redux store with all application reducers.
 */
import { configureStore } from "@reduxjs/toolkit";
import characterReducer from "@/features/characters/slices/characterSlice";

/**
 * Redux store configurado con Redux Toolkit.
 * Combina todos los reducers de la aplicación en un único store.
 *
 * @type {import('@reduxjs/toolkit').EnhancedStore}
 *
 * @property {object} reducer - Objeto con todos los reducers
 * @property {object} reducer.characters - Reducer para el estado de personajes
 *
 * @example
 * // Usar en componentes con useSelector
 * const characters = useSelector((state) => state.characters.entities);
 */
export const store = configureStore({
  reducer: {
    characters: characterReducer,
  },
});
