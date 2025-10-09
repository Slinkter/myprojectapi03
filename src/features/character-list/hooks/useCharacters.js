/**
 * @file Hook personalizado para gestionar la lógica de la lista de personajes.
 */
import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCharacters, addFavorite, removeFavorite } from "../../../entities/character/model/characterSlice";

/**
 * Hook que orquesta la lógica para mostrar y gestionar la lista de personajes.
 *
 * @returns {object} Un objeto que contiene los datos y las funciones necesarias para la vista.
 */
export const useCharacters = () => {
    const dispatch = useDispatch();
    const { entities, favorites, status, error } = useSelector((state) => state.characters);

    const [searchTerm, setSearchTerm] = useState("");

    // Obtener los datos de la API al montar el componente
    useEffect(() => {
        if (status === 'idle') {
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


    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

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
        handleToggleFavorite, // Usar esta función para el botón de la tarjeta
        handleRemoveFavorite, // Usar esta para la lista de favoritos
        handleRetry,
    };
};
