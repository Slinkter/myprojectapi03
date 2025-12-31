# 3.1. Arquitectura de la Aplicación

**Fecha:** 31/12/2025
**Versión:** 1.0

## 1. Filosofía Arquitectónica

La arquitectura de **Rick and Morty Explorer** se basa en los principios de **Arquitectura Limpia** adaptados a una aplicación de frontend con React. El objetivo principal es la **separación de preocupaciones (SoC)**, creando un sistema mantenible, escalable y fácil de testear.

Las responsabilidades se dividen en capas bien definidas:

1.  **Capa de Presentación (UI):** Componentes de React puros o casi puros.
2.  **Capa de Lógica de UI (Hooks):** Custom Hooks que orquestan la interacción entre la UI y el estado.
3.  **Capa de Estado (Store):** Lógica de estado global y de negocio, gestionada por Redux Toolkit.
4.  **Capa de Servicios (API):** Módulos que abstraen la comunicación con APIs externas.

## 2. Patrón de Diseño General

El proyecto sigue un patrón de **Componentes Inteligentes y Tontos (Smart and Dumb Components)**, aunque con una evolución moderna usando Hooks.

-   **Componentes Contenedores/Páginas (`/pages`):** Actúan como "componentes inteligentes". Orquestan la obtención de datos a través de hooks y pasan el estado y las funciones a los componentes de presentación.
-   **Componentes de Presentación (`/components`):** Actúan como "componentes tontos". Reciben datos a través de `props`, los renderizan y notifican eventos hacia arriba. Son altamente reutilizables y no tienen conocimiento del estado global o de las fuentes de datos.

## 3. Decisiones Tecnológicas Clave

| Componente      | Tecnología Elegida | Justificación                                                                                                                                  |
| :-------------- | :----------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| **UI Framework**    | **React**          | Estándar de la industria para construir interfaces interactivas y declarativas basadas en componentes.                                           |
| **Gestión de Estado** | **Redux Toolkit**  | Proporciona una solución robusta y predecible para el estado global, especialmente para manejar lógica asíncrona y datos cacheados complejos. |
| **Estilos**         | **Tailwind CSS**   | Framework utility-first que permite construir diseños complejos rápidamente sin salir del HTML/JSX, promoviendo la consistencia y el mantenimiento. |
| **Build Tool**      | **Vite**           | Ofrece una experiencia de desarrollo extremadamente rápida (HMR) y un proceso de build optimizado.                                             |

## 4. Estructura de Directorios

La estructura de `src` refleja la separación de capas:

```
src/
├── assets/             # Recursos estáticos (imágenes, SVGs)
├── components/         # Componentes de UI reutilizables y "tontos"
├── context/            # React Context para estado simple (ej. Theme)
├── hooks/              # Custom Hooks con lógica de negocio y de UI
├── pages/              # Componentes "inteligentes" que representan vistas
├── services/           # Abstracción para llamadas a APIs externas
├── store/              # Configuración y slices de Redux Toolkit
│   ├── slices/
│   └── store.js
├── App.jsx             # Componente raíz y enrutador (si aplica)
└── main.jsx            # Punto de entrada de la aplicación
```
