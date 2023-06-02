import React, { useEffect, useState } from 'react';
import CurrentWeather from '../../Components/CurrentWeather/CurrentWeather';

import './HomePage.css';

export default function HomePage({ latitude, longitude, city, state }) {

    return (
        <div id="home-page-container">
            <CurrentWeather latitude={latitude} longitude={longitude} city={city} state={state} />
        </div>
    )
}