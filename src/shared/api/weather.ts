import { WEATHER_API_KEY, WEATHER_API_BASE_URL } from '../config';
import type {
  IWeatherResponse,
  IForecastResponse,
  IGeocodingResponse,
  ICoordinates,
} from '../types';

export const fetchCurrentWeather = async (
  coords: ICoordinates
): Promise<IWeatherResponse> => {
  const { lat, lon } = coords;
  const url = `${WEATHER_API_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=kr`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Current Weather API Error: ${response.statusText}`);
  }

  return response.json();
};


export const fetchWeatherForecast = async (
  coords: ICoordinates
): Promise<IForecastResponse> => {
  const { lat, lon } = coords;
  const url = `${WEATHER_API_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric&lang=kr`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Weather Forecast API Error: ${response.statusText}`);
  }

  return response.json();
};

export const fetchGeocodingByName = async (
  cityName: string
): Promise<IGeocodingResponse[]> => {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(
    cityName
  )}&limit=5&appid=${WEATHER_API_KEY}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Geocoding API Error: ${response.statusText}`);
  }

  return response.json();
};
