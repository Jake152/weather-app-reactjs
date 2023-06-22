import React, { useEffect, useState } from "react";
import { 
  getCurrentWeatherByCoordinates, 
  getCurrentWeatherWithLocationKey, 
  getOneDayWeatherWithLocationKey, 
  getOneDayWeatherPeriodsWithLocationKey, 
  get12HourForecastWithLocationKey,
} from "../../Api/CurrentWeatherService";
import { convertToTime, formatDate, getMoonPhaseIcon, getWeatherIcon } from "../../Utils/Utils";
import Spinner from 'react-bootstrap/Spinner';
import WeatherIcons from "../../Assets/WeatherIcons/WeatherIcons";
import MoonIcons from "../../Assets/MoonIcons/MoonIcons";

import './CurrentWeather.css'

export default function CurrentWeather({ latitude, longitude }) {
    const [locationData, setLocationData] = useState(null);
    const [currentWeatherData, setCurrentWeatherData] = useState(null);
    const [oneDayWeatherData, setOneDayWeatherData] = useState(null);
    // const [forecastPeriodData, setForecastPeriodData] = useState(null);
    const [hour12Data, setHour12Data] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // Format HH PM/AM
    const convertTo12HourTime = (date) => {
      const hour12Format = new Date(date).toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
      });
      return hour12Format;
    }

    const getLocalTime = (timestamp) => {
      const date = new Date(timestamp);
      const options = { hour: "numeric", minute: "numeric", hour12: true };
      return date.toLocaleTimeString(undefined, options);
    };

    const renderCurrentTempSection = () => (
        <>
            {locationData && currentWeatherData && oneDayWeatherData && (
                <div id="current-temp-container" className="section-container">
                  <div id="location-info">
                      {formatDate(oneDayWeatherData?.Date)} - {locationData?.LocalizedName}, {locationData?.AdministrativeArea.LocalizedName} as of {convertToTime(currentWeatherData?.LocalObservationDateTime)} {locationData?.TimeZone.Code}
                  </div>
                  <div id="temp-sun-info-container">
                      <div id="temp-info-container">
                          <div id="temp-info">
                              {currentWeatherData?.Temperature.Imperial.Value}°
                          </div>
                          <div id="weather-conditions">
                              {currentWeatherData?.WeatherText}
                          </div>
                          <div id="high-low-temp">
                              High {oneDayWeatherData?.Temperature.Maximum.Value}° - Low {oneDayWeatherData?.Temperature.Minimum.Value}°
                          </div>
                      </div>
                      <div id="sunrise-sunset-info-container">
                          <div id="sunrise-container">
                            <div id="sunrise-info">
                              <span id="sunrise-label">Sunrise</span>
                              <span id="sunrise-time">{getLocalTime(oneDayWeatherData?.Sun.Rise)}</span>
                            </div>
                            <img src={WeatherIcons?.Sunrise} className="weather-icon" />
                          </div>
                          <div id="sunset-container">
                            <div id="sunset-info">
                              <span id="sunset-label">Sunset</span>
                              <span id="sunset-time">{getLocalTime(oneDayWeatherData?.Sun.Set)}</span>
                            </div>
                            <img src={WeatherIcons?.Sunset} className="weather-icon" />
                          </div>
                      </div>
                  </div>
                  {/* <div id="temp-info">
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
                  <div id="sunrise-sunset-info">
                      <div id="sunrise">
                          Sunrise
                      </div>
                      <div id="sunset">
                          Sunset
                      </div>
                  </div> */}
                </div>
            )}
        </>
    );

    const renderTodayWeatherInfo = () => (
      <>
        {locationData && currentWeatherData && oneDayWeatherData && (
          <div id="today-weather-container" className="section-container">
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

    // const render12HourSection = () => (
    //   <>
    //     {hour12Data && (
    //       <div id="hourly-container" className="section-container">
    //         {hour12Data && (
    //           <>
    //             <div id="title-row">
    //               <span id="hourly-title">Hourly Forecast</span>
    //             </div>
    //             <div id="values-row">
    //               {hour12Data.slice(0,8).map((data, index) => (
    //                 <div key={index} className="hourly-value">
    //                   <span>{convertTo12HourTime(data.DateTime)}</span>
    //                   <span>{data.Temperature.Value}°</span>
    //                   <span>{data.IconPhrase}</span>
    //                   <img src={getWeatherIcon(data.IconPhrase)} className="weather-icon" />
    //                 </div>
    //               ))}
    //             </div>
    //           </>
    //         )}
    //       </div>
    //     )}
    //   </>
    // );

    const weatherIconInfo = (condition, hour) => {
      const sunRise = getLocalTime(oneDayWeatherData?.Sun.Rise);
      const sunSet = getLocalTime(oneDayWeatherData?.Sun.Set);
      return getWeatherIcon(condition, hour, sunRise, sunSet);
    }

    const render12HourSection = () => (
      <>
        {hour12Data && (
            <div id="hourly-container" className="section-container">
                <div id="title-row">
                  <span id="hourly-title">Hourly Forecast</span>
                </div>
                <div id="values-row">
                  {/* {hour12Data.slice(0, 6).map((data, index) => ( */}
                  {hour12Data.map((data, index) => (
                    <div key={index} className="hourly-item">
                      <div id="time-temp" className="hourly-item-content">
                        <span id="hourly-temp">{convertTo12HourTime(data.DateTime)}</span>
                        <span>{data.Temperature.Value}°</span>
                      </div>
                      <div id="icon-condition" className="hourly-item-content">
                        <img src={weatherIconInfo(data.IconPhrase, data.DateTime)} className="weather-icon" />
                        <span>{data.IconPhrase}</span>
                      </div>
                      <div id="percipitation-info" className="hourly-item-content">
                        <img src={WeatherIcons.Raindrops} className="weather-icon" />
                        <span>{data.RainProbability}%</span>
                      </div>
                    </div>
                  ))}
                </div>
            </div>
          )}
          
        {/* {forecastPeriodData && locationData && (
          <div id="forecast-container" className="section-container">
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
        )} */}
      </>
    );

    const renderAirAndPollenQualitySection = () => (
      <>
        {oneDayWeatherData && (
          <div id="air-pollen-quality-container" className="section-container">
            <div id="title-row">
              <span id="air-pollen-quality-title">Air and Pollen Quality</span> 
            </div>
            <div id="additional-info-row">
                <div id="air-quality-category" className="additional-info-item">
                  <span className="label">Air Quality</span> 
                  <span className="data-text">{oneDayWeatherData?.AirAndPollen[0].Category}</span>
                </div>
                <div id="air-quality-index" className="additional-info-item">
                  <span className="label">Index</span> 
                  <span className="data-text">{oneDayWeatherData?.AirAndPollen[0].Value}</span>
                </div>
                <div id="grass-pollen-category" className="additional-info-item">
                  <span className="label">Grass Pollen</span> 
                  <span className="data-text">{oneDayWeatherData?.AirAndPollen[1].Category}</span>
                </div>
                <div id="grass-pollen-index" className="additional-info-item">
                  <span className="label">Index</span> 
                  <span className="data-text">{oneDayWeatherData?.AirAndPollen[1].Value}</span>
                </div>
                <div id="mold-pollen-category" className="additional-info-item">
                  <span className="label">Mold Pollen</span> 
                  <span className="data-text">{oneDayWeatherData?.AirAndPollen[2].Category}</span>
                </div>
                <div id="mold-pollen-index" className="additional-info-item">
                  <span className="label">Index</span> 
                  <span className="data-text">{oneDayWeatherData?.AirAndPollen[2].Value}</span>
                </div>
                <div id="ragweed-pollen-category" className="additional-info-item">
                  <span className="label">Ragweed Pollen</span> 
                  <span className="data-text">{oneDayWeatherData?.AirAndPollen[3].Category}</span>
                </div>
                <div id="ragweed-pollen-index" className="additional-info-item">
                  <span className="label">Index</span> 
                  <span className="data-text">{oneDayWeatherData?.AirAndPollen[3].Value}</span>
                </div>
                <div id="tree-pollen-category" className="additional-info-item">
                  <span className="label">Tree Pollen</span> 
                  <span className="data-text">{oneDayWeatherData?.AirAndPollen[4].Category}</span>
                </div>
                <div id="tree-pollen-index" className="additional-info-item">
                  <span className="label">Index</span> 
                  <span className="data-text">{oneDayWeatherData?.AirAndPollen[4].Value}</span>
                </div>
            </div>
          </div>
        )}
      </>
    );

    const renderMoonPhase = () => (
      <>
        {oneDayWeatherData && (
          <div id="moon-phase-container" className="section-container">
            <div id="title-row">
              <span id="moon-phase-title">Moon Phase</span> 
            </div>
            <div id="additional-info-row">
                <div id="moon-phase-category" className="additional-info-item">
                  <span className="label">Phase</span> 
                  <span className="data-text">{oneDayWeatherData?.Moon.Phase}</span>
                </div>
                <div id="moon-phase-category" className="additional-info-item">
                  <span className="label">Rise</span> 
                  <span className="data-text">{getLocalTime(oneDayWeatherData?.Moon.Rise)}</span>
                </div>
                <div id="moon-phase-category" className="additional-info-item">
                  <span className="label">Set</span> 
                  <span className="data-text">{getLocalTime(oneDayWeatherData?.Moon.Set)}</span>
                </div>
                <div id="icon-moon-phase">
                  <img src={getMoonPhaseIcon(oneDayWeatherData?.Moon.Phase)} className="moon-icon"/>
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
        {locationData && currentWeatherData && oneDayWeatherData && hour12Data && (
          <div id="current-weather-container">
            <div className="current-temp-wrapper">
              {renderCurrentTempSection()}
              {renderTodayWeatherInfo()}
              <div id="air-quality-and-moon">
                {renderAirAndPollenQualitySection()}
                {renderMoonPhase()}
              </div>
            </div>
            <div className="forecast-wrapper">
              {render12HourSection()}
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
          // const forecastData = await getOneDayWeatherPeriodsWithLocationKey(locationKey);
          const hour12Data = await get12HourForecastWithLocationKey(locationKey);
  
          if (currentWeather && oneDayWeather && hour12Data) {
            setCurrentWeatherData(currentWeather);
            setOneDayWeatherData(oneDayWeather);
            // setForecastPeriodData(forecastData);
            setHour12Data(hour12Data);
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
        // console.log('Forecast Data', forecastPeriodData);
        console.log('hourly data', hour12Data);
    }, [locationData, currentWeatherData, hour12Data]);

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