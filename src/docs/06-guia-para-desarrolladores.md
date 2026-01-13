# Guía para Desarrolladores - Rick and Morty Explorer

**Proyecto:** myprojectapi03  
**Stack:** React + Redux + Tailwind CSS  
**Fecha:** 12 de Enero, 2026  

---

## 🚀 Instalación y Setup

### **Requisitos Previos:**

```bash
Node.js >= 16.x
pnpm >= 8.x (recomendado) o npm >= 9.x
Git
```

### **1. Clonar el Repositorio:**

```bash
git clone https://github.com/slinkter/myprojectapi03.git
cd myprojectapi03
```

### **2. Instalar Dependencias:**

```bash
# Con pnpm (recomendado)
pnpm install

# O con npm
npm install
```

### **3. Iniciar Servidor de Desarrollo:**

```bash
pnpm run dev
# La app estará en http://localhost:5173
```

---

## 📜 Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| **dev** | `pnpm run dev` | Inicia servidor de desarrollo con HMR |
| **build** | `pnpm run build` | Compila para producción en `/dist` |
| **preview** | `pnpm run preview` | Previsualiza build de producción |
| **lint** | `pnpm run lint` | Ejecuta ESLint (0 errores requerido) |
| **deploy** | `pnpm run deploy` | Despliega a GitHub Pages |

---

## 🎨 Guía de Estilos: Tailwind CSS (Utility-First)

### **⚠️ IMPORTANTE: NO usar BEM**

Este proyecto utiliza **Tailwind CSS** con metodología **utility-first**.

**❌ PROHIBIDO:**
- Crear clases CSS custom en archivos `.css`
- Usar metodología BEM (`block__element--modifier`)
- Escribir CSS tradicional

**✅ PERMITIDO:**
- Clases de Tailwind directamente en JSX
- Componentes de `@layer components` en `index.css` (solo para patrones repetitivos)
- Configuración en `tailwind.config.js`

---

### **Configuración de Tailwind**

**Archivo:** `tailwind.config.js`

```javascript
const withMT = require("@material-tailwind/react/utils/withMT");
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = withMT({
  darkMode: 'class', // ✅ Dark mode con clase en <html>
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#06b6d4',        // cyan-500
        secondary: '#64748b',      // slate-500
        accent: '#ef4444',         // red-500
        // Colores de fondo y texto para dark mode
        'bg-primary-light': '#f1f5f9',
        'bg-secondary-light': '#ffffff',
        'bg-primary-dark': '#0f172ae3',
        'bg-secondary-dark': '#1e293b',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
      },
    },
  },
});
```

---

### **Uso de Tailwind: Ejemplos**

#### **✅ Correcto: Utility-First**

```jsx
// Componente con clases de Tailwind
export const CharacterCard = ({ character }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 hover:-translate-y-2 transition-transform">
      <img 
        src={character.image} 
        alt={character.name}
        className="w-full h-64 object-cover rounded-t-lg"
      />
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-4">
        {character.name}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        {character.species}
      </p>
    </div>
  );
};
```

#### **❌ Incorrecto: CSS Custom**

```jsx
// ❌ NO HACER ESTO
<div className="character-card">
  <img className="character-card__image" />
  <h3 className="character-card__title"></h3>
</div>

/* ❌ NO crear esto en CSS */
.character-card {
  background: white;
  border-radius: 8px;
}
.character-card__image {
  width: 100%;
}
```

---

### **Componentes en `@layer components`**

**Solo para patrones muy repetitivos:**

```css
/* index.css */
@layer components {
  /* ✅ Permitido: Componente reutilizable */
  .character-card {
    @apply bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4;
    @apply hover:-translate-y-2 transition-transform duration-300;
  }
  
  .character-card__title {
    @apply text-xl font-bold text-gray-900 dark:text-white;
  }
}
```

**Uso:**

```jsx
<div className="character-card">
  <h3 className="character-card__title">{name}</h3>
</div>
```

---

