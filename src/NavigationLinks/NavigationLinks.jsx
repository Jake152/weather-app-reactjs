import React from "react";
import { Link } from "react-router-dom";

import './NavigationLinks.css';

export default function NavigationLinks() {
    const renderNavigationLinks = () => (
        <nav id="navigation-links" >
            <Link className="link" to="/">
                Today
            </Link>
            <Link className="link" to="/hourly"> 
                Hourly
            </Link>
        </nav>
    );

    return (
        <div id="navigation-links-container">
            {renderNavigationLinks()}
        </div>
    )
}