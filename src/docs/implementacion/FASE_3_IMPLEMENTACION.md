# 🟡 FASE 3: Accesibilidad (A11y)

**Duración Estimada:** 7 horas  
**Prioridad:** ALTA  
**Objetivo:** Alcanzar WCAG 2.1 AA compliance para mejor accesibilidad.

---

## 📋 Checklist General

- [ ] 3.1 Navegación por teclado (3h)
- [ ] 3.2 Skip links (2h)
- [ ] 3.3 Screen reader announcements (2h)
- [ ] Verificación final

---

## 🛠️ TAREA 3.1: Navegación por Teclado (3 horas)

### **Paso 1: Mejorar CharacterCard** ⏱️ 1.5 horas

**Ubicación:** `src/features/characters/components/CharacterCard.jsx`

**Modificaciones:**

```jsx
export const CharacterCard = React.memo(({ character, onToggleFavorite, favorites }) => {
  const isFavorite = favorites.some((fav) => fav.id === character.id);

  // ✅ NUEVO: Handler para teclado
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onToggleFavorite(character);
    }
  };

  return (
    <article 
      className="character-card"
      role="article"
      aria-label={`Personaje: ${character.name}, ${character.species}`}
    >
      <img
        src={character.image}
        alt={`${character.name} - ${character.species}`}
        className="character-card__image"
        loading="lazy"
        decoding="async"
      />
      
      <div className="character-card__content">
        <h3 className="character-card__name">{character.name}</h3>
        
        <div className="character-card__info">
          <p className="character-card__species">{character.species}</p>
          <span className={`character-card__status character-card__status--${character.status.toLowerCase()}`}>
            {character.status}
          </span>
        </div>

        <button
          onClick={() => onToggleFavorite(character)}
          onKeyPress={handleKeyPress}
          className={`character-card__button ${isFavorite ? 'character-card__button--active' : ''}`}
          aria-pressed={isFavorite}
          aria-label={
            isFavorite 
              ? `Quitar ${character.name} de favoritos` 
              : `Agregar ${character.name} a favoritos`
          }
          tabIndex={0}
        >
          {isFavorite ? "Quitar de Favoritos" : "Añadir a Favoritos"}
        </button>
      </div>
    </article>
  );
});
```

**✅ Verificación:**
- [ ] handleKeyPress implementado
- [ ] role="article" agregado
- [ ] aria-label en card
- [ ] aria-pressed en botón
- [ ] aria-label descriptivo en botón
- [ ] tabIndex={0} en botón

---

### **Paso 2: Mejorar SearchBar** ⏱️ 45 min

**Ubicación:** `src/components/SearchBar.jsx`

```jsx
export function SearchBar({ value, onChange }) {
  // ✅ NUEVO: ID único para label
  const inputId = 'character-search-input';

  return (
    <div className="search-bar">
      <label 
        htmlFor={inputId}
        className="sr-only"
      >
        Buscar personajes por nombre
      </label>
      
      <input
        id={inputId}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar personajes..."
        className="search-bar__input"
        aria-label="Buscar personajes por nombre"
        aria-describedby="search-description"
        autoComplete="off"
      />
      
      <span id="search-description" className="sr-only">
        Escribe para filtrar la lista de personajes en tiempo real
      </span>
    </div>
  );
}
```

**Agregar clase sr-only en index.css:**

```css
/* Screen Reader Only */
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

.sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  padding: inherit;
  margin: inherit;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
```

**✅ Verificación:**
- [ ] Label con htmlFor
- [ ] aria-label agregado
- [ ] aria-describedby agregado
- [ ] sr-only class creada

---

### **Paso 3: Mejorar FavoritesList** ⏱️ 45 min

**Ubicación:** `src/features/characters/components/FavoritesList.jsx`

