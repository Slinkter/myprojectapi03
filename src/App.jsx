import React, { Suspense } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store/store";
import { ThemeProvider } from "./context/ThemeProvider";
import { Header } from "./components/Header";
import { CharacterListPage } from "./pages/CharacterListPage";

/**
 * Componente raíz de la aplicación.
 * Ensambla los proveedores de contexto y los widgets principales.
 * @returns {JSX.Element}
 */
function App() {
    return (
        <React.StrictMode>
            <ReduxProvider store={store}>
                <ThemeProvider>
                    <div className="min-h-screen bg-bg-primary-light dark:bg-bg-primary-dark transition-colors duration-300">
                        <Header />
                        <main className="container mx-auto px-4 py-8">
                            <CharacterListPage />
                        </main>
                    </div>
                </ThemeProvider>
            </ReduxProvider>
        </React.StrictMode>
    );
}

export default App;
