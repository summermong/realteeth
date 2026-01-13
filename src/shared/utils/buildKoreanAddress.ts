/**
 * 한글 지역 정보로 카카오 API 검색을 위한 주소 문자열 생성
 * @param sido 시도
 * @param si 시 
 * @param gu 구/군
 * @param dong 읍면동
 * @returns 한글 주소 문자열 (ex. "경기도 수원시 장안구 정자동")
 */

export const buildKoreanAddress = (
  sido: string,
  si: string,
  gu: string,
  dong?: string
): string => {
  const parts: string[] = [];

  if (sido) parts.push(sido);
  if (si) parts.push(si);
  if (gu) parts.push(gu);
  if (dong) parts.push(dong);

  return parts.join(' ');
};
