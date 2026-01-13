# Implementation Plan: Technical Debt Refactoring - myprojectapi03

**Project:** Rick and Morty Explorer  
**Goal:** Address 5 critical technical debt items identified in comprehensive diagnosis  
**Estimated Effort:** 40-60 hours over 3-4 weeks  
**Approach:** Phased refactoring with verification at each step

---

## User Review Required

> [!IMPORTANT]
> **Breaking Changes & Design Decisions**
> 
> This implementation plan includes significant architectural changes:
> 
> 1. **CSS Architecture Migration** - Complete removal of BEM classes in favor of pure Tailwind utilities (affects all components)
> 2. **Component API Changes** - `CharacterCard` props will change (removes `favorites` prop, adds `isFavorite` boolean)
> 3. **New Dependencies** - Will add testing libraries (Vitest, React Testing Library) and potentially Sentry for error monitoring
> 
> **User Decisions Needed:**
> 1. Do you want to proceed with the CSS migration to pure Tailwind? (This will change all component styling)
> 2. Should we implement all 5 phases, or prioritize specific ones?
> 3. Do you have a Sentry account for error monitoring, or should we use console-based logging for now?
> 4. What is your target test coverage percentage? (Recommended: 80%)

---

## Proposed Changes

### Phase 1: CSS Migration (TD-01) 🔴 CRITICAL

**Goal:** Migrate from hybrid BEM+Tailwind to pure Utility-First Tailwind CSS

#### [MODIFY] [index.css](file:///c:/Users/luisj/Documents/myprojectapi03/src/index.css)

**Changes:**
- Remove all BEM-style component classes (lines 9-168)
- Keep only `@tailwind` directives and global base styles
- Remove `@layer components` entirely

**Before (169 lines):**
```css
@layer components {
  .character-card { @apply bg-bg-secondary-light ... }
  .character-card__image { @apply w-full h-64 ... }
  /* ... 160+ lines of BEM classes */
}
```

**After (~10 lines):**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* Only global base styles if needed */
}
```

---

#### [MODIFY] [CharacterCard.jsx](file:///c:/Users/luisj/Documents/myprojectapi03/src/features/characters/components/CharacterCard.jsx)

**Changes:**
- Replace all BEM class names with Tailwind utilities
- Extract `StatusBadge` as separate component
- Simplify props (remove `favorites`, add `isFavorite`)

**Before:**
```jsx
<div className="character-card">
  <div className="character-card__image-container">
    <img className="character-card__image" src={image} />
    <span className={`character-card__status ${statusColors[status]}`}>
```

**After:**
```jsx
<div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 animate-fade-in">
  <div className="relative">
    <img className="w-full h-64 object-cover" src={image} alt={`Image of ${name}`} />
    <StatusBadge status={status} />
```

---

#### [NEW] [StatusBadge.jsx](file:///c:/Users/luisj/Documents/myprojectapi03/src/features/characters/components/StatusBadge.jsx)

**Purpose:** Extract status badge logic into reusable component

```jsx
/**
 * Status badge component for character status display.
 * @param {object} props
 * @param {'Alive'|'Dead'|'unknown'} props.status - Character status
 */
