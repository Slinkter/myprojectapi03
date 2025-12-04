import React from "react";
import PropTypes from "prop-types";

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

SearchBar.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
};