### **Responsive Design con Tailwind**

**Breakpoints:**

```javascript
// tailwind.config.js (defaults)
screens: {
  'sm': '640px',   // Tablet
  'md': '768px',   // Tablet grande
  'lg': '1024px',  // Desktop
  'xl': '1280px',  // Desktop grande
}
```

**Ejemplo de Grid Responsivo:**

```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {/* 1 col mobile, 2 tablet, 3 md, 4 desktop */}
  {characters.map(char => <CharacterCard key={char.id} character={char} />)}
</div>
```

---

### **Dark Mode con Tailwind**

**Activación:**

```javascript
// ThemeProvider.jsx
useEffect(() => {
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(theme); // Agrega 'dark' o 'light'
}, [theme]);
```

**Uso en Componentes:**

```jsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  {/* Fondo blanco en light, gris oscuro en dark */}
  {/* Texto negro en light, blanco en dark */}
</div>
```

---

## 📂 Convenciones del Proyecto

### **1. Naming Conventions**

| Tipo | Convención | Ejemplo |
|------|------------|---------|
| **Componentes** | PascalCase | `CharacterCard.jsx` |
| **Hooks** | useSomething | `useCharacters.js` |
| **Services** | camelCase | `rickAndMortyAPI.js` |
| **Slices** | camelCase | `characterSlice.js` |
| **Constantes** | UPPER_SNAKE_CASE | `API_BASE_URL` |
| **Funciones** | camelCase | `handleToggleFavorite` |

---

### **2. Estructura de Archivos**

**Componente Típico:**

```jsx
/**
 * @file Descripción del componente.
 */
import PropTypes from 'prop-types';

/**
 * Descripción detallada del componente.
 * 
 * @param {object} props - Propiedades del componente
 * @param {string} props.name - Nombre del personaje
 * @param {function} props.onClick - Handler de click
 * @returns {JSX.Element}
 */
export const CharacterCard = ({ name, onClick }) => {
  return (
    <div onClick={onClick}>
      <h3>{name}</h3>
    </div>
  );
};

CharacterCard.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
```

---

### **3. Imports con Alias `@`**

**✅ Usar alias `@` para imports:**

```javascript
// ✅ Correcto
import { CharacterCard } from '@/features/characters/components/CharacterCard';
import { useTheme } from '@/hooks/useTheme';
import { store } from '@/store/store';

// ❌ Evitar rutas relativas
import { CharacterCard } from '../../../features/characters/components/CharacterCard';
```

**Configuración:**

```javascript
// jsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}

// vite.config.js
export default defineConfig({
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
```

---

## 🏗️ Estructura Recomendada para Nuevos Módulos

### **Agregar un Nuevo Feature:**

```bash
# 1. Crear estructura
mkdir -p src/features/[nombre-feature]/{components,hooks,services,slices}

# 2. Crear archivos base
touch src/features/[nombre-feature]/components/[Feature]List.jsx
touch src/features/[nombre-feature]/hooks/use[Feature].js
touch src/features/[nombre-feature]/services/[feature]API.js
touch src/features/[nombre-feature]/slices/[feature]Slice.js
```

**Ejemplo: Feature "episodes"**

```
src/features/episodes/
├── components/
│   ├── EpisodeCard.jsx
│   ├── EpisodeList.jsx
│   └── EpisodeGridSkeleton.jsx
├── hooks/
│   └── useEpisodes.js
├── services/
│   └── episodesAPI.js
└── slices/
    └── episodeSlice.js
```

---

### **Registrar en Redux Store:**

```javascript
// store/store.js
import characterReducer from '@/features/characters/slices/characterSlice';
import episodeReducer from '@/features/episodes/slices/episodeSlice'; // ✅ Nuevo

export const store = configureStore({
  reducer: {
    characters: characterReducer,
    episodes: episodeReducer, // ✅ Agregar aquí
  },
});
```

---

## 🪝 Buenas Prácticas: Custom Hooks

### **Patrón Container/Presenter:**