export const StatusBadge = ({ status }) => {
  const statusStyles = {
    Alive: 'bg-green-500',
    Dead: 'bg-red-500',
    unknown: 'bg-slate-500',
  };
  
  return (
    <span className={`absolute top-2 left-2 text-xs font-bold text-white px-2 py-1 rounded-full ${statusStyles[status]}`}>
      {status}
    </span>
  );
};
```

---

#### [MODIFY] [CharacterList.jsx](file:///c:/Users/luisj/Documents/myprojectapi03/src/features/characters/components/CharacterList.jsx)

**Changes:**
- Replace BEM classes with Tailwind utilities
- Update imports to include `StatusBadge`

**Affected lines:** 31, 38, 40, 49, 56

---

#### [MODIFY] [FavoritesList.jsx](file:///c:/Users/luisj/Documents/myprojectapi03/src/features/characters/components/FavoritesList.jsx)

**Changes:**
- Replace BEM classes with Tailwind utilities

---

#### [MODIFY] [SearchBar.jsx](file:///c:/Users/luisj/Documents/myprojectapi03/src/components/SearchBar.jsx)

**Changes:**
- Replace BEM classes with Tailwind utilities

---

#### [MODIFY] [Header.jsx](file:///c:/Users/luisj/Documents/myprojectapi03/src/components/Header.jsx)

**Changes:**
- Replace BEM classes with Tailwind utilities

---

#### [MODIFY] [ErrorMessage.jsx](file:///c:/Users/luisj/Documents/myprojectapi03/src/components/ErrorMessage.jsx)

**Changes:**
- Replace BEM classes with Tailwind utilities

---

#### [MODIFY] [LoadingSkeleton.jsx](file:///c:/Users/luisj/Documents/myprojectapi03/src/components/LoadingSkeleton.jsx)

**Changes:**
- Replace BEM classes with Tailwind utilities

---

### Phase 2: Fix Prop Drilling (TD-02) 🟡 HIGH

**Goal:** Eliminate unnecessary prop drilling in `CharacterCard`

#### [MODIFY] [CharacterList.jsx](file:///c:/Users/luisj/Documents/myprojectapi03/src/features/characters/components/CharacterList.jsx)

**Changes:**
- Compute `isFavorite` in parent before passing to `CharacterCard`
- Remove `favorites` prop from `CharacterCard`

**Before:**
```jsx
{filteredCharacters.map((character) => (
  <CharacterCard
    key={character.id}
    character={character}
    onToggleFavorite={handleToggleFavorite}
    favorites={favorites}
  />
))}
```

**After:**
```jsx
{filteredCharacters.map((character) => {
  const isFavorite = favorites.some((fav) => fav.id === character.id);
  return (
    <CharacterCard
      key={character.id}
      character={character}
      isFavorite={isFavorite}
      onToggleFavorite={handleToggleFavorite}
    />
  );
})}
```

---

#### [MODIFY] [CharacterCard.jsx](file:///c:/Users/luisj/Documents/myprojectapi03/src/features/characters/components/CharacterCard.jsx)

**Changes:**
- Update props to receive `isFavorite` boolean instead of `favorites` array
- Remove `isFavorite` computation logic
- Update PropTypes

**Before:**
```jsx
export const CharacterCard = React.memo(
  ({ character, favorites, onToggleFavorite }) => {
    const isFavorite = favorites.some((fav) => fav.id === character.id);
```

**After:**
```jsx
export const CharacterCard = React.memo(
  ({ character, isFavorite, onToggleFavorite }) => {
    // isFavorite is now passed as prop
```

---

### Phase 3: Error Boundaries (TD-03) 🟠 MEDIUM

**Goal:** Implement Error Boundary pattern for graceful error handling

#### [NEW] [ErrorBoundary.jsx](file:///c:/Users/luisj/Documents/myprojectapi03/src/components/ErrorBoundary.jsx)

**Purpose:** Catch React component errors and display fallback UI

```jsx
/**
 * @file Error Boundary component for catching React errors.
 * Provides graceful degradation when components crash.
 */
import React from 'react';
import PropTypes from 'prop-types';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log to monitoring service
    console.error('ErrorBoundary caught:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-red-50 dark:bg-red-900/20">
          <div className="max-w-md p-8 bg-white dark:bg-slate-800 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
              Something went wrong
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={this.handleReset}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
};
```

---

#### [MODIFY] [App.jsx](file:///c:/Users/luisj/Documents/myprojectapi03/src/App.jsx)

**Changes:**
- Wrap application in `ErrorBoundary`
- Add import for `ErrorBoundary`

**Before:**
```jsx
function App() {
  return (
    <React.StrictMode>
      <ThemeProvider>
```

**After:**
```jsx
import { ErrorBoundary } from "@/components/ErrorBoundary";

function App() {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <ThemeProvider>
```

---

#### [MODIFY] [CharacterListPage.jsx](file:///c:/Users/luisj/Documents/myprojectapi03/src/pages/CharacterListPage.jsx)

**Changes:**
- Add feature-level Error Boundary

**After:**
```jsx
import { ErrorBoundary } from "@/components/ErrorBoundary";

export const CharacterListPage = () => (
  <ErrorBoundary>
    <Suspense fallback={<CharacterGridSkeleton />}>
      <CharacterList />
    </Suspense>
  </ErrorBoundary>
);
```

---

### Phase 4: Logger Service Audit (TD-04) 🟡 MEDIUM

**Goal:** Audit and enhance centralized logging service

#### [MODIFY] [logger.js](file:///c:/Users/luisj/Documents/myprojectapi03/src/services/logger.js)

**Changes:**
- Add environment-aware logging
- Add multiple log levels (info, warn, error, debug)
- Add optional Sentry integration
- Add JSDoc documentation

**Expected Implementation:**
```javascript
/**
 * @file Centralized logging service with environment-aware output.
 * Provides consistent logging across the application.
 */

const isDevelopment = import.meta.env.MODE === 'development';
const isProduction = import.meta.env.MODE === 'production';

/**
 * Centralized logger service.
 * In development: logs to console
 * In production: sends to monitoring service (Sentry)
 */
export const logger = {
  /**
   * Log API errors with context.
   * @param {string} endpoint - API endpoint that failed
   * @param {Error} error - Error object
   * @param {object} context - Additional context
   */
  apiError: (endpoint, error, context = {}) => {
    const errorData = {
      endpoint,
      message: error.message,
      stack: error.stack,
      ...context,
    };

    if (isDevelopment) {
      console.error(`[API Error] ${endpoint}:`, errorData);
    }

    if (isProduction && window.Sentry) {
      window.Sentry.captureException(error, {
        tags: { endpoint },
        extra: context,
      });
    }
  },

  /**
   * Log informational messages.
   */
  info: (message, data = {}) => {
    if (isDevelopment) {
      console.log(`[INFO] ${message}`, data);
    }
  },

  /**
   * Log warnings.
   */
  warn: (message, data = {}) => {
    if (isDevelopment) {
      console.warn(`[WARN] ${message}`, data);
    }
  },

  /**
   * Log debug information (development only).
   */
  debug: (message, data = {}) => {
    if (isDevelopment) {
      console.debug(`[DEBUG] ${message}`, data);
    }
  },
};
```

---

### Phase 5: Testing Infrastructure (TD-05) 🔴 CRITICAL

**Goal:** Setup testing infrastructure and write initial tests

#### [MODIFY] [package.json](file:///c:/Users/luisj/Documents/myprojectapi03/package.json)

**Changes:**
- Add testing dependencies
- Add test scripts

**New devDependencies:**
```json
{
  "devDependencies": {
    "vitest": "^1.2.0",
    "@testing-library/react": "^14.1.2",
    "@testing-library/jest-dom": "^6.1.5",
    "@testing-library/user-event": "^14.5.1",
    "jsdom": "^23.0.1"
  }
}
```

**New scripts:**
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

---

#### [NEW] [vitest.config.js](file:///c:/Users/luisj/Documents/myprojectapi03/vitest.config.js)

**Purpose:** Configure Vitest for React testing

```javascript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

---

#### [NEW] [setup.js](file:///c:/Users/luisj/Documents/myprojectapi03/src/test/setup.js)

**Purpose:** Test setup file for global test configuration

```javascript
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});
```

---

#### [NEW] [useCharacters.test.js](file:///c:/Users/luisj/Documents/myprojectapi03/src/features/characters/hooks/__tests__/useCharacters.test.js)

**Purpose:** Test custom hook business logic

```javascript
/**
 * @file Tests for useCharacters custom hook.
 */
import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useCharacters } from '../useCharacters';
import characterReducer from '../../slices/characterSlice';

const createTestStore = () => {
  return configureStore({
    reducer: {
      characters: characterReducer,
    },
  });
};

describe('useCharacters', () => {
  let store;

  beforeEach(() => {
    store = createTestStore();
  });

  it('should initialize with idle status', () => {
    const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
    const { result } = renderHook(() => useCharacters(), { wrapper });

    expect(result.current.status).toBe('idle');
    expect(result.current.filteredCharacters).toEqual([]);
    expect(result.current.favorites).toEqual([]);
  });

  it('should filter characters by search term', async () => {
    const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
    const { result } = renderHook(() => useCharacters(), { wrapper });

    // Wait for data to load
    await waitFor(() => expect(result.current.status).toBe('succeeded'));

    // Test search functionality
    result.current.handleSearch('Rick');
    expect(result.current.searchTerm).toBe('Rick');
  });

  it('should toggle favorites correctly', async () => {
    const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
    const { result } = renderHook(() => useCharacters(), { wrapper });

    await waitFor(() => expect(result.current.status).toBe('succeeded'));

    const character = result.current.filteredCharacters[0];
    result.current.handleToggleFavorite(character);

    await waitFor(() => {
      expect(result.current.favorites).toContainEqual(character);
    });
  });
});
```

---

#### [NEW] [characterSlice.test.js](file:///c:/Users/luisj/Documents/myprojectapi03/src/features/characters/slices/__tests__/characterSlice.test.js)

**Purpose:** Test Redux slice logic

```javascript
/**
 * @file Tests for character Redux slice.
 */
import { describe, it, expect } from 'vitest';
import characterReducer, { addFavorite, removeFavorite } from '../characterSlice';

describe('characterSlice', () => {
  const initialState = {
    entities: [],
    favorites: [],
    status: 'idle',
    error: null,
  };

  it('should handle addFavorite', () => {
    const character = { id: 1, name: 'Rick Sanchez' };
    const newState = characterReducer(initialState, addFavorite(character));

    expect(newState.favorites).toHaveLength(1);
    expect(newState.favorites[0]).toEqual(character);
  });

  it('should not add duplicate favorites', () => {
    const character = { id: 1, name: 'Rick Sanchez' };
    const stateWithFavorite = {
      ...initialState,
      favorites: [character],
    };

    const newState = characterReducer(stateWithFavorite, addFavorite(character));
    expect(newState.favorites).toHaveLength(1);
  });

  it('should handle removeFavorite', () => {
    const character = { id: 1, name: 'Rick Sanchez' };
    const stateWithFavorite = {
      ...initialState,
      favorites: [character],
    };

    const newState = characterReducer(stateWithFavorite, removeFavorite(character));
    expect(newState.favorites).toHaveLength(0);
  });
});
```

---

#### [NEW] [CharacterCard.test.jsx](file:///c:/Users/luisj/Documents/myprojectapi03/src/features/characters/components/__tests__/CharacterCard.test.jsx)

**Purpose:** Test component rendering and interactions

```javascript
/**
 * @file Tests for CharacterCard component.
 */
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CharacterCard } from '../CharacterCard';

describe('CharacterCard', () => {
  const mockCharacter = {
    id: 1,
    name: 'Rick Sanchez',
    image: 'https://example.com/rick.jpg',
    status: 'Alive',
    species: 'Human',
  };

  const mockOnToggleFavorite = vi.fn();

  it('should render character information', () => {
    render(
      <CharacterCard
        character={mockCharacter}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Human')).toBeInTheDocument();
    expect(screen.getByAltText('Image of Rick Sanchez')).toBeInTheDocument();
  });

  it('should call onToggleFavorite when button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <CharacterCard
        character={mockCharacter}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    const button = screen.getByRole('button');
    await user.click(button);

    expect(mockOnToggleFavorite).toHaveBeenCalledWith(mockCharacter);
  });

  it('should display correct button text based on favorite status', () => {
    const { rerender } = render(
      <CharacterCard
        character={mockCharacter}
        isFavorite={false}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    expect(screen.getByText('Añadir a Favoritos')).toBeInTheDocument();

    rerender(
      <CharacterCard
        character={mockCharacter}
        isFavorite={true}
        onToggleFavorite={mockOnToggleFavorite}
      />
    );

    expect(screen.getByText('Quitar de Favoritos')).toBeInTheDocument();
  });
});
```

---

## Verification Plan

### Automated Tests

#### Test Suite 1: Unit Tests
**Command:**
```bash
pnpm test
```

**What it tests:**
- `useCharacters` hook logic (search, favorites, state management)
- `characterSlice` reducers (addFavorite, removeFavorite)
- `CharacterCard` component rendering and interactions

**Success criteria:**
- All tests pass
- Coverage >60% for tested files

---

#### Test Suite 2: Coverage Report
**Command:**
```bash
pnpm test:coverage
```

**What it tests:**
- Overall test coverage percentage
- Uncovered lines identification

**Success criteria:**
- Coverage report generated successfully
- Coverage >60% overall

---

### Manual Verification

#### Manual Test 1: CSS Migration Verification
**Steps:**
1. Run `pnpm run dev`
2. Open browser to `http://localhost:5173`
3. Verify all components render correctly with new Tailwind styles
4. Test dark mode toggle (should work identically)
5. Test hover effects on character cards
6. Test responsive design (mobile, tablet, desktop)

**Expected results:**
- All components look identical to before
- No visual regressions
- Dark mode works correctly
- Hover effects work smoothly

---

#### Manual Test 2: Prop Drilling Fix Verification
**Steps:**
1. Open browser DevTools
2. Navigate to React DevTools
3. Select `CharacterCard` component
4. Verify props: should see `isFavorite` (boolean), NOT `favorites` (array)
5. Click "Add to Favorites" button
6. Verify card re-renders only when its own favorite status changes

**Expected results:**
- `CharacterCard` receives `isFavorite` boolean prop
- Card does not re-render when other characters are favorited
- Favorite functionality works correctly

---

#### Manual Test 3: Error Boundary Verification
**Steps:**
1. Temporarily add error-throwing code to `CharacterCard`:
   ```jsx
   if (character.id === 1) throw new Error('Test error');
   ```
2. Run `pnpm run dev`
3. Navigate to app
4. Verify Error Boundary catches error and shows fallback UI
5. Click "Try Again" button
6. Remove test error code

**Expected results:**
- Error Boundary displays fallback UI
- App doesn't white-screen
- "Try Again" button resets error state
- Error is logged to console

---

#### Manual Test 4: Logger Service Verification
**Steps:**
1. Open browser DevTools console
2. Trigger an API error (disconnect network, then reload)
3. Verify error is logged with proper format
4. Check that error includes endpoint, timestamp, and context
5. Verify no errors in production build

**Expected results:**
- Errors logged with structured format
- Development: console.error visible
- Production: no console pollution (if Sentry configured)

---

### Build Verification

#### Build Test 1: Production Build
**Command:**
```bash
pnpm run build
```

**What it tests:**
- All imports resolve correctly
- No TypeScript/ESLint errors
- Bundle size is acceptable

**Success criteria:**
- Build completes without errors
- Bundle size <200KB (gzipped)

---

#### Build Test 2: Lint Check
**Command:**
```bash
pnpm run lint
```

**What it tests:**
- ESLint rules compliance
- No unused variables
- Proper PropTypes

**Success criteria:**
- 0 ESLint errors
- 0 ESLint warnings (or acceptable warnings)

---

## Summary

This implementation plan addresses all 5 critical technical debt items through 5 phased refactoring efforts:

1. **Phase 1 (TD-01):** Migrate to pure Tailwind CSS (removes 160+ lines of BEM classes)
2. **Phase 2 (TD-02):** Fix prop drilling (improves React.memo effectiveness)
3. **Phase 3 (TD-03):** Add Error Boundaries (graceful error handling)
4. **Phase 4 (TD-04):** Audit logger service (production-ready logging)
5. **Phase 5 (TD-05):** Setup testing (60%+ coverage target)

**Total Files Modified:** 15  
**Total Files Created:** 7  
**Estimated Time:** 40-60 hours  
**Risk Level:** Medium (breaking changes to component APIs)

**Recommended Approach:** Execute phases sequentially, verify each phase before proceeding to next.
