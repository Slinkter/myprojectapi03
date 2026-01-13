# 🚀 Plan de Mejoras en Fases - myprojectapi03

**Proyecto:** Rick and Morty Explorer  
**Fecha:** 12 de Enero, 2026  
**Objetivo:** Evolucionar el proyecto de 8.5/10 a 9.5/10  

---

## ⚠️ EXCLUSIONES (Estudio Manual)

Las siguientes mejoras **NO** se implementarán en este plan (se harán manualmente):

- ❌ **Testing Suite** (Vitest, React Testing Library)
- ❌ **Migración a TypeScript**

**Razón:** Temas de estudio personal que requieren aprendizaje profundo.

---

## 📊 Estado Actual vs Objetivo

| Aspecto | Actual | Objetivo | Gap |
|---------|--------|----------|-----|
| Arquitectura | 9/10 | 9.5/10 | +0.5 |
| Funcionalidad | 7/10 | 9/10 | +2.0 |
| UX/UI | 8/10 | 9.5/10 | +1.5 |
| Performance | 8/10 | 9/10 | +1.0 |
| Accesibilidad | 7/10 | 9/10 | +2.0 |
| Robustez | 6/10 | 9/10 | +3.0 |

---

## 🎯 FASE 1: Robustez y Manejo de Errores (Semana 1)

**Objetivo:** Hacer la app más resiliente a errores.

### **1.1 Implementar Error Boundaries** ⏱️ 4 horas

**Prioridad:** 🔴 CRÍTICA

**Archivos a crear:**
- `src/components/ErrorBoundary.jsx`
- `src/components/ErrorFallback.jsx`

**Implementación:**

```jsx
// src/components/ErrorBoundary.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { ErrorFallback } from './ErrorFallback';
import { logger } from '@/services/logger';

/**
 * Error Boundary para capturar errores de componentes hijos.
 * Previene que toda la app se rompa por un error en un componente.
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    logger.error('Component Error Boundary', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback 
          error={this.state.error} 
          onReset={this.handleReset}
        />
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};
```

**Integración en App.jsx:**

```jsx
import { ErrorBoundary } from '@/components/ErrorBoundary';

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <ErrorBoundary>  {/* ✅ Agregar aquí */}
          <div className="app-layout">
            <Header />
            <main className="app-layout__main">
              <CharacterListPage />
            </main>
          </div>
        </ErrorBoundary>
      </ThemeProvider>
    </React.StrictMode>
  );
}
```

**Criterio de Aceptación:**
- [ ] Error Boundary implementado
- [ ] ErrorFallback con UI amigable
- [ ] Logging de errores funcional
- [ ] App no se rompe completamente ante errores

---

### **1.2 Persistencia de Favoritos en localStorage** ⏱️ 3 horas

**Prioridad:** 🟡 ALTA

**Archivo a modificar:**
- `src/features/characters/slices/characterSlice.js`

**Implementación:**

```javascript
// Helpers para localStorage
const FAVORITES_KEY = 'rickmorty_favorites';

const loadFavoritesFromStorage = () => {
  try {
    const saved = localStorage.getItem(FAVORITES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    logger.error('Error loading favorites from localStorage', error);
    return [];
  }
};

const saveFavoritesToStorage = (favorites) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    logger.error('Error saving favorites to localStorage', error);
  }
};

// Actualizar initialState
const initialState = {
  entities: [],
  favorites: loadFavoritesFromStorage(), // ✅ Cargar desde localStorage
  status: 'idle',
  error: null,
};

// Actualizar reducers
reducers: {
  addFavorite: (state, action) => {
    const character = action.payload;
    const exists = state.favorites.find(fav => fav.id === character.id);
    if (!exists) {
      state.favorites.push(character);
      saveFavoritesToStorage(state.favorites); // ✅ Persistir
    }
  },
  removeFavorite: (state, action) => {
    const character = action.payload;
    state.favorites = state.favorites.filter(fav => fav.id !== character.id);
    saveFavoritesToStorage(state.favorites); // ✅ Persistir
  },
}
```

**Criterio de Aceptación:**
- [ ] Favoritos persisten al recargar página
- [ ] Manejo de errores en localStorage
- [ ] Logging de errores implementado

