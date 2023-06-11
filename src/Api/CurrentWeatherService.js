import axios from 'axios';

const API_KEY = process.env.REACT_APP_ACCUWEATHER_API_KEY;

export const getLocationInformationByCity = async (city) => {
    try {
      const response = await axios.get(
        `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${city}`
      );
      return response.data[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  };

export const getCurrentWeatherByCoordinates = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${latitude},${longitude}&details=true`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  
export const getCurrentWeatherWithLocationKey = async (locationKey) => {
    try {
      const response = await axios.get(
        `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API_KEY}&details=true`
      );
      return response.data[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  };

export const getOneDayWeatherWithLocationKey = async (locationKey) => {
    try {
      const response = await axios.get(
        `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${API_KEY}&details=true`
      );
      return response.data.DailyForecasts[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  };

export const get1HourForecastWithLocationKey = async (locationKey) => {
    try {
      const response = await axios.get(
        `http://dataservice.accuweather.com/forecasts/v1/hourly/1hour/${locationKey}?apikey=${API_KEY}&details=true`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

export const get12HourForecastWithLocationKey = async (locationKey) => {
    try {
      const response = await axios.get(
        `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${locationKey}?apikey=${API_KEY}&details=true`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

export const getOneDayWeatherPeriodsWithLocationKey = async (locationKey) => {
    try {
      const hourlyForecast = await get12HourForecastWithLocationKey(locationKey);
  
      const morning = hourlyForecast[0];
      const afternoon = hourlyForecast[4];
      const evening = hourlyForecast[8];
      const overnight = hourlyForecast[11];
  
      return {
        morning,
        afternoon,
        evening,
        overnight,
      };
    } catch (error) {
      console.log(error);
      return null;
    }
  };
