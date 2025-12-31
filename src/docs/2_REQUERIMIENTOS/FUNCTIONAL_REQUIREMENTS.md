# 2.1. Requerimientos Funcionales y Casos de Uso

**Fecha:** 31/12/2025
**Versión:** 1.0

Este documento detalla los casos de uso del sistema "Rick & Morty Explorer", describiendo la funcionalidad desde la perspectiva del usuario.

## Actores

*   **Usuario Final:** Persona que interactúa con la interfaz web.
*   **Sistema:** La aplicación React.
*   **API Externa:** La API de Rick & Morty.

## Catálogo de Casos de Uso

| ID      | Nombre del Caso de Uso          | Prioridad |
| :------ | :------------------------------ | :-------- |
| **UC-01** | Consultar Listado de Personajes | Alta      |
| **UC-02** | Buscar Personaje por Nombre     | Alta      |
| **UC-03** | Gestionar Favoritos             | Media     |
| **UC-04** | Cambiar Tema (Dark/Light Mode)  | Baja      |
| **UC-05** | Manejo de Errores de Conexión   | Alta      |

---

### UC-01: Consultar Listado de Personajes

-   **Descripción:** El sistema debe obtener y mostrar una lista paginada de personajes al cargar la aplicación.
-   **Flujo Principal:**
    1.  El Usuario accede a la aplicación.
    2.  El Sistema muestra un indicador de carga (esqueleto de UI).
    3.  El Sistema realiza una petición a la API Externa.
    4.  Tras recibir la respuesta, el Sistema renderiza una cuadrícula de tarjetas (`CharacterCard`), cada una con la imagen, nombre y estado de un personaje.
-   **Flujo Alternativo (Error):** Si la petición falla, el Sistema muestra un mensaje de error y un botón para reintentar (ver UC-05).

### UC-02: Buscar Personaje por Nombre

-   **Descripción:** El usuario debe poder filtrar la lista de personajes por su nombre.
-   **Precondiciones:** La lista de personajes (UC-01) se ha cargado.
-   **Flujo Principal:**
    1.  El Usuario introduce texto en la barra de búsqueda.
    2.  El Sistema filtra en tiempo real la lista de personajes visibles, mostrando solo aquellos cuyos nombres coincidan con el texto introducido (sin distinción de mayúsculas/minúsculas).
    3.  Si no hay coincidencias, el Sistema muestra un mensaje indicándolo.

### UC-03: Gestionar Favoritos

-   **Descripción:** El usuario debe poder marcar y desmarcar personajes como favoritos, y ver su lista.
-   **Flujo Principal (Agregar):**
    1.  El Usuario hace clic en el botón "Añadir a Favoritos" en una tarjeta.
    2.  El Sistema añade el personaje a una lista de favoritos visible en la interfaz.
    3.  El botón en la tarjeta cambia para indicar que el personaje ya es favorito (ej. "Quitar de Favoritos").
-   **Flujo Principal (Quitar):**
    1.  El Usuario hace clic en el botón "Quitar de Favoritos" de una tarjeta o en un botón de eliminar junto al personaje en la lista de favoritos.
    2.  El Sistema elimina al personaje de la lista de favoritos y actualiza la interfaz.

### UC-04: Cambiar Tema (Dark/Light Mode)

-   **Descripción:** El usuario debe poder alternar entre un modo claro y oscuro.
-   **Flujo Principal:**
    1.  El Usuario hace clic en el botón de cambio de tema.
    2.  El Sistema invierte el tema actual de la interfaz, ajustando los colores de fondo, texto y componentes.
    3.  La preferencia de tema se debe mantener si el usuario recarga la página (usando `localStorage`).

### UC-05: Manejo de Errores de Conexión

-   **Descripción:** El sistema debe gestionar y comunicar adecuadamente los fallos en la obtención de datos.
-   **Flujo Principal:**
    1.  Durante la carga inicial (UC-01), la API Externa no responde o devuelve un error.
    2.  El Sistema deja de mostrar el indicador de carga.
    3.  El Sistema muestra un componente de error con un mensaje claro y un botón "Reintentar".
    4.  Si el Usuario hace clic en "Reintentar", el Sistema vuelve a ejecutar el flujo de UC-01.
