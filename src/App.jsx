/**
 * @file Root application component.
 * Orchestrates the main layout with theme support and routing.
 */
import React from "react";
import { CharacterListPage } from "@/pages/CharacterListPage";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/context/ThemeProvider";

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
      <ThemeProvider>
        <div className="app-layout">
          <Header />
          <main className="app-layout__main">
            <CharacterListPage />
          </main>
        </div>
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;
