import { useMemo } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  searchDistricts,
  type IDistrictSearchResult,
} from '../utils/districtSearch';
import { fetchGeocodingByName } from '../api/weather';
import { buildKoreanAddress } from '../utils/buildKoreanAddress';
import type { ICoordinates } from '../types';

export interface IDistrictLocation extends IDistrictSearchResult {
  coords?: ICoordinates;
}

export const useDistrictSearch = (query: string) => {
  const searchResults = useMemo(() => {
    return searchDistricts(query, 10);
  }, [query]);

  const geocodingMutation = useMutation({
    mutationFn: async (
      district: IDistrictSearchResult
    ): Promise<IDistrictLocation> => {

      const addressCombinations = [
        // 전체 주소 (시도 + 시 + 구 + 동)
        buildKoreanAddress(
          district.sido,
          district.si,
          district.gu,
          district.dong
        ),
        // 시도 + 시/구 + 동
        buildKoreanAddress(
          district.sido,
          district.si || district.gu,
          '',
          district.dong
        ),
        // 시도 + 구 + 동
        buildKoreanAddress(district.sido, '', district.gu, district.dong),
        // 시도 + 시 + 구 (동 제외)
        buildKoreanAddress(district.sido, district.si, district.gu),
        // 시도 + 시/구
        buildKoreanAddress(district.sido, district.si || district.gu, ''),
        // 시도 + 구
        buildKoreanAddress(district.sido, '', district.gu),
      ].filter(addr => addr.trim().length > 0);

      for (const addressQuery of addressCombinations) {
        try {
          const geocodingResults = await fetchGeocodingByName(addressQuery);
          if (geocodingResults.length > 0) {
            const result = geocodingResults[0];
            return {
              ...district,
              coords: { lat: result.lat, lon: result.lon },
            };
          }
        } catch (error) {
          continue;
        }
      }

      throw new Error('해당 지역의 좌표를 찾을 수 없습니다.');
    },
  });

  return {
    searchResults,
    isSearching: query.trim().length > 0 && searchResults.length > 0,
    getCoordinates: geocodingMutation.mutateAsync,
    isLoadingCoordinates: geocodingMutation.isPending,
    error: geocodingMutation.error,
  };
};
