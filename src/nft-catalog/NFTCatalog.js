import React, { useState } from "react";
import NFTCard from "./NFTCard";
import Filters from "./Filters";
import CatalogData from "./CatalogData";
import "./styles.css";

const NFTCatalog = () => {
    const [filters, setFilters] = useState({
        type: "",
        mutation: "",
        attribute: "",
    });

    const handleFilterChange = (name, value) => {
        setFilters({ ...filters, [name]: value });
    };

    const filteredNFTs = CatalogData.filter((nft) => {
        return (
            (filters.type ? nft.type === filters.type : true) &&
            (filters.mutation ? nft.mutation === filters.mutation : true) &&
            (filters.attribute ? nft.attributes.includes(filters.attribute) : true)
        );
    });

    return (
        <div className="catalog-container">
            <h2>Leopard Friesian NFT Catalog</h2>
            <Filters filters={filters} onFilterChange={handleFilterChange} />
            <div className="nft-grid">
                {filteredNFTs.map((nft) => (
                    <NFTCard key={nft.id} nft={nft} />
                ))}
            </div>
        </div>
    );
};

export default NFTCatalog;


