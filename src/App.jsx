import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { CharacterListPage } from "@/pages/CharacterListPage";
import { Header } from "@/components/Header";
import { ThemeProvider } from "@/context/ThemeProvider";
import { store } from "@/store/store";

function App() {
  return (
    <React.StrictMode>
      <ReduxProvider store={store}>
        <ThemeProvider>
          <div className="app-layout">
            <Header />
            <main className="app-layout__main">
              <CharacterListPage />
            </main>
          </div>
        </ThemeProvider>
      </ReduxProvider>
    </React.StrictMode>
  );
}

export default App;
