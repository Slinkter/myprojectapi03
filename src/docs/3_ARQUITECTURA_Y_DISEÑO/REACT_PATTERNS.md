# Patrones de Diseño Avanzados en React

Este documento explora los principales patrones de diseño para la reutilización de lógica en React: **HOCs (High Order Components)**, **Render Props** y **Custom Hooks**.

Analizamos cada patrón con ejemplos prácticos y explicamos por qué este proyecto prioriza el uso de **Hooks**.

---

## 1. Custom Hooks (El Estándar Moderno)

Desde React 16.8, los Hooks son la forma recomendada de compartir lógica con estado entre componentes. Permiten encapsular lógica compleja sin alterar la jerarquía de componentes.

### Ejemplo de Implementación
Un hook para obtener coordenadas del mouse.

```javascript
// useMousePosition.js
import { useState, useEffect } from 'react';

export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
};
```

### Uso en Componente
```javascript
const TrackerComponent = () => {
  const { x, y } = useMousePosition();
  return <p>El mouse está en ({x}, {y})</p>;
};
```

---

## 2. Higher-Order Components (HOC)

Un HOC es una función que recibe un componente y devuelve un nuevo componente "enriquecido" con props o lógica adicional. Fue muy popular antes de los Hooks.

### Concepto Clave
`const EnrichedComponent = withSomething(BaseComponent);`

### Ejemplo: `withMousePosition` (Versión HOC)

```javascript
/* HOC Definition */
import React from 'react';

export const withMousePosition = (WrappedComponent) => {
  return class extends React.Component {
    state = { x: 0, y: 0 };

    componentDidMount() {
      window.addEventListener('mousemove', this.handleMouseMove);
    }

    componentWillUnmount() {
      window.removeEventListener('mousemove', this.handleMouseMove);
    }

    handleMouseMove = (event) => {
      this.setState({ x: event.clientX, y: event.clientY });
    }

    render() {
      // Inyectamos la prop 'mousePosition' al componente envuelto
      return <WrappedComponent {...this.props} mousePosition={this.state} />;
    }
  };
};

/* Uso */
const BaseTracker = ({ mousePosition }) => (
  <p>HOC: El mouse está en ({mousePosition.x}, {mousePosition.y})</p>
);

export const TrackerWithHOC = withMousePosition(BaseTracker);
```

### Desventajas
- **"Wrapper Hell":** Si usas muchos HOCs, tu árbol de componentes se llena de capas anidadas (`withRouter(withAuth(withTheme(...)))`).
- **Colisión de Props:** Si dos HOCs intentan inyectar una prop con el mismo nombre, sobrescribirán el valor.

---

## 3. Render Props

El patrón Render Props consiste en un componente que recibe una función a través de sus props (usualmente llamada `render` o usando `children`) y la utiliza para decidir qué renderizar, compartiendo su estado interno.

### Concepto Clave
`<DataProvider render={(data) => <Display data={data} />} />`

### Ejemplo: `MouseTracker` (Versión Render Props)

```javascript
/* Componente Render Prop */
import React from 'react';

class MouseTracker extends React.Component {
  state = { x: 0, y: 0 };

  handleMouseMove = (event) => {
    this.setState({ x: event.clientX, y: event.clientY });
  }

  render() {
    return (
      <div onMouseMove={this.handleMouseMove} style={{ height: '100vh' }}>
        {/* Llamamos a la prop 'render' pasando el estado */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

/* Uso */
const TrackerWithRenderProp = () => (
  <MouseTracker render={({ x, y }) => (
    <h1>Render Prop: El mouse está en ({x}, {y})</h1>
  )}/>
);
```

---

## Comparativa y Decisión Arquitectónica

| Patrón | Ventajas | Desventajas | Veredicto Proyecto |
| :--- | :--- | :--- | :--- |
| **Custom Hooks** | Código limpio, sin wrappers, fácil composición, fácil testeo. | Solo funcionan en componentes funcionales. | **✅ ADOPTADO** |
| **HOCs** | Potente para inyección de props estáticas. | Wrapper hell, difícil de tipar en TS, colisión de props. | ❌ EVITAR (Legacy) |
| **Render Props** | Muy flexible para renderizado dinámico. | "Callback hell" en JSX si anidas muchos providers. | ⚠️ USO LIMITADO |

### ¿Cuándo usamos cada uno en este proyecto?

1.  **Custom Hooks (`src/features/.../hooks`):**
    *   Es nuestro estándar por defecto para lógica de negocio y efectos.
    *   Ejemplo: `useCharacters.js` maneja toda la lógica de fetching y estado, dejando a la vista limpia.

2.  **Render Props:**
    *   Uso válido en librerías de UI complejas (ej. React Hook Form usa este patrón internamente a veces) o cuando necesitamos máxima flexibilidad de renderizado en un componente genérico.
    *   *Actualmente no implementado en componentes propios principales.*

3.  **HOCs:**
    *   No recomendado para nuevo código.
    *   Se podría ver en librerías legacy como `connect` de Redux (versiones antiguas), pero usamos `useSelector`/`useDispatch`.
