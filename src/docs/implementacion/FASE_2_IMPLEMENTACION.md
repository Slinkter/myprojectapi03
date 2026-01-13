# 🟡 FASE 2: Mejoras de UX/UI

**Duración Estimada:** 9 horas  
**Prioridad:** ALTA  
**Objetivo:** Mejorar la experiencia visual y de usuario con notificaciones, animaciones y feedback visual.

---

## 📋 Checklist General

- [ ] 2.1 Toast Notifications (4h)
- [ ] 2.2 Animaciones mejoradas (3h)
- [ ] 2.3 Loading states mejorados (2h)
- [ ] Verificación final
- [ ] Actualizar documentación

---

## 🛠️ TAREA 2.1: Implementar Toast Notifications (4 horas)

### **Objetivo:**
Mostrar notificaciones visuales al usuario para acciones como agregar/quitar favoritos.

### **Paso 1: Instalar react-hot-toast** ⏱️ 5 min

```bash
pnpm add react-hot-toast
```

**✅ Verificación:**
- [ ] Librería instalada
- [ ] `package.json` actualizado

---

### **Paso 2: Configurar Toaster en App.jsx** ⏱️ 30 min

**Ubicación:** `src/App.jsx`

**Modificaciones:**

```jsx
import React from "react";
import { Toaster } from 'react-hot-toast'; // ✅ NUEVO
import { CharacterListPage } from "@/pages/CharacterListPage";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/context/ThemeProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <ErrorBoundary>
          {/* ✅ NUEVO: Agregar Toaster */}
          <Toaster 
            position="top-right"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
              // Opciones por defecto
              duration: 3000,
              style: {
                background: 'var(--toast-bg)',
                color: 'var(--toast-text)',
                borderRadius: '8px',
                padding: '16px',
              },
              // Estilos específicos por tipo
              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
          
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

export default App;
```

**✅ Verificación:**
- [ ] Import agregado
- [ ] Toaster configurado
- [ ] Posición top-right
- [ ] Duración 3 segundos

---

### **Paso 3: Agregar variables CSS para dark mode** ⏱️ 15 min

**Ubicación:** `src/index.css`

**Agregar al final del archivo:**

```css
/* Toast Notifications - Dark Mode Support */
:root {
  --toast-bg: #ffffff;
  --toast-text: #1f2937;
}

.dark {
  --toast-bg: #1f2937;
  --toast-text: #f3f4f6;
}
```

**✅ Verificación:**
- [ ] Variables CSS agregadas
- [ ] Soporte dark mode configurado

---

### **Paso 4: Integrar toasts en useCharacters** ⏱️ 2 horas

**Ubicación:** `src/features/characters/hooks/useCharacters.js`

**Modificaciones:**

```javascript
import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from 'react-hot-toast'; // ✅ NUEVO
import {
  fetchCharacters,
  addFavorite,
  removeFavorite,
} from "@/features/characters/slices/characterSlice";

export const useCharacters = () => {
  /* ... código existente ... */

  /**
   * Alterna la presencia de un personaje en la lista de favoritos.
   * Muestra notificación toast al usuario.
   * 
   * @param {object} character - El objeto del personaje a procesar.
   */
  const handleToggleFavorite = (character) => {
    const isFavorite = favorites.some((fav) => fav.id === character.id);
    
    if (isFavorite) {
      dispatch(removeFavorite(character));
      
      // ✅ NUEVO: Toast de éxito
      toast.success(`${character.name} eliminado de favoritos`, {
        icon: '💔',
        duration: 2000,
      });
    } else {
      dispatch(addFavorite(character));
      
      // ✅ NUEVO: Toast de éxito
      toast.success(`${character.name} agregado a favoritos`, {
        icon: '⭐',
        duration: 2000,
      });
    }
  };

  /**
   * Elimina un personaje de la lista de favoritos.
   * Muestra notificación toast al usuario.
   * 
   * @param {object} character - El objeto del personaje a eliminar.
   */
  const handleRemoveFavorite = (character) => {
    dispatch(removeFavorite(character));
    
    // ✅ NUEVO: Toast de éxito
    toast.success(`${character.name} eliminado de favoritos`, {
      icon: '🗑️',
      duration: 2000,
    });
  };

  /* ... resto del código ... */
};
```

