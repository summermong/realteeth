import {
  WEATHER_API_KEY,
  WEATHER_API_BASE_URL,
  KAKAO_REST_API_KEY,
} from '../config';
import type {
  IWeatherResponse,
  IForecastResponse,
  IGeocodingResponse,
  ICoordinates,
  IKakaoGeocodingResponse,
  IKakaoCoord2AddressResponse,
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
  addressQuery: string
): Promise<IGeocodingResponse[]> => {
  const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(
    addressQuery
  )}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Kakao Address Search API Error: ${response.statusText}`);
  }

  const data: IKakaoGeocodingResponse = await response.json();

  // 카카오 API 응답을 IGeocodingResponse[] 형식으로 변환
  return data.documents.map(doc => ({
    name: doc.address_name || doc.place_name,
    lat: parseFloat(doc.y),
    lon: parseFloat(doc.x),
    country: 'KR',
    state: doc.address_name,
  }));
};

export const fetchAddressByCoords = async (
  coords: ICoordinates
): Promise<string> => {
  const { lat, lon } = coords;
  const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Kakao Coord2Address API Error: ${response.statusText}`);
  }

  const data: IKakaoCoord2AddressResponse = await response.json();

  if (data.documents.length === 0) {
    throw new Error('주소를 찾을 수 없습니다.');
  }

  const doc = data.documents[0];
  const address = doc.address;

  return `${address.region_1depth_name} ${address.region_2depth_name} ${address.region_3depth_name}`.trim();
};
