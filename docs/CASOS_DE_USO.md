# Documentación de Casos de Uso: Rick & Morty Explorer

**Fecha:** 03/12/2025
**Versión:** 1.0
**Estado:** Revisión Técnica

## 1. Introducción
El presente documento detalla los casos de uso del sistema "Rick & Morty Explorer". Está dirigido al equipo de ingeniería de software para validar la lógica de negocio, los flujos de interacción y el comportamiento esperado del sistema bajo diferentes escenarios.

## 2. Actores
*   **Usuario Final:** Persona que interactúa con la interfaz web para consultar información sobre los personajes.
*   **Sistema (Frontend):** La aplicación React que gestiona la UI y el estado.
*   **API Externa (Rick & Morty API):** Servicio de terceros que provee los datos de los personajes.

## 3. Catálogo de Casos de Uso

| ID | Nombre del Caso de Uso | Prioridad |
| :--- | :--- | :--- |
| **UC-01** | Consultar Listado de Personajes | Alta |
| **UC-02** | Buscar Personaje por Nombre | Alta |
| **UC-03** | Gestionar Favoritos | Media |
| **UC-04** | Cambiar Tema (Dark/Light Mode) | Baja |
| **UC-05** | Manejo de Errores de Conexión | Alta |

---

### UC-01: Consultar Listado de Personajes

**Descripción:** El sistema obtiene y muestra una lista de personajes al cargar la aplicación.
**Precondiciones:** El usuario tiene acceso a internet y la API externa está operativa.

**Flujo Principal (Happy Path):**
1.  El **Usuario Final** accede a la URL de la aplicación.
2.  El **Sistema** inicializa el hook `useCharacters`.
3.  El **Sistema** detecta que el estado de carga es `idle`.
4.  El **Sistema** despacha la acción asíncrona `fetchCharacters` (Thunk).
5.  El **Sistema** realiza una petición `GET /character` a la **API Externa**.
6.  La **API Externa** responde con un código 200 y un JSON con los resultados.
7.  El **Sistema** actualiza el estado global (Redux) a `succeeded` y almacena los personajes.
8.  El **Sistema** renderiza el componente `CharacterList` con las tarjetas de los personajes.

**Flujos Alternativos:**
*   **3a. Datos ya cargados:** Si el estado es `succeeded`, el sistema no realiza una nueva petición y muestra los datos en caché.

---

### UC-02: Buscar Personaje por Nombre

**Descripción:** El usuario filtra la lista de personajes mostrados introduciendo un texto.
**Precondiciones:** La lista de personajes (UC-01) se ha cargado exitosamente.

**Flujo Principal:**
1.  El **Usuario Final** introduce texto en el componente `SearchBar`.
2.  El **Sistema** captura el evento `onChange` y actualiza el estado local `searchTerm`.
3.  El **Sistema** ejecuta un filtrado en tiempo real (`useMemo`) sobre la lista de personajes existente, buscando coincidencias en el atributo `name`.
4.  El **Sistema** actualiza la vista mostrando solo los personajes que coinciden con el criterio.

**Flujos Alternativos:**
*   **4a. Sin coincidencias:** Si el filtro no devuelve resultados, el **Sistema** muestra un mensaje "No se encontraron personajes con ese nombre".

---

### UC-03: Gestionar Favoritos

**Descripción:** El usuario puede marcar o desmarcar personajes como favoritos.
**Precondiciones:** Los personajes son visibles en pantalla.

**Flujo Principal (Agregar):**
1.  El **Usuario Final** hace clic en el botón "Añadir a Favoritos" en una `CharacterCard`.
2.  El **Sistema** despacha la acción `addFavorite` al store de Redux.
3.  El **Sistema** verifica que el personaje no esté duplicado en la lista de favoritos.
4.  El **Sistema** añade el personaje al array de favoritos.
5.  El **Sistema** actualiza el botón de la tarjeta a "Quitar de Favoritos" y cambia su estilo visual.
6.  El **Sistema** muestra el personaje en el widget `FavoritesList`.

**Flujo Principal (Quitar):**
1.  El **Usuario Final** hace clic en "Quitar de Favoritos" (en la tarjeta) o en el icono de eliminar (en la lista de favoritos).
2.  El **Sistema** despacha la acción `removeFavorite`.
3.  El **Sistema** elimina el personaje del array de favoritos en el store.
4.  El **Sistema** actualiza la UI reflejando que el personaje ya no es favorito.

---

### UC-04: Cambiar Tema (Dark/Light Mode)

**Descripción:** El usuario alterna entre el modo claro y oscuro de la interfaz.

**Flujo Principal:**
1.  El **Usuario Final** hace clic en el botón `ThemeToggleButton` en el `Header`.
2.  El **Sistema** invoca la función `toggleTheme` del `ThemeContext`.
3.  El **Sistema** invierte el valor del estado `darkMode` (true/false).
4.  El **Sistema** actualiza la clase CSS `dark` en el elemento `<html>` o `<body>`.
5.  Los estilos definidos con Tailwind (prefijo `dark:`) se aplican automáticamente, cambiando colores de fondo y texto.

---

### UC-05: Manejo de Errores de Conexión

**Descripción:** El sistema informa adecuadamente al usuario si falla la carga de datos.

**Flujo Principal:**
1.  Ocurre el paso 5 del **UC-01**, pero la **API Externa** no responde o retorna un error (500, 404).
2.  El **Sistema** (Thunk) captura la excepción.
3.  El **Sistema** despacha la acción `rejected` con el mensaje de error.
4.  El **Sistema** actualiza el estado global `status` a `failed`.
5.  El **Sistema** renderiza el componente `ErrorMessage` en lugar de la lista de personajes.
6.  El **Usuario Final** visualiza el mensaje de error y un botón "Reintentar".
7.  El **Usuario Final** hace clic en "Reintentar".
8.  El **Sistema** reinicia el flujo del **UC-01**.

## 4. Requisitos No Funcionales (Técnicos)

1.  **Performance:** El filtrado de búsqueda (UC-02) debe ser instantáneo (sin lag perceptible), optimizado mediante `useMemo`.
2.  **Persistencia:** (Opcional/Futuro) La lista de favoritos debería persistir en `localStorage` para no perderse al recargar la página.
3.  **Accesibilidad:** Los botones y campos de entrada deben tener etiquetas `aria-label` correctas (implementado en `SearchBar` y `FavoritesList`).
4.  **Mantenibilidad:** El código debe seguir la arquitectura definida (Slices, Hooks, Componentes BEM) para facilitar revisiones futuras.
