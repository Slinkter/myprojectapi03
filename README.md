# Proyecto: Visor de Personajes de Rick and Morty

## 1. Descripción General
Esta aplicación es un visor de personajes interactivo que consume datos de la API pública de [Rick and Morty](https://rickandmortyapi.com/). Permite a los usuarios explorar una lista de personajes, buscarlos por nombre y gestionar una lista de "favoritos". La interfaz también incluye una funcionalidad para cambiar entre un tema claro y uno oscuro, demostrando el uso de `Context API` para la gestión del tema global.

## 2. Tecnologías Utilizadas
-   **React:** Biblioteca principal para la construcción de la interfaz de usuario.
-   **Vite:** Herramienta de desarrollo y empaquetado de alta velocidad.
-   **Tailwind CSS:** Framework de CSS "utility-first" para un diseño rápido y responsivo.
-   **Material Tailwind:** Biblioteca de componentes de UI que combina Material Design con Tailwind CSS.
-   **React Hooks:** Se utilizan `useState`, `useEffect`, `useContext`, `useReducer`, `useMemo` y `useCallback` para gestionar el estado, los efectos secundarios y las optimizaciones de rendimiento.
-   **ESLint:** Para el análisis estático del código y el mantenimiento de la calidad.

## 3. Arquitectura y Flujo de Datos

### Descripción de la Arquitectura
El proyecto sigue una arquitectura por capas centrada en componentes, donde la lógica y el estado se separan de la presentación.

-   **Capa de Vista (View):** Compuesta por los componentes de React (`Header`, `Characters`, `CardCharacter`). Su única responsabilidad es renderizar la UI a partir de los datos y el estado que reciben, y delegar los eventos del usuario a las funciones correspondientes.
-   **Capa de Lógica de UI (UI Logic):** Gestionada principalmente en los componentes `App.jsx` y `Characters.jsx`.
    -   `App.jsx` maneja la lógica del tema (claro/oscuro) y la obtención inicial de datos de la API.
    -   `Characters.jsx` contiene la lógica para la búsqueda de personajes y la gestión de la lista de favoritos a través de un `useReducer`.
-   **Capa de Estado (State):** El estado se gestiona de dos maneras:
    -   **Estado Global:** El tema de la aplicación y la lista completa de personajes se distribuyen globalmente desde `App.jsx` a través de `ThemeContext`.
    -   **Estado Local Complejo:** La lista de favoritos se gestiona en `Characters.jsx` con un `useReducer` para un manejo de estado más predecible y escalable. La lógica del reducer se encuentra en `utils.js`.
-   **Capa de Acceso a Datos (Data Access):** La comunicación con la API externa de Rick and Morty se realiza directamente en el componente `App.jsx` usando la `fetch` API nativa del navegador dentro de un `useEffect`.

### Diagrama de Flujo
```mermaid
graph TD
    subgraph "Usuario"
        A[Carga la página]
        B[Escribe en el buscador]
        C[Click en "Add" a un personaje]
        D[Click en "Delete" de un favorito]
        E[Click en "Dark/Light Mode"]
    end

    subgraph "Capa de Vista (Componentes)"
        F[App.jsx]
        G[Characters.jsx]
        H[CardCharacter.jsx]
        I[Header.jsx]
    end

    subgraph "Capa de Lógica y Estado"
        J(Context: ThemeContext)
        K(Hook: useReducer en Characters.jsx)
        L(Reducer Logic en utils.js)
        M(API Fetch en App.jsx)
    end

    subgraph "API Externa"
        N[Rick and Morty API]
    end

    A --> F;
    F -- Pide datos --> M;
    M -- Llama a --> N;
    N -- Retorna datos --> M;
    M -- Actualiza estado (characters) --> F;
    F -- Provee datos y tema --> J;
    J -- Distribuye a --> G;
    J -- Distribuye a --> I;
    J -- Distribuye a --> H;
    
    B -- Evento onChange --> G;
    G -- Actualiza estado local (search) --> G;
    G -- Filtra lista con useMemo --> G;

    C -- Evento onClick --> H;
    H -- Llama a handleAddCharacter --> G;
    G -- Despacha acción ADDTOFAV --> K;
    K -- Usa lógica de --> L;
    L -- Retorna nuevo estado --> K;
    K -- Actualiza UI de favoritos --> G;

    D -- Evento onClick --> G;
    G -- Despacha acción DELETEFAV --> K;
    
    E -- Evento onClick --> I;
    I -- Llama a f_handleChangeMode --> F;
    F -- Actualiza estado (darkMode) --> F;
    F -- Provee nuevo tema --> J;

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