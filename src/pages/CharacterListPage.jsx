import React, { Suspense } from "react";
import { CharacterGridSkeleton } from "@/features/characters/components/CharacterGridSkeleton";

// Carga perezosa del widget de la lista de personajes
const CharacterList = React.lazy(() =>
  import("@/features/characters/components/CharacterList").then((module) => ({
    default: module.CharacterList,
  }))
);

export const CharacterListPage = () => (
  <Suspense fallback={<CharacterGridSkeleton />}>
    <CharacterList />
  </Suspense>
);