```jsx
export const FavoritesList = ({ favorites, onRemoveFavorite }) => {
  if (favorites.length === 0) return null;

  // ✅ NUEVO: Handler para teclado
  const handleKeyPress = (e, character) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onRemoveFavorite(character);
    }
  };

  return (
    <section 
      className="favorites-list"
      aria-label="Lista de personajes favoritos"
    >
      <h3 className="favorites-list__title">
        Mis Favoritos ({favorites.length})
      </h3>
      
      <ul className="favorites-list__items" role="list">
        {favorites.map((character) => (
          <li 
            key={character.id} 
            className="favorites-list__item"
            role="listitem"
          >
            <span className="favorites-list__name">
              {character.name}
            </span>
            
            <button
              onClick={() => onRemoveFavorite(character)}
              onKeyPress={(e) => handleKeyPress(e, character)}
              className="favorites-list__remove-btn"
              aria-label={`Eliminar ${character.name} de favoritos`}
              tabIndex={0}
            >
              <TrashIcon className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Eliminar</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
```

**✅ Verificación:**
- [ ] handleKeyPress implementado
- [ ] aria-label en section
- [ ] role="list" en ul
- [ ] role="listitem" en li
- [ ] aria-label en botón eliminar
- [ ] aria-hidden en icono

---

## 🛠️ TAREA 3.2: Skip Links (2 horas)

### **Paso 1: Crear SkipLink.jsx** ⏱️ 1 hora

**Ubicación:** `src/components/SkipLink.jsx`

```jsx
/**
 * @file Skip link para navegación rápida al contenido principal.
 */

/**
 * Skip link que permite a usuarios de teclado/screen reader
 * saltar directamente al contenido principal.
 * 
 * @returns {JSX.Element}
 */
export const SkipLink = () => {
  return (
    <a
      href="#main-content"
      className="skip-link"
    >
      Saltar al contenido principal
    </a>
  );
};
```

**Agregar estilos en index.css:**

```css
/* Skip Link */
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  z-index: 100;
  padding: 8px 16px;
  background-color: var(--primary);
  color: white;
  text-decoration: none;
  border-radius: 0 0 4px 0;
  font-weight: 600;
  transition: top 0.3s;
}

.skip-link:focus {
  top: 0;
}
```

**✅ Verificación:**
- [ ] Componente creado
- [ ] Estilos agregados
- [ ] Invisible por defecto
- [ ] Visible al recibir focus

---

### **Paso 2: Integrar en App.jsx** ⏱️ 30 min

```jsx
import { SkipLink } from "@/components/SkipLink"; // ✅ NUEVO

function App() {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <ErrorBoundary>
          <SkipLink /> {/* ✅ AGREGAR AQUÍ */}
          <Toaster {...} />
          
          <div className="app-layout">
            <Header />
            <main id="main-content" className="app-layout__main"> {/* ✅ AGREGAR ID */}
              <CharacterListPage />
            </main>
          </div>
        </ErrorBoundary>
      </ThemeProvider>
    </React.StrictMode>
  );
}
```

**✅ Verificación:**
- [ ] SkipLink importado
- [ ] SkipLink agregado antes de todo
- [ ] id="main-content" en main

---

### **Paso 3: Probar skip link** ⏱️ 30 min

**Pasos:**

1. Abrir app
2. Presionar Tab (primera tecla)
3. Verificar que aparece "Saltar al contenido principal"
4. Presionar Enter
5. Verificar que el focus salta al main content

**✅ Verificación:**
- [ ] Skip link aparece al presionar Tab
- [ ] Enter navega al contenido
- [ ] Funciona correctamente

---

## 🛠️ TAREA 3.3: Screen Reader Announcements (2 horas)

### **Paso 1: Crear LiveRegion.jsx** ⏱️ 45 min

**Ubicación:** `src/components/LiveRegion.jsx`

