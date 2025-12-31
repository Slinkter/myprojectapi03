# 3.3. Estructura de Componentes

**Fecha:** 31/12/2025
**Versión:** 1.0

Este documento desglosa los componentes clave de la aplicación, su propósito y sus responsabilidades.

## 1. Jerarquía de Componentes

```
App.jsx
└── CharacterListPage.jsx
    ├── Header.jsx
    │   ├── SearchBar.jsx
    │   └── ThemeToggleButton.jsx
    │
    ├── CharacterList.jsx
    │   ├── CharacterCard.jsx
    │   └── CharacterGridSkeleton.jsx (si está cargando)
    │
    ├── FavoritesList.jsx
    │
    └── ErrorMessage.jsx (si hay error)
```

## 2. Descripción de Componentes Principales

### Componentes de Página (`/pages`)

-   **`CharacterListPage.jsx`**
    -   **Responsabilidad:** Orquestar la página principal. Es el "componente inteligente" que utiliza el hook `useCharacters` para obtener datos y lógica, y los distribuye a los componentes de presentación. Gestiona el estado del término de búsqueda.

### Componentes de Presentación (`/components`)

-   **`Header.jsx`**
    -   **Responsabilidad:** Renderizar la cabecera de la aplicación. Contiene el logo, la barra de búsqueda y el botón de cambio de tema.

-   **`SearchBar.jsx`**
    -   **Responsabilidad:** Renderizar un campo de entrada de texto. Es un componente controlado que recibe el valor y una función `onChange` desde su padre (`CharacterListPage`).

-   **`ThemeToggleButton.jsx`**
    -   **Responsabilidad:** Renderizar el botón que permite al usuario cambiar entre el tema claro y oscuro. Obtiene la lógica del `ThemeContext`.

-   **`CharacterList.jsx`**
    -   **Responsabilidad:** Gestionar la lógica de renderizado de la lista de personajes. Recibe el estado de la carga (`status`) y la lista de personajes. Decide si mostrar el esqueleto de carga, un mensaje de vacío, o la cuadrícula de personajes.

-   **`CharacterCard.jsx`**
    -   **Responsabilidad:** Mostrar la información de un único personaje (imagen, nombre, estado). Recibe los datos del personaje y las funciones para manejar la lógica de favoritos. Es un componente altamente reutilizable.

-   **`CharacterGridSkeleton.jsx` y `LoadingSkeleton.jsx`**
    -   **Responsabilidad:** Proveer una experiencia de usuario de "Carga Esqueleto" (Skeleton Loading) mientras se esperan los datos de la API, mejorando la performance percibida.

-   **`FavoritesList.jsx`**
    -   **Responsabilidad:** Mostrar la lista de personajes marcados como favoritos. Permite eliminar personajes de esta lista.

-   **`ErrorMessage.jsx`**
    -   **Responsabilidad:** Mostrar un mensaje de error estandarizado cuando falla una operación asíncrona (como la carga de datos). Recibe un mensaje y una función de reintento.
