# 🔴 FASE 1: Robustez y Manejo de Errores

**Duración Estimada:** 9 horas  
**Prioridad:** CRÍTICA  
**Objetivo:** Hacer la aplicación más resiliente a errores y mejorar la persistencia de datos.

---

## 📋 Checklist General

- [ ] 1.1 Error Boundary implementado (4h)
- [ ] 1.2 Persistencia de favoritos (3h)
- [ ] 1.3 Manejo de errores de API (2h)
- [ ] Verificación final
- [ ] Actualizar documentación

---

## 🛠️ TAREA 1.1: Implementar Error Boundary (4 horas)

### **Objetivo:**
Prevenir que un error en un componente rompa toda la aplicación.

### **Paso 1: Crear ErrorFallback.jsx** ⏱️ 30 min

**Ubicación:** `src/components/ErrorFallback.jsx`

**Código completo:**

```jsx
/**
 * @file Componente de fallback que se muestra cuando ocurre un error.
 */
import PropTypes from 'prop-types';

/**
 * Componente que se muestra cuando Error Boundary captura un error.
 * 
 * @param {object} props
 * @param {Error} props.error - Error capturado
 * @param {function} props.onReset - Función para resetear el error
 * @returns {JSX.Element}
 */
export const ErrorFallback = ({ error, onReset }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        {/* Icono de error */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-red-600 dark:text-red-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">
          ¡Oops! Algo salió mal
        </h2>

        {/* Descripción */}
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          La aplicación encontró un error inesperado. No te preocupes, tus datos están seguros.
        </p>

        {/* Detalles del error (solo en desarrollo) */}
        {import.meta.env.DEV && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/10 rounded border border-red-200 dark:border-red-800">
            <p className="text-sm font-mono text-red-800 dark:text-red-300 break-all">
              {error?.message || 'Error desconocido'}
            </p>
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onReset}
            className="w-full px-4 py-3 bg-primary hover:bg-cyan-600 text-white font-semibold rounded-lg transition-colors"
          >
            Intentar de nuevo
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="w-full px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-lg transition-colors"
          >
            Volver al inicio
          </button>
        </div>

        {/* Información adicional */}
        <p className="mt-6 text-xs text-center text-gray-500 dark:text-gray-500">
          Si el problema persiste, intenta recargar la página o contacta soporte.
        </p>
      </div>
    </div>
  );
};

ErrorFallback.propTypes = {
  error: PropTypes.instanceOf(Error),
  onReset: PropTypes.func.isRequired,
};
```

**✅ Verificación:**
- [ ] Archivo creado en `src/components/ErrorFallback.jsx`
- [ ] JSDoc completo
- [ ] PropTypes definidos
- [ ] UI responsiva con dark mode

---

### **Paso 2: Crear ErrorBoundary.jsx** ⏱️ 1 hora

**Ubicación:** `src/components/ErrorBoundary.jsx`

**Código completo:**

```jsx
/**
 * @file Error Boundary para capturar errores de React.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { ErrorFallback } from './ErrorFallback';
import { logger } from '@/services/logger';

/**
 * Error Boundary que captura errores en el árbol de componentes.
 * Previene que un error en un componente hijo rompa toda la aplicación.
 * 
 * @example
 * <ErrorBoundary>
 *   <App />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  /**
   * Actualiza el estado cuando se captura un error.
   * @param {Error} error - Error capturado
   * @returns {object} Nuevo estado
   */
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  /**
   * Se ejecuta después de capturar un error.
   * Aquí se puede hacer logging o reportar a servicio externo.
   * 
   * @param {Error} error - Error capturado
   * @param {object} errorInfo - Información adicional del error
   */
  componentDidCatch(error, errorInfo) {
    // Log del error
    logger.error('Error Boundary caught an error', error, {
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
    });

    // Guardar errorInfo en el estado
    this.setState({ errorInfo });

    // Aquí podrías enviar a Sentry, LogRocket, etc.
    // Ejemplo: Sentry.captureException(error, { extra: errorInfo });
  }

  /**
   * Resetea el error y vuelve a renderizar los hijos.
   */
  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
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

**✅ Verificación:**
- [ ] Archivo creado en `src/components/ErrorBoundary.jsx`
- [ ] Class component correctamente implementado
- [ ] getDerivedStateFromError implementado
- [ ] componentDidCatch con logging
- [ ] handleReset funcional

---

### **Paso 3: Integrar Error Boundary en App.jsx** ⏱️ 30 min

**Ubicación:** `src/App.jsx`

**Modificaciones:**

```jsx
/**
 * @file Root application component.
 * Orchestrates the main layout with theme support and error handling.
 */
