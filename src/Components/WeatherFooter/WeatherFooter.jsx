import React from "react";
import { Link } from "react-router-dom";

import './WeatherFooter.css';

export default function WeatherFooter() {
    const renderGitHubInformation = () => (
        <div id="github-information">
            <span>Creator GitHub: </span>
            <a className="github-link" href="https://github.com/Jake152" target="_blank" rel="noopener noreferrer">
                github.com/Jake152
            </a>
        </div>
    );

    return (
        <div id="weather-footer-container">
            <div id="weather-footer-content">
                <span id="app-information">WeatherZen Applicaton</span>
                {renderGitHubInformation()}
            </div>
        </div>
    )
}