---

### **1.3 Mejorar Manejo de Errores de API** ⏱️ 2 horas

**Prioridad:** 🟡 ALTA

**Archivo a modificar:**
- `src/features/characters/services/rickAndMortyAPI.js`

**Implementación:**

```javascript
/**
 * Tipos de errores personalizados
 */
class APIError extends Error {
  constructor(message, status, endpoint) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.endpoint = endpoint;
  }
}

export const fetchCharacters = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/character`, {
      signal: AbortSignal.timeout(10000), // ✅ Timeout de 10s
    });
    
    if (!response.ok) {
      throw new APIError(
        `Failed to fetch characters`,
        response.status,
        '/character'
      );
    }
    
    const data = await response.json();
    
    if (!data.results || !Array.isArray(data.results)) {
      throw new APIError('Invalid API response format', 200, '/character');
    }
    
    return data.results;
  } catch (error) {
    if (error.name === 'TimeoutError') {
      logger.apiError('/character', new Error('Request timeout'));
      throw new Error('La petición tardó demasiado. Intenta de nuevo.');
    }
    
    if (error instanceof APIError) {
      logger.apiError(error.endpoint, error, { status: error.status });
      throw new Error(`Error ${error.status}: ${error.message}`);
    }
    
    logger.apiError('/character', error);
    throw new Error('Error de red. Verifica tu conexión.');
  }
};
```

**Criterio de Aceptación:**
- [ ] Timeout de 10 segundos implementado
- [ ] Mensajes de error más descriptivos
- [ ] Validación de formato de respuesta

---

## 🎨 FASE 2: Mejoras de UX/UI (Semana 2)

**Objetivo:** Mejorar la experiencia visual y de usuario.

### **2.1 Implementar Toast Notifications** ⏱️ 4 horas

**Prioridad:** 🟡 ALTA

**Librería:** `react-hot-toast` (ligera, 3KB)

**Instalación:**

```bash
pnpm add react-hot-toast
```

**Archivos a crear/modificar:**
- `src/components/Toaster.jsx`
- `src/App.jsx` (integrar)
- `src/features/characters/hooks/useCharacters.js` (usar)

**Implementación:**

```jsx
// src/App.jsx
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'var(--toast-bg)',
            color: 'var(--toast-text)',
          },
        }}
      />
      {/* resto de la app */}
    </>
  );
}

// src/features/characters/hooks/useCharacters.js
import toast from 'react-hot-toast';

const handleToggleFavorite = (character) => {
  const isFavorite = favorites.some((fav) => fav.id === character.id);
  
  if (isFavorite) {
    dispatch(removeFavorite(character));
    toast.success(`${character.name} eliminado de favoritos`); // ✅
  } else {
    dispatch(addFavorite(character));
    toast.success(`${character.name} agregado a favoritos`); // ✅
  }
};
```

**Criterio de Aceptación:**
- [ ] Notificaciones al agregar/quitar favoritos
- [ ] Notificaciones de error de API
- [ ] Soporte para dark mode
- [ ] Animaciones suaves

---

### **2.2 Mejorar Animaciones y Transiciones** ⏱️ 3 horas

**Prioridad:** 🟢 MEDIA

**Archivo a modificar:**
- `src/index.css`

**Implementación:**

```css
/* Animaciones mejoradas */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Aplicar a componentes */
.character-card {
  animation: slideInUp 0.3s ease-out;
  animation-fill-mode: both;
}

.character-card:nth-child(1) { animation-delay: 0.05s; }
.character-card:nth-child(2) { animation-delay: 0.1s; }
.character-card:nth-child(3) { animation-delay: 0.15s; }
/* ... hasta 8 */

.favorites-list__item {
  animation: scaleIn 0.2s ease-out;
}

/* Hover mejorado */
.character-card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.character-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}
```

**Criterio de Aceptación:**
- [ ] Animaciones de entrada escalonadas
- [ ] Hover effects mejorados
- [ ] Transiciones suaves
- [ ] Performance sin degradación

---

### **2.3 Agregar Loading States Mejorados** ⏱️ 2 horas

**Prioridad:** 🟢 MEDIA

**Archivo a crear:**
- `src/components/LoadingSpinner.jsx`

**Implementación:**

```jsx
/**
 * Spinner de carga animado para estados de loading.
 */
