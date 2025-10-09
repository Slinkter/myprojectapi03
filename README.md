# Tutorial: Visor Interactivo de Personajes con React y Arquitectura FSD

## 1. Descripción General

Este proyecto es una aplicación web moderna construida con React que consume la API de Rick and Morty para mostrar un listado de personajes. La aplicación permite a los usuarios buscar personajes por nombre, añadirlos a una lista de favoritos y cambiar entre un tema claro y oscuro.

El objetivo principal de este proyecto es demostrar una arquitectura de frontend robusta y escalable utilizando **Feature-Sliced Design (FSD)**, gestión de estado centralizada con **Redux Toolkit**, y optimizaciones de rendimiento como **Code Splitting**.

## 2. Tecnologías Utilizadas

Basado en `package.json`, las tecnologías clave son:

-   **React 18:** Para la construcción de la interfaz de usuario.
-   **Vite:** Herramienta de build y servidor de desarrollo de alta velocidad.
-   **Redux Toolkit & React-Redux:** Para una gestión de estado global predecible y centralizada.
-   **Tailwind CSS:** Framework CSS "utility-first" para un estilizado rápido y responsivo.
-   **React Hooks:** Uso extensivo de `useState`, `useEffect`, `useMemo` y hooks personalizados para la lógica de UI.
-   **ESLint:** Para mantener la calidad y consistencia del código.

## 3. Arquitectura y Flujo de Datos

### Descripción de la Arquitectura

El proyecto está estructurado siguiendo la metodología **Feature-Sliced Design (FSD)**. Esta arquitectura organiza el código en capas basadas en su ámbito de responsabilidad, promoviendo una alta cohesión y un bajo acoplamiento.

-   **`app/`**: La capa de inicialización. Configura la tienda de Redux, los proveedores de contexto (ThemeProvider) y el enrutamiento global.
-   **`pages/`**: Compone los widgets y features para formar una página completa. Utiliza `React.lazy` para el code-splitting.
-   **`widgets/`**: Secciones complejas de la UI, como la lista completa de personajes (`CharacterList`) o el `Header`. Ensamblan features y entidades.
-   **`features/`**: Lógica de negocio y de interacción del usuario, como la búsqueda (`character-search`), la gestión de favoritos (`character-favorites`) o el cambio de tema (`theme-toggle`).
-   **`entities/`**: Unidades de negocio, como `character`. Contiene sus componentes de UI (`CharacterCard`), su modelo de datos y estado (el slice de Redux).
-   **`shared/`**: Código reutilizable sin lógica de negocio. Incluye la configuración de la API, componentes de UI genéricos (`ErrorMessage`, `LoadingSkeleton`) y hooks.

### Diagrama de Flujo

```mermaid
graph TD
    subgraph "Usuario"
        A[1. Carga la página]
        B[3. Escribe en SearchBar]
        C[4. Click en "Añadir/Quitar Favorito"]
    end

    subgraph "Capas de UI (Pages, Widgets, Features, Entities)"
        F[pages/CharacterListPage]
        G[widgets/CharacterList]
        H[features/SearchBar]
        I[entities/CharacterCard]
    end

    subgraph "Capa de Lógica (Hooks & Redux)"
        J(features/hooks/useCharacters)
        K(entities/character/model/characterSlice)
        L{Redux Store}
        M(Thunk: fetchCharacters)
    end

    subgraph "API Externa"
        N[Rick and Morty API]
    end

    A --> F;
    F -- Renderiza --> G;
    G -- Consume hook --> J;
    J -- Lee estado de --> L;
    J -- Detecta estado 'idle' --> M[2. Despacha fetchCharacters];
    M -- Llama a --> N;
    N -- Retorna datos --> M;
    M -- Actualiza estado en --> K;
    K -- Modifica --> L;
    L -- Notifica a la UI --> G;
    G -- Renderiza lista de --> I;

    B -- Evento onChange --> H;
    H -- Llama a handleSearch --> J;
    J -- Actualiza estado local (searchTerm) --> J;
    J -- Recalcula 'filteredCharacters' con useMemo --> G;

    C -- Evento onClick --> I;
    I -- Llama a onToggleFavorite --> J;
    J -- Despacha acción (add/remove) --> K;
    K -- Actualiza 'favorites' en --> L;
    L -- Notifica a la UI --> G;
```

