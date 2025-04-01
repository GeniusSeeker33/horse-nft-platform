import React, { useState, useEffect } from "react";
import { Client, AccountId } from "@hashgraph/sdk";

const MyNFTs = () => {
    const [nfts, setNfts] = useState([]);
    const accountId = "your-account-id"; // Replace with actual user account ID

    useEffect(() => {
        const fetchUserNFTs = async () => {
            const client = Client.forTestnet();
            client.setOperator("your-account-id", "your-private-key");

            const userNfts = await client.getAccountNfts(AccountId.fromString(accountId));
            setNfts(userNfts);
        };

        fetchUserNFTs();
    }, []);

    return (
        <div>
            <h2>My NFTs</h2>
            <ul>
                {nfts.map((nft, index) => (
                    <li key={index}>
                        <img src={nft.metadata} alt="NFT" width="100" />
                        <p>Token ID: {nft.tokenId}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MyNFTs;
