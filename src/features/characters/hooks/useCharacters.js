import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCharacters,
  addFavorite,
  removeFavorite,
} from "@/features/characters/slices/characterSlice";

/**
 * Hook personalizado para la gestión de la lógica de negocio de la vista de personajes.
 * Encapsula la comunicación con el store de Redux y la gestión del estado local de búsqueda.
 *
 * @returns {object} Objeto con las propiedades y métodos necesarios para la UI:
 * - `status` {string}: Estado de la petición ('idle', 'loading', 'succeeded', 'failed').
 * - `error` {string|null}: Mensaje de error en caso de fallo.
 * - `filteredCharacters` {Array<object>}: Lista de personajes filtrada por búsqueda.
 * - `favorites` {Array<object>}: Lista de personajes en favoritos.
 * - `searchTerm` {string}: Término de búsqueda actual.
 * - `handleSearch` {function(string): void}: Actualiza el término de búsqueda.
 * - `handleToggleFavorite` {function(object): void}: Alterna el estado de favorito.
 * - `handleRemoveFavorite` {function(object): void}: Elimina de favoritos.
 * - `handleRetry` {function(): void}: Reintenta la carga de datos.
 */
export const useCharacters = () => {
  /* local state */
  const [searchTerm, setSearchTerm] = useState("");
  /* redux state */
  const { entities, favorites, status, error } = useSelector(
    (state) => state.characters
  );
  const dispatch = useDispatch();

  /**
   * Efecto secundario que inicia la carga de personajes si el estado es 'idle'.
   * Evita llamadas redundantes a la API si los datos ya se están cargando o existen.
   */
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCharacters());
    }
  }, [status, dispatch]);

  /**
   * Lista de personajes filtrada según el término de búsqueda.
   * Utiliza `useMemo` para optimizar el rendimiento, recalculando el array solo
   * cuando cambian las entidades o el término de búsqueda.
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
   * Alterna la presencia de un personaje en la lista de favoritos.
   * Si ya existe lo elimina, de lo contrario lo añade.
   * @param {object} character - El objeto del personaje a procesar.
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
   * Elimina un personaje de la lista de favoritos.
   * @param {object} character - El objeto del personaje a eliminar.
   */
  const handleRemoveFavorite = (character) => {
    dispatch(removeFavorite(character));
  };
  /**
   * Actualiza el estado del término de búsqueda.
   * @param {string} value - Nuevo texto de búsqueda.
   */
  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  /**
   * Reintenta la carga de personajes despachando la acción correspondiente.
   * Útil en caso de error en la petición inicial.
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