export const LoadingSpinner = ({ size = 'md', text = 'Cargando...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`${sizeClasses[size]} border-4 border-primary border-t-transparent rounded-full animate-spin`} />
      {text && <p className="mt-4 text-gray-600 dark:text-gray-400">{text}</p>}
    </div>
  );
};
```

**Usar en CharacterList:**

```jsx
{status === 'loading' && (
  <LoadingSpinner size="lg" text="Cargando personajes..." />
)}
```

**Criterio de Aceptación:**
- [ ] Spinner animado implementado
- [ ] Texto configurable
- [ ] Tamaños variables (sm, md, lg)
- [ ] Soporte dark mode

---

## ♿ FASE 3: Accesibilidad (Semana 3)

**Objetivo:** Alcanzar WCAG 2.1 AA compliance.

### **3.1 Mejorar Navegación por Teclado** ⏱️ 3 horas

**Prioridad:** 🟡 ALTA

**Archivos a modificar:**
- `src/features/characters/components/CharacterCard.jsx`
- `src/components/SearchBar.jsx`

**Implementación:**

```jsx
// CharacterCard.jsx
export const CharacterCard = ({ character, onToggleFavorite }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggleFavorite(character);
    }
  };

  return (
    <div 
      className="character-card"
      role="article"
      aria-label={`Personaje: ${character.name}`}
    >
      {/* ... */}
      <button
        onClick={() => onToggleFavorite(character)}
        onKeyPress={handleKeyPress}
        aria-pressed={isFavorite}
        aria-label={isFavorite ? `Quitar ${character.name} de favoritos` : `Agregar ${character.name} a favoritos`}
      >
        {isFavorite ? 'Quitar de Favoritos' : 'Añadir a Favoritos'}
      </button>
    </div>
  );
};
```

**Criterio de Aceptación:**
- [ ] Navegación completa con Tab
- [ ] Enter/Space activan botones
- [ ] Focus visible en todos los elementos
- [ ] ARIA labels correctos

---

### **3.2 Agregar Skip Links** ⏱️ 2 horas

**Prioridad:** 🟢 MEDIA

**Archivo a crear:**
- `src/components/SkipLink.jsx`

**Implementación:**

```jsx
/**
 * Skip link para navegación rápida al contenido principal.
 */
export const SkipLink = () => {
  return (
    <a
      href="#main-content"
      className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded"
    >
      Saltar al contenido principal
    </a>
  );
};

// CSS en index.css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

**Integrar en App.jsx:**

```jsx
<SkipLink />
<Header />
<main id="main-content" className="app-layout__main">
  <CharacterListPage />
</main>
```

**Criterio de Aceptación:**
- [ ] Skip link invisible por defecto
- [ ] Visible al recibir focus
- [ ] Funciona correctamente
- [ ] Estilizado apropiadamente

---

### **3.3 Anuncios de Screen Reader** ⏱️ 2 horas

**Prioridad:** 🟢 MEDIA

**Archivo a crear:**
- `src/components/LiveRegion.jsx`

**Implementación:**

```jsx
/**
 * Live region para anuncios de screen reader.
 */
export const LiveRegion = ({ message, politeness = 'polite' }) => {
  return (
    <div
      role="status"
      aria-live={politeness}
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
};

// Usar en CharacterList
const [announcement, setAnnouncement] = useState('');

useEffect(() => {
  if (status === 'succeeded') {
    setAnnouncement(`${filteredCharacters.length} personajes encontrados`);
  }
}, [status, filteredCharacters.length]);

return (
  <>
    <LiveRegion message={announcement} />
    {/* resto del componente */}
  </>
);
```

**Criterio de Aceptación:**
- [ ] Anuncios al cargar personajes
- [ ] Anuncios al buscar
- [ ] Anuncios al agregar/quitar favoritos
- [ ] No interfiere con UI visual

---

## ⚡ FASE 4: Performance y Optimización (Semana 4)

**Objetivo:** Mejorar métricas de performance.

