import React from "react";

const Filters = ({ filters, onFilterChange }) => {
    return (
        <div className="filters">
            <select onChange={(e) => onFilterChange("type", e.target.value)}>
                <option value="">All Types</option>
                <option value="Mystic Friesian">Mystic Friesian</option>
                <option value="Spotted Spirit">Spotted Spirit</option>
                <option value="Shadow Dancer">Shadow Dancer</option>
            </select>

            <select onChange={(e) => onFilterChange("mutation", e.target.value)}>
                <option value="">All Mutations</option>
                <option value="Diamond">Diamond</option>
                <option value="Gilded">Gilded</option>
                <option value="Golden">Golden</option>
            </select>

            <select onChange={(e) => onFilterChange("attribute", e.target.value)}>
                <option value="">All Attributes</option>
                <option value="Electric Aura">Electric Aura</option>
                <option value="Metallic Hooves">Metallic Hooves</option>
                <option value="Dragon Wings">Dragon Wings</option>
                <option value="Heavy Feathers">Heavy Feathers</option>
                <option value="Some Feathers">Some Feathers</option>
                <option value="No Feathers">No Feathers</option>
            </select>
        </div>
    );
};

export default Filters;