```javascript
// ✅ Hook (Container - Lógica)
export const useCharacters = () => {
  const dispatch = useDispatch();
  const { entities, status } = useSelector(state => state.characters);
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredCharacters = useMemo(() => {
    return entities.filter(char => 
      char.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [entities, searchTerm]);
  
  const handleSearch = (value) => setSearchTerm(value);
  
  return { filteredCharacters, status, handleSearch };
};

// ✅ Componente (Presenter - UI)
export const CharacterList = () => {
  const { filteredCharacters, status, handleSearch } = useCharacters();
  
  return (
    <div>
      <SearchBar onChange={handleSearch} />
      {filteredCharacters.map(char => <CharacterCard key={char.id} character={char} />)}
    </div>
  );
};
```

---

## 🔧 Configuración de ESLint

**Archivo:** `.eslintrc.cjs`

```javascript
module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', 'tailwind.config.js', 'postcss.config.js'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
};
```

**Ejecutar Linter:**

```bash
pnpm run lint
# Debe retornar 0 errores
```

---

## 📝 Documentación con JSDoc

### **Obligatorio en:**

- ✅ Todos los componentes
- ✅ Todos los hooks
- ✅ Todas las funciones exportadas
- ✅ Todos los servicios

### **Ejemplo Completo:**

```javascript
/**
 * @file Servicio para interactuar con la API de Rick and Morty.
 */

import { logger } from '@/services/logger';

const API_BASE_URL = "https://rickandmortyapi.com/api";

/**
 * Obtiene la lista de personajes desde la API.
 * 
 * @async
 * @function fetchCharacters
 * @returns {Promise<Array<object>>} Promesa que resuelve con array de personajes
 * @throws {Error} Si la respuesta de la red no es exitosa
 * 
 * @example
 * const characters = await fetchCharacters();
 * console.log(characters[0].name); // "Rick Sanchez"
 */
export const fetchCharacters = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/character`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.results;
  } catch (error) {
    logger.apiError('/character', error);
    throw error;
  }
};
```

---

## 🧪 Testing (Futuro)

**Configuración Recomendada:**

```bash
# Instalar dependencias
pnpm add -D vitest @testing-library/react @testing-library/jest-dom
```

**Ejemplo de Test:**

```javascript
// CharacterCard.test.jsx
import { render, screen } from '@testing-library/react';
import { CharacterCard } from './CharacterCard';

describe('CharacterCard', () => {
  it('should render character name', () => {
    const character = { id: 1, name: 'Rick Sanchez', species: 'Human' };
    render(<CharacterCard character={character} />);
    
    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
  });
});
```

---

## 🚀 Deployment

### **GitHub Pages:**

```bash
# 1. Build
pnpm run build

# 2. Deploy
pnpm run deploy
```

**Configuración en `vite.config.js`:**

```javascript
export default defineConfig({
  base: "https://slinkter.github.io/myprojectapi03", // ✅ URL de GitHub Pages
});
```

---

## ⚠️ Errores Comunes y Soluciones

### **1. ESLint Errors:**

```bash
# Error: 'React' is defined but never used
# Solución: Remover import React (no necesario en React 17+)

// ❌ Incorrecto
import React from 'react';

// ✅ Correcto (si no usas React.memo, etc.)
import PropTypes from 'prop-types';
```

### **2. Imports No Resueltos:**

```bash
# Error: Cannot find module '@/components/...'
# Solución: Verificar jsconfig.json y vite.config.js
```

### **3. Tailwind No Aplica:**

```bash
# Solución: Verificar que index.css tenga:
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 📚 Recursos Adicionales

- [React Docs](https://react.dev/)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Vite Docs](https://vitejs.dev/)
- [Rick and Morty API](https://rickandmortyapi.com/documentation)

---

**Fin de la Guía para Desarrolladores**

*Documento generado por: Arquitecto de Software Senior*  
*Fecha: 12 de Enero, 2026*  
*Versión: 1.0*
