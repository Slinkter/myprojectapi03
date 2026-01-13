# 🟢 FASE 4: Performance y Optimización

**Duración Estimada:** 9 horas  
**Prioridad:** MEDIA  
**Objetivo:** Optimizar performance y agregar capacidades PWA básicas.

---

## 📋 Checklist General

- [ ] 4.1 Optimizar imágenes (2h)
- [ ] 4.2 PWA básico (3h)
- [ ] 4.3 Optimizaciones adicionales (4h)
- [ ] Verificación final

---

## 🛠️ TAREA 4.1: Optimizar Imágenes (2 horas)

### **Paso 1: Lazy loading nativo** ⏱️ 30 min

**Ya implementado en CharacterCard.jsx, verificar:**

```jsx
<img
  src={character.image}
  alt={`${character.name} - ${character.species}`}
  loading="lazy"  // ✅ Ya existe
  decoding="async"  // ✅ Agregar si falta
  className="character-card__image"
/>
```

**✅ Verificación:**
- [ ] loading="lazy" en todas las imágenes
- [ ] decoding="async" agregado

---

### **Paso 2: Optimizar CSS de imágenes** ⏱️ 1 hora

**Ubicación:** `src/index.css`

```css
/* Character Card Image - OPTIMIZADO */
.character-card__image {
  @apply w-full h-64 object-cover;
  
  /* ✅ NUEVO: Optimizaciones */
  will-change: transform;
  backface-visibility: hidden;
  transform: translateZ(0);
  
  /* ✅ NUEVO: Placeholder mientras carga */
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.dark .character-card__image {
  background: linear-gradient(
    90deg,
    #2d3748 25%,
    #1a202c 50%,
    #2d3748 75%
  );
  background-size: 200% 100%;
}
```

**✅ Verificación:**
- [ ] will-change agregado
- [ ] Placeholder shimmer
- [ ] Dark mode soportado

---

### **Paso 3: Probar performance de imágenes** ⏱️ 30 min

**Herramientas:**

1. Chrome DevTools → Network
2. Throttling → Fast 3G
3. Verificar lazy loading funciona

**✅ Verificación:**
- [ ] Imágenes cargan solo al hacer scroll
- [ ] Shimmer effect visible
- [ ] Performance mejorada

---

## 🛠️ TAREA 4.2: PWA Básico (3 horas)

### **Paso 1: Instalar vite-plugin-pwa** ⏱️ 5 min

```bash
pnpm add -D vite-plugin-pwa
```

**✅ Verificación:**
- [ ] Librería instalada

---

### **Paso 2: Configurar en vite.config.js** ⏱️ 1 hora

**Ubicación:** `vite.config.js`

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from 'vite-plugin-pwa'; // ✅ NUEVO

export default defineConfig({
  base: "https://slinkter.github.io/myprojectapi03",
  plugins: [
    react(),
    // ✅ NUEVO: Configuración PWA
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['vite.svg', 'react.svg'],
      manifest: {
        name: 'Rick and Morty Explorer',
        short_name: 'R&M Explorer',
        description: 'Explora personajes de Rick and Morty',
        theme_color: '#06b6d4',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'vite.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/rickandmortyapi\.com\/api\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24, // 24 horas
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
```

**✅ Verificación:**
- [ ] Plugin importado
- [ ] Manifest configurado
- [ ] Workbox configurado
- [ ] Runtime caching para API

---

### **Paso 3: Crear iconos PWA** ⏱️ 1 hora

**Opción 1: Usar generador online**

1. Ir a https://www.pwabuilder.com/imageGenerator
2. Subir logo (512x512 mínimo)
3. Generar iconos
4. Descargar y colocar en `/public`

**Opción 2: Usar iconos existentes**

```javascript
// En manifest, actualizar icons:
icons: [
  {
    src: '/vite.svg',
    sizes: '192x192',
    type: 'image/svg+xml',
  },
  {
    src: '/react.svg',
    sizes: '512x512',
    type: 'image/svg+xml',
  },
],
```

**✅ Verificación:**
- [ ] Iconos en /public
- [ ] Manifest actualizado

---

### **Paso 4: Probar PWA** ⏱️ 1 hora

**Pasos:**

1. Ejecutar `pnpm run build`
2. Ejecutar `pnpm run preview`
3. Abrir DevTools → Application → Manifest
4. Verificar manifest correcto
5. Application → Service Workers
6. Verificar SW registrado
7. Probar "Install App"

**✅ Verificación:**
- [ ] Manifest válido
- [ ] Service Worker activo
- [ ] App instalable
- [ ] Funciona offline (básico)

---

## 🛠️ TAREA 4.3: Optimizaciones Adicionales (4 horas)

### **Paso 1: Code splitting mejorado** ⏱️ 1 hora

**Ya implementado con React.lazy, verificar:**

```jsx
// CharacterListPage.jsx
const CharacterList = React.lazy(() =>
  import("@/features/characters/components/CharacterList")
);
```

**Agregar más lazy loading si es necesario:**

```jsx
// Ejemplo: Si agregas más páginas
const AboutPage = React.lazy(() => import("@/pages/AboutPage"));
```

**✅ Verificación:**
- [ ] Lazy loading implementado
- [ ] Suspense con fallback

---

### **Paso 2: Optimizar bundle size** ⏱️ 1.5 horas

**Analizar bundle:**

```bash
pnpm add -D rollup-plugin-visualizer
```

**Actualizar vite.config.js:**

```javascript
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({...}),
    visualizer({ open: true }), // ✅ NUEVO
  ],
});
```

**Ejecutar:**

```bash
pnpm run build
```

**Analizar stats.html generado y optimizar si es necesario.**

**✅ Verificación:**
- [ ] Bundle analizado
- [ ] Tamaño < 200KB (gzipped)
- [ ] No hay dependencias duplicadas

---

### **Paso 3: Implementar Web Vitals** ⏱️ 1.5 horas

**Instalar:**

```bash
pnpm add web-vitals
```

**Crear archivo:** `src/utils/reportWebVitals.js`

```javascript
/**
 * @file Reporte de Web Vitals para monitoreo de performance.
 */
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

/**
 * Reporta Web Vitals a la consola (desarrollo) o servicio externo (producción).
 * 
 * @param {function} [onPerfEntry] - Callback opcional para manejar métricas
 */
export const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry);
    onFID(onPerfEntry);
    onFCP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
  }
};

