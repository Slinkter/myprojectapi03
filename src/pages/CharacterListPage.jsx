/**
 * @file Página principal que muestra la lista de personajes.
 * Utiliza carga perezosa (lazy loading) para el widget principal.
 */
import React, { Suspense } from "react";
import { CharacterGridSkeleton } from "../components/CharacterGridSkeleton";

// Carga perezosa del widget de la lista de personajes
const CharacterList = React.lazy(() =>
    import("../components/CharacterList").then((module) => ({
        default: module.CharacterList,
    }))
);

/**
 * Renderiza la página que contiene la lista de personajes,
 * mostrando un esqueleto de carga mientras el componente principal se carga.
 * @returns {JSX.Element}
 */
export const CharacterListPage = () => (
    <Suspense fallback={<CharacterGridSkeleton />}>
        <CharacterList />
    </Suspense>
);