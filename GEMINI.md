# Rick and Morty Explorer (myprojectapi03) - GEMINI.md

This document provides essential context and instructions for AI agents working on the Rick and Morty Explorer project.

## 🚀 Project Overview

**Rick and Morty Explorer** is a modern React web application that consumes the [Rick and Morty API](https://rickandmortyapi.com/) to explore, search, and manage favorite characters. It emphasizes performance, scalability, and clean architecture.

- **Main Technologies:** React 18.3, Redux Toolkit 2.11, Tailwind CSS 3.4, Vite 5.4.
- **Architecture:** **Feature-Based Architecture** combined with **Clean Architecture** principles.
- **Core Features:** Real-time search, Favorites management (persisted), Light/Dark theme (persisted), Responsive design.

## 🏗️ Architectural Principles

The project follows a strict **Feature-Based Architecture** to ensure scalability and maintainability.

### 📁 Directory Structure

- `src/features/`: **Domain-specific modules.** Each feature (e.g., `characters`) contains its own components, hooks (logic), services (API calls), and slices (Redux state).
- `src/components/`: **Global reusable UI components.** Generic, presentational ("dumb") components used across multiple features.
- `src/context/`: **UI state management** (e.g., Theme) using React Context API.
- `src/hooks/`: **Global custom hooks** (e.g., `useTheme`) not tied to a specific feature.
- `src/pages/`: **Route/View components.** Orchestrate features and global components; entry points for lazy loading.
- `src/store/`: **Redux store configuration** and global middleware.
- `src/services/`: **Global services** like logging (`logger.js`).
- `src/docs/`: **Comprehensive technical documentation.** Refer to these for deep dives into specific topics.

### 🔄 Data Flow & State Management

- **Business Logic:** Encapsulated in **Custom Hooks** (e.g., `useCharacters.js`) within features.
- **Global State:** Managed by **Redux Toolkit**. 
  - **Slices:** Define state and reducers (e.g., `characterSlice.js`).
  - **Async Thunks:** Handle API interactions (e.g., `fetchCharacters`).
- **Data Persistence:** Favorites are automatically synced to `localStorage` via `favoritesMiddleware.js`.
- **Theme Management:** Managed via `ThemeContext` and `ThemeProvider`.

## 🛠️ Development Guidelines

### 🎨 Styling & UI

- **Tailwind CSS:** Use utility-first classes. Avoid custom CSS or BEM naming.
- **Material Tailwind:** Utilize pre-built components where appropriate.
- **Theme Support:** Always use `dark:` variants for colors to support Dark Mode.
- **Icons:** Use `@heroicons/react`.

### 📝 Coding Standards

- **Component Pattern:** Prefer the **Container/Presenter Pattern** (Logic in hooks, UI in components).
- **Optimization:** Use `React.memo`, `useMemo`, and `useCallback` to prevent unnecessary re-renders. Use `React.lazy` for page-level code splitting.
- **Documentation:** Use **JSDoc** for all functions, hooks, and components. Provide **PropTypes** for all component props.
- **Clean Code:** Adhere to SOLID principles. Features should be self-contained; avoid cross-feature imports.

### 🧪 Quality & Validation

- **Linting:** Run `pnpm run lint` before committing. Ensure 0 warnings/errors.
- **Type Checking:** Use PropTypes for runtime validation (Migration to TypeScript is on the roadmap).
- **Error Handling:** Use `ErrorBoundary` at the root level and `ErrorMessage` components for localized failures.

## 📜 Key Commands

| Command | Description |
|---------|-------------|
| `pnpm install` | Install project dependencies |
| `pnpm run dev` | Start development server with HMR |
| `pnpm run build` | Build the project for production |
| `pnpm run lint` | Run ESLint check |
| `pnpm run preview` | Preview the production build locally |
| `pnpm run deploy` | Deploy the project to GitHub Pages |

## 📚 Reference Documentation

For more detailed information, refer to the following files in `src/docs/`:
- `02-arquitectura.md`: Deep dive into layers and patterns.
- `05-flujo-de-datos.md`: Detailed data and state flow.
- `06-guia-para-desarrolladores.md`: Setup and specific coding conventions.
- `08-cierre-del-proyecto.md`: Current status, known issues, and roadmap.
