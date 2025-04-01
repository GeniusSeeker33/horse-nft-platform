import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // ✅ Ensure correct import
import Navbar from "./components/Navbar";
import WalletConnect from "./components/WalletConnect";
import Marketplace from "./components/Marketplace";
import Auction from "./components/Auction";
import MyNFTs from "./components/MyNFTs";
import Breeding from "./components/Breeding";
import Dashboard from "./components/Dashboard";
import NFTCatalog from "./nft-catalog/NFTCatalog";
function App() {
console.log("Navbar:", Navbar);
console.log("WalletConnect:", WalletConnect);
console.log("Marketplace:", Marketplace);
console.log("Auction:", Auction);
console.log("MyNFTs:", MyNFTs);
console.log("Breeding:", Breeding);
console.log("Dashboard:", Dashboard);
    return (
        <Router>  {/* ✅ Ensure Router is wrapped properly */}
            <Navbar />
            <WalletConnect />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/auction" element={<Auction />} />
                <Route path="/mynfts" element={<MyNFTs />} />
                <Route path="/breeding" element={<Breeding />} />
                <Route path="/catalog" element={<NFTCatalog />} />
            </Routes>
        </Router>
    );
}

export default App;