/**
 * Log de métricas en consola (solo desarrollo).
 */
export const logWebVitals = () => {
  if (import.meta.env.DEV) {
    reportWebVitals((metric) => {
      console.log(`[Web Vitals] ${metric.name}:`, metric.value);
    });
  }
};
```

**Integrar en main.jsx:**

```jsx
import { logWebVitals } from '@/utils/reportWebVitals'; // ✅ NUEVO

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

// ✅ NUEVO: Iniciar monitoreo
logWebVitals();
```

**✅ Verificación:**
- [ ] web-vitals instalado
- [ ] reportWebVitals creado
- [ ] Integrado en main.jsx
- [ ] Métricas en consola (dev)

---

## ✅ VERIFICACIÓN FINAL DE FASE 4

### **Checklist Completa:**

**Imágenes:**
- [ ] Lazy loading nativo
- [ ] Decoding async
- [ ] Shimmer placeholder
- [ ] Optimizaciones CSS

**PWA:**
- [ ] vite-plugin-pwa instalado
- [ ] Manifest configurado
- [ ] Service Worker activo
- [ ] App instalable
- [ ] Runtime caching

**Optimizaciones:**
- [ ] Code splitting verificado
- [ ] Bundle analizado
- [ ] Web Vitals implementado

### **Prueba Final:**

1. Ejecutar `pnpm run build`
2. Verificar bundle size < 200KB
3. Ejecutar `pnpm run preview`
4. Lighthouse audit → Score > 90
5. Probar instalación PWA
6. Verificar offline básico funciona

### **Resultado Esperado:**

```
✅ Performance optimizado
✅ PWA funcional
✅ Bundle size reducido
✅ Web Vitals monitoreados
✅ Lighthouse score > 90
```

---

## 🎉 TODAS LAS FASES COMPLETADAS

### **Resumen de Mejoras:**

**Fase 1: Robustez** ✅
- Error Boundaries
- Persistencia de favoritos
- Mejor manejo de errores

**Fase 2: UX/UI** ✅
- Toast notifications
- Animaciones profesionales
- Loading states mejorados

**Fase 3: Accesibilidad** ✅
- Navegación por teclado
- Skip links
- Screen reader support

**Fase 4: Performance** ✅
- Imágenes optimizadas
- PWA básico
- Web Vitals

### **Calificación Final Esperada:**

```
ANTES:  8.5/10
DESPUÉS: 9.5/10

Robustez: 6/10 → 9/10
UX/UI: 8/10 → 9.5/10
Accesibilidad: 7/10 → 9/10
Performance: 8/10 → 9/10
```

---

## 📝 Documentación Final

**Actualizar:**

1. `README.md` - Agregar badges PWA
2. `src/docs/08-cierre-del-proyecto.md` - Actualizar estado
3. `CHANGELOG.md` - Crear con todas las mejoras

---

**Tiempo Total 4 Fases:** 34 horas  
**Dificultad:** Media  
**Impacto:** MUY ALTO

*Guía creada por: Arquitecto de Software Senior*  
*Fecha: 12 de Enero, 2026*
