import React from "react";
import { Link } from "react-router-dom";
import ForecastDropdown from "../Components/ForecastDropdown/ForecastDropdown";

import './NavigationLinks.css';

export default function NavigationLinks() {
    // make home be the current weather
    // make Forecast a dropdown with (hourly, 3 day, 5 day)
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