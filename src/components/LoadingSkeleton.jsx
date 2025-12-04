/**
 * @file Componente de esqueleto de carga para simular el layout de una tarjeta.
 */
import React from "react";

/**
 * Muestra una animación de esqueleto para una tarjeta de personaje.
 */
export const LoadingSkeleton = React.memo(() => {
    return (
        // Se eliminan 'max-w-sm mx-auto p-4 md:p-0' para que se adapte a la cuadrícula.
        // Se añaden clases para que el esqueleto coincida con el layout de CharacterCard.
        <div className="loading-skeleton">
            <div className="loading-skeleton__pulse">
                {/* Placeholder para la imagen: h-64 coincide con la imagen de CharacterCard */}
                <div className="loading-skeleton__image"></div>
                {/* Placeholder para el contenido: h-40 coincide con el div de contenido de CharacterCard */}
                <div className="loading-skeleton__content">
                    <div className="loading-skeleton__line-lg"></div>
                    <div className="loading-skeleton__line-md"></div>
                    <div className="loading-skeleton__button"></div>
                </div>
            </div>
        </div>
    );
});
