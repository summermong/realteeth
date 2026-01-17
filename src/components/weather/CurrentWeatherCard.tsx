import { MapPin } from 'lucide-react';
import type { IWeatherResponse, IForecastResponse } from '../../shared/types';

interface ICurrentWeatherCard {
  weather: IWeatherResponse | undefined;
  isLoading: boolean;
  locationName?: string | null;
  forecast?: IForecastResponse | undefined;
  isForecastLoading?: boolean;
}

export const CurrentWeatherCard = ({
  weather,
  isLoading,
  locationName,
  forecast,
  isForecastLoading,
}: ICurrentWeatherCard) => {
  if (isLoading) {
    return (
      <div className='p-8 bg-white border border-gray-100 shadow-lg dark:bg-card rounded-2xl dark:border-border'>
        <div className='flex items-center justify-center h-40'>
          <div className='w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin'></div>
        </div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className='p-8 bg-white border border-gray-100 shadow-lg dark:bg-card rounded-2xl dark:border-border'>
        <p className='text-center text-gray-500 dark:text-muted-foreground'>
          날씨 정보를 불러올 수 없습니다.
        </p>
      </div>
    );
  }

  const weatherIcon = weather.weather[0]?.main;

  const getWeatherEmoji = (condition: string) => {
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

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    return `${hours}시`;
  };

  const now = new Date();
  const currentTimeMs = now.getTime();
  const startIndex =
    forecast?.list.findIndex(item => {
      const itemTimeMs = item.dt * 1000;
      return itemTimeMs > currentTimeMs;
    }) ?? -1;

  const hourlyData =
    startIndex >= 0
      ? forecast?.list.slice(startIndex, startIndex + 8) || []
      : [];

  return (
    <div className='p-6 bg-white border border-gray-100 shadow-lg dark:bg-card rounded-2xl dark:border-border'>
      <div className='flex items-start justify-between mb-4'>
        <div className='flex items-center gap-2'>
          <MapPin className='w-5 h-5 text-blue-600 dark:text-blue-400' />
          <div className='text-lg font-semibold text-gray-800 dark:text-foreground'>
            {locationName}
          </div>
        </div>
      </div>

      <div className='flex items-center justify-between mb-6'>
        <div className='flex flex-col items-baseline gap-2'>
          <span className='text-6xl font-bold text-gray-800 dark:text-foreground'>
            {Math.round(weather.main.temp)}°C
          </span>
          <div className='text-lg text-gray-600 dark:text-muted-foreground'>
            {weather.weather[0]?.description}
          </div>
        </div>
        <div className='ml-4 text-8xl'>{getWeatherEmoji(weatherIcon)}</div>
      </div>

      <div className='grid grid-cols-2 gap-3 mb-6 text-sm'>
        <div className='p-3 rounded-lg bg-blue-50 dark:bg-accent'>
          <p className='text-gray-500 dark:text-muted-foreground'>최저</p>
          <p className='text-sm font-semibold text-gray-800 dark:text-foreground'>
            {Math.round(weather.main.temp_min).toFixed(1)}°C
          </p>
        </div>
        <div className='p-3 rounded-lg bg-blue-50 dark:bg-accent'>
          <p className='text-gray-500 dark:text-muted-foreground'>최고</p>
          <p className='text-sm font-semibold text-gray-800 dark:text-foreground'>
            {Math.round(weather.main.temp_max).toFixed(1)}°C
          </p>
        </div>
      </div>

      <div>
        <h3 className='mb-4 text-base font-semibold text-gray-800 dark:text-foreground'>
          시간대별 기온
        </h3>
        {isForecastLoading ? (
          <div className='flex items-center justify-center h-32'>
            <div className='w-8 h-8 border-4 border-blue-500 rounded-full border-t-transparent animate-spin'></div>
          </div>
        ) : hourlyData.length > 0 ? (
          <div className='overflow-x-auto'>
            <div className='flex gap-3 pb-2 w-max'>
              {hourlyData.map((item, index) => (
                <div
                  key={item.dt}
                  className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl min-w-20 shrink-0 ${
                    index === 0
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-50 dark:bg-accent'
                  }`}
                >
                  <span
                    className={`text-xs font-medium ${
                      index === 0
                        ? 'text-white'
                        : 'text-gray-600 dark:text-muted-foreground'
                    }`}
                  >
                    {formatTime(item.dt)}
                  </span>
                  <div className='text-xl'>
                    {getWeatherEmoji(item.weather[0].main)}
                  </div>
                  <span
                    className={`text-lg font-bold ${
                      index === 0
                        ? 'text-white'
                        : 'text-gray-800 dark:text-foreground'
                    }`}
                  >
                    {Math.round(item.main.temp)}°
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
