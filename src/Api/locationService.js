import axios from 'axios';

const API_KEY = process.env.REACT_APP_ACCUWEATHER_API_KEY;

export const getWeatherByLocation = async (locationKey) => {
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

export const getLocationKeyByCity = async (city) => {
    try {
      const response = await axios.get(
        `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${API_KEY}&q=${city}`
      );
      return response.data[0].Key;
    } catch (error) {
      console.log(error);
      return null;
    }
  };