### **4.1 Implementar Virtualización de Lista** ⏱️ 4 horas

**Prioridad:** 🟢 MEDIA (solo si crece la lista)

**Librería:** `react-window` (solo si hay >100 personajes)

**Nota:** Por ahora solo hay 20 personajes, implementar solo si se agrega paginación.

**Criterio de Aceptación:**
- [ ] Evaluar necesidad (si lista > 50 items)
- [ ] Implementar si es necesario
- [ ] Mantener UX consistente

---

### **4.2 Optimizar Imágenes** ⏱️ 2 horas

**Prioridad:** 🟢 MEDIA

**Implementación:**

```jsx
// CharacterCard.jsx
<img
  src={character.image}
  alt={`${character.name} - ${character.species}`}
  loading="lazy"  // ✅ Lazy loading nativo
  decoding="async"  // ✅ Decodificación asíncrona
  className="character-card__image"
/>
```

**Criterio de Aceptación:**
- [ ] Lazy loading en todas las imágenes
- [ ] Alt text descriptivo
- [ ] Decodificación asíncrona

---

### **4.3 Implementar Service Worker (PWA Básico)** ⏱️ 3 horas

**Prioridad:** 🟢 BAJA

**Plugin:** `vite-plugin-pwa`

```bash
pnpm add -D vite-plugin-pwa
```

**Configuración:**

```javascript
// vite.config.js
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Rick and Morty Explorer',
        short_name: 'R&M Explorer',
        description: 'Explora personajes de Rick and Morty',
        theme_color: '#06b6d4',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
});
```

**Criterio de Aceptación:**
- [ ] Service Worker registrado
- [ ] Manifest configurado
- [ ] App instalable
- [ ] Cache de assets estáticos

---

## 📅 CRONOGRAMA RESUMIDO

| Fase | Duración | Esfuerzo | Prioridad |
|------|----------|----------|-----------|
| **Fase 1: Robustez** | Semana 1 | 9h | 🔴 CRÍTICA |
| **Fase 2: UX/UI** | Semana 2 | 9h | 🟡 ALTA |
| **Fase 3: Accesibilidad** | Semana 3 | 7h | 🟡 ALTA |
| **Fase 4: Performance** | Semana 4 | 9h | 🟢 MEDIA |
| **TOTAL** | 4 semanas | 34h | - |

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

### **Semana 1: Robustez**
- [ ] Error Boundary implementado
- [ ] ErrorFallback con UI amigable
- [ ] Favoritos persisten en localStorage
- [ ] Manejo de errores de API mejorado
- [ ] Timeout de requests implementado

### **Semana 2: UX/UI**
- [ ] Toast notifications funcionando
- [ ] Animaciones mejoradas
- [ ] Loading spinner implementado
- [ ] Hover effects mejorados

### **Semana 3: Accesibilidad**
- [ ] Navegación por teclado completa
- [ ] Skip links implementados
- [ ] ARIA labels correctos
- [ ] Anuncios de screen reader

### **Semana 4: Performance**
- [ ] Lazy loading de imágenes
- [ ] Service Worker (opcional)
- [ ] PWA básico (opcional)

---

## 🎯 RESULTADO ESPERADO

### **Antes (Actual):**
```
Calificación: 8.5/10
- Arquitectura: 9/10
- Funcionalidad: 7/10
- UX/UI: 8/10
- Accesibilidad: 7/10
- Robustez: 6/10
```

### **Después (Objetivo):**
```
Calificación: 9.5/10
- Arquitectura: 9.5/10
- Funcionalidad: 9/10
- UX/UI: 9.5/10
- Accesibilidad: 9/10
- Robustez: 9/10
```

---

## 📝 NOTAS IMPORTANTES

1. **Testing y TypeScript:** Se harán manualmente por estudio personal
2. **Prioridades:** Fase 1 es crítica, el resto es flexible
3. **Tiempo:** Estimaciones conservadoras, ajustar según disponibilidad
4. **Documentación:** Actualizar docs al completar cada fase

---

**Próximo Paso:** ¿Empezamos con la Fase 1 (Error Boundaries)?

*Plan creado por: Arquitecto de Software Senior*  
*Fecha: 12 de Enero, 2026*
