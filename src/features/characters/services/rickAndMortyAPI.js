/**
 * @file Módulo de capa de datos para interactuar con la API de Rick and Morty.
 * Abstrae toda la comunicación de red.
 */

import { logger } from "@/services/logger";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://rickandmortyapi.com/api";

/**
 * Obtiene la lista completa de personajes.
 *
 * @async
 * @function fetchCharacters
 * @returns {Promise<Array>} Una promesa que se resuelve con la lista de personajes.
 * @throws {Error} Si la respuesta de la red no es exitosa.
 */
export const fetchCharacters = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/character`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    logger.apiError("/character", error, {
      baseUrl: API_BASE_URL,
      timestamp: new Date().toISOString(),
    });
    throw error;
  }
};
