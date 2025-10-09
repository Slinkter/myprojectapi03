/**
 * @file Hook personalizado que encapsula toda la lógica de interacción con la lista de personajes.
 */
import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchCharacters,
    addFavorite,
    removeFavorite,
} from "../store/characterSlice";

/**
 * Hook que orquesta la lógica para mostrar y gestionar la lista de personajes.
 * Proporciona el estado derivado de Redux y los manejadores de eventos para la UI.
 * @returns {object} Un objeto que contiene los datos y las funciones necesarias para la vista.
 */
export const useCharacters = () => {
    const dispatch = useDispatch();
    const { entities, favorites, status, error } = useSelector(
        (state) => state.characters
    );

    const [searchTerm, setSearchTerm] = useState("");

    // Dispara la carga de datos desde la API si aún no se han cargado.
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchCharacters());
        }
    }, [status, dispatch]);

    // Filtrar personajes basándose en el término de búsqueda
    const filteredCharacters = useMemo(() => {
        if (!searchTerm) {
            return entities;
        }
        return entities.filter((char) =>
            char.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [entities, searchTerm]);

    /**
     * Manejador para eliminar un personaje de la lista de favoritos.
     * @param {object} character - El personaje a eliminar.
     */
    const handleRemoveFavorite = (character) => {
        dispatch(removeFavorite(character));
    };

    const handleToggleFavorite = (character) => {
        const isFavorite = favorites.some((fav) => fav.id === character.id);
        if (isFavorite) {
            dispatch(removeFavorite(character));
        } else {
            dispatch(addFavorite(character));
        }
    };

    /**
     * Manejador para actualizar el término de búsqueda.
     * @param {string} value - El nuevo valor del término de búsqueda.
     */
    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    /**
     * Manejador para reintentar la carga de datos en caso de error.
     */
    const handleRetry = () => {
        dispatch(fetchCharacters());
    };

    return {
        status,
        error,
        filteredCharacters,
        favorites,
        searchTerm,
        handleSearch,
        handleToggleFavorite,
        handleRemoveFavorite,
        handleRetry,
    };
};