**✅ Verificación:**
- [ ] Import de toast agregado
- [ ] handleToggleFavorite actualizado
- [ ] handleRemoveFavorite actualizado
- [ ] Iconos personalizados agregados
- [ ] JSDoc actualizado

---

### **Paso 5: Agregar toasts para errores de API** ⏱️ 1 hora

**Ubicación:** `src/features/characters/slices/characterSlice.js`

**Modificar extraReducers:**

```javascript
import toast from 'react-hot-toast'; // ✅ NUEVO al inicio

// En extraReducers:
extraReducers: (builder) => {
  builder
    .addCase(fetchCharacters.pending, (state) => {
      state.status = "loading";
      state.error = null;
    })
    .addCase(fetchCharacters.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.entities = action.payload;
      
      // ✅ NUEVO: Toast de éxito (opcional, puede ser molesto)
      // toast.success(`${action.payload.length} personajes cargados`);
    })
    .addCase(fetchCharacters.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
      
      // ✅ NUEVO: Toast de error
      toast.error(action.payload || 'Error al cargar personajes', {
        duration: 4000,
        icon: '❌',
      });
    });
},
```

**✅ Verificación:**
- [ ] Import agregado
- [ ] Toast en rejected
- [ ] Duración 4 segundos para errores
- [ ] Icono de error agregado

---

### **Paso 6: Probar toasts** ⏱️ 30 min

**Pasos de prueba:**

1. Ejecutar `pnpm run dev`
2. Agregar personaje a favoritos → Ver toast "agregado"
3. Quitar personaje de favoritos → Ver toast "eliminado"
4. Quitar desde lista de favoritos → Ver toast
5. Desconectar internet → Recargar → Ver toast de error
6. Verificar dark mode → Toasts deben verse bien
7. Verificar que desaparecen después de 2-3 segundos

**✅ Verificación:**
- [ ] Toasts aparecen correctamente
- [ ] Posición top-right
- [ ] Iconos se muestran
- [ ] Dark mode funciona
- [ ] Animaciones suaves
- [ ] Desaparecen automáticamente

---

## 🛠️ TAREA 2.2: Mejorar Animaciones (3 horas)

### **Objetivo:**
Agregar animaciones más suaves y profesionales.

### **Paso 1: Agregar keyframes CSS** ⏱️ 1 hora

**Ubicación:** `src/index.css`

**Agregar después de las variables CSS:**

```css
/* ============================================
   ANIMACIONES MEJORADAS
   ============================================ */

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}
```

**✅ Verificación:**
- [ ] Keyframes agregados
- [ ] 5 animaciones definidas

---

### **Paso 2: Actualizar animaciones de CharacterCard** ⏱️ 1 hora

**Ubicación:** `src/index.css`

**Modificar la sección `.character-card`:**

```css
/* Character Card Component - ANIMACIONES MEJORADAS */
.character-card {
  @apply bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg shadow-lg overflow-hidden;
  
  /* ✅ NUEVO: Animación de entrada */
  animation: slideInUp 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation-fill-mode: both;
  
  /* ✅ NUEVO: Transición suave */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ✅ NUEVO: Animaciones escalonadas */
.character-card:nth-child(1) { animation-delay: 0.05s; }
.character-card:nth-child(2) { animation-delay: 0.1s; }
.character-card:nth-child(3) { animation-delay: 0.15s; }
.character-card:nth-child(4) { animation-delay: 0.2s; }
.character-card:nth-child(5) { animation-delay: 0.25s; }
.character-card:nth-child(6) { animation-delay: 0.3s; }
.character-card:nth-child(7) { animation-delay: 0.35s; }
.character-card:nth-child(8) { animation-delay: 0.4s; }

/* ✅ MEJORADO: Hover effect */
.character-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

/* ✅ NUEVO: Focus visible para accesibilidad */
.character-card:focus-within {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
```

**✅ Verificación:**
- [ ] Animación slideInUp aplicada
- [ ] Delays escalonados (1-8)
- [ ] Hover mejorado
- [ ] Focus visible agregado

---

### **Paso 3: Animar FavoritesList** ⏱️ 30 min

**Ubicación:** `src/index.css`

**Modificar sección `.favorites-list__item`:**

