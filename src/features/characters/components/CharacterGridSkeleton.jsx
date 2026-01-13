/**
 * @file Grid skeleton component for character loading states.
 * Displays a grid of loading skeletons while characters are being fetched.
 */
import { LoadingSkeleton } from "@/components/LoadingSkeleton";

/**
 * Renders a grid of skeleton loaders for the character list.
 * Shows 18 skeleton cards in a responsive grid layout matching the CharacterList grid.
 *
 * @returns {JSX.Element} Grid container with 18 loading skeleton cards
 *
 * @example
 * <Suspense fallback={<CharacterGridSkeleton />}>
 *   <CharacterList />
 * </Suspense>
 */
export function CharacterGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 18 }).map((_, i) => (
        <LoadingSkeleton key={i} />
      ))}
    </div>
  );
}
