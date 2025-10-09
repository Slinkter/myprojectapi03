import React from "react";
import { LoadingSkeleton } from "./LoadingSkeleton";

/**
 * Componente de esqueleto de carga que muestra una cuadrícula de esqueletos de tarjetas.
 * Utiliza el `LoadingSkeleton` detallado para cada elemento.
 */
export function CharacterGridSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map(
                (
                    _,
                    i // Muestra 8 esqueletos para llenar la vista inicial
                ) => (
                    <LoadingSkeleton key={i} />
                )
            )}
        </div>
    );
}
