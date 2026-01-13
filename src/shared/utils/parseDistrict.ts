/**
 * 행정구역 문자열을 파싱하여 각 레벨로 분리
 * 예: "경기도-수원시장안구-정자동" -> {sido: "경기도", si: "수원시", gu: "장안구", dong: "정자동"}
 */
export interface IParsedDistrict {
  sido: string; // 시도
  si: string; // 시
  gu: string; // 구
  dong: string; // 동/읍/면
  displayName: string; // 표시용 이름
}

export const parseDistrict = (districtString: string): IParsedDistrict => {
  const parts = districtString.split('-');

  let sido = '';
  let si = '';
  let gu = '';
  let dong = '';

  // 시도
  if (parts[0]) {
    sido = parts[0];
  }

  // 시+구 또는 시 또는 구
  if (parts[1]) {
    const part2 = parts[1];

    // ex. "수원시장안구"
    const siMatch = part2.match(/^(.+?시)(.+구)$/);
    if (siMatch) {
      si = siMatch[1];
      gu = siMatch[2];
    } else if (part2.includes('시')) {
      si = part2;
    } else if (part2.includes('구') || part2.includes('군')) {
      gu = part2;
    } else {
      si = part2;
    }
  }

  // 동 또는 구
  if (parts[2]) {
    if (parts[2].includes('구')) {
      gu = parts[2];
    } else {
      dong = parts[2];
    }
  }

  // 동
  if (parts[3]) {
    dong = parts[3];
  }

  // displayName 생성
  const nameParts = [sido, si, gu, dong].filter(Boolean);
  const displayName = nameParts.join(' ');

  return {
    sido,
    si,
    gu,
    dong,
    displayName,
  };
};
