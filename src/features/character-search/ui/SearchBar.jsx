import React from "react";

export function SearchBar({ value = "", onChange }) {
    return (
        <div className="mb-4">
            <input
                type="search"
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
                placeholder="Buscar personajes..."
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring dark:bg-gray-800 dark:border-gray-700"
                aria-label="Buscar personajes"
            />
        </div>
    );
}
