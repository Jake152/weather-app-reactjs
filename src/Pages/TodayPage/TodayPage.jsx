import React from 'react';
import CurrentWeather from '../../Components/CurrentWeather/CurrentWeather';

import './TodayPage.css';

export default function TodayPage({ latitude, longitude }) {

    return (
        <div id="today-page-container">
            <CurrentWeather latitude={latitude} longitude={longitude} />
        </div>
    )
}