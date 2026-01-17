export const getWeatherEmoji = (condition: string) => {
  switch (condition) {
    case 'Clear':
      return '☀️';
    case 'Clouds':
      return '☁️';
    case 'Rain':
      return '🌧️';
    case 'Snow':
      return '❄️';
    case 'Thunderstorm':
      return '⛈️';
    default:
      return '🌤️';
  }
};
