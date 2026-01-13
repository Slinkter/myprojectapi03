/**
 * @file Widget que muestra la lista de personajes y la lista de favoritos.
 */
import { useCharacters } from "@/features/characters/hooks/useCharacters";
import { CharacterCard } from "./CharacterCard";
import { SearchBar } from "@/components/SearchBar";
import { FavoritesList } from "./FavoritesList";
import { ErrorMessage } from "@/components/ErrorMessage";
import { CharacterGridSkeleton } from "./CharacterGridSkeleton";
import { ReduxStatus } from "@/features/characters/constants/status.constants";

/**
 * Orquesta y renderiza la UI para la búsqueda, visualización y gestión de personajes.
 * Maneja los diferentes estados de la aplicación (carga, error, vacío, éxito).
 * @returns {JSX.Element}
 */
export const CharacterList = () => {
  /* Custom hook */
  const {
    status,
    error,
    filteredCharacters,
    favorites,
    searchTerm,
    handleSearch,
    handleToggleFavorite,
    handleRemoveFavorite,
    handleRetry,
  } = useCharacters();

  return (
    <div className="space-y-12">
      {/*  */}
      <FavoritesList
        favorites={favorites}
        onRemoveFavorite={handleRemoveFavorite}
      />
      {/*  */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Personajes
        </h2>
        <SearchBar value={searchTerm} onChange={handleSearch} />
      </div>

      {status === ReduxStatus.LOADING && <CharacterGridSkeleton />}

      {status === ReduxStatus.FAILED && (
        <ErrorMessage message={error} onRetry={handleRetry} />
      )}

      {status === ReduxStatus.SUCCEEDED && filteredCharacters.length === 0 && (
        <p className="text-center text-slate-500 dark:text-slate-400 text-lg">
          No se encontraron personajes con ese nombre {searchTerm}
        </p>
      )}

      {status === ReduxStatus.SUCCEEDED && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCharacters.map((character, index) => {
            const isFavorite = favorites.some((fav) => fav.id === character.id);
            return (
              <CharacterCard
                key={character.id}
                character={character}
                isFavorite={isFavorite}
                onToggleFavorite={handleToggleFavorite}
                index={index}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
