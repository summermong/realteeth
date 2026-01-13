import { useQuery } from '@tanstack/react-query';
import {
  fetchCurrentWeather,
  fetchWeatherForecast,
  fetchGeocodingByName,
} from '../api/weather';
import type { ICoordinates } from '../types';

export const useCurrentWeather = (coords: ICoordinates | null) => {
  return useQuery({
    queryKey: ['weather', 'current', coords],
    queryFn: () => fetchCurrentWeather(coords!),
    enabled: coords !== null,
  });
};

export const useWeatherForecast = (coords: ICoordinates | null) => {
  return useQuery({
    queryKey: ['weather', 'forecast', coords],
    queryFn: () => fetchWeatherForecast(coords!),
    enabled: coords !== null,
  });
};

export const useGeocoding = (cityName: string) => {
  return useQuery({
    queryKey: ['geocoding', cityName],
    queryFn: () => fetchGeocodingByName(cityName),
    enabled: cityName.length > 0,
  });
};
