// Updated Marketplace.js with Buy Functionality
import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Container
} from "@mui/material";
import {
  Client,
  AccountId,
  PrivateKey,
  TokenId,
  TokenNftInfoQuery,
  TransferTransaction,
  PublicKey
} from "@hashgraph/sdk";
import axios from "axios";

const Marketplace = () => {
  const [nfts, setNfts] = useState([]);
  const [buyerId, setBuyerId] = useState(""); // Simulated connected wallet

  useEffect(() => {
    const fetchNFTs = async () => {
      const operatorId = AccountId.fromString(process.env.REACT_APP_OPERATOR_ID);
      const operatorKey = PrivateKey.fromString(process.env.REACT_APP_OPERATOR_KEY);
      const tokenId = TokenId.fromString(process.env.REACT_APP_TOKEN_ID);

      const client = Client.forTestnet().setOperator(operatorId, operatorKey);

      const nftInfos = await new TokenNftInfoQuery()
        .setTokenId(tokenId)
        .setStart(0)
        .setEnd(20)
        .execute(client);

      const items = await Promise.all(
        nftInfos.map(async (nft) => {
          const metadataBuffer = nft.metadata;
          const metadataUrl = metadataBuffer.toString();
          let metadata = {};

          try {
            const response = await axios.get(metadataUrl);
            metadata = response.data;
          } catch (e) {
            console.warn("Failed to load metadata for", metadataUrl);
          }

          return {
            tokenId: nft.tokenId.toString(),
            serial: nft.serialNumber.toString(),
            image: metadata.image || "https://example.com/placeholder.jpg",
            name: metadata.name || `NFT #${nft.serialNumber}`,
            description: metadata.description || "No description"
          };
        })
      );

      setNfts(items);
    };

    fetchNFTs();
  }, []);

  const handleBuy = async (tokenId, serial) => {
    if (!buyerId) {
      alert("Please simulate a connected wallet ID");
      return;
    }

    const operatorId = AccountId.fromString(process.env.REACT_APP_OPERATOR_ID);
    const operatorKey = PrivateKey.fromString(process.env.REACT_APP_OPERATOR_KEY);
    const client = Client.forTestnet().setOperator(operatorId, operatorKey);

    try {
      const tx = await new TransferTransaction()
        .addNftTransfer(tokenId, serial, operatorId, AccountId.fromString(buyerId))
        .freezeWith(client)
        .sign(operatorKey);

      const submit = await tx.execute(client);
      const receipt = await submit.getReceipt(client);
      alert(`✅ NFT transferred! Status: ${receipt.status.toString()}`);
    } catch (error) {
      console.error("Transfer failed:", error);
      alert("Transfer failed: " + error.message);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Marketplace</Typography>

      <div style={{ marginBottom: 16 }}>
        <Typography variant="body1">Simulate Wallet ID:</Typography>
        <input
          type="text"
          value={buyerId}
          onChange={(e) => setBuyerId(e.target.value)}
          placeholder="Enter 0.0.xxxxxxx"
        />
      </div>

      <Grid container spacing={3}>
        {nfts.map((nft, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia component="img" height="200" image={nft.image} alt={nft.name} />
              <CardContent>
                <Typography variant="h6">{nft.name}</Typography>
                <Typography variant="body2" color="textSecondary">{nft.description}</Typography>
                <Typography variant="caption">Serial #: {nft.serial}</Typography>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "10px" }}
                  onClick={() => handleBuy(TokenId.fromString(nft.tokenId), parseInt(nft.serial))}
                >
                  Buy
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Marketplace;
