import React, { useEffect, useState } from 'react';
import { getCurrentWeatherByCoordinates, get12HourForecastWithLocationKey, getOneDayWeatherWithLocationKey } from "../../Api/CurrentWeatherService";
import { getWeatherIcon, formatDate } from '../../Utils/Utils';
import Spinner from 'react-bootstrap/Spinner';
import WeatherIcons from '../../Assets/WeatherIcons/WeatherIcons';

import './HourlyPage.css';

export default function TodayPage({ latitude, longitude }) {
    const [locationData, setLocationData] = useState(null);
    const [hour12Data, setHour12Data] = useState(null);
    const [oneDayWeatherData, setOneDayWeatherData] = useState(null);
    const [selectedHour, setSelectedHour] = useState(0);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const convertTo12HourTime = (date) => {
        const hour12Format = new Date(date).toLocaleString("en-US", {
          hour: "numeric",
          hour12: true,
        });
        return hour12Format;
      };
    
    const getLocalTime = (timestamp) => {
        const date = new Date(timestamp);
        const options = { hour: "numeric", minute: "numeric", hour12: true };
        return date.toLocaleTimeString(undefined, options);
      };
    
    const weatherIconInfo = (condition, hour) => {
        const sunRise = getLocalTime(oneDayWeatherData?.Sun.Rise);
        const sunSet = getLocalTime(oneDayWeatherData?.Sun.Set);
        return getWeatherIcon(condition, hour, sunRise, sunSet);
      };

    const renderLoadingSpinner = () => (
        <div id="loading-spinner-container">
          <span id="loading-data-message">Loading data...</span>
          <Spinner id="loading-spinner" animation="border" />
        </div>
      );
    
    const handleHourClick = (hour) => {
      setSelectedHour(hour);
    };
    
    const render12HourSection = () => (
      <>
        {hour12Data && (
            <div id="hourly-container" className="section-container">
                <div id="title-row">
                  <span id="hourly-title">Hourly Forecast for {formatDate(hour12Data[0]?.DateTime)}</span>
                </div>
                <div id="values-row">
                  {hour12Data.map((data, index) => (
                    <div key={index} className="hourly-item">
                      <a onClick={() => handleHourClick(index, data)} className="hourly-item-link">
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
                      </a>
                    </div>
                  ))}
                </div>
            </div>
          )}
      </>
    );

    const renderTemperatureSection = () => (
      <>
        {hour12Data && (
          <div id='temperature-container' className='section-container'>
            <div id="time-location-container">
              <span id="hour-location-title">{convertTo12HourTime(hour12Data[selectedHour]?.DateTime)} in {locationData?.LocalizedName}, {locationData?.AdministrativeArea.LocalizedName}</span>
            </div>
            <div id='temperature-info-container'>
              <div id='temperature-value-labels'>
                <div id="actual-temperature-info" className='temperature-info-item'>
                  <span className='text'>Actual</span>
                  <span className='value'>{hour12Data[selectedHour]?.Temperature.Value}°</span>
                </div>
                <div id='feels-like-temperature-info' className='temperature-info-item'>
                  <span className='text'>Feels Like</span>
                  <span className='value'>{hour12Data[selectedHour]?.RealFeelTemperature.Value}°</span>
                </div>
              </div>
              <div id='condition-and-rain-icon'>
                <div id='icon-condition' className='temperature-info-item'>
                  <span className='text'>{hour12Data[selectedHour]?.IconPhrase}</span>
                  <img src={weatherIconInfo(hour12Data[selectedHour]?.IconPhrase, hour12Data[selectedHour]?.DateTime)} className="weather-icon" />
                </div>
                <div id="icon-rain" className="temperature-info-item">
                  <span className='text'>{hour12Data[selectedHour]?.RainProbability}%</span>
                  <img src={WeatherIcons.Raindrops} className="weather-icon" />
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );

    const renderAdditionalInfoSection = () => (
      <>
        {hour12Data && (
          <div id='weather-details-container' className='section-container'>
            <div id="title-row">
              <span id="weather-details-title">Weather Details</span>
            </div>
            <div id="additional-info-row">
                <div id="cloud-cover" className="additional-info-item">
                  <span className="label">Cloud Cover</span> 
                  <span className="data-text">{hour12Data[selectedHour]?.CloudCover}%</span>
                </div>
                <div id="relative-humidity" className="additional-info-item">
                  <span className="label">Relative Humidity</span> 
                  <span className="data-text">{hour12Data[selectedHour]?.RelativeHumidity}%</span>
                </div>
                <div id="indoor-relative-humidity" className="additional-info-item">
                  <span className="label">Indoor Relative Humidity</span> 
                  <span className="data-text">{hour12Data[selectedHour]?.IndoorRelativeHumidity}%</span>
                </div>
                <div id="dew-point" className="additional-info-item">
                  <span className="label">Dew Point</span> 
                  <span className="data-text">{hour12Data[selectedHour]?.DewPoint.Value}°</span>
                </div>
                <div id="uv-index" className="additional-info-item">
                  <span className="label">UV Index</span> 
                  <span className="data-text">{hour12Data[selectedHour]?.UVIndex}° {hour12Data[selectedHour]?.UVIndexText}</span>
                </div>
                <div id="visibility" className="additional-info-item">
                  <span className="label">Visibility</span> 
                  <span className="data-text">{hour12Data[selectedHour]?.Visibility.Value} {hour12Data[selectedHour]?.Visibility.Unit}</span>
                </div>
                <div id="solar-irradiance" className="additional-info-item">
                  <span className="label">Solar Irradiance</span> 
                  <span className="data-text">{hour12Data[selectedHour]?.SolarIrradiance.Value} {hour12Data[selectedHour]?.SolarIrradiance.Unit}</span>
                </div>
                <div id="wet-bulb-temperature" className="additional-info-item">
                  <span className="label">Wet Bulb Temperature</span> 
                  <span className="data-text">{hour12Data[selectedHour]?.WetBulbTemperature.Value} {hour12Data[selectedHour]?.WetBulbTemperature.Unit}</span>
                </div>
                <div id="evapotranspiration" className="additional-info-item">
                  <span className="label">Evapotranspiration</span> 
                  <span className="data-text">{hour12Data[selectedHour]?.Evapotranspiration.Value} {hour12Data[selectedHour]?.Evapotranspiration.Unit}</span>
                </div>
            </div>
        </div>
        )}
      </>
    );

    const renderPrecipitationSection = () => (
      <>
        {hour12Data && (
          <div id='precipitation-container' className='section-container'>
            <div id="title-row">
              <span id="precipitation-title">Precipitation</span>
            </div>
            <div id="additional-info-row">
                <div id="rain-amount" className="additional-info-item">
                  <span className="label">Rain</span> 
                  <span className="data-text">{hour12Data[selectedHour]?.Rain.Value} {hour12Data[selectedHour]?.Rain.Unit}</span>
                </div>
                <div id="snow-amount" className="additional-info-item">
                  <span className="label">Snow</span> 
                  <span className="data-text">{hour12Data[selectedHour]?.Snow.Value} {hour12Data[selectedHour]?.Snow.Unit}</span>
                </div>
                <div id="ice-amount" className="additional-info-item">
                  <span className="label">Ice</span> 
                  <span className="data-text">{hour12Data[selectedHour]?.Ice.Value} {hour12Data[selectedHour]?.Ice.Unit}</span>
                </div>
                <div id="rain-probability" className="additional-info-item">
                  <span className="label">Rain Probability</span> 
                  <span className="data-text">{hour12Data[selectedHour]?.RainProbability}%</span>
                </div>
                <div id="snow-probability" className="additional-info-item">
                  <span className="label">Snow Probability</span> 
                  <span className="data-text">{hour12Data[selectedHour]?.SnowProbability}%</span>
                </div>
                <div id="ice-probability" className="additional-info-item">
                  <span className="label">Ice Probability</span> 
                  <span className="data-text">{hour12Data[selectedHour]?.IceProbability}%</span>
                </div>
            </div>
          </div>
        )}
      </>
    );

    const renderWindSection = () => (
      <>
        {hour12Data && (
          <div id='wind-container' className='section-container'>
            <div id="title-row">
              <span id="wind-title">Wind</span>
            </div>
            <div id="additional-info-row">
                <div id="wind-direction" className="additional-info-item">
                  <span className="label">Wind Direction</span> 
                  <span className="data-text">{hour12Data[selectedHour].Wind.Direction.Localized}</span>
                </div>
                <div id="wind-direction-degrees" className="additional-info-item">
                  <span className="label">Wind Direction</span> 
                  <span className="data-text">{hour12Data[selectedHour].Wind.Direction.Degrees} Degrees</span>
                </div>
                <div id="wind-speed" className="additional-info-item">
                  <span className="label">Wind Speed</span> 
                  <span className="data-text">{hour12Data[selectedHour].Wind.Speed.Value} {hour12Data[selectedHour].Wind.Speed.Unit}</span>
                </div>
                <div id="wind-gust" className="additional-info-item">
                  <span className="label">Wind Gust</span> 
                  <span className="data-text">{hour12Data[selectedHour].WindGust.Speed.Value} {hour12Data[selectedHour].WindGust.Speed.Unit}</span>
                </div>
            </div>
          </div>
        )}
      </>
    );

    const renderWrappers = () => (
        <>
          {locationData && hour12Data && (
            <div id="hourly-weather-container">
              <div className="hourly-weather-wrapper">
                {render12HourSection()}
              </div>
              <div className='selected-hour-info-wrapper'>
                <div id='temperature-and-info'>
                  {renderTemperatureSection()}
                  {renderAdditionalInfoSection()}
                </div>
                <div id='precipitation-and-wind'>
                  {renderPrecipitationSection()}
                  {renderWindSection()}
                </div>
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
            const hour12Data = await get12HourForecastWithLocationKey(locationKey);
            const oneDayWeather = await getOneDayWeatherWithLocationKey(locationKey);
    
            if (hour12Data && oneDayWeather) {
              setHour12Data(hour12Data);
              setOneDayWeatherData(oneDayWeather);
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