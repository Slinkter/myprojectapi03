import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    fetchCharacters,
    addFavorite,
    removeFavorite,
} from "../store/slices/characterSlice";

/**
 * Hook que orquesta la lógica para mostrar y gestionar la lista de personajes.
 * Proporciona el estado derivado de Redux y los manejadores de eventos para la UI.
 * @returns {object} Un objeto que contiene los datos y las funciones necesarias para la vista.
 */
export const useCharacters = () => {
    const [searchTerm, setSearchTerm] = useState("");
    /* redux state */
    const { entities, favorites, status, error } = useSelector(
        (state) => state.characters
    );
    const dispatch = useDispatch();

    /**
     * Efecto para cargar los personajes desde la API.
     * Se ejecuta solo cuando el componente se monta por primera vez y el estado es 'idle'.
     * Esto previene recargas innecesarias si los datos ya están presentes o en proceso de carga.
     */
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchCharacters());
        }
    }, [status, dispatch]);

    /**
     * Memoriza la lista de personajes filtrados.
     * `useMemo` se utiliza aquí para evitar recalcular la lista en cada renderizado.
     * El cálculo solo se volverá a ejecutar si `entities` (la lista original de personajes) o `searchTerm` (el término de búsqueda) cambian.
     * Esto es eficiente porque el filtrado puede ser una operación costosa en listas grandes.
     *
     * ¿Por qué `useMemo` y no `useCallback`?
     * `useMemo` memoriza un valor (en este caso, el array `filteredCharacters`).
     * `useCallback` memoriza una función.
     * Como lo que queremos es almacenar el *resultado* del cálculo (el array filtrado), `useMemo` es la elección correcta.
     */
    const filteredCharacters = useMemo(() => {
        if (!searchTerm) {
            return entities;
        }
        return entities.filter((char) =>
            char.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [entities, searchTerm]);

    /**
     * Manejador para añadir o eliminar un personaje de la lista de favoritos.
     * Comprueba si el personaje ya es un favorito para decidir qué acción despachar.
     * @param {object} character - El personaje a añadir o eliminar.
     */
    const handleToggleFavorite = (character) => {
        const isFavorite = favorites.some((fav) => fav.id === character.id);
        if (isFavorite) {
            dispatch(removeFavorite(character));
        } else {
            dispatch(addFavorite(character));
        }
    };

    /**
     * Manejador para eliminar un personaje de la lista de favoritos.
     * @param {object} character - El personaje a eliminar.
     */
    const handleRemoveFavorite = (character) => {
        dispatch(removeFavorite(character));
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
     * Despacha la acción `fetchCharacters` nuevamente.
     */
    const handleRetry = () => {
        dispatch(fetchCharacters());
    };

    // Retorna el estado y las funciones que se consumirán en el componente de la UI.
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
