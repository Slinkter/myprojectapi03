/**
 * @file Configuración de la tienda (store) de Redux para la aplicación.
 */
import { configureStore } from "@reduxjs/toolkit";
import characterReducer from "./slices/characterSlice";

/**
 * La tienda global de Redux.
 */
export const store = configureStore({
    reducer: {
        characters: characterReducer,
    },
});
