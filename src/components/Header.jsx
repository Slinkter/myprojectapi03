/**
 * @file Widget del Header de la aplicación.
 */
import React from 'react';
import { ThemeToggleButton } from './ThemeToggleButton';

export const Header = () => {
    return (
        <header className="header">
            <div className="header__container">
                <div className="header__logo">
                    <a href="/">API RICK & MORTIN  </a>
                </div>
                <nav className="header__nav">
                    {/* Aquí podrían ir otros links de navegación */}
                    <ThemeToggleButton />
                </nav>
            </div>
        </header>
    );
};
