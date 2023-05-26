import React from "react";
import { Link } from "react-router-dom";
import ForecastDropdown from "../Components/ForecastDropdown/ForecastDropdown";

import './NavigationLinks.css';

export default function NavigationLinks() {
    // make Forecast a dropdown with (Today, hourly, 10 day, etc)
    const renderNavigationLinks = () => (
        <nav id="navigation-links" >
            <Link className="link" to="/">
                Home
            </Link>
            <Link className="link" to="/today"> 
                Forecast
            </Link>
        </nav>
    );

    return (
        <div id="navigation-links-container">
            {renderNavigationLinks()}
        </div>
    )
}