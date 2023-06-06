import React, { useEffect, useState } from "react";
import { getCurrentWeatherByCoordinates, getCurrentWeatherWithLocationKey, getOneDayWeatherWithLocationKey, getOneDayWeatherPeriodsWithLocationKey } from "../../Api/CurrentWeatherService";
import { convertToTime } from "../../Utils/Utils";
import Spinner from 'react-bootstrap/Spinner';

import './CurrentWeather.css'

export default function CurrentWeather({ latitude, longitude }) {
    const [locationData, setLocationData] = useState(null);
    const [currentWeatherData, setCurrentWeatherData] = useState(null);
    const [oneDayWeatherData, setOneDayWeatherData] = useState(null);
    const [forecastPeriodData, setForecastPeriodData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const renderCurrentTempSection = () => (
        <>
            {locationData && currentWeatherData && oneDayWeatherData && (
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
                    <div id="high-low-temp">
                        High {oneDayWeatherData?.Temperature.Maximum.Value}° - Low {oneDayWeatherData?.Temperature.Minimum.Value}°
                    </div>
                </div>
            )}
        </>
    );

    const renderTodayWeatherInfo = () => (
      <>
        {locationData && currentWeatherData && oneDayWeatherData && (
          <div id="today-weather-container">
            <div id="title-row">
              <span id="forecast-title">Weather Today in {locationData?.LocalizedName}, {locationData?.AdministrativeArea.ID}</span>
            </div>
            <div id="temperature-info">
                <span id="current-temp-text">{currentWeatherData?.RealFeelTemperature.Imperial.Value}°</span>
                <span id="feels-like-text">Feels Like</span>
            </div>
            <div id="additional-info">
                <div id="high-low-temp" className="additional-info-item">
                  <span className="label">High / Low</span> 
                  <span className="data-text">{oneDayWeatherData?.Temperature.Maximum.Value}° / {oneDayWeatherData?.Temperature.Minimum.Value}°</span>
                </div>
                <div id="wind-speed-info" className="additional-info-item">
                  <span className="label">Wind</span> 
                  <span className="data-text">{currentWeatherData?.Wind.Speed.Imperial.Value} MPH</span>
                </div>
                <div id="dew-point-info" className="additional-info-item">
                  <span className="label">Dew Point</span> 
                  <span className="data-text">{currentWeatherData?.DewPoint.Imperial.Value}°</span>
                </div>
                <div id="wind-direction-info" className="additional-info-item">
                  <span className="label">Wind Direction</span> 
                  <span className="data-text">{currentWeatherData?.Wind.Direction.Localized}</span>
                </div>
                <div id="humidity-info" className="additional-info-item">
                  <span className="label">Relative Humidity</span> 
                  <span className="data-text">{currentWeatherData?.RelativeHumidity}%</span>
                </div>
                <div id="wind-gusts-info" className="additional-info-item">
                  <span className="label">Wind Gust</span> 
                  <span className="data-text">{currentWeatherData?.WindGust.Speed.Imperial.Value} MPH</span>
                </div>
                <div id="cloud-cover-info" className="additional-info-item">
                  <span className="label">Cloud Cover</span> 
                  <span className="data-text">{currentWeatherData?.CloudCover}%</span>
                </div>
                <div id="visibility-info" className="additional-info-item">
                  <span className="label">Visibility</span> 
                  <span className="data-text">{currentWeatherData?.Visibility.Imperial.Value} {currentWeatherData?.Visibility.Imperial.Unit}</span>
                </div>
                <div id="pressure-info" className="additional-info-item">
                  <span className="label">Pressure</span> 
                  <span className="data-text">{currentWeatherData?.Pressure.Imperial.Value} {currentWeatherData?.Pressure.Imperial.Unit}</span>
                </div>
                <div id="uvindex-info" className="additional-info-item">
                  <span className="label">UV Index</span> 
                  <span className="data-text">{currentWeatherData?.UVIndex} {currentWeatherData?.UVIndexText}</span>
                </div>
            </div>
          </div>
        )}
      </>
    );

    const renderForecastSection = () => (
      <>
        {forecastPeriodData && locationData && (
          <div id="forecast-container">
            <div id="title-row">
              <span id="forecast-title">Today's Forecast for {locationData?.LocalizedName}, {locationData?.AdministrativeArea.ID}</span>
            </div>
            <div id="values-row">
              <div className="forecast-item" id="morning-temp">
                <span className="label">Morning</span> <span className="value">{forecastPeriodData?.morning.Temperature.Value}°</span>
              </div>
              <div className="forecast-item" id="afternoon-temp">
                <span className="label">Afternoon</span> <span className="value">{forecastPeriodData?.afternoon.Temperature.Value}°</span>
              </div>
              <div className="forecast-item" id="evening-temp">
                <span className="label">Evening</span> <span className="value">{forecastPeriodData?.evening.Temperature.Value}°</span>
              </div>
              <div className="forecast-item" id="overnight-temp">
                <span className="label">Overnight</span> <span className="value">{forecastPeriodData?.overnight.Temperature.Value}°</span>
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

    const renderWrappers = () => (
      <>
        {locationData && currentWeatherData && oneDayWeatherData && forecastPeriodData && (
          <div id="current-weather-container">
            <div className="current-temp-wrapper">
              {renderCurrentTempSection()}
              {renderTodayWeatherInfo()}
            </div>
            <div className="forecast-wrapper">
              {renderForecastSection()}
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
          const currentWeather = await getCurrentWeatherWithLocationKey(locationKey);
          const oneDayWeather = await getOneDayWeatherWithLocationKey(locationKey);
          const forecastData = await getOneDayWeatherPeriodsWithLocationKey(locationKey);
  
          if (currentWeather && oneDayWeather && forecastData) {
            setCurrentWeatherData(currentWeather);
            setOneDayWeatherData(oneDayWeather);
            setForecastPeriodData(forecastData);
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
        console.log('Forecast Data', forecastPeriodData);
    }, [locationData, currentWeatherData, forecastPeriodData]);

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
      <>
        {error && <div id="error-message">{error}</div>}
        {isLoading ? renderLoadingSpinner() : renderWrappers()}
      </>
    );
}