/**
 * @file Widget que muestra la lista de personajes y la lista de favoritos.
 */
import { useCharacters } from "@/features/characters/hooks/useCharacters";
import { CharacterCard } from "./CharacterCard";
import { SearchBar } from "@/components/SearchBar";
import { FavoritesList } from "./FavoritesList";
import { ErrorMessage } from "@/components/ErrorMessage";
import { CharacterGridSkeleton } from "./CharacterGridSkeleton";

/**
 * Orquesta y renderiza la UI para la búsqueda, visualización y gestión de personajes.
 * Maneja los diferentes estados de la aplicación (carga, error, vacío, éxito).
 * @returns {JSX.Element}
 */
export const CharacterList = () => {
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
    <div className="character-list">
      {/*  */}
      <FavoritesList
        favorites={favorites}
        onRemoveFavorite={handleRemoveFavorite}
      />
      {/*  */}
      <div className="character-list__header">
        <h2 className="character-list__title"> Personajes</h2>
        <SearchBar value={searchTerm} onChange={handleSearch} />
      </div>

      {status === "loading" && <CharacterGridSkeleton />}

      {status === "failed" && (
        <ErrorMessage message={error} onRetry={handleRetry} />
      )}

      {status === "succeeded" && filteredCharacters.length === 0 && (
        <p className="character-list__empty">
          No se encontraron personajes con ese nombre {searchTerm}
        </p>
      )}

      {status === "succeeded" && (
        <div className="character-list__grid">
          {filteredCharacters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onToggleFavorite={handleToggleFavorite}
              favorites={favorites}
            />
          ))}
        </div>
      )}
    </div>
  );
};
