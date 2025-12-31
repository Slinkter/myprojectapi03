# 5.2. Despliegue

**Fecha:** 31/12/2025
**Versión:** 1.0

Este documento explica el proceso para desplegar la aplicación a producción utilizando GitHub Pages.

## 1. Herramientas y Configuración

-   **Hosting:** [GitHub Pages](https://pages.github.com/)
-   **Herramienta de Despliegue:** [gh-pages](https://www.npmjs.com/package/gh-pages), un paquete que simplifica la publicación de archivos en una rama `gh-pages`.

La configuración necesaria se encuentra en `package.json`:
-   **`homepage`:** (Añadir si es necesario) Para que la aplicación funcione en una subruta (ej. `https://<usuario>.github.io/<repositorio>/`), se debe añadir la URL pública en `package.json`:
    ```json
    "homepage": "https://<usuario>.github.io/<repositorio>/"
    ```
-   **Scripts de `package.json`:**
    ```json
    "scripts": {
      "predeploy": "npm run build",
      "deploy": "gh-pages -d dist"
    }
    ```
    -   `deploy`: Este es el comando principal. Invoca a `gh-pages` para que tome el contenido del directorio `dist` (la build de producción) y lo suba a la rama `gh-pages` del repositorio.
    -   `predeploy`: Este script se ejecuta automáticamente **antes** de `deploy`. Su función es asegurar que se genere una nueva build de producción (`npm run build`) justo antes de desplegar.

## 2. Proceso de Despliegue (Paso a Paso)

Para realizar un despliegue, simplemente ejecuta el siguiente comando desde la raíz del proyecto:

```bash
pnpm run deploy
```

### ¿Qué ocurre al ejecutar el comando?

1.  **`predeploy` se activa:** `pnpm` ejecuta el script `build`. Vite compila la aplicación y genera los archivos estáticos optimizados en la carpeta `/dist`.
2.  **`deploy` se activa:** El paquete `gh-pages` se ejecuta.
3.  Crea o actualiza la rama local `gh-pages` con el contenido de la carpeta `/dist`.
4.  Hace `push` de esa rama al repositorio remoto de GitHub.
5.  GitHub Pages detecta el `push` en la rama `gh-pages` y sirve automáticamente el contenido en la URL pública configurada.

Tras unos minutos, la nueva versión de la aplicación estará disponible online.

## 3. Configuración en GitHub

Para que el despliegue funcione, la configuración del repositorio en GitHub debe estar ajustada para servir desde la rama `gh-pages`.

1.  Ve a `Settings` > `Pages` en tu repositorio.
2.  En `Build and deployment`, selecciona la fuente (`Source`) como `Deploy from a branch`.
3.  Asegúrate de que la rama seleccionada (`Branch`) sea `gh-pages` con la carpeta `/(root)`.