import React from "react";
import { CharacterListPage } from "@/pages/CharacterListPage";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/context/ThemeProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary"; // ✅ NUEVO

/**
 * Main application component.
 * Provides theme context, error boundary and renders the application layout.
 * Note: Redux Provider is wrapped in main.jsx at the application root.
 * 
 * @returns {JSX.Element} The root application component
 */
function App() {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <ErrorBoundary> {/* ✅ AGREGAR AQUÍ */}
          <div className="app-layout">
            <Header />
            <main className="app-layout__main">
              <CharacterListPage />
            </main>
          </div>
        </ErrorBoundary> {/* ✅ CERRAR AQUÍ */}
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
```

**✅ Verificación:**
- [ ] Import de ErrorBoundary agregado
- [ ] ErrorBoundary envuelve el contenido principal
- [ ] JSDoc actualizado

---

### **Paso 4: Probar Error Boundary** ⏱️ 1 hora

**Crear componente de prueba temporal:**

**Ubicación:** `src/components/TestError.jsx` (temporal)

```jsx
/**
 * Componente temporal para probar Error Boundary.
 * ELIMINAR después de probar.
 */
import { useState } from 'react';

export const TestError = () => {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error('Error de prueba del Error Boundary');
  }

  return (
    <div className="p-4">
      <button
        onClick={() => setShouldError(true)}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Provocar Error de Prueba
      </button>
    </div>
  );
};
```

**Agregar temporalmente a CharacterListPage.jsx:**

```jsx
import { TestError } from '@/components/TestError'; // Temporal

export const CharacterListPage = () => (
  <Suspense fallback={<CharacterGridSkeleton />}>
    <TestError /> {/* ✅ TEMPORAL - Probar y luego ELIMINAR */}
    <CharacterList />
  </Suspense>
);
```

**Pasos de prueba:**

1. Ejecutar `pnpm run dev`
2. Abrir la aplicación
3. Click en "Provocar Error de Prueba"
4. Verificar que aparece ErrorFallback (no se rompe la app)
5. Click en "Intentar de nuevo"
6. Verificar que vuelve a funcionar
7. **ELIMINAR** `TestError.jsx` y su import

**✅ Verificación:**
- [ ] Error Boundary captura el error
- [ ] ErrorFallback se muestra correctamente
- [ ] Botón "Intentar de nuevo" funciona
- [ ] Botón "Volver al inicio" funciona
- [ ] Error se loguea en consola (desarrollo)
- [ ] TestError.jsx eliminado después de probar

---

### **Paso 5: Documentar** ⏱️ 30 min

**Actualizar:** `src/docs/02-arquitectura.md`

Agregar sección:

```markdown
### **Error Handling**

**Error Boundary:**
- Ubicación: `src/components/ErrorBoundary.jsx`
- Captura errores en árbol de componentes
- Previene crashes completos de la app
- Logging centralizado de errores

**ErrorFallback:**
- UI amigable cuando ocurre error
- Opciones de recuperación para el usuario
- Detalles de error solo en desarrollo
```

**✅ Verificación:**
- [ ] Documentación actualizada
- [ ] Ejemplos de uso agregados

---

## 🛠️ TAREA 1.2: Persistencia de Favoritos (3 horas)

### **Objetivo:**
Guardar favoritos en localStorage para que persistan entre sesiones.

### **Paso 1: Crear helpers de localStorage** ⏱️ 30 min

**Ubicación:** `src/features/characters/slices/characterSlice.js`

**Agregar al inicio del archivo (después de imports):**

```javascript
/**
 * Clave para almacenar favoritos en localStorage
 */
