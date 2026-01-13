# Glosario Técnico - Rick and Morty Explorer

**Proyecto:** myprojectapi03  
**Fecha:** 12 de Enero, 2026  

---

## 📚 Conceptos de React

### **SPA (Single Page Application)**
Aplicación web que carga una sola página HTML y actualiza dinámicamente el contenido sin recargar la página completa.

**Ejemplo en este proyecto:**
```
Usuario navega → No hay recarga → React actualiza DOM
```

### **Component (Componente)**
Pieza reutilizable de UI que encapsula estructura, lógica y estilos.

**Tipos:**
- **Presentacional:** Solo UI, sin lógica (`CharacterCard`)
- **Container:** Con lógica de negocio (`CharacterList`)

### **Props (Properties)**
Datos que se pasan de un componente padre a un hijo.

```javascript
<CharacterCard name="Rick" species="Human" />
// name y species son props
```

### **State (Estado)**
Datos que cambian en el tiempo y causan re-renderizado.

**Tipos:**
- **Local:** `useState` (búsqueda)
- **Global:** Redux (personajes, favoritos)
- **Context:** Context API (tema)

### **Hooks**
Funciones que permiten usar estado y efectos en componentes funcionales.

**Hooks Nativos:**
- `useState`: Estado local
- `useEffect`: Efectos secundarios
- `useMemo`: Memoización de valores
- `useCallback`: Memoización de funciones
- `useContext`: Consumir contexto

**Custom Hooks:**
- `useCharacters`: Lógica de personajes
- `useTheme`: Gestión de tema

### **JSX (JavaScript XML)**
Sintaxis que permite escribir HTML en JavaScript.

```jsx
const element = <h1>Hello, {name}!</h1>;
```

### **Virtual DOM**
Representación en memoria del DOM real. React compara versiones y actualiza solo lo necesario.

```
Estado cambia → Virtual DOM actualiza → Diff → DOM real actualiza
```

### **Reconciliation (Reconciliación)**
Proceso de React para determinar qué cambió y actualizar el DOM eficientemente.

### **Lazy Loading**
Carga diferida de componentes para reducir bundle inicial.

```javascript
const CharacterList = React.lazy(() => import('./CharacterList'));
```

### **Suspense**
Componente que muestra fallback mientras carga componente lazy.

```jsx
<Suspense fallback={<Loading />}>
  <LazyComponent />
</Suspense>
```

---

## 🗄️ Redux y Estado Global

### **Redux**
Librería para gestión de estado global predecible.

**Principios:**
1. **Single Source of Truth:** Un solo store
2. **State is Read-Only:** Solo se modifica con actions
3. **Changes with Pure Functions:** Reducers son funciones puras

### **Redux Toolkit (RTK)**
Conjunto de herramientas oficial para simplificar Redux.

**Ventajas:**
- Menos boilerplate
- Immer integrado (mutaciones "seguras")
- DevTools configurado automáticamente

### **Store**
Objeto que contiene todo el estado de la aplicación.

```javascript
const store = configureStore({
  reducer: {
    characters: characterReducer,
  },
});
```

### **Slice**
Porción del estado con sus reducers y actions.

```javascript
const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: { /* ... */ },
});
```

### **Reducer**
Función pura que toma estado anterior y action, retorna nuevo estado.

```javascript
(state, action) => newState
```

### **Action**
Objeto que describe qué pasó.

```javascript
{ type: 'characters/addFavorite', payload: character }
```

### **Thunk**
Función que retorna función (permite lógica asíncrona).

```javascript
export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async () => { /* API call */ }
);
```

### **Selector**
Función que extrae datos del store.

```javascript
const characters = useSelector(state => state.characters.entities);
```

### **Dispatch**
Función para enviar actions al store.

```javascript
dispatch(addFavorite(character));
```

---

## 🎨 Tailwind CSS

### **Utility-First CSS**
Metodología donde se usan clases atómicas en lugar de CSS custom.

```jsx
// ✅ Utility-First
<div className="bg-white p-4 rounded-lg shadow-md">

// ❌ CSS Tradicional
<div className="card">
```

### **Responsive Design**
Diseño que se adapta a diferentes tamaños de pantalla.

**Breakpoints:**
```
sm:  640px  (tablet)
md:  768px  (tablet grande)
lg:  1024px (desktop)
xl:  1280px (desktop grande)
```

**Uso:**
```jsx
<div className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
```

### **Dark Mode**
Soporte para tema oscuro.

```jsx
<div className="bg-white dark:bg-gray-900">
```

### **@apply**
Directiva para componer clases de Tailwind en CSS.

```css
.btn {
  @apply px-4 py-2 bg-blue-500 text-white rounded;
}
```

---

## 🏗️ Arquitectura Frontend

### **Feature-Based Architecture**
Organización por dominio funcional en lugar de tipo técnico.

```
features/
└── characters/
    ├── components/
    ├── hooks/
    ├── services/
    └── slices/
```

### **Clean Architecture**
Separación en capas con dependencias unidireccionales.

**Capas:**
1. Presentación (UI)
2. Lógica de Negocio (Hooks)
3. Datos (Services, Redux)

### **Container/Presenter Pattern**
Separación entre lógica (container) y UI (presenter).

