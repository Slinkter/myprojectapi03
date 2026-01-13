/**
 * @file Character list page component with lazy loading and error handling.
 * Implements code splitting for the CharacterList component to improve initial load performance.
 */

/**
 * Lazy-loaded CharacterList component.
 * Uses React.lazy for code splitting to reduce initial bundle size.
 * @type {React.LazyExoticComponent<React.ComponentType>}
 */
import React, { Suspense } from "react";
import { CharacterGridSkeleton } from "@/features/characters/components/CharacterGridSkeleton";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const CharacterList = React.lazy(() =>
  import("@/features/characters/components/CharacterList").then((module) => ({
    default: module.CharacterList,
  }))
);

/**
 * Character list page component.
 * Wraps the lazy-loaded CharacterList with ErrorBoundary and Suspense.
 * Shows a skeleton grid while the component is loading.
 *
 * @returns {JSX.Element} Page component with error boundary, suspense, and character list
 *
 * @example
 * <main>
 *   <CharacterListPage />
 * </main>
 */
const CharacterListPage = () => (
  <main className="container mx-auto px-4 py-8">
    <ErrorBoundary>
      <Suspense fallback={<CharacterGridSkeleton />}>
        <CharacterList />
      </Suspense>
    </ErrorBoundary>
  </main>
);

export { CharacterListPage };
