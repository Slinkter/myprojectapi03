/**
 * @file Configuración del store principal de Redux para la aplicación.
 */
import { configureStore } from "@reduxjs/toolkit";
import characterReducer from "../entities/character/model/characterSlice";

export const store = configureStore({
    reducer: {
        characters: characterReducer,
        // Aquí se pueden añadir otros reducers de otras entidades o features
    },
});
