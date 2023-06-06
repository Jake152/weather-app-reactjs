import React, { useEffect, useState } from "react";
import { getCurrentWeatherByCoordinates, getCurrentWeatherWithLocationKey, getOneDayWeatherWithLocationKey, getOneDayWeatherPeriodsWithLocationKey } from "../../Api/CurrentWeatherService";
import { convertToTime } from "../../Utils/Utils";
import Spinner from 'react-bootstrap/Spinner';

import './CurrentWeather.css'

export default function CurrentWeather({ latitude, longitude }) {
    const [locationData, setLocationData] = useState(null);
    const [currentWeatherData, setCurrentWeatherData] = useState(null);
    const [oneDayWeatherData, setOneDayWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const renderCurrentTempSection = () => (
        <>
            {locationData && currentWeatherData && (
                <div id="current-temp-container">
                    <div id="location-info">
                        {locationData?.LocalizedName}, {locationData?.AdministrativeArea.LocalizedName} as of {convertToTime(currentWeatherData?.LocalObservationDateTime)} {locationData?.TimeZone.Code}
                    </div>
                    <div id="temperature-info">
                        {currentWeatherData?.Temperature.Imperial.Value}°
                    </div>
                    <div id="weather-conditions">
                        {currentWeatherData?.WeatherText}
                    </div>
                    <div id="day-night-temp">
                        High {oneDayWeatherData?.DailyForecasts[0].Temperature.Maximum.Value}° - Low {oneDayWeatherData?.DailyForecasts[0].Temperature.Minimum.Value}°
                    </div>
                </div>
            )}
        </>
    );

    const renderForecastSection = () => (
      <>
        {forecastData && locationData && (
          <div id="forecast-container">
            <div id="title-row">
              <span id="forecast-title">Today's Forecast for {locationData?.LocalizedName}, {locationData?.AdministrativeArea.ID}</span>
            </div>
            <div id="values-row">
              <div className="forecast-item" id="morning-temp">
                <span className="label">Morning</span> <span className="value">{forecastData?.morning}°</span>
              </div>
              <div className="forecast-item" id="afternoon-temp">
                <span className="label">Afternoon</span> <span className="value">{forecastData?.afternoon}°</span>
              </div>
              <div className="forecast-item" id="evening-temp">
                <span className="label">Evening</span> <span className="value">{forecastData?.evening}°</span>
              </div>
              <div className="forecast-item" id="overnight-temp">
                <span className="label">Overnight</span> <span className="value">{forecastData?.overnight}°</span>
              </div>
            </div>
          </div>
        )}
      </>
    );

    const renderLoadingSpinner = () => (
      <div id="loading-spinner-container">
        <span id="loading-data-message">Loading data...</span>
        <Spinner id="loading-spinner" animation="border" />
      </div>
    );

    const fetchWeatherData = async () => {
      setIsLoading(true);
      try {
        const locationInformation = await getCurrentWeatherByCoordinates(latitude, longitude);
  
        if (locationInformation) {
          setLocationData(locationInformation);
          const locationKey = locationInformation.Key
          const currentWeather = await getCurrentWeatherWithLocationKey(locationKey);
          const oneDayWeather = await getOneDayWeatherWithLocationKey(locationKey);
          const forecastData = await getOneDayWeatherPeriodsWithLocationKey(locationKey);
  
          if (currentWeather && oneDayWeather && forecastData) {
            setCurrentWeatherData(currentWeather);
            setOneDayWeatherData(oneDayWeather);
            setForecastData(forecastData);
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
        console.log('Current Weather Data', currentWeatherData);
        console.log('One Day Weather', oneDayWeatherData);
        console.log('Forecast Data', forecastData);
    }, [locationData, currentWeatherData, forecastData]);

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
              renderLoadingSpinner()
            ) : (
              // renderCurrentTempSection()
              <>
                {/* First column */}
                <div className="column" id="current-temp-column">
                  {renderCurrentTempSection()}
                </div>
                {/* Second column */}
                <div className="column" id="forecast-column">
                  {renderForecastSection()}
                </div>
              </>
            )}
        </div>
    )
}