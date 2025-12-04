import React from "react";

export function SearchBar({ value = "", onChange }) {
    return (
        <div className="search-bar">
            <input
                className="search-bar__input"
                type="search"
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
                placeholder="Buscar personajes..."
                aria-label="Buscar personajes"
            />
        </div>
    );
}
