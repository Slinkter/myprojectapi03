# 5.1. Aseguramiento de la Calidad (QA)

**Fecha:** 31/12/2025
**Versión:** 1.0

Este documento describe las herramientas y procesos implementados para garantizar la calidad, robustez y mantenibilidad del código.

## 1. Análisis Estático de Código: ESLint

El proyecto utiliza **ESLint** para identificar y reportar patrones problemáticos en el código JavaScript y React.

-   **Configuración:** Las reglas se definen en el archivo `.eslintrc.cjs`. La configuración base incluye `eslint:recommended`, `plugin:react/recommended` y reglas específicas para hooks y accesibilidad.
-   **Ejecución:** El linter se puede ejecutar manualmente con el comando:
    ```bash
    pnpm run lint
    ```
-   **Integración:** Es un paso obligatorio en el flujo de contribución. El código no debe tener errores de ESLint para ser fusionado a la rama principal.

## 2. Validación de Tipos: PropTypes

Para mitigar errores en tiempo de ejecución y mejorar la auto-documentación de los componentes, el proyecto utiliza la librería `prop-types`.

-   **Obligatoriedad:** **Todos** los componentes que reciben `props` deben tener un bloque `propTypes` que defina el tipo de cada prop y si es requerido (`.isRequired`).
-   **Beneficios:**
    1.  **Seguridad:** Advierte en la consola de desarrollo si un componente recibe un prop de tipo incorrecto.
    2.  **Claridad:** Sirve como documentación a nivel de componente, dejando claro qué datos espera recibir.
    3.  **Refactorización Segura:** Facilita la identificación de componentes afectados cuando se modifica la forma de los datos.

**Ejemplo de implementación:**
```jsx
import PropTypes from "prop-types";

export const MyComponent = ({ title, onAction }) => {
  // ...
};

MyComponent.propTypes = {
  title: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
};
```

## 3. Pruebas (Testing)

Actualmente, el proyecto no cuenta con un arnés de pruebas automatizadas (unitarias, de integración o E2E).

### Propuesta a Futuro:
Para incrementar la robustez del proyecto, se recomienda implementar una estrategia de testing con las siguientes herramientas:

-   **Librería de Pruebas:** **Vitest**, por su excelente integración con Vite.
-   **Pruebas de Componentes:** **React Testing Library**, para realizar pruebas que simulen la interacción del usuario con la UI.
-   **Pruebas Unitarias:** Para los hooks y funciones de utilidad puras.

La prioridad sería añadir pruebas de integración para los flujos de usuario más críticos, como la búsqueda y la gestión de favoritos.
