/**
 * @file Slice de Redux para la gestión del estado de la entidad 'character'.
 */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCharacters as fetchCharactersAPI } from "../../services/rickAndMortyAPI";

/**
 * Thunk asíncrono para obtener los datos de los personajes desde la API.
 * Maneja los estados de 'pending', 'fulfilled' y 'rejected'.
 */
export const fetchCharacters = createAsyncThunk(
    "characters/fetchCharacters",
    async (_, { rejectWithValue }) => {
        try {
            const characters = await fetchCharactersAPI();
            return characters;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    entities: [],
    favorites: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

const characterSlice = createSlice({
    name: "characters",
    initialState,
    // Reducers síncronos para manipular el estado
    reducers: {
        addFavorite: (state, action) => {
            const character = action.payload;
            const isFavorite = state.favorites.find(
                (fav) => fav.id === character.id
            );
            if (!isFavorite) {
                state.favorites.push(character);
            }
        },
        removeFavorite: (state, action) => {
            const character = action.payload;
            state.favorites = state.favorites.filter(
                (fav) => fav.id !== character.id
            );
        },
    },
    // Reducers asíncronos para manejar el estado del thunk
    extraReducers: (builder) => {
        builder
            .addCase(fetchCharacters.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchCharacters.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.entities = action.payload;
            })
            .addCase(fetchCharacters.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export const { addFavorite, removeFavorite } = characterSlice.actions;

export default characterSlice.reducer;
