/**
 * @file Widget del Header de la aplicación.
 */
import React from 'react';
import { ThemeToggleButton } from '../../../features/theme-toggle/ui/ThemeToggleButton';

export const Header = () => {
    return (
        <header className="bg-bg-secondary-light/80 dark:bg-bg-primary-dark/80 backdrop-blur-sm sticky top-0 z-10 shadow-md">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="text-2xl font-bold text-primary">
                    <a href="/">R&M Explorer</a>
                </div>
                <nav className="flex items-center gap-4">
                    {/* Aquí podrían ir otros links de navegación */}
                    <ThemeToggleButton />
                </nav>
            </div>
        </header>
    );
};