```jsx
/**
 * @file Live region para anuncios de screen reader.
 */
import PropTypes from 'prop-types';

/**
 * Live region ARIA para anunciar cambios dinámicos a screen readers.
 * 
 * @param {object} props
 * @param {string} props.message - Mensaje a anunciar
 * @param {'polite'|'assertive'} [props.politeness='polite'] - Nivel de urgencia
 * @returns {JSX.Element}
 */
export const LiveRegion = ({ message, politeness = 'polite' }) => {
  if (!message) return null;

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

LiveRegion.propTypes = {
  message: PropTypes.string,
  politeness: PropTypes.oneOf(['polite', 'assertive']),
};
```

**✅ Verificación:**
- [ ] Componente creado
- [ ] role="status"
- [ ] aria-live configurado
- [ ] aria-atomic="true"
- [ ] sr-only class

---

### **Paso 2: Integrar en CharacterList** ⏱️ 1 hora

**Ubicación:** `src/features/characters/components/CharacterList.jsx`

```jsx
import { useState, useEffect } from 'react'; // ✅ Agregar useState, useEffect
import { LiveRegion } from "@/components/LiveRegion"; // ✅ NUEVO

export const CharacterList = () => {
  const { status, filteredCharacters, ... } = useCharacters();
  
  // ✅ NUEVO: Estado para anuncios
  const [announcement, setAnnouncement] = useState('');

  // ✅ NUEVO: Anunciar cuando carga
  useEffect(() => {
    if (status === 'succeeded' && filteredCharacters.length > 0) {
      setAnnouncement(`${filteredCharacters.length} personajes encontrados`);
      
      // Limpiar después de 3 segundos
      const timer = setTimeout(() => setAnnouncement(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [status, filteredCharacters.length]);

  // ✅ NUEVO: Anunciar cuando busca
  useEffect(() => {
    if (searchTerm && filteredCharacters.length === 0) {
      setAnnouncement(`No se encontraron personajes con "${searchTerm}"`);
    }
  }, [searchTerm, filteredCharacters.length]);

  return (
    <div className="character-list">
      <LiveRegion message={announcement} /> {/* ✅ AGREGAR */}
      
      {/* resto del componente */}
    </div>
  );
};
```

**✅ Verificación:**
- [ ] LiveRegion importado
- [ ] Estado announcement creado
- [ ] useEffect para carga
- [ ] useEffect para búsqueda
- [ ] LiveRegion renderizado

---

### **Paso 3: Probar con screen reader** ⏱️ 15 min

**Herramientas:**

- **Windows:** NVDA (gratis) o Narrator (integrado)
- **Mac:** VoiceOver (Cmd+F5)

**Pasos:**

1. Activar screen reader
2. Cargar página
3. Escuchar anuncio de "X personajes encontrados"
4. Buscar algo
5. Escuchar anuncio de resultados

**✅ Verificación:**
- [ ] Anuncios se escuchan
- [ ] No interfieren con UI visual
- [ ] Mensajes claros

---

## ✅ VERIFICACIÓN FINAL DE FASE 3

### **Checklist Completa:**

**Navegación por Teclado:**
- [ ] CharacterCard con teclado
- [ ] SearchBar con labels
- [ ] FavoritesList con teclado
- [ ] Todos los elementos focusables

**Skip Links:**
- [ ] SkipLink creado
- [ ] Integrado en App
- [ ] Funciona correctamente

**Screen Reader:**
- [ ] LiveRegion creado
- [ ] Anuncios implementados
- [ ] Probado con screen reader

### **Prueba Final:**

1. Navegar toda la app solo con Tab/Enter/Space
2. Verificar que todo es accesible
3. Probar con screen reader
4. Verificar anuncios

### **Resultado Esperado:**

```
✅ Navegación completa por teclado
✅ Skip links funcionales
✅ Screen reader compatible
✅ WCAG 2.1 AA compliance
```

---

## 🚀 Próximo Paso

**`FASE_4_IMPLEMENTACION.md`** - Performance

---

**Tiempo Total:** 7 horas  
**Dificultad:** Media-Alta  
**Impacto:** Alto (inclusividad)

*Guía creada por: Arquitecto de Software Senior*  
*Fecha: 12 de Enero, 2026*
