import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCurrentWeather, useWeatherForecast } from '../shared/hooks/useWeather';
import { loadFavorites } from '../shared/utils/favoritesStorage';
import { CurrentWeatherCard } from '../components/weather/CurrentWeatherCard';
import { Header } from '@/components/layout/Header';

export const Detail = () => {
  const { favoriteId } = useParams<{ favoriteId: string }>();
  const navigate = useNavigate();

  const favorites = loadFavorites();
  const favorite = favorites.find((fav) => fav.id === favoriteId);

  const { data: weather, isLoading: isLoadingWeather } = useCurrentWeather(
    favorite?.coords || null
  );
  const { data: forecast, isLoading: isLoadingForecast } = useWeatherForecast(
    favorite?.coords || null
  );

  if (!favorite) {
    return (
      <div className='min-h-screen from-blue-50 to-blue-100'>
        <div className='max-w-2xl mx-auto'>
          <Header />
          <div className='p-12 text-center bg-white border border-gray-100 shadow-lg dark:bg-card rounded-2xl dark:border-border'>
            <p className='mb-6 text-gray-500 dark:text-muted-foreground'>
              즐겨찾기를 찾을 수 없습니다
            </p>
            <button
              onClick={() => navigate('/')}
              className='px-4 py-2 text-white transition-colors bg-blue-500 rounded-lg hover:bg-blue-600'
            >
              메인으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen from-blue-50 to-blue-100'>
      <div className='max-w-2xl mx-auto'>
        <Header />

        <button
          onClick={() => navigate('/')}
          className='flex items-center gap-2 mb-4 text-gray-700 transition-colors dark:text-foreground hover:text-blue-600 dark:hover:text-blue-400'
        >
          <ArrowLeft className='w-5 h-5' />
          <span className='font-medium'>뒤로가기</span>
        </button>

        <section className='mb-10'>
          <CurrentWeatherCard
            weather={weather}
            isLoading={isLoadingWeather}
            locationName={favorite.customName || favorite.displayName}
            forecast={forecast}
            isForecastLoading={isLoadingForecast}
          />
        </section>
      </div>
    </div>
  );
};