```javascript
// Container (Hook)
const useCharacters = () => { /* lógica */ };

// Presenter (Component)
const CharacterList = () => {
  const data = useCharacters();
  return <div>{/* UI */}</div>;
};
```

### **Service Layer**
Capa que abstrae comunicación con APIs.

```javascript
// services/rickAndMortyAPI.js
export const fetchCharacters = async () => { /* ... */ };
```

---

## 🌐 Conceptos Web

### **API (Application Programming Interface)**
Interfaz que permite comunicación entre sistemas.

**En este proyecto:**
- Rick and Morty API (REST)

### **REST (Representational State Transfer)**
Estilo arquitectónico para APIs web.

**Métodos HTTP:**
- GET: Leer datos
- POST: Crear datos
- PUT: Actualizar datos
- DELETE: Eliminar datos

### **JSON (JavaScript Object Notation)**
Formato de intercambio de datos.

```json
{
  "id": 1,
  "name": "Rick Sanchez",
  "species": "Human"
}
```

### **CORS (Cross-Origin Resource Sharing)**
Mecanismo que permite requests entre diferentes dominios.

### **LocalStorage**
Almacenamiento persistente en el navegador (hasta 5-10MB).

```javascript
localStorage.setItem('theme', 'dark');
const theme = localStorage.getItem('theme');
```

### **Session Storage**
Similar a localStorage pero se borra al cerrar pestaña.

---

## 🔧 Herramientas de Desarrollo

### **Vite**
Build tool moderno y rápido para aplicaciones web.

**Características:**
- HMR (Hot Module Replacement)
- Build optimizado
- ES Modules nativos

### **ESLint**
Herramienta para analizar código y encontrar problemas.

```bash
pnpm run lint
```

### **PropTypes**
Librería para validación de tipos en runtime.

```javascript
Component.propTypes = {
  name: PropTypes.string.isRequired,
};
```

### **JSDoc**
Sistema de documentación para JavaScript.

```javascript
/**
 * @param {string} name - Nombre del personaje
 * @returns {JSX.Element}
 */
```

---

## 📦 Gestión de Paquetes

### **pnpm**
Gestor de paquetes rápido y eficiente.

**Ventajas:**
- Más rápido que npm
- Ahorra espacio en disco
- Lockfile determinístico

### **package.json**
Archivo que define dependencias y scripts del proyecto.

### **node_modules**
Carpeta donde se instalan las dependencias.

### **Lock File**
Archivo que asegura versiones exactas de dependencias.

---

## 🎯 Patrones de Diseño

### **Singleton**
Una sola instancia de un objeto.

**Ejemplo:** Redux Store

### **Observer**
Patrón donde objetos se suscriben a cambios.

**Ejemplo:** Redux subscriptions

### **Factory**
Patrón para crear objetos.

**Ejemplo:** `createSlice` de Redux Toolkit

### **Memoization**
Técnica de optimización que cachea resultados.

```javascript
const result = useMemo(() => expensiveCalculation(), [deps]);
```

---

## 🔒 Seguridad

### **XSS (Cross-Site Scripting)**
Ataque que inyecta scripts maliciosos.

**Protección:** React escapa automáticamente contenido.

### **HTTPS**
Protocolo seguro para transferencia de datos.

**En este proyecto:** GitHub Pages usa HTTPS automáticamente.

---

## 📊 Performance

### **Bundle Size**
Tamaño total del JavaScript compilado.

**En este proyecto:** ~150KB (gzipped)

### **Code Splitting**
Dividir código en chunks para carga bajo demanda.

**Técnica:** React.lazy

### **Tree Shaking**
Eliminación de código no usado en build.

**Herramienta:** Vite automático

### **Lighthouse**
Herramienta de Google para auditar performance.

**Métricas:**
- FCP (First Contentful Paint)
- TTI (Time to Interactive)
- LCP (Largest Contentful Paint)

---

## ♿ Accesibilidad

### **ARIA (Accessible Rich Internet Applications)**
Atributos para mejorar accesibilidad.

```jsx
<input aria-label="Buscar personajes" />
```

### **WCAG (Web Content Accessibility Guidelines)**
Estándares de accesibilidad web.

**Niveles:**
- A: Básico
- AA: Intermedio (objetivo)
- AAA: Avanzado

### **Screen Reader**
Software que lee contenido de pantalla para personas con discapacidad visual.

---

## 🚀 Deployment

### **GitHub Pages**
Servicio de hosting estático gratuito de GitHub.

### **CI/CD (Continuous Integration/Continuous Deployment)**
Automatización de testing y deployment.

**En este proyecto:** gh-pages action

### **Build**
Proceso de compilar código para producción.

```bash
pnpm run build
```

---

## 📝 Metodologías

### **DRY (Don't Repeat Yourself)**
Principio de no duplicar código.

### **SOLID**
Principios de diseño orientado a objetos.

- **S**ingle Responsibility
- **O**pen/Closed
- **L**iskov Substitution
- **I**nterface Segregation
- **D**ependency Inversion

### **KISS (Keep It Simple, Stupid)**
Mantener soluciones simples.

### **YAGNI (You Aren't Gonna Need It)**
No implementar funcionalidad hasta que sea necesaria.

---

**Fin del Glosario**

*Documento generado por: Arquitecto de Software Senior*  
*Fecha: 12 de Enero, 2026*
