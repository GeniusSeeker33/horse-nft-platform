import React, { useState, useEffect } from "react";
import { Button, Typography, Box } from "@mui/material";
import { HashConnect } from "hashconnect";

const WalletConnect = ({ onWalletConnected }) => {
    const [walletId, setWalletId] = useState("");
    const [initialized, setInitialized] = useState(false);
    const [hashconnect, setHashConnect] = useState(null);

    useEffect(() => {
        const initHashConnect = async () => {
            try {
                console.log("🟡 Initializing HashConnect v3...");

                const hc = new HashConnect();
                setHashConnect(hc);

                const metadata = {
                    name: "Horse NFT Platform",
                    description: "A Hedera NFT marketplace for magical horses",
                    icon: "https://example.com/icon.png",
                };

                const initData = await hc.init(metadata, "testnet", false);

                console.log("✅ Returned from init:", initData);

                if (!initData) {
                    throw new Error("No initData returned — possible relay failure or network issue");
                }

                hc.pairingEvent.once((pairingData) => {
                    console.log("🔗 Pairing event received:", pairingData);
                    if (pairingData.accountIds?.length > 0) {
                        const id = pairingData.accountIds[0];
                        setWalletId(id);
                        onWalletConnected?.(id);
                        console.log("✅ Wallet connected:", id);
                    }
                });

                if (initData.savedPairings.length > 0) {
                    const id = initData.savedPairings[0].accountIds[0];
                    setWalletId(id);
                    onWalletConnected?.(id);
                    console.log("💾 Loaded saved pairing:", id);
                }

                setInitialized(true);
            } catch (e) {
                console.error("❌ HashConnect init failed:", e);
                setInitialized(false);
            }
        };

        initHashConnect();
    }, [onWalletConnected]);

    const connectWallet = () => {
        if (!hashconnect) return;
        console.log("🧩 Connecting to local wallet...");
        hashconnect.connectToLocalWallet();
    };

    return (
        <Box sx={{ textAlign: "center", marginTop: 2 }}>
            {initialized ? (
                walletId ? (
                    <Typography variant="h6" color="primary">Connected: {walletId}</Typography>
                ) : (
                    <Button variant="contained" color="primary" onClick={connectWallet}>
                        Connect Wallet
                    </Button>
                )
            ) : (
                <Typography variant="h6" color="secondary">Initializing...</Typography>
            )}
        </Box>
    );
};

export default WalletConnect;

