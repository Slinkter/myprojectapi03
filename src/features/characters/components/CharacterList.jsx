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
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

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

  const shouldReduceMotion = useReducedMotion();

  /**
   * Optimización Algorítmica (O(n)):
   * Creamos un Set de IDs de favoritos para que la búsqueda dentro del loop sea O(1).
   * Esto evita una complejidad O(n*m) al renderizar la lista.
   */
  const favoriteIds = useMemo(
    () => new Set(favorites.map((fav) => fav.id)),
    [favorites]
  );

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-12 space-y-16">
      {/*  */}
      <FavoritesList
        favorites={favorites}
        onRemoveFavorite={handleRemoveFavorite}
      />
      {/*  */}
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Discover <span className="text-cyan-500">Characters</span>
          </h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            Explore the multiverse and save your favorites.
          </p>
        </div>
        <SearchBar value={searchTerm} onChange={handleSearch} />
      </div>

      <AnimatePresence mode="wait">
        {status === ReduxStatus.LOADING && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CharacterGridSkeleton />
          </motion.div>
        )}

        {status === ReduxStatus.FAILED && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
          >
            <ErrorMessage message={error} onRetry={handleRetry} />
          </motion.div>
        )}

        {status === ReduxStatus.SUCCEEDED && filteredCharacters.length === 0 && (
          <motion.p
            key="empty"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-slate-500 dark:text-slate-400 text-xl font-medium"
          >
            No results found for &quot;{searchTerm}&quot;
          </motion.p>
        )}

        {status === ReduxStatus.SUCCEEDED && (
          <motion.div
            key="grid"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: shouldReduceMotion ? 0 : 0.08,
                },
              },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredCharacters.map((character) => (
              <CharacterCard
                key={character.id}
                character={character}
                isFavorite={favoriteIds.has(character.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
