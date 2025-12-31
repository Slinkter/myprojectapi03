# 6.2. Glosario Técnico

**Fecha:** 31/12/2025
**Versión:** 1.0

Este glosario define los términos y conceptos técnicos clave utilizados en el proyecto.

---

-   **Arquitectura Limpia (Clean Architecture):** Un paradigma de diseño de software que promueve la separación de preocupaciones en capas, con una regla de dependencia que apunta hacia el interior (UI -> Lógica -> Datos), haciendo el sistema más independiente de frameworks y más testable.

-   **Componente Controlado (Controlled Component):** En React, un componente de formulario (como `<input>`) cuyo valor es controlado por el estado de React. El valor del input se pasa vía `props` y los cambios se notifican a través de callbacks como `onChange`.

-   **Custom Hook:** Una función de JavaScript cuyo nombre empieza por `use` y que puede llamar a otros Hooks. Son un mecanismo para reutilizar lógica con estado (stateful logic) entre componentes sin tener que modificar la jerarquía de componentes.

-   **ESLint:** Una herramienta de análisis de código estático (linter) para identificar y reportar patrones problemáticos encontrados en el código JavaScript/React, ayudando a mantener la calidad y consistencia del código.

-   **Hook:** Funciones especiales de React (ej. `useState`, `useEffect`, `useSelector`) que te permiten "enganchar" el estado y el ciclo de vida de React desde componentes funcionales.

-   **Hot Module Replacement (HMR):** Una funcionalidad de Vite y otros bundlers modernos que permite actualizar módulos en una aplicación en ejecución sin necesidad de recargar la página completa, acelerando drásticamente el desarrollo.

-   **Prop Drilling:** Un anti-patrón en React donde los `props` se pasan a través de varios niveles de componentes anidados que no los necesitan, solo para llegar a un componente hijo profundo. Se evita con Context API o librerías de estado global como Redux.

-   **PropTypes:** Mecanismo de validación de tipos en React que permite a los componentes especificar los tipos de `props` que esperan recibir, generando advertencias en la consola durante el desarrollo si los tipos no coinciden.

-   **Redux:** Una librería para gestionar y centralizar el estado de la aplicación. Implementa un contenedor predecible de estado basado en el patrón Flux.

-   **Redux Toolkit (RTK):** El conjunto de herramientas oficial y recomendado para el desarrollo con Redux. Simplifica enormemente la configuración del store, la creación de reductores y el manejo de lógica asíncrona.

-   **Slice:** Una porción del estado de Redux que se gestiona de forma conjunta, incluyendo su `reducer`, sus `actions` y su estado inicial. `createSlice` de RTK es la función para crearlos.

-   **SPA (Single-Page Application):** Una aplicación web que interactúa con el usuario reescribiendo dinámicamente la página actual en lugar de cargar páginas enteras nuevas desde el servidor.

-   **Tailwind CSS:** Un framework de CSS "utility-first" que proporciona clases de bajo nivel para construir diseños directamente en el marcado HTML/JSX, sin necesidad de escribir CSS personalizado.

-   **Thunk (Redux Thunk):** Un middleware de Redux que permite escribir creadores de acciones que devuelven una función en lugar de un objeto de acción. Esa función recibe `dispatch` y `getState` como argumentos y puede ser usada para lógica asíncrona (como llamadas a APIs). Viene incluido por defecto en Redux Toolkit.

-   **Vite:** Una herramienta de build y servidor de desarrollo para proyectos web modernos que ofrece una experiencia de desarrollo significativamente más rápida que las alternativas tradicionales.
