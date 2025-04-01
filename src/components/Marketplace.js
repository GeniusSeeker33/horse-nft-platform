import React, { useState, useEffect } from "react";
import { Grid, Card, CardMedia, CardContent, Typography, Button, Container } from "@mui/material";

const Marketplace = () => {
    const [nfts, setNfts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNFTs = async () => {
            try {
                const tokenId = "0.0.5653913"; // ✅ Your Token ID
                const mirrorNodeUrl = `https://testnet.mirrornode.hedera.com/api/v1/tokens/${tokenId}/nfts`;

                console.log("🔄 Fetching NFTs from:", mirrorNodeUrl);
                const response = await fetch(mirrorNodeUrl);
                const data = await response.json();

                console.log("✅ Full NFT Data Response:", data);

                if (data.nfts && data.nfts.length > 0) {
                    const formattedNfts = data.nfts.map(nft => {
                        let imageUrl = "";

                        // ✅ Assign the correct image manually (since metadata is missing an image URL)
                        if (nft.serial_number === 1) { 
                            imageUrl = "https://img1.wsimg.com/isteam/ip/6348e189-47b0-4178-8915-314376cf37a7/magestic_phoenix.png/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:1023,cg:true";
                        }

                        return {
                            tokenId: nft.token_id,
                            serialNumber: nft.serial_number,
                            imageUrl: imageUrl || "https://example.com/placeholder.jpg", // ✅ Fallback if no image found
                        };
                    });

                    setNfts(formattedNfts);
                } else {
                    console.warn("⚠️ No NFTs found for this Token ID.");
                }
            } catch (error) {
                console.error("❌ Error fetching NFTs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNFTs();
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Marketplace</Typography>
            
            {loading ? (
                <Typography>Loading NFTs...</Typography>
            ) : nfts.length > 0 ? (
                <Grid container spacing={3}>
                    {nfts.map((nft, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={nft.imageUrl}
                                    alt="NFT"
                                    style={{ objectFit: "contain" }} // ✅ Prevents cropping
                                    onError={(e) => e.target.src = "https://example.com/placeholder.jpg"} // ✅ Fallback image
                                />
                                <CardContent>
                                    <Typography variant="h6">Token ID: {nft.tokenId}</Typography>
                                    <Typography>Serial: {nft.serialNumber}</Typography>
                                    <Button variant="contained" color="secondary">Buy</Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography>No NFTs found.</Typography>
            )}
        </Container>
    );
};

export default Marketplace;