```css
/* Favorites List Component - ANIMACIONES */
.favorites-list__item {
  @apply flex justify-between items-center bg-bg-primary-light dark:bg-bg-primary-dark p-3 rounded-md;
  
  /* ✅ NUEVO: Animación de entrada */
  animation: scaleIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  animation-fill-mode: both;
  
  /* ✅ NUEVO: Transición suave */
  transition: all 0.2s ease-out;
}

/* ✅ NUEVO: Hover en item de favoritos */
.favorites-list__item:hover {
  transform: scale(1.02);
  background: var(--bg-secondary-light);
}

.dark .favorites-list__item:hover {
  background: var(--bg-secondary-dark);
}
```

**✅ Verificación:**
- [ ] Animación scaleIn aplicada
- [ ] Hover effect agregado
- [ ] Dark mode soportado

---

### **Paso 4: Animar Header** ⏱️ 30 min

**Ubicación:** `src/index.css`

**Modificar sección `.header`:**

```css
/* Header Component - ANIMACIONES */
.header {
  @apply bg-bg-secondary-light/80 dark:bg-bg-primary-dark/80 backdrop-blur-lg sticky top-0 z-10 shadow-lg;
  
  /* ✅ NUEVO: Animación de entrada */
  animation: slideInDown 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* ✅ NUEVO: Animación del logo */
.header__logo a {
  @apply text-2xl font-bold text-primary;
  transition: all 0.3s ease;
}

.header__logo a:hover {
  transform: scale(1.05);
  text-shadow: 0 0 20px rgba(6, 182, 212, 0.5);
}
```

**✅ Verificación:**
- [ ] Header anima al cargar
- [ ] Logo tiene hover effect
- [ ] Transiciones suaves

---

## 🛠️ TAREA 2.3: Loading States Mejorados (2 horas)

### **Objetivo:**
Crear un spinner de carga más profesional.

### **Paso 1: Crear LoadingSpinner.jsx** ⏱️ 1 hora

**Ubicación:** `src/components/LoadingSpinner.jsx`

**Código completo:**

```jsx
/**
 * @file Spinner de carga animado.
 */
import PropTypes from 'prop-types';

/**
 * Spinner de carga con tamaños configurables.
 * 
 * @param {object} props
 * @param {'sm'|'md'|'lg'} [props.size='md'] - Tamaño del spinner
 * @param {string} [props.text] - Texto opcional a mostrar
 * @returns {JSX.Element}
 */
export const LoadingSpinner = ({ size = 'md', text }) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-12 h-12 border-4',
    lg: 'w-16 h-16 border-4',
  };

  const containerPadding = {
    sm: 'p-4',
    md: 'p-8',
    lg: 'p-12',
  };

  return (
    <div className={`flex flex-col items-center justify-center ${containerPadding[size]}`}>
      {/* Spinner */}
      <div 
        className={`
          ${sizeClasses[size]} 
          border-primary 
          border-t-transparent 
          rounded-full 
          animate-spin
        `}
        role="status"
        aria-label="Cargando"
      />
      
      {/* Texto opcional */}
      {text && (
        <p className="mt-4 text-gray-600 dark:text-gray-400 text-center animate-pulse">
          {text}
        </p>
      )}
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  text: PropTypes.string,
};
```

**✅ Verificación:**
- [ ] Archivo creado
- [ ] JSDoc completo
- [ ] PropTypes definidos
- [ ] 3 tamaños soportados
- [ ] Texto opcional
- [ ] ARIA label para accesibilidad

---

### **Paso 2: Usar LoadingSpinner en CharacterList** ⏱️ 30 min

**Ubicación:** `src/features/characters/components/CharacterList.jsx`

**Modificaciones:**

