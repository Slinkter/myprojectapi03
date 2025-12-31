# 4.1. Guía de Desarrollo

**Fecha:** 31/12/2025
**Versión:** 1.0

Esta guía contiene la información esencial para que un desarrollador pueda configurar, ejecutar y contribuir al proyecto.

## 1. Configuración del Entorno

### Prerrequisitos
-   Node.js (v18 o superior)
-   `pnpm` (recomendado) o `npm` / `yarn`

### Instalación
1.  Clona el repositorio desde GitHub.
2.  Navega a la raíz del proyecto.
3.  Instala las dependencias:
    ```bash
    pnpm install
    ```

## 2. Scripts del Proyecto

Los scripts están definidos en `package.json` y se ejecutan con `pnpm run <script>`.

-   `dev`: Inicia el servidor de desarrollo de Vite con Hot Module Replacement (HMR). Es el comando principal para el desarrollo diario.
-   `build`: Compila y transpila la aplicación para producción. El resultado se guarda en la carpeta `/dist`.
-   `lint`: Ejecuta ESLint para analizar el código en busca de errores, inconsistencias de estilo y potenciales bugs. Es obligatorio pasar el linter sin errores antes de integrar cambios.
-   `preview`: Inicia un servidor local que sirve el contenido de la carpeta `/dist`. Útil para verificar la build de producción antes de desplegar.
-   `deploy`: Despliega el contenido de la carpeta `/dist` a la rama `gh-pages` del repositorio, publicando el sitio en GitHub Pages. Este script ejecuta `predeploy` (que a su vez ejecuta `build`) automáticamente.

## 3. Convenciones de Código

### JavaScript/React
-   El código sigue las reglas definidas en el archivo `.eslintrc.cjs`.
-   Se utiliza ESModules (`import`/`export`).
-   Los componentes funcionales son la norma.
-   Se prefiere la desestructuración de props.
-   Todos los componentes deben tener `PropTypes` para validar sus `props`, mejorando la robustez y la auto-documentación.

### Nomenclatura de Archivos
-   Componentes React: `PascalCase.jsx` (ej. `CharacterCard.jsx`).
-   Hooks: `camelCase.js` (ej. `useCharacters.js`).
-   Archivos de estilos, servicios y configuración: `camelCase.js`.

## 4. Flujo de Trabajo (Git)

Se recomienda seguir un flujo basado en `feature-branches`:

1.  Desde la rama `main`, crea una nueva rama para tu tarea: `git checkout -b feature/nombre-de-la-feature`.
2.  Realiza tus cambios y haz commits atómicos.
3.  Asegúrate de que el código pasa el linter: `pnpm run lint`.
4.  Una vez finalizado, haz push de tu rama a GitHub y abre un Pull Request hacia `main`.
5.  Un Pull Request debe ser revisado por al menos otro miembro del equipo antes de ser fusionado.
