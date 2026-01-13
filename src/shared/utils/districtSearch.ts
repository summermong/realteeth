import koreaDistricts from '../data/korea_districts.json';
import { parseDistrict } from './parseDistrict';

export interface IDistrictSearchResult {
  fullName: string;
  sido: string;
  si: string;
  gu: string;
  dong: string;
  displayName: string;
}

/**
 * 검색을 위해 문자열을 정규화
 */
const normalizeForSearch = (str: string): string => {
  return str.toLowerCase().replace(/[\s-]/g, '');
};

/**
 * 한국 행정구역 데이터에서 검색어로 필터링
 * @param query 검색어
 * @param limit 최대 결과 개수
 * @returns 검색 결과 배열
 */

export const searchDistricts = (
  query: string,
  limit: number = 20
): IDistrictSearchResult[] => {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const searchTerm = normalizeForSearch(query.trim());
  const results: IDistrictSearchResult[] = [];

  for (const district of koreaDistricts) {
    const normalizedDistrict = normalizeForSearch(district);

    if (normalizedDistrict.includes(searchTerm)) {
      const parsed = parseDistrict(district);

      const result: IDistrictSearchResult = {
        fullName: district,
        sido: parsed.sido,
        si: parsed.si,
        gu: parsed.gu,
        dong: parsed.dong,
        displayName: parsed.displayName,
      };

      results.push(result);
    }
  }

  // 정렬 기준: 시/구 레벨 > 동 레벨, 정확히 일치하는 것
  results.sort((a, b) => {
    const aHasDong = a.dong !== '';
    const bHasDong = b.dong !== '';

    // 시/구 레벨 > 동 레벨
    if (!aHasDong && bHasDong) return -1;
    if (aHasDong && !bHasDong) return 1;

    // 정확히 일치하는 것 우선
    const aSiMatch = normalizeForSearch(a.si) === searchTerm;
    const bSiMatch = normalizeForSearch(b.si) === searchTerm;

    if (aSiMatch && !bSiMatch) return -1;
    if (!aSiMatch && bSiMatch) return 1;

    const aGuMatch = normalizeForSearch(a.gu) === searchTerm;
    const bGuMatch = normalizeForSearch(b.gu) === searchTerm;

    if (aGuMatch && !bGuMatch) return -1;
    if (!aGuMatch && bGuMatch) return 1;

    const aDongMatch = normalizeForSearch(a.dong) === searchTerm;
    const bDongMatch = normalizeForSearch(b.dong) === searchTerm;

    if (aDongMatch && !bDongMatch) return -1;
    if (!aDongMatch && bDongMatch) return 1;

    return 0;
  });

  return results.slice(0, limit);
};
