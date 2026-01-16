/**
 * @file Root application component.
 * Orchestrates the main layout with theme support and routing.
 */

import { CharacterListPage } from "@/pages/CharacterListPage";
import { Header } from "@/components/Header";
import { ErrorBoundary } from "@/components/ErrorBoundary";

/**
 * Main application component.
 * Provides theme context and renders the application layout.
 * Note: Redux Provider is wrapped in main.jsx at the application root.
 *
 * @returns {JSX.Element} The root application component
 */
const App = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 transition-all duration-700">
        <Header />
        <CharacterListPage />
      </div>
    </ErrorBoundary>
  );
};

export default App;
