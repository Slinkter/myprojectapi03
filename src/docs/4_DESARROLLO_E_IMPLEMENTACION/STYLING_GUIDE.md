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
# Informe de Auditoría UX/UI - Rick and Morty Explorer

**Perfil:** Senior UX/UI Designer & Frontend Optimizer
**Filosofía:** Aura (Minimalismo, Profundidad y Fluidez)

---

## 1. Análisis de Errores UX Detectados

| Componente | Error Detectado | Impacto |
|------------|-----------------|---------|
| **Header** | Logo con "API RICK & MORTIN" (Typo detectado). Padding fijo en móvil. | Identidad & Consistencia |
| **FavoritesList** | Spacing base 3 (`space-y-3`) no alineado a la escala base 4. Falta de espacio negativo. | Ritmo Visual |
| **SearchBar** | Ring de enfoque estándar (azul default). Sin micro-interacción al enfocar. | Feedback Visual |
| **CharacterCard** | Altura fija en contenido (`h-40`). Riesgo de corte en textos largos o traducciones. | Adaptabilidad |
| **CharacterList** | Grid de 1 columna en móvil (`grid-cols-1`). Demasiado scroll vertical. | Densidad de Info |

---

## 2. Refactorización CSS/Tailwind (Aura Optimization)

### 🧩 Header.jsx
```jsx
// Optimización: Responsive padding y escala áurea en logo
<header className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-200/50 dark:border-slate-800/50 transition-colors duration-500">
  <div className="max-w-screen-xl mx-auto px-6 py-5 flex justify-between items-center">
    <div className="text-2xl font-black tracking-tight text-cyan-500 hover:scale-105 transition-transform duration-300">
      <a href="/">RICK & MORTY <span className="text-slate-400 font-light">EXPLORER</span></a>
    </div>
    {/* ... */}
  </div>
</header>
```

### 🧩 CharacterCard.jsx
```jsx
// Optimización: Aspect-ratio y min-h en lugar de h-fijo
<div className="p-6 flex flex-col min-h-[160px] justify-between gap-4">
  <div className="space-y-2">
    <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
      {name}
    </h3>
    <p className="text-sm font-medium uppercase tracking-wider text-slate-400">
      {species}
    </p>
  </div>
  {/* Button logic... */}
</div>
```

---

## 3. Diagrama de Rejilla ASCII (Responsive Flow)

### Mobile (360px - 480px)
```text
+-----------------------+
|        Header         |
+-----------------------+
|  [ SearchBar (p-6) ]  |
+-----------------------+
|      +---------+      |
|      | Card 1  |      |
|      +---------+      |
|      | Card 2  |      |
|      +---------+      |
+-----------------------+
| (Single Column Flow)  |
```

### Desktop (1280px+)
```text
+-------------------------------------------------------+
|                        Header                         |
+-------------------------------------------------------+
|                [ SearchBar (max-w-2xl) ]              |
+-------------------------------------------------------+
|  +-------+  +-------+  +-------+  +-------+  +-------+|
|  |Card 1 |  |Card 2 |  |Card 3 |  |Card 4 |  |Card 5 ||
|  +-------+  +-------+  +-------+  +-------+  +-------+|
+-------------------------------------------------------+
| (Staggered 4-5 Column Grid / max-w-screen-xl)         |
```
