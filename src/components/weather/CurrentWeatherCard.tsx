import type { IWeatherResponse } from '../../shared/types';

interface ICurrentWeatherCard {
  weather: IWeatherResponse | undefined;
  isLoading: boolean;
}

export const CurrentWeatherCard = ({
  weather,
  isLoading,
}: ICurrentWeatherCard) => {
  if (isLoading) {
    return <p>날씨 정보 로딩 중...</p>;
  }

  if (!weather) {
    return null;
  }

  return (
    <div>
      <h3>{weather.name} 날씨</h3>
      <p>온도: {weather.main.temp}°C</p>
      <p>체감 온도: {weather.main.feels_like}°C</p>
      <p>습도: {weather.main.humidity}%</p>
      <p>날씨: {weather.weather[0]?.description}</p>
    </div>
  );
};
