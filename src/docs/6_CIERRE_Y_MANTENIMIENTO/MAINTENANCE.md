# 6.1. Mantenimiento del Proyecto

**Fecha:** 31/12/2025
**Versión:** 1.0

Este documento proporciona directrices para el mantenimiento a largo plazo del proyecto.

## 1. Actualización de Dependencias

Las dependencias de frontend evolucionan rápidamente. Se recomienda revisar y actualizar las dependencias del proyecto de forma periódica (ej. trimestralmente) para incorporar mejoras de seguridad, rendimiento y nuevas funcionalidades.

-   Utiliza `pnpm outdated` para listar las dependencias desactualizadas.
-   Para actualizaciones mayores (ej. nueva versión de React o Vite), se debe proceder con cautela, leer los changelogs y realizar pruebas exhaustivas en una rama separada.

## 2. Reporte de Errores (Bugs)

Si se encuentra un error en la aplicación, se debe seguir el siguiente proceso:

1.  **Crear un "Issue"** en el repositorio de GitHub.
2.  El título del issue debe ser claro y conciso (ej. "Bug: La búsqueda de personajes falla con caracteres especiales").
3.  La descripción debe incluir:
    -   **Pasos para reproducir el error (Steps to Reproduce):** Una lista numerada y detallada.
    -   **Comportamiento esperado (Expected Behavior):** Qué debería haber ocurrido.
    -   **Comportamiento actual (Current Behavior):** Qué ocurrió en realidad.
    -   **Contexto adicional:** Capturas de pantalla, versión del navegador, mensajes de la consola, etc.

## 3. Proceso de Propuesta de Cambios (Features)

Para proponer nuevas funcionalidades o cambios significativos en la arquitectura:

1.  **Crear un "Issue"** en GitHub con la etiqueta "enhancement" o "feature request".
2.  Describir la funcionalidad deseada y justificar su valor para el proyecto.
3.  El equipo discutirá la propuesta en el propio issue.
4.  Si se aprueba, se seguirá el flujo de trabajo de Git (`feature-branch`) para su implementación.

## 4. Calidad del Código

El mantenimiento a largo plazo depende de mantener una alta calidad de código.

-   Cualquier nuevo código o modificación debe cumplir con las reglas de **ESLint** definidas.
-   Los nuevos componentes deben incluir **PropTypes**.
-   Se debe añadir o actualizar la **documentación** relevante en `src/docs` si el cambio afecta la arquitectura, los requerimientos o las guías de desarrollo.
