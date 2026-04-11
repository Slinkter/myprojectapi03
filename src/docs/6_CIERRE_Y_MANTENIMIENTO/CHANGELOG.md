# 6.3. Registro de Cambios (Changelog)

Este documento registra todos los cambios importantes realizados en el proyecto. El formato se basa en [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.1.1] - 2026-04-11

### Fixed
- Arreglado error de exit code en audit de seguridad (pnpm audit).
- Removido pnpm-workspace.yaml duplicado y configurado correctamente.
- Corregida versión duplicada de pnpm (workflow vs packageManager).
- Resuelto error "ERR_PNPM_CANNOT_DEPLOY" usando paziris/actions-gh-pages.
- Eliminado requisito de environment para GitHub Pages.

### Changed
- Cambiado de gh-pages CLI a peaceiris/actions-gh-pages@v3.
- Actualizado workflow para usar pnpm install directo.

### Added
- Configuración de pnpm-workspace.yaml para workspace válido.

---

## [1.1.0] - 2026-04-11

### Added
- Implementado ciclo de vida de desarrollo blindado (CI/CD).
- Configuración de Git Hooks (Husky) para pre-commit (lint-staged) y pre-push (test unitarios).
- Pipeline remoto de GitHub Actions para auditoría de seguridad, build, pruebas unitarias y despliegue automático.
- Suite de pruebas unitarias con Vitest.