### Explicación Detallada del Flujo

1.  **Carga Inicial:** Al cargar la página, `App.jsx` ejecuta un `useEffect` que llama a la API de Rick and Morty.
2.  **Pintado de Datos:** Los personajes obtenidos se guardan en el estado `characters` y, junto con el estado del tema (`darkMode`), se inyectan en el `ThemeContext.Provider`.
3.  **Consumo de Contexto:** Los componentes anidados como `Characters.jsx`, `Header.jsx` y `CardCharacter.jsx` consumen los datos y el estado del tema a través del hook `useContext`.
4.  **Búsqueda:** El usuario escribe en el `Input` del componente `Characters`. El `onChange` actualiza el estado local `search`. Un `useMemo` recalcula la lista de personajes filtrados (`filteredUsers`) solo cuando la lista original o el término de búsqueda cambian.
5.  **Añadir Favorito:** Al hacer clic en "Add" en una `CardCharacter`, se ejecuta la función `handleAddCharacter` (pasada por props). Esta función despacha una acción `ADDTOFAV` al `reducer` gestionado por `useReducer` en `Characters.jsx`. El `reducer` (definido en `utils.js`) añade el personaje al array `favorites` si no existe previamente.
6.  **Eliminar Favorito:** Al hacer clic en "Delete", se despacha la acción `DELETEFAV`, y el `reducer` filtra el array `favorites` para eliminar el personaje seleccionado.
7.  **Cambio de Tema:** Al hacer clic en el botón de modo, se actualiza el estado `darkMode` en `App.jsx`, lo que provoca que el `ThemeContext` distribuya el nuevo valor y todos los componentes suscritos se vuelvan a renderizar con los estilos correspondientes.

## 4. Estructura de Carpetas

```
/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   ├── components/
│   │   │   ├── CardCharacter.jsx
│   │   │   ├── Characters.jsx
│   │   │   ├── Header.jsx
│   │   │   └── utils.js
│   │   ├── context/
│   │   │   └── context.js
│   │   └── hooks/
│   │       └── useCharacters.js  (No utilizado actualmente)
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .eslintrc.cjs
├── package.json
└── README.md
```

-   **`src/`**: Contiene todo el código fuente de la aplicación.
-   **`src/assets/components/`**: Almacena los componentes reutilizables de React que conforman la interfaz. `utils.js` contiene la lógica del reducer.
-   **`src/assets/context/`**: Define el `ThemeContext` de React para la inyección de dependencias y estado global.
-   **`src/assets/hooks/`**: Destinado a hooks personalizados. Aunque existe `useCharacters.js`, la lógica principal se ha implementado directamente en los componentes en esta versión.
-   **`src/App.jsx`**: Componente raíz que ensambla la aplicación.
-   **`src/main.jsx`**: Punto de entrada de la aplicación, donde se renderiza el componente `App`.

## 5. Componentes Clave y Lógica

-   **`App.jsx`**: Es el componente principal. Orquesta la aplicación, obtiene los datos iniciales de los personajes y gestiona el estado global del tema (claro/oscuro). Sirve como proveedor del `ThemeContext`.
-   **`assets/components/Characters.jsx`**: Es el "cerebro" de la interacción del usuario. Gestiona la lógica de la lista de favoritos usando `useReducer`, controla el campo de búsqueda y renderiza la lista de personajes filtrados.
-   **`assets/components/CardCharacter.jsx`**: Componente de presentación puro. Muestra la información de un único personaje y delega el evento "Add" a la función que recibe por props.
-   **`assets/components/utils.js`**: Archivo auxiliar que contiene la lógica pura del `reducer` para gestionar los favoritos. Define el estado inicial, los tipos de acciones (`ADDTOFAV`, `DELETEFAV`) y la función `reducer` que calcula el nuevo estado.

## 6. Instalación y Ejecución

1.  **Clonar el repositorio:**

    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd myprojectapi03
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    ```

3.  **Ejecutar en modo de desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173` (o el puerto que Vite asigne).
