import React from "react";
import NavigationLinks from "../../NavigationLinks/NavigationLinks";
import WeatherZenLogo from '../../Assets/WeatherZenLogo.png';

import './WeatherHeader.css';

export default function WeatherHeader() {
    return (
        <div id="weather-header-container">
            <div id="weather-header-content">
                <img id="weather-zen-logo" src={WeatherZenLogo} alt="WeatherZen Logo" className="logo" />
                <NavigationLinks />
                <span id="header-info">WeatherZen Header</span>
            </div>
        </div>
    )
}