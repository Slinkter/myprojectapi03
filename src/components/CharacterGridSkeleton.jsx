
import { LoadingSkeleton } from "./LoadingSkeleton";

export function CharacterGridSkeleton() {
    return (
        <div className="character-grid-skeleton">
            {Array.from({ length: 18 }).map((_,i) => (<LoadingSkeleton key={i} />))}  
        </div>
    );
}
