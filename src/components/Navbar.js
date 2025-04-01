import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Ensure styles are imported if needed

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Horse NFT Platform</h1>
            <div className="nav-links">
                <Link to="/">DASHBOARD</Link>
                <Link to="/marketplace">MARKETPLACE</Link>
                <Link to="/auction">AUCTION</Link>
                <Link to="/mynfts">MY NFTS</Link>
                <Link to="/breeding">BREEDING</Link>
                <Link to="/catalog">CATALOG</Link> {/* 🚀 Add this */}
            </div>
        </nav>
    );
};

export default Navbar;



