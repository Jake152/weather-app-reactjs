import MoonIcons from "../Assets/MoonIcons/MoonIcons";
import WeatherIcons from "../Assets/WeatherIcons/WeatherIcons";

export const getCurrentTime = () => {
    const currentDate = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'America/Chicago'
    };
    const formattedTime = currentDate.toLocaleString('en-US', options);
    return formattedTime + ' CST';
}

// Format "Month" ##
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { month: 'long', day: 'numeric' };
  const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);

  return formattedDate;
};
  
// Format HH:MM PM/AM
export const convertToTime = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'America/Chicago'
    };
    const formattedTime = date.toLocaleString('en-US', options);
    return formattedTime;
  }

const checkDayTime = (hour, sunrise, sunset) => {
  const parseHour = (hourString) => {
    const [hourValue, period] = hourString.split(' ');
    let hourNumber = parseInt(hourValue, 10);
    if (period === 'PM' && hourNumber !== 12) {
      hourNumber += 12;
    } else if (period === 'AM' && hourNumber === 12) {
      hourNumber = 0;
    }
    return hourNumber;
  };

  const sunriseTime = parseHour(sunrise);
  const sunsetTime = parseHour(sunset);
  const currentHour = parseHour(hour);

  if (currentHour >= sunriseTime && currentHour <= sunsetTime) {
    return 'day';
  } else {
    return 'night';
  }
}

export const getWeatherIcon = (condition, hour, sunrise, sunset) => {
  const formatHour = convertToTime(hour);
  const dayOrNight = checkDayTime(formatHour, sunrise, sunset);
  if (dayOrNight === 'day') {
    switch (condition) {
      case 'Sunny':
      case 'Clear':
      case 'Mostly clear':
      case 'Mostly sunny':
        return WeatherIcons.Clear_MostlyClear;
      case 'Partly sunny':
      case 'Partly cloudy':
      case 'Intermittent clouds':
        return WeatherIcons.PartlyCloudy;
      case 'Cloudy':
      case 'Mostly cloudy':
        return WeatherIcons.Cloudy;
      case 'Showers':
        return WeatherIcons.Rain;
      case 'Partly sunny w/ t-storms':
      case 'Thunderstorms':
        return WeatherIcons.Thunderstorm;
      case 'Hazy sunshine':
        return WeatherIcons.Haze;
      default:
    }
  }

  switch (condition) {
    case 'Clear':
    case 'Mostly clear':
      return WeatherIcons.Clear_MostlyClear_NIGHT;
    case 'Partly cloudy':
    case 'Intermittent clouds':
      return WeatherIcons.PartlyCloudy_NIGHT;
    case 'Cloudy':
    case 'Mostly cloudy':
      return WeatherIcons.Cloudy;
    case 'Showers':
      return WeatherIcons.Rain;
    case 'Partly sunny w/ t-storms':
    case 'Thunderstorms':
      return WeatherIcons.Thunderstorm;
    default:
  }
}

export const getMoonPhaseIcon = (phase) => {
  switch (phase) {
    case 'Last':
      return MoonIcons.Moon_Last_Quarter;
    case 'WaningCrescent':
      return MoonIcons.Moon_Waning_Crescent;
    case 'WaxingCrescent': 
      return MoonIcons.Moon_Waxing_Crescent;
  default:
  }
}
