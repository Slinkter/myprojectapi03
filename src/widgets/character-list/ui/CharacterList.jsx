/**
 * @file Widget principal que muestra la lista de personajes, búsqueda y favoritos.
 */
import React from 'react';
import { useCharacters } from '../../../features/character-list/hooks/useCharacters';
import { CharacterCard } from '../../../entities/character/ui/CharacterCard';
import { LoadingSkeleton } from '../../../shared/ui/LoadingSkeleton';
import { ErrorMessage } from '../../../shared/ui/ErrorMessage';
import { FavoritesList } from '../../../features/character-favorites/ui/FavoritesList';

/**
 * Ensambla la UI para la funcionalidad de listar, buscar y gestionar personajes.
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

    const renderContent = () => {
        switch (status) {
            case 'loading':
            case 'idle':
                return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {Array.from({ length: 8 }).map((_, index) => <LoadingSkeleton key={index} />)}
                    </div>
                );
            case 'failed':
                return <ErrorMessage message={error} onRetry={handleRetry} />;
            case 'succeeded':
                return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredCharacters.map((character) => (
                            <CharacterCard
                                key={character.id}
                                character={character}
                                isFavorite={favorites.some((fav) => fav.id === character.id)}
                                onToggleFavorite={handleToggleFavorite}
                            />
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <FavoritesList favorites={favorites} onRemoveFavorite={handleRemoveFavorite} />

            <div className="my-8">
                <input
                    type="search"
                    placeholder="Buscar personaje por nombre..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="w-full max-w-md mx-auto block p-3 border-secondary/50 bg-bg-secondary-light dark:bg-bg-secondary-dark rounded-lg focus:ring-primary focus:border-primary transition"
                />
            </div>
            {renderContent()}
        </div>
    );
};
