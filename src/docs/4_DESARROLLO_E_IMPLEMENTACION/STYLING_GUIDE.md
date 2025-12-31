# 4.3. Guía de Estilos con Tailwind CSS

**Fecha:** 31/12/2025
**Versión:** 1.0

Este documento establece las directrices y convenciones para aplicar estilos en el proyecto utilizando **Tailwind CSS**.

## 1. Filosofía: Utility-First

El proyecto adopta un enfoque **utility-first**. En lugar de escribir CSS personalizado, construimos interfaces aplicando clases de utilidad preexistentes directamente en el marcado JSX.

-   **PROHIBIDO:** El uso de metodologías como BEM y la creación de clases CSS semánticas en archivos `.css` está desaconsejado.
-   **PERMITIDO:** La única excepción son estilos globales muy básicos (ej. color de fondo del `body`) definidos en `src/index.css`.

## 2. Configuración del Tema (`tailwind.config.js`)

El archivo `tailwind.config.js` es el corazón de nuestro sistema de diseño.

### Colores

Se ha definido una paleta de colores personalizada bajo `theme.extend.colors` para asegurar la consistencia visual. Estos colores tienen nombres semánticos que se adaptan al modo claro/oscuro.

-   `primary`: Color de acento principal (ej. `#06b6d4`).
-   `bg-primary-light` / `bg-primary-dark`: Colores de fondo principales para cada tema.
-   `text-primary-light` / `text-primary-dark`: Colores de texto principales para cada tema.

**Ejemplo de uso:**
```jsx
// Aplica el color de fondo primario, que cambiará automáticamente con el tema.
<div className="bg-bg-primary-light dark:bg-bg-primary-dark">
  // Aplica el color de texto primario.
  <h1 className="text-text-primary-light dark:text-text-primary-dark">
    Título
  </h1>
</div>
```

### Tipografía

La fuente principal es `Inter`, configurada en `theme.extend.fontFamily`.

### Animaciones

Se han añadido animaciones personalizadas como `fade-in` para mejorar la experiencia de usuario. Se pueden aplicar con `className="animate-fade-in"`.

## 3. Modo Oscuro (`darkMode`)

El modo oscuro está habilitado con la estrategia de `class`. El `ThemeProvider` se encarga de añadir o quitar la clase `dark` del elemento `<html>`.

Para definir un estilo específico para el modo oscuro, se utiliza el prefijo `dark:`.

**Ejemplo:**
```jsx
// Fondo blanco en modo claro, gris oscuro en modo oscuro.
// Texto negro en modo claro, blanco en modo oscuro.
<div className="bg-white dark:bg-slate-800 text-black dark:text-white">
  ...
</div>
```

## 4. Componentes y `@apply`

Para evitar la repetición de largas cadenas de clases en componentes reutilizables (como botones), se puede usar la directiva `@apply` en `src/index.css` de forma **muy limitada**.

**Ejemplo (uso aceptable para un componente base):**
```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

.btn-primary {
  @apply py-2 px-4 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary/80 focus:outline-none;
}
```
Sin embargo, la preferencia es siempre componer componentes en React y pasar `props` para variantes, en lugar de crear muchas clases CSS.
