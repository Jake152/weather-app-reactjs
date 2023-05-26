import React from "react";
import NavigationLinks from "../../NavigationLinks/NavigationLinks";

import './WeatherHeader.css';

export default function WeatherHeader() {
    return (
        <div id="weather-header-container">
            <div id="weather-header-content">
                <NavigationLinks />
                <span>Weather App Header</span>
            </div>
        </div>
    )
}