```jsx
import { useCharacters } from "@/features/characters/hooks/useCharacters";
import { CharacterCard } from "./CharacterCard";
import { SearchBar } from "@/components/SearchBar";
import { FavoritesList } from "./FavoritesList";
import { ErrorMessage } from "@/components/ErrorMessage";
import { CharacterGridSkeleton } from "./CharacterGridSkeleton";
import { LoadingSpinner } from "@/components/LoadingSpinner"; // ✅ NUEVO

export const CharacterList = () => {
  const {
    status,
    error,
    filteredCharacters,
    favorites,
    searchTerm,
    handleSearch,
    handleToggleFavorite,
    handleRemoveFavorite,
    handleRetry,
  } = useCharacters();

  return (
    <div className="character-list">
      <FavoritesList
        favorites={favorites}
        onRemoveFavorite={handleRemoveFavorite}
      />

      <div className="character-list__header">
        <h2 className="character-list__title">Personajes</h2>
        <SearchBar value={searchTerm} onChange={handleSearch} />
      </div>

      {/* ✅ OPCIÓN 1: Usar LoadingSpinner */}
      {status === "loading" && (
        <LoadingSpinner 
          size="lg" 
          text="Cargando personajes desde la API..." 
        />
      )}

      {/* ✅ OPCIÓN 2: Mantener Skeleton (comentar LoadingSpinner si usas esto) */}
      {/* {status === "loading" && <CharacterGridSkeleton />} */}

      {status === "failed" && (
        <ErrorMessage message={error} onRetry={handleRetry} />
      )}

      {status === "succeeded" && filteredCharacters.length === 0 && (
        <p className="character-list__empty">
          No se encontraron personajes con ese nombre {searchTerm}
        </p>
      )}

      {status === "succeeded" && (
        <div className="character-list__grid">
          {filteredCharacters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onToggleFavorite={handleToggleFavorite}
              favorites={favorites}
            />
          ))}
        </div>
      )}
    </div>
  );
};
```

**✅ Verificación:**
- [ ] Import agregado
- [ ] LoadingSpinner usado en loading state
- [ ] Texto descriptivo agregado
- [ ] Tamaño 'lg' configurado

---

### **Paso 3: Probar loading states** ⏱️ 30 min

**Pasos de prueba:**

1. Ejecutar `pnpm run dev`
2. Limpiar cache del navegador (Ctrl+Shift+Del)
3. Recargar página
4. Verificar que aparece LoadingSpinner
5. Verificar animación de spin
6. Verificar texto "Cargando..."
7. Verificar que desaparece al cargar datos

**Para probar más tiempo:**

```javascript
// Agregar delay temporal en rickAndMortyAPI.js
export const fetchCharacters = async () => {
  await new Promise(resolve => setTimeout(resolve, 3000)); // ✅ TEMPORAL
  // ... resto del código
};
```

**✅ Verificación:**
- [ ] Spinner aparece al cargar
- [ ] Animación suave
- [ ] Texto visible
- [ ] Dark mode funciona
- [ ] **Eliminar delay temporal**

---

## ✅ VERIFICACIÓN FINAL DE FASE 2

### **Checklist Completa:**

**Toast Notifications:**
- [ ] react-hot-toast instalado
- [ ] Toaster configurado en App.jsx
- [ ] Variables CSS para dark mode
- [ ] Toasts en agregar/quitar favoritos
- [ ] Toasts en errores de API
- [ ] Probado en light y dark mode

**Animaciones:**
- [ ] Keyframes CSS agregados
- [ ] CharacterCard animado
- [ ] Animaciones escalonadas
- [ ] Hover effects mejorados
- [ ] FavoritesList animado
- [ ] Header animado

**Loading States:**
- [ ] LoadingSpinner creado
- [ ] Integrado en CharacterList
- [ ] Probado funcionamiento
- [ ] ARIA labels agregados

### **Prueba Final Integrada:**

1. Ejecutar `pnpm run lint` → Sin errores
2. Ejecutar `pnpm run dev`
3. Observar animaciones de entrada
4. Hover sobre cards → Animación suave
5. Agregar favorito → Toast aparece
6. Quitar favorito → Toast aparece
7. Recargar página → Loading spinner
8. Cambiar a dark mode → Todo se ve bien

### **Resultado Esperado:**

```
✅ Toasts funcionando
✅ Animaciones profesionales
✅ Loading states mejorados
✅ UX más pulida
✅ Feedback visual claro
```

---

## 📝 Notas Importantes

1. **Animaciones:** No exagerar, mantener sutiles
2. **Toasts:** No abusar, solo acciones importantes
3. **Performance:** Verificar que animaciones no afectan FPS

---

## 🚀 Próximo Paso

Una vez completada la Fase 2, continuar con:
**`FASE_3_IMPLEMENTACION.md`** - Accesibilidad

---

**Tiempo Total Estimado:** 9 horas  
**Dificultad:** Media  
**Impacto:** Alto (mejora significativa de UX)

*Guía creada por: Arquitecto de Software Senior*  
*Fecha: 12 de Enero, 2026*
