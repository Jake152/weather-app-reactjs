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
        `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${latitude},${longitude}`
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
        `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API_KEY}`
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
        `http://dataservice.accuweather.com/forecasts/v1/daily/1day/${locationKey}?apikey=${API_KEY}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  
export const getHourlyForecastWithLocationKey = async (locationKey) => {
    try {
      const response = await axios.get(
        `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${locationKey}?apikey=${API_KEY}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

export const getOneDayWeatherPeriodsWithLocationKey = async (locationKey) => {
    try {
      const hourlyForecast = await getHourlyForecastWithLocationKey(locationKey);
  
      const morning = hourlyForecast[0].Temperature.Value;
      const afternoon = hourlyForecast[4].Temperature.Value;
      const evening = hourlyForecast[8].Temperature.Value;
      const overnight = hourlyForecast[11].Temperature.Value;
  
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
  
