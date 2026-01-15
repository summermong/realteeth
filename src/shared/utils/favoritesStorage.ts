import type { IFavorite } from '@/components/weather/FavoriteCard';
import type { IDistrictLocation } from '../hooks/useDistrictSearch';
import { FAVORITES_STORAGE_KEY } from '../config';

export const loadFavorites = (): IFavorite[] => {
  try {
    const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error(
      '즐겨찾기 정보를 가져오지 못했습니다.',
      error
    );
    return [];
  }
};

export const saveFavorites = (favorites: IFavorite[]): void => {
  try {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('즐겨찾기 정보를 저장하지 못했습니다:', error);
  }
};

export const convertDistrictLocationToFavorite = (
  location: IDistrictLocation
): IFavorite => {
  if (!location.coords) {
    throw new Error(
      '즐겨찾기로 저장하기 위해서 반드시 위경도 정보가 필요합니다.'
    );
  }

  return {
    id: crypto.randomUUID(),
    displayName: location.displayName,
    fullName: location.fullName,
    sido: location.sido,
    si: location.si,
    gu: location.gu,
    dong: location.dong,
    coords: location.coords,
  };
};
