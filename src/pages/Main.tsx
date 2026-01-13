import { useState } from 'react';
import { useGeocoding, useCurrentWeather } from '../shared/hooks/useWeather';
import { useGeolocation } from '../shared/hooks/useGeolocation';
import { CurrentWeatherCard } from '../components/weather/CurrentWeatherCard';

export const Main = () => {
  const [cityName, setCityName] = useState('');

  const {
    coords: userCoords,
    isLoading: isLoadingLocation,
    error: locationError,
  } = useGeolocation();
  const { data: locations, isLoading: isSearching } = useGeocoding(cityName);

  const coords = locations?.[0]
    ? { lat: locations[0].lat, lon: locations[0].lon }
    : userCoords;

  const { data: weather, isLoading: isLoadingWeather } =
    useCurrentWeather(coords);

  return (
    <div>
      <h1>날씨 정보</h1>

      {isLoadingLocation && <p>위치 정보를 가져오는 중...</p>}
      {locationError && <p>{locationError}</p>}

      <div>
        <input
          type='text'
          placeholder='도시 이름 입력 (ex: 서울)'
          value={cityName}
          onChange={e => setCityName(e.target.value)}
        />
      </div>

      {isSearching && <p>검색 중...</p>}

      {locations && locations.length > 0 && (
        <div>
          <h3>검색 결과</h3>
          <ul>
            {locations.map((loc, idx) => (
              <li key={idx}>
                {loc.name}, {loc.country} - {loc.state || ''}
              </li>
            ))}
          </ul>
        </div>
      )}

      <CurrentWeatherCard weather={weather} isLoading={isLoadingWeather} />

      <h2>즐겨찾기</h2>
    </div>
  );
};
