# Rick and Morty Explorer

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://reactjs.org/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.11-764ABC?logo=redux)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)](https://vitejs.dev/)

Una aplicación web moderna que consume la [API de Rick and Morty](https://rickandmortyapi.com/) para mostrar, buscar y gestionar un listado de personajes.

Este proyecto sirve como una plantilla de referencia para documentar una aplicación React siguiendo las mejores prácticas de arquitectura limpia y organización de la documentación.

## Características Principales

-   **Listado y Búsqueda de Personajes:** Carga y muestra personajes con un buscador en tiempo real.
-   **Gestión de Favoritos:** Permite añadir y eliminar personajes de una lista local.
-   **Modo Oscuro:** Soporte para tema claro y oscuro.
-   **Gestión de Estado Centralizada:** Uso de Redux Toolkit para un manejo de estado predecible y robusto.
-   **Diseño Responsivo:** Interfaz adaptable a diferentes tamaños de pantalla.

## Tecnologías Utilizadas

-   **Framework Frontend:** [React](https://react.dev/)
-   **Gestión de Estado:** [Redux Toolkit](https://redux-toolkit.js.org/)
-   **Estilos CSS:** [Tailwind CSS](https://tailwindcss.com/)
-   **Herramienta de Build:** [Vite](https://vitejs.dev/)
-   **Validación de Tipos:** [PropTypes](https://www.npmjs.com/package/prop-types)
-   **Cliente HTTP:** Fetch API nativa

## Arquitectura

El proyecto implementa una **Feature-Based Architecture (Arquitectura basada en Características)**.
A diferencia de la arquitectura tradicional por capas (Layer-Based) donde los archivos se agrupan por tipo técnico (components, hooks, services), aquí agrupamos el código por **dominio funcional**.

### Estructura del Feature `characters`
Todo lo relacionado con la visualización y gestión de personajes se encuentra encapsulado en `src/features/characters/`:

-   **`components/`**: Componentes UI específicos (Card, List, Favorites).
-   **`hooks/`**: Lógica de negocio y View-Controllers (`useCharacters`).
-   **`services/`**: Comunicación con la API de Rick and Morty.
-   **`slices/`**: Gestión de estado global con Redux específico para este feature.

### ¿Por qué este cambio?
1.  **Escalabilidad:** Permite que el proyecto crezca sin convertir las carpetas genéricas en "cajones de sastre".
2.  **Mantenibilidad:** Al tener la vista, la lógica y el estado co-localizados, es más fácil entender y modificar una funcionalidad completa.
3.  **Encapsulamiento:** Facilita la reutilización y el testing de módulos completos.

## Instalación y Ejecución

1.  **Clonar el repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd myprojectapi03
    ```

2.  **Instalar dependencias** (se recomienda `pnpm` pero `npm` también funciona):
    ```bash
    pnpm install
    ```

3.  **Ejecutar en modo de desarrollo:**
    ```bash
    pnpm run dev
    ```
    La aplicación estará disponible en `http://localhost:5173`.

## Documentación del Proyecto

La documentación completa del proyecto (arquitectura, requerimientos, guías de desarrollo, etc.) se encuentra centralizada en la carpeta [`src/docs`](./src/docs).

## Scripts Disponibles

-   `pnpm run dev`: Inicia el servidor de desarrollo.
-   `pnpm run build`: Compila la aplicación para producción.
-   `pnpm run lint`: Ejecuta el linter (ESLint) para analizar el código.
-   `pnpm run preview`: Sirve la build de producción localmente.
-   `pnpm run deploy`: Despliega la aplicación a GitHub Pages.