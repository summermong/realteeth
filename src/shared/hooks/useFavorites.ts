import { useState } from 'react';
import type { IFavorite } from '@/shared/types';
import type { IDistrictLocation } from './useDistrictSearch';
import {
  loadFavorites,
  saveFavorites,
  convertDistrictLocationToFavorite,
} from '../utils/favoritesStorage';
import { MAX_FAVORITES } from '../config';

interface IAddFavoriteResult {
  success: boolean;
  error?: string;
}

interface IUseFavoritesReturn {
  favorites: IFavorite[];
  addFavorite: (location: IDistrictLocation) => IAddFavoriteResult;
  removeFavorite: (id: string) => void;
  updateFavoriteName: (id: string, customName: string) => void;
  isFull: boolean;
  hasFavorite: (fullName: string) => boolean;
}

export const useFavorites = (): IUseFavoritesReturn => {
  const [favorites, setFavorites] = useState<IFavorite[]>(() => loadFavorites());

  const addFavorite = (location: IDistrictLocation): IAddFavoriteResult => {
    if (favorites.some((fav) => fav.fullName === location.fullName)) {
      return { success: false, error: '이미 즐겨찾기에 있습니다.' };
    }

    if (favorites.length >= MAX_FAVORITES) {
      return {
        success: false,
        error: `즐겨찾기는 최대 ${MAX_FAVORITES}개까지 추가할 수 있습니다`,
      };
    }

    if (!location.coords) {
      return {
        success: false,
        error: '좌표 정보가 없는 지역은 즐겨찾기에 추가할 수 없습니다.',
      };
    }

    try {
      const newFavorite = convertDistrictLocationToFavorite(location);
      const updated = [...favorites, newFavorite];
      setFavorites(updated);
      saveFavorites(updated);
      return { success: true };
    } catch (error) {
      console.error('Failed to add favorite:', error);
      return {
        success: false,
        error: '즐겨찾기 추가에 실패했습니다.',
      };
    }
  };

  const removeFavorite = (id: string): void => {
    const updated = favorites.filter((fav) => fav.id !== id);
    setFavorites(updated);
    saveFavorites(updated);
  };

  const updateFavoriteName = (id: string, customName: string): void => {
    const updated = favorites.map((fav) =>
      fav.id === id ? { ...fav, customName } : fav
    );
    setFavorites(updated);
    saveFavorites(updated);
  };

  const hasFavorite = (fullName: string): boolean => {
    return favorites.some((fav) => fav.fullName === fullName);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    updateFavoriteName,
    isFull: favorites.length >= MAX_FAVORITES,
    hasFavorite,
  };
};
