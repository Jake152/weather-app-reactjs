import WeatherIcons from "../Assets/WeatherIcons/WeatherIcons";

export function getCurrentTime() {
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
  

export function convertToTime(timestamp) {
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

  if (currentHour > sunriseTime && currentHour < sunsetTime) {
    return 'day';
  } else {
    return 'night';
  }
}


export function getWeatherIcon(condition, hour, sunrise, sunset) {
  const dayOrNight = checkDayTime(hour, sunrise, sunset);
  if (dayOrNight === 'day') {
    switch (condition) {
      case 'Clear':
      case 'Mostly clear':
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