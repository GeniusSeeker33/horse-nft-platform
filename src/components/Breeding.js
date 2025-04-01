import React, { useState } from "react";

const Breeding = () => {
    const [parent1, setParent1] = useState("");
    const [parent2, setParent2] = useState("");

    const breedNFTs = async () => {
        console.log(`Breeding NFTs: ${parent1} + ${parent2}`);
        alert("Breeding in progress... Feature coming soon!");
    };

    return (
        <div>
            <h2>Breeding</h2>
            <input
                type="text"
                placeholder="Parent 1 Token ID"
                onChange={(e) => setParent1(e.target.value)}
            />
            <input
                type="text"
                placeholder="Parent 2 Token ID"
                onChange={(e) => setParent2(e.target.value)}
            />
            <button onClick={breedNFTs}>Breed</button>
        </div>
    );
};

export default Breeding;
