import { ThemeProvider } from "./features/theme-toggle/context/ThemeProvider";
import { CharacterList } from "./widgets/character-list/ui/CharacterList";
import { Header } from "./widgets/header/ui/Header";

/**
 * Componente raíz de la aplicación.
 * Ensambla los proveedores de contexto y los widgets principales.
 * @returns {JSX.Element}
 */
function App() {
    return (
        <ThemeProvider>
            <div className="min-h-screen">
                <Header />
                <main>
                    <CharacterList />
                </main>
            </div>
        </ThemeProvider>
    );
}

export default App;

