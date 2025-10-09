/**
 * @file Widget que muestra la lista de personajes y la lista de favoritos.
 */
import { useCharacters } from "../hooks/useCharacters";
import { CharacterCard } from "./CharacterCard";
import { SearchBar } from "./SearchBar";
import { FavoritesList } from "./FavoritesList";
import { ErrorMessage } from "./ErrorMessage";
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
        <div className="space-y-12">
            <FavoritesList
                favorites={favorites}
                onRemoveFavorite={handleRemoveFavorite}
            />

            <div className="space-y-6">
                <h2 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">
                    Todos los Personajes
                </h2>
                <SearchBar value={searchTerm} onChange={handleSearch} />
            </div>

            {status === "loading" && <CharacterGridSkeleton />}

            {status === "failed" && (
                <ErrorMessage message={error} onRetry={handleRetry} />
            )}

            {status === "succeeded" && filteredCharacters.length === 0 && (
                <p className="text-center text-text-secondary-light dark:text-text-secondary-dark text-lg">
                    No se encontraron personajes con ese nombre.
                </p>
            )}

            {status === "succeeded" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
