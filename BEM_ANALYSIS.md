# Análisis de la Estructura BEM en index.css

Este documento detalla la estructura de clases CSS utilizada en el proyecto, siguiendo la metodología BEM (Block, Element, Modifier).

| Concepto BEM | Clase | Función/Descripción |
| :--- | :--- | :--- |
| **Block** | `.app-layout` | Contenedor principal del layout de la aplicación. |
| **Element** | `.app-layout__main` | Área principal de contenido dentro del layout. |
| **Block** | `.header` | Componente de encabezado de la página. |
| **Element** | `.header__container` | Contenedor interno del encabezado para centrado y espaciado. |
| **Element** | `.header__logo` | Estilos para el logotipo dentro del encabezado. |
| **Element** | `.header__nav` | Contenedor de navegación dentro del encabezado. |
| **Block** | `.character-card` | Componente de tarjeta para mostrar información de un personaje. |
| **Element** | `.character-card__image-container` | Contenedor de la imagen del personaje. |
| **Element** | `.character-card__image` | Imagen del personaje. |
| **Element** | `.character-card__status` | Etiqueta de estado del personaje (vivo, muerto, etc.). |
| **Modifier** | `.character-card__status--alive` | Modificador para estado "Vivo" (color verde). |
| **Modifier** | `.character-card__status--dead` | Modificador para estado "Muerto" (color de acento/rojo). |
| **Modifier** | `.character-card__status--unknown` | Modificador para estado "Desconocido" (color secundario). |
| **Element** | `.character-card__content` | Contenedor del contenido textual de la tarjeta. |
| **Element** | `.character-card__title` | Título (nombre) del personaje en la tarjeta. |
| **Element** | `.character-card__subtitle` | Subtítulo (especie/origen) en la tarjeta. |
| **Element** | `.character-card__button` | Botón de acción dentro de la tarjeta. |
| **Modifier** | `.character-card__button--favorite` | Estilo para botón cuando es favorito (eliminar). |
| **Modifier** | `.character-card__button--not-favorite` | Estilo para botón cuando no es favorito (agregar). |
| **Block** | `.character-list` | Componente contenedor de la lista de personajes. |
| **Element** | `.character-list__header` | Encabezado de la sección de lista de personajes. |
| **Element** | `.character-list__title` | Título de la sección de lista. |
| **Element** | `.character-list__empty` | Mensaje mostrado cuando la lista está vacía. |
| **Element** | `.character-list__grid` | Grilla para organizar las tarjetas de personajes. |
| **Block** | `.search-bar` | Componente de barra de búsqueda. |
| **Element** | `.search-bar__input` | Campo de entrada de texto de la búsqueda. |
| **Block** | `.favorites-list` | Componente de lista de favoritos. |
| **Element** | `.favorites-list__container` | Contenedor interno de la lista de favoritos. |
| **Element** | `.favorites-list__title` | Título de la sección de favoritos. |
| **Element** | `.favorites-list__items` | Lista (`ul`) de ítems favoritos. |
| **Element** | `.favorites-list__item` | Ítem individual (`li`) de favorito. |
| **Element** | `.favorites-list__name` | Nombre del personaje en la lista de favoritos. |
| **Element** | `.favorites-list__remove-btn` | Botón para eliminar un favorito. |
| **Block** | `.character-grid-skeleton` | Estructura de carga (skeleton) para la grilla de personajes. |
| **Block** | `.error-message` | Componente para mostrar mensajes de error. |
| **Element** | `.error-message__title` | Título del mensaje de error. |
| **Element** | `.error-message__text` | Texto descriptivo del error. |
| **Element** | `.error-message__button` | Botón de acción (ej. reintentar) en el mensaje de error. |
| **Block** | `.loading-skeleton` | Componente de carga (skeleton) individual. |
| **Element** | `.loading-skeleton__pulse` | Contenedor con animación de pulso. |
| **Element** | `.loading-skeleton__image` | Placeholder para la imagen en el skeleton. |
| **Element** | `.loading-skeleton__content` | Placeholder para el contenido en el skeleton. |
| **Element** | `.loading-skeleton__line-lg` | Línea larga de texto simulado. |
| **Element** | `.loading-skeleton__line-md` | Línea media de texto simulado. |
| **Element** | `.loading-skeleton__button` | Botón simulado en el skeleton. |
| **Block** | `.theme-toggle-btn` | Botón para alternar el tema (claro/oscuro). |
