# 5.2. Despliegue

**Fecha:** 11/04/2026
**Versión:** 1.1

Este documento explica el proceso para desplegar la aplicación a producción utilizando GitHub Pages.

## 1. Despliegue Automático (CI/CD)

El proyecto utiliza GitHub Actions para despliegues automáticos a cada push en `main`.

**URL del sitio:** https://slinkter.github.io/myprojectapi03/

### Pipeline CI/CD

```yaml
# .github/workflows/deploy.yml
Jobs:
1. security-audit  - Auditoría de seguridad (pnpm audit)
2. build           - Build de producción (Vite)
3. test            - Pruebas unitarias (Vitest)
4. deploy          - Despliegue a GitHub Pages (peaceiris/actions-gh-pages)
```

### Configuración

- **Action:** peaceiris/actions-gh-pages@v3
- **Rama destino:** gh-pages
- **Directorio:** ./dist
- **Node.js:** 24

## 2. Despliegue Manual (Local)

También puedes desplegar manualmente desde tu máquina:

```bash
pnpm run deploy
```

### Requisitos previos

1. Asegúrate de tener habilitada la rama `gh-pages` en Settings → Pages → Source: "Deploy from a branch" → Branch: gh-pages /root

2. Configura el `homepage` en package.json:
```json
"homepage": "https://slinkter.github.io/myprojectapi03/"
```

## 3. Proceso de Despliegue (Paso a Paso)

Para realizar un despliegue manual:

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

## 4. Configuración en GitHub

Para que el despliegue funcione, la configuración del repositorio en GitHub debe estar ajustada para servir desde la rama `gh-pages`.

1. Ve a `Settings` > `Pages` en tu repositorio.
2. En `Build and deployment`, selecciona la fuente (`Source`) como `Deploy from a branch`.
3. Asegúrate de que la rama seleccionada (`Branch`) sea `gh-pages` con la carpeta `/(root)`.