/**
 * @file Root application component.
 * Orchestrates the main layout with theme support and routing.
 */
import React from "react";
import { CharacterListPage } from "@/pages/CharacterListPage";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/context/ThemeProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";

/**
 * Main application component.
 * Provides theme context and renders the application layout.
 * Note: Redux Provider is wrapped in main.jsx at the application root.
 *
 * @returns {JSX.Element} The root application component
 */
function App() {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <ThemeProvider>
          <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-all duration-700">
            <Header />
            <main className="container mx-auto px-4 py-8">
              <CharacterListPage />
            </main>
          </div>
        </ThemeProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}

export default App;
