import { useState } from 'react';
import { Star } from 'lucide-react';
import {
  useCurrentWeather,
  useWeatherForecast,
} from '../shared/hooks/useWeather';
import { useGeolocation } from '../shared/hooks/useGeolocation';
import {
  useDistrictSearch,
  type IDistrictLocation,
} from '../shared/hooks/useDistrictSearch';
import { useFavorites } from '../shared/hooks/useFavorites';
import { CurrentWeatherCard } from '../components/weather/CurrentWeatherCard';
import { FavoritesList } from '../components/weather/FavoritesList';
import SearchLocationBar from '@/features/search-location/SearchLocationBar';
import type { ICoordinates } from '../shared/types';
import { Header } from '@/components/layout/Header';

export const Main = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] =
    useState<IDistrictLocation | null>(null);

  const {
    coords: userCoords,
    locationName: userLocationName,
    isLoading: isLoadingLocation,
  } = useGeolocation();
  const { searchResults, isSearching, getCoordinates } = useDistrictSearch(
    searchQuery.length >= 2 ? searchQuery : ''
  );
  const {
    favorites,
    addFavorite,
    removeFavorite,
    updateFavoriteName,
    isFull,
    hasFavorite,
  } = useFavorites();

  const coords: ICoordinates | null = selectedLocation?.coords || userCoords;
  const locationName = selectedLocation?.displayName || userLocationName;
  const { data: weather, isLoading: isLoadingWeather } =
    useCurrentWeather(coords);
  const { data: forecast, isLoading: isLoadingForecast } =
    useWeatherForecast(coords);

  const handleLocationSelect = async (location: IDistrictLocation) => {
    try {
      const locationWithCoords = await getCoordinates(location);
      setSelectedLocation(locationWithCoords);
      setSearchQuery('');
    } catch (error) {
      console.error('Failed to get coordinates:', error);
    }
  };

  const handleAddToFavorites = () => {
    if (!selectedLocation) return;

    const result = addFavorite(selectedLocation);
    if (result.success) {
      alert('즐겨찾기에 추가되었습니다.');
    } else {
      alert(result.error);
    }
  };

  const showAddFavoriteButton =
    selectedLocation &&
    selectedLocation.coords &&
    !hasFavorite(selectedLocation.fullName);

  return (
    <div className='min-h-screen from-blue-50 to-blue-100'>
      <div className='max-w-2xl mx-auto'>
        <Header />

        <SearchLocationBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchResults={searchResults}
          onLocationSelect={handleLocationSelect}
          isLoading={isSearching}
        />

        <section className='mb-6'>
          <CurrentWeatherCard
            weather={weather}
            isLoading={isLoadingWeather || isLoadingLocation}
            locationName={locationName}
            forecast={forecast}
            isForecastLoading={isLoadingForecast}
          />
        </section>

        {showAddFavoriteButton && (
          <section className='mb-10'>
            <button
              onClick={handleAddToFavorites}
              disabled={isFull}
              className={`flex items-center justify-center w-full gap-2 px-4 py-3 text-white transition-colors rounded-lg ${
                isFull
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              <Star className='w-5 h-5' />
              <span className='font-medium'>
                {isFull ? '즐겨찾기 가득 참 (최대 6개)' : '즐겨찾기 추가'}
              </span>
            </button>
          </section>
        )}

        <section>
          <FavoritesList
            favorites={favorites}
            onRemove={removeFavorite}
            onUpdateName={updateFavoriteName}
          />
        </section>
      </div>
    </div>
  );
};
