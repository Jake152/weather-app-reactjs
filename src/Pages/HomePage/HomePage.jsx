import React, { useEffect, useState } from "react";
import CurrentWeather from "../../Components/CurrentWeather/CurrentWeather";

import './HomePage.css';

export default function HomePage() {

    return (
        <div id="home-page-container">
            <CurrentWeather />
        </div>
    )
}