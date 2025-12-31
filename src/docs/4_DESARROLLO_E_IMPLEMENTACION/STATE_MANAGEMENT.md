# 4.2. Gestión de Estado con Redux Toolkit

**Fecha:** 31/12/2025
**Versión:** 1.0

Este documento detalla la estrategia de gestión de estado de la aplicación, implementada con **Redux Toolkit**.

## 1. Configuración del Store

El store de Redux se configura en `src/store/store.js`. Utiliza la función `configureStore` de Redux Toolkit, que simplifica la configuración y añade middleware útil por defecto, como `redux-thunk`.

El store combina los diferentes reductores (slices) de la aplicación.

```javascript
// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './slices/characterSlice';
import favoritesReducer from './slices/favoritesSlice';

export const store = configureStore({
  reducer: {
    characters: characterReducer,
    favorites: favoritesReducer,
  },
});
```

## 2. Slices

La lógica de Redux se organiza en "slices" utilizando la función `createSlice`. Cada slice corresponde a una pieza del estado de la aplicación y contiene sus propios reductores y acciones.

### `characterSlice.js`

-   **Responsabilidad:** Gestionar el estado relacionado con los personajes obtenidos de la API.
-   **Estado que maneja (`initialState`):**
    -   `entities`: Un array para almacenar la lista de personajes.
    -   `status`: Una cadena que representa el estado de la petición asíncrona (`'idle'`, `'loading'`, `'succeeded'`, `'failed'`).
    -   `error`: Un string para almacenar el mensaje de error si la petición falla.

-   **Lógica Asíncrona (`createAsyncThunk`):**
    -   `fetchCharacters`: Esta es una acción asíncrona que gestiona el ciclo de vida de la petición a la API.
    -   Utiliza los `extraReducers` del slice para manejar los estados de la promesa (`pending`, `fulfilled`, `rejected`), actualizando el `status`, `entities` y `error` de forma predecible.

### `favoritesSlice.js`

-   **Responsabilidad:** Gestionar la lista de personajes favoritos.
-   **Estado que maneja (`initialState`):**
    -   `items`: Un array para almacenar los objetos de los personajes favoritos.

-   **Reductores Síncronos (`reducers`):**
    -   `addFavorite`: Añade un personaje al array `items`, asegurándose de no duplicarlo.
    -   `removeFavorite`: Elimina un personaje del array `items` utilizando su `id`.

## 3. Interacción con Componentes

-   **Despachar Acciones:** Los componentes (o más comúnmente, los hooks) utilizan el hook `useDispatch` de `react-redux` para despachar acciones (tanto síncronas como asíncronas).
    ```javascript
    const dispatch = useDispatch();
    dispatch(fetchCharacters());
    dispatch(addFavorite(character));
    ```

-   **Leer Estado:** Los componentes utilizan el hook `useSelector` de `react-redux` para suscribirse a partes del estado del store y leer los datos que necesitan. `useSelector` se encarga de volver a renderizar el componente si los datos seleccionados cambian.
    ```javascript
    const { entities, status } = useSelector((state) => state.characters);
    const favorites = useSelector((state) => state.favorites.items);
    ```
