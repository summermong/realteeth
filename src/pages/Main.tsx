import { useState } from 'react';
import {
  useCurrentWeather,
  useWeatherForecast,
} from '../shared/hooks/useWeather';
import { useGeolocation } from '../shared/hooks/useGeolocation';
import {
  useDistrictSearch,
  type IDistrictLocation,
} from '../shared/hooks/useDistrictSearch';
import { CurrentWeatherCard } from '../components/weather/CurrentWeatherCard';
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

        <section className='mb-10'>
          <CurrentWeatherCard
            weather={weather}
            isLoading={isLoadingWeather || isLoadingLocation}
            locationName={locationName}
            forecast={forecast}
            isForecastLoading={isLoadingForecast}
          />
        </section>
        <section>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-xl font-semibold text-gray-800'>
              즐겨찾는 지역
            </h2>
            <button className='text-sm font-medium text-blue-600'>편집</button>
          </div>
          <div className='p-6 text-center text-gray-400 bg-white border border-gray-100 shadow-sm rounded-2xl'>
            즐겨찾기한 지역이 없습니다.
          </div>
        </section>
      </div>
    </div>
  );
};
