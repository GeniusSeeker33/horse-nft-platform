import React from "react";

const NFTCard = ({ nft }) => {
    return (
        <div className="nft-card">
            <img src={nft.image} alt={nft.name} />
            <h3>{nft.name}</h3>
            <p>Type: {nft.type}</p>
            <p>Mutation: {nft.mutation || "None"}</p>
            <p>Attributes: {nft.attributes.join(", ")}</p>
        </div>
    );
};

export default NFTCard;
