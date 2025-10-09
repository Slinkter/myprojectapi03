/**
 * @file Módulo de capa de datos para interactuar con la API de Rick and Morty.
 * Abstrae toda la comunicación de red.
 */

const API_BASE_URL = "https://rickandmortyapi.com/api";

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
        console.error("Failed to fetch characters:", error);
        // Re-lanza el error para que la capa superior (el thunk) pueda manejarlo.
        throw error;
    }
};