const FAVORITES_KEY = 'rickmorty_favorites';

/**
 * Carga favoritos desde localStorage.
 * Maneja errores y retorna array vacío si falla.
 * 
 * @returns {Array<object>} Array de personajes favoritos
 */
const loadFavoritesFromStorage = () => {
  try {
    const saved = localStorage.getItem(FAVORITES_KEY);
    if (!saved) return [];
    
    const parsed = JSON.parse(saved);
    
    // Validar que sea un array
    if (!Array.isArray(parsed)) {
      logger.error('Invalid favorites format in localStorage');
      return [];
    }
    
    return parsed;
  } catch (error) {
    logger.error('Error loading favorites from localStorage', error);
    return [];
  }
};

/**
 * Guarda favoritos en localStorage.
 * Maneja errores silenciosamente.
 * 
 * @param {Array<object>} favorites - Array de personajes favoritos
 */
const saveFavoritesToStorage = (favorites) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    logger.error('Error saving favorites to localStorage', error);
    // No lanzar error, solo loguear
  }
};
```

**✅ Verificación:**
- [ ] Funciones agregadas al archivo
- [ ] JSDoc completo
- [ ] Manejo de errores implementado
- [ ] Validación de datos

---

### **Paso 2: Actualizar initialState** ⏱️ 15 min

**En el mismo archivo, modificar initialState:**

```javascript
/**
 * Estado inicial del slice de personajes.
 * Los favoritos se cargan desde localStorage.
 */
const initialState = {
  entities: [],
  favorites: loadFavoritesFromStorage(), // ✅ CAMBIAR AQUÍ
  status: "idle",
  error: null,
};
```

**✅ Verificación:**
- [ ] initialState modificado
- [ ] Comentario actualizado

---

### **Paso 3: Actualizar reducers** ⏱️ 1 hora

**Modificar reducer `addFavorite`:**

```javascript
reducers: {
  /**
   * Añade un personaje a la lista de favoritos si aún no está presente.
   * Persiste en localStorage automáticamente.
   * 
   * @param {object} state - El estado actual del slice
   * @param {object} action - La acción despachada
   */
  addFavorite: (state, action) => {
    const character = action.payload;
    
    // Comprueba si el personaje ya está en favoritos
    const isFavorite = state.favorites.find((fav) => fav.id === character.id);
    
    if (!isFavorite) {
      // Añade al array
      state.favorites.push(character);
      
      // ✅ NUEVO: Persiste en localStorage
      saveFavoritesToStorage(state.favorites);
    }
  },
  
  /**
   * Elimina un personaje de la lista de favoritos.
   * Persiste en localStorage automáticamente.
   * 
   * @param {object} state - El estado actual del slice
   * @param {object} action - La acción despachada
   */
  removeFavorite: (state, action) => {
    const character = action.payload;
    
    // Filtra el array de favoritos
    state.favorites = state.favorites.filter(
      (fav) => fav.id !== character.id
    );
    
    // ✅ NUEVO: Persiste en localStorage
    saveFavoritesToStorage(state.favorites);
  },
},
```

**✅ Verificación:**
- [ ] addFavorite actualizado
- [ ] removeFavorite actualizado
- [ ] JSDoc actualizado
- [ ] saveFavoritesToStorage llamado en ambos

---

### **Paso 4: Probar persistencia** ⏱️ 1 hora

**Pasos de prueba:**

1. Ejecutar `pnpm run dev`
2. Agregar varios personajes a favoritos
3. Abrir DevTools → Application → Local Storage
4. Verificar que existe `rickmorty_favorites` con datos
5. **Recargar la página** (F5)
6. Verificar que los favoritos siguen ahí
7. Quitar un favorito
8. Verificar que se actualiza en localStorage
9. Cerrar y reabrir navegador
10. Verificar que favoritos persisten

**✅ Verificación:**
- [ ] Favoritos se guardan en localStorage
- [ ] Favoritos se cargan al iniciar
- [ ] Agregar favorito actualiza localStorage
- [ ] Quitar favorito actualiza localStorage
- [ ] Favoritos persisten al recargar
- [ ] Favoritos persisten al cerrar/abrir navegador

---

### **Paso 5: Documentar** ⏱️ 15 min

**Actualizar:** `src/docs/05-flujo-de-datos.md`

Modificar sección de persistencia:

```markdown
### **¿Qué se Persiste?**

