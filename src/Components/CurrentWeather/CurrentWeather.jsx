import React, { useEffect, useState } from "react";
import { getCurrentWeatherByCoordinates, getLocationInformationByCity, getWeatherByLocation } from "../../Api/CurrentWeatherService";
import { getCurrentTime, convertToTime } from "../../Utils/Utils";

import './CurrentWeather.css'

export default function CurrentWeather({ latitude, longitude, city, state }) {
    const [locationData, setLocationData] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const renderCurrentTempSection = () => (
        <>
            {locationData && weatherData && (
                <div id="current-temp-container">
                    <div id="location-info">
                        {locationData?.LocalizedName}, {locationData?.AdministrativeArea.LocalizedName} as of {convertToTime(weatherData?.LocalObservationDateTime)} {locationData?.TimeZone.Code}
                    </div>
                    <div id="temperature-info">
                        {weatherData?.Temperature.Imperial.Value}°
                    </div>
                    <div id="weather-conditions">
                        {weatherData?.WeatherText}
                    </div>
                </div>
            )}
        </>
    );

    const fetchWeatherData = async () => {
      setIsLoading(true);
      try {
        const locationInformation = await getCurrentWeatherByCoordinates(latitude, longitude);
  
        if (locationInformation) {
          setLocationData(locationInformation);
          const locationKey = locationInformation.Key
          const weatherData = await getWeatherByLocation(locationKey);
  
          if (weatherData) {
            setWeatherData(weatherData);
          } else {
            setError('Error fetching weather data');
          }
        } else {
          setError('Invalid API key or city not found');
        }
      } catch (error) {
        console.log(error);
        setError('Error occurred while fetching weather data');
      } finally {
        setIsLoading(false);
      }
  };

    useEffect(() => {
        console.log('Location Data', locationData);
        console.log('Location Key', locationData?.Key)
        console.log('Weather Data', weatherData);
    }, [locationData, weatherData]);

    useEffect(() => {
      let isMounted = true;
      if (isMounted) {
        fetchWeatherData();
      }

      return () => {
        isMounted = false;
      }
    }, []);

    return (
        <div id="current-weather-container">
            {error && <div id="error-message">{error}</div>}
            {isLoading ? (
              <div id="loading-message">Loading...</div>
            ) : (
              renderCurrentTempSection()
            )}
        </div>
    )
}