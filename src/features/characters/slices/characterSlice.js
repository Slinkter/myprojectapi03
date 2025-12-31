/**
 * @file Slice de Redux para la gestión del estado de la entidad 'character'.
 * Este archivo define el slice de Redux para manejar el estado relacionado con los personajes,
 * incluyendo la carga de datos, la gestión de favoritos y el seguimiento del estado de las solicitudes.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// Importa la función de la API para obtener personajes.
import { fetchCharacters as fetchCharactersAPI } from "@/features/characters/services/rickAndMortyAPI";

/**
 * Thunk asíncrono para obtener los datos de los personajes desde la API.
 * Utiliza `createAsyncThunk` para manejar el ciclo de vida de una solicitud asíncrona (pending, fulfilled, rejected).
 * @param {void} _ - No se esperan argumentos para esta acción.
 * @param {object} { rejectWithValue } - Objeto de Redux Toolkit para manejar errores y rechazarlos con un valor.
 * @returns {Promise<Array>} Una promesa que resuelve con la lista de personajes o rechaza con un mensaje de error.
 */
export const fetchCharacters = createAsyncThunk(
  "characters/fetchCharacters", // Nombre de la acción para identificarla en el store
  async (_, { rejectWithValue }) => {
    try {
      // Llama a la función de la API para obtener los personajes.
      const characters = await fetchCharactersAPI();
      // Retorna los personajes obtenidos para ser manejados por el estado 'fulfilled'.
      return characters;
    } catch (error) {
      // En caso de error, rechaza la promesa con el mensaje de error.
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Estado inicial del slice de personajes.
 * Define la estructura de los datos en el store de Redux para este slice.
 */
const initialState = {
  entities: [], // Array para almacenar la lista de todos los personajes obtenidos.
  favorites: [], // Array para almacenar los personajes marcados como favoritos.
  status: "idle", // Estado actual de la solicitud de datos: 'idle' | 'loading' | 'succeeded' | 'failed'.
  error: null, // Almacena cualquier mensaje de error si la solicitud falla.
};

/**
 * Crea un slice de Redux para los personajes.
 * `createSlice` genera automáticamente creadores de acciones y tipos de acción.
 */
const characterSlice = createSlice({
  name: "characters", // Nombre del slice, usado como prefijo para los tipos de acción.
  initialState, // El estado inicial definido anteriormente.
  /**
   * Reducers síncronos para manipular el estado.
   * Estos se llaman directamente desde las acciones despachadas.
   */
  reducers: {
    /**
     * Añade un personaje a la lista de favoritos si aún no está presente.
     * @param {object} state - El estado actual del slice.
     * @param {object} action - La acción despachada, `action.payload` contiene el personaje a añadir.
     */
    addFavorite: (state, action) => {
      const character = action.payload;
      // Comprueba si el personaje ya está en favoritos para evitar duplicados.
      const isFavorite = state.favorites.find((fav) => fav.id === character.id);
      if (!isFavorite) {
        // Si no es un favorito, lo añade al array.
        state.favorites.push(character);
      }
    },
    /**
     * Elimina un personaje de la lista de favoritos.
     * @param {object} state - El estado actual del slice.
     * @param {object} action - La acción despachada, `action.payload` contiene el personaje a eliminar.
     */
    removeFavorite: (state, action) => {
      const character = action.payload;
      // Filtra el array de favoritos para remover el personaje con el ID coincidente.
      state.favorites = state.favorites.filter(
        (fav) => fav.id !== character.id
      );
    },
  },
  /**
   * Reducers asíncronos para manejar el estado del thunk `fetchCharacters`.
   * `extraReducers` permite que el slice responda a tipos de acción definidos fuera del slice.
   */
  extraReducers: (builder) => {
    builder
      /**
       * Maneja el estado 'pending' cuando `fetchCharacters` está en progreso.
       * Establece el estado a 'loading' y limpia cualquier error previo.
       */
      .addCase(fetchCharacters.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      /**
       * Maneja el estado 'fulfilled' cuando `fetchCharacters` se completa exitosamente.
       * Establece el estado a 'succeeded' y guarda los personajes obtenidos en `entities`.
       */
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.entities = action.payload;
      })
      /**
       * Maneja el estado 'rejected' cuando `fetchCharacters` falla.
       * Establece el estado a 'failed' y guarda el mensaje de error.
       */
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // El payload en este caso es el mensaje de error de rejectWithValue.
      });
  },
});

// Exporta los creadores de acciones generados por `createSlice` para los reducers síncronos.
export const { addFavorite, removeFavorite } = characterSlice.actions;

// Exporta el reducer principal del slice para ser combinado en el root reducer del store de Redux.
export default characterSlice.reducer;