| Dato | Método | Duración | Sincroniza |
|------|--------|----------|------------|
| **Tema** | localStorage | Permanente | ❌ No |
| **Favoritos** | localStorage | Permanente | ❌ No | ✅ ACTUALIZADO
| **Personajes** | Memoria (Redux) | Sesión actual | ❌ No |
| **Búsqueda** | Memoria (useState) | Componente montado | ❌ No |
```

**✅ Verificación:**
- [ ] Documentación actualizada

---

## 🛠️ TAREA 1.3: Mejorar Manejo de Errores de API (2 horas)

### **Objetivo:**
Agregar timeout, mejor validación y mensajes de error más claros.

### **Paso 1: Crear clase de error personalizada** ⏱️ 30 min

**Ubicación:** `src/features/characters/services/rickAndMortyAPI.js`

**Agregar al inicio (después de imports):**

```javascript
/**
 * Error personalizado para errores de API.
 * Incluye información adicional como status y endpoint.
 */
class APIError extends Error {
  /**
   * @param {string} message - Mensaje de error
   * @param {number} status - Código de estado HTTP
   * @param {string} endpoint - Endpoint que falló
   */
  constructor(message, status, endpoint) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.endpoint = endpoint;
    this.timestamp = new Date().toISOString();
  }
}
```

**✅ Verificación:**
- [ ] Clase APIError creada
- [ ] JSDoc completo
- [ ] Propiedades adicionales agregadas

---

### **Paso 2: Actualizar fetchCharacters con timeout** ⏱️ 1 hora

**Reemplazar la función completa:**

```javascript
/**
 * Obtiene la lista completa de personajes.
 * Incluye timeout de 10 segundos y validación de respuesta.
 *
 * @async
 * @function fetchCharacters
 * @returns {Promise<Array>} Una promesa que se resuelve con la lista de personajes.
 * @throws {Error} Si la respuesta de la red no es exitosa o timeout.
 */
