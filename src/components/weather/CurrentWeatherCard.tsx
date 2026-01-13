import { MapPin } from 'lucide-react';
import type { IWeatherResponse } from '../../shared/types';

interface ICurrentWeatherCard {
  weather: IWeatherResponse | undefined;
  isLoading: boolean;
  locationName?: string | null;
}

export const CurrentWeatherCard = ({
  weather,
  isLoading,
  locationName,
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

  return (
    <div className='p-6 bg-white border border-gray-100 shadow-lg dark:bg-card rounded-2xl dark:border-border'>
      <div className='flex items-start justify-between mb-4'>
        <div className='flex items-center gap-2'>
          <MapPin className='w-5 h-5 text-blue-600 dark:text-blue-400' />
          <h2 className='text-xl font-semibold text-gray-800 dark:text-foreground'>
            {locationName}
          </h2>
        </div>
      </div>

      <div className='flex items-center justify-between'>
        <div className='flex-1'>
          <div className='flex justify-between'>
            <div className='flex flex-col items-baseline gap-2 mb-2'>
              <span className='text-6xl font-bold text-gray-800 dark:text-foreground'>
                {Math.round(weather.main.temp)}°C
              </span>
              <div className='mb-4 text-lg text-gray-600 dark:text-muted-foreground'>
                {weather.weather[0]?.description}
              </div>
            </div>
            <div className='ml-4 text-8xl'>{getWeatherEmoji(weatherIcon)}</div>
          </div>
          <div className='grid grid-cols-2 gap-3 text-sm'>
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
          {/* <div>
            시간대별 기온
          </div> */}
        </div>
      </div>
    </div>
  );
};