export const fetchCharacters = async () => {
  try {
    // ✅ NUEVO: Crear AbortController para timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos

    const response = await fetch(`${API_BASE_URL}/character`, {
      signal: controller.signal, // ✅ NUEVO: Agregar signal
    });

    // Limpiar timeout si la petición fue exitosa
    clearTimeout(timeoutId);

    // Validar respuesta HTTP
    if (!response.ok) {
      throw new APIError(
        `Failed to fetch characters`,
        response.status,
        '/character'
      );
    }

    const data = await response.json();

    // ✅ NUEVO: Validar formato de respuesta
    if (!data.results || !Array.isArray(data.results)) {
      throw new APIError(
        'Invalid API response format',
        200,
        '/character'
      );
    }

    // ✅ NUEVO: Validar que hay datos
    if (data.results.length === 0) {
      logger.warn('API returned empty results');
    }

    return data.results;

  } catch (error) {
    // ✅ NUEVO: Manejo específico de timeout
    if (error.name === 'AbortError') {
      const timeoutError = new Error(
        'La petición tardó demasiado. Por favor, verifica tu conexión e intenta de nuevo.'
      );
      logger.apiError('/character', timeoutError, { reason: 'timeout' });
      throw timeoutError;
    }

    // ✅ NUEVO: Manejo de APIError
    if (error instanceof APIError) {
      logger.apiError(error.endpoint, error, {
        status: error.status,
        timestamp: error.timestamp,
      });

      // Mensajes de error más amigables según el status
      const friendlyMessages = {
        404: 'No se encontraron personajes. La API podría estar caída.',
        500: 'Error del servidor. Intenta de nuevo más tarde.',
        503: 'Servicio no disponible. Intenta de nuevo más tarde.',
      };

      const friendlyMessage = friendlyMessages[error.status] || 
        `Error ${error.status}: No se pudieron cargar los personajes.`;

      throw new Error(friendlyMessage);
    }

    // ✅ NUEVO: Error de red genérico
    logger.apiError('/character', error, {
      baseUrl: API_BASE_URL,
      timestamp: new Date().toISOString(),
    });

    throw new Error(
      'Error de red. Por favor, verifica tu conexión a internet e intenta de nuevo.'
    );
  }
};
```

**✅ Verificación:**
- [ ] AbortController implementado
- [ ] Timeout de 10 segundos configurado
- [ ] Validación de formato de respuesta
- [ ] Manejo de timeout
- [ ] Manejo de APIError
- [ ] Mensajes de error amigables
- [ ] Logging mejorado

---

### **Paso 3: Probar manejo de errores** ⏱️ 30 min

**Pruebas a realizar:**

**Test 1: Timeout (simular)**
```javascript
// Modificar temporalmente API_BASE_URL para que falle
const API_BASE_URL = "https://httpstat.us/200?sleep=15000"; // 15s delay
```

**Test 2: Error 404**
```javascript
// Modificar temporalmente el endpoint
const response = await fetch(`${API_BASE_URL}/invalid-endpoint`);
```

**Test 3: Respuesta inválida**
```javascript
// Simular respuesta sin results
// (Difícil de probar sin mock, verificar con código)
```

**Test 4: Sin conexión**
```
1. Desconectar internet
2. Intentar cargar personajes
3. Verificar mensaje de error
```

**✅ Verificación:**
- [ ] Timeout muestra mensaje apropiado
- [ ] Error 404 muestra mensaje amigable
- [ ] Error de red muestra mensaje claro
- [ ] Todos los errores se loguean correctamente
- [ ] **Revertir cambios temporales de prueba**

---

## ✅ VERIFICACIÓN FINAL DE FASE 1

### **Checklist Completa:**

**Error Boundary:**
- [ ] ErrorFallback.jsx creado y funcional
- [ ] ErrorBoundary.jsx implementado
- [ ] Integrado en App.jsx
- [ ] Probado con componente de prueba
- [ ] Documentación actualizada

**Persistencia:**
- [ ] Helpers de localStorage creados
- [ ] initialState actualizado
- [ ] Reducers actualizados
- [ ] Probado: agregar, quitar, recargar
- [ ] Documentación actualizada

**Manejo de Errores API:**
- [ ] APIError class creada
- [ ] Timeout implementado
- [ ] Validaciones agregadas
- [ ] Mensajes amigables
- [ ] Probado diferentes escenarios

### **Prueba Final Integrada:**

1. Ejecutar `pnpm run lint` → Debe pasar sin errores
2. Ejecutar `pnpm run dev`
3. Agregar favoritos → Verificar localStorage
4. Recargar página → Favoritos persisten
5. Provocar error (TestError) → Error Boundary funciona
6. Desconectar internet → Mensaje de error claro
7. Reconectar → Reintentar funciona

### **Resultado Esperado:**

```
✅ App más robusta
✅ Favoritos persisten
✅ Errores manejados gracefully
✅ Mensajes de error claros
✅ Logging completo
```

---

## 📝 Notas Importantes

1. **No saltar pasos:** Cada paso tiene dependencias
2. **Probar frecuentemente:** Después de cada tarea
3. **Hacer commits:** Después de cada tarea completada
4. **Leer errores:** Si algo falla, leer el mensaje completo

---

## 🚀 Próximo Paso

Una vez completada la Fase 1, continuar con:
**`FASE_2_IMPLEMENTACION.md`** - Mejoras de UX/UI

---

**Tiempo Total Estimado:** 9 horas  
**Dificultad:** Media  
**Impacto:** Alto (mejora crítica de robustez)

*Guía creada por: Arquitecto de Software Senior*  
*Fecha: 12 de Enero, 2026*
