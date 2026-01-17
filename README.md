# 날씨 정보 앱 (Weather Information App)

React와 TypeScript를 활용한 날씨 정보 조회 및 즐겨찾기 관리 애플리케이션입니다.

## 배포 URL

https://realteeth-zeta.vercel.app/

## 프로젝트 실행 방법

### 1. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 다음 환경변수를 설정합니다:

```
VITE_WEATHER_API_KEY=your_api_key_here
VITE_WEATHER_API_BASE_URL=https://api.openweathermap.org/data/2.5
VITE_KAKAO_REST_API_KEY=your_kakao_rest_api_key_here
```

**API 키 발급 방법:**

- **OpenWeatherMap API**: [https://openweathermap.org/api](https://openweathermap.org/api)에서 회원가입 후 API 키 발급
- **Kakao REST API**: [https://developers.kakao.com/](https://developers.kakao.com/)에서 애플리케이션 생성 후 REST API 키 발급

### 2. 의존성 설치 및 실행

```
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview
```

## 구현 기능

### 1. 날씨 정보 조회

- **Open API 연동**: OpenWeatherMap API를 활용하여 실시간 날씨 데이터 조회
- **표시 정보**:
  - 현재 기온
  - 당일 최저/최고 기온
  - 시간대별 기온 (3시간 간격 예보)
  - 날씨 상태 (맑음, 흐림, 비 등)
- **날씨 아이콘**: 날씨 상태에 따른 이모지 표시

### 2. 현재 위치 기반 날씨

- 앱 첫 진입 시 사용자의 현재 위치를 자동으로 감지
- Geolocation API를 사용하여 위도/경도 정보 획득
- Kakao 좌표 → 주소 변환 API를 통해 한글 주소명 표시

### 3. 장소 검색

- **검색 범위**: 시/군/구/동 모든 행정구역 단위 검색 가능
  - 예: "서울특별시", "강남구", "청운동" 등
- **자동완성**: 검색어 입력 시 매칭되는 장소 리스트 실시간 표시
- **korea_districts.json 활용**: 제공된 대한민국 행정구역 JSON 데이터 활용
- **정보 없음 안내**: 검색 결과가 없거나 날씨 정보를 제공하지 않는 지역의 경우 "해당 장소의 정보가 제공되지 않습니다." 메시지 표시

### 4. 즐겨찾기 관리

- **추가/삭제**: 검색한 장소를 즐겨찾기에 추가하거나 삭제
- **최대 6개 제한**: 즐겨찾기는 최대 6개까지 추가 가능
- **이름 수정**: 즐겨찾기에 추가된 장소의 별칭(커스텀 이름) 수정 기능
- **카드 UI**: 즐겨찾기 목록은 카드 형태로 표시
  - 각 카드에 현재 날씨 정보 표시
  - 당일 최저/최고 기온 표시
  - 날씨 상태 이모지 표시
- **상세 페이지**: 즐겨찾기 카드 클릭 시 해당 장소의 상세 날씨 정보 페이지로 이동
  - 시간대별 기온 포함 모든 날씨 정보 표시

### 5. 사용자 경험 개선

- **토스트 알림**: 즐겨찾기 추가/삭제/수정 시 시각적 피드백 제공
- **로딩 상태**: 데이터 로딩 중 스피너 표시
- **반응형 디자인**: 데스크탑/모바일 환경에 최적화된 레이아웃

## 기술적 의사결정 및 이유

### 1. FSD (Feature Sliced Design) 아키텍처

프로젝트의 확장성과 유지보수성을 고려하여 FSD 아키텍처를 채택했습니다.

```
src/
├── app/              # 애플리케이션 설정 및 프로바이더
│   ├── App.tsx
│   └── providers/    # React Query, Toast 프로바이더
├── features/         # 기능 단위 모듈
│   └── search-location/  # 장소 검색 기능
├── pages/            # 페이지 컴포넌트
│   ├── Main.tsx      # 메인 페이지
│   └── Detail.tsx    # 상세 페이지
├── components/       # 공용 UI 컴포넌트
│   ├── layout/       # 레이아웃 컴포넌트
│   └── weather/      # 날씨 관련 컴포넌트
└── shared/           # 공유 리소스
    ├── api/          # API 호출 로직
    ├── hooks/        # 커스텀 훅
    ├── utils/        # 유틸리티 함수
    ├── types/        # TypeScript 타입 정의
    ├── config/       # 설정 파일
    ├── data/         # 정적 데이터 (korea_districts.json)
    └── ui/           # 공용 UI 컴포넌트
```

**선택 이유:**

- 기능별로 코드를 격리하여 코드 응집도 향상
- 각 레이어의 책임이 명확하여 협업 시 충돌 최소화
- 새로운 기능 추가 시 기존 코드 영향 최소화

### 2. Tanstack Query (React Query)

서버 상태 관리를 위해 Tanstack Query를 사용했습니다.

**선택 이유:**

- **캐싱**: 동일한 위치의 날씨 정보를 중복 요청하지 않음
- **자동 리패칭**: 백그라운드에서 자동으로 데이터 갱신
- **로딩/에러 상태 관리**: 선언적 방식으로 로딩 및 에러 상태 처리
- **코드 간결성**: useState, useEffect 조합 대비 간결한 코드
- **즐겨찾기 카드**: 여러 개의 즐겨찾기 카드가 독립적으로 날씨 데이터를 페칭하는 상황에서 효율적

**적용 예시:**

```typescript
// src/shared/hooks/useWeather.ts
export const useCurrentWeather = (coords: ICoordinates | null) => {
  return useQuery({
    queryKey: ['weather', coords],
    queryFn: () => fetchCurrentWeather(coords!),
    enabled: !!coords,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });
};
```

### 3. OpenWeatherMap API 선택 (날씨 정보)

날씨 정보 조회를 위해 여러 API 중 OpenWeatherMap을 선택했습니다.

**고려했던 대안들:**

| API                 | 장점                           | 단점                                                           |
| ------------------- | ------------------------------ | -------------------------------------------------------------- |
| **한국 기상청 API** | 한국 기상 데이터의 정확도 높음 | 복잡한 격자 좌표 변환 필요, 여러 API 조합 필요, 인증 절차 복잡 |
| **OpenWeatherMap**  | 간단한 구조, 충분한 무료 플랜  | 한국 주소 검색 미흡                                            |

**OpenWeatherMap을 선택한 이유:**

1. **간단한 API 구조**

   ```typescript
   // 좌표만 있으면 즉시 날씨 정보 조회 가능
   const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

   // vs 기상청 API: 위경도 → 격자 X,Y 변환 → 여러 API 조합 필요
   // 1. 좌표를 격자 좌표로 변환 (복잡한 수식)
   // 2. 초단기실황 API 호출
   // 3. 단기예보 API 호출
   // 4. 데이터 파싱 및 병합
   ```

2. **충분한 무료 플랜**
   - 분당 60회 호출 가능
   - 즐겨찾기 최대 6개 + 메인 페이지 = 7개 위치 동시 조회 가능
   - Tanstack Query 캐싱으로 실제 API 호출 최소화

3. **한글 지원**

   ```typescript
   // lang=kr 파라미터로 한글 날씨 설명 제공
   const url = `${BASE_URL}/weather?lat=${lat}&lon=${lon}&lang=kr&appid=${API_KEY}`;

   // 응답: { weather: [{ description: "실 비" }] }
   ```

**단점 및 해결 방법:**

OpenWeatherMap의 단점은 한국 주소 검색의 부정확성이었으나, Kakao API를 조합하여 해결했습니다.

```
역할 분담:
- Kakao API: 한국 주소 검색 → 정확한 좌표 획득
- OpenWeatherMap API: 좌표 기반 날씨 정보 조회
```

### 4. Kakao REST API를 활용한 주소 변환

주소↔좌표 변환을 위해 Kakao API를 사용했습니다.

**OpenWeatherMap Geocoding API의 문제점:**

OpenWeatherMap의 Geocoding API는 영문 주소 기반으로 설계되어 한국 행정구역에 최적화되어 있지 않습니다.

1. **동 단위 주소 인식 불가**

   ```
   검색어: "청담동" 또는 "Cheongdam-dong"
   결과: 검색 결과 없음 또는 전혀 다른 위치 반환

   검색어: "강남구 청담동"
   결과: "강남구" 전체의 대략적인 중심부 좌표만 반환
   → 청담동, 역삼동, 삼성동이 모두 같은 좌표로 표시됨
   ```

2. **한글 주소 처리 불가**

   ```
   검색어: "서울특별시 강남구 청담동"
   결과: 빈 배열 또는 "Seoul"만 인식하고 나머지 무시
   → 과제에서 제공한 korea_districts.json (한글 주소 형식)과 호환 불가
   ```

3. **좌표→주소 변환 시 영문 표기**
   ```
   사용자 현재 위치 감지 시:
   OpenWeatherMap: "Gangnam-gu, Seoul" (영문 또는 불완전한 한글)
   → 사용자 경험 저하
   ```

**Kakao API로 개선된 점:**

1. **정확한 동 단위 검색**

   ```typescript
   // src/shared/api/weather.ts
   const result = await fetch(
     `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent('서울특별시 강남구 청담동')}`
   );

   // 결과: 청담동의 정확한 좌표 (37.5172, 127.0473) 반환
   // → 청담동과 역삼동을 구분하여 정확한 날씨 정보 제공
   ```

2. **한글 주소 완벽 지원**
   - korea_districts.json의 "서울특별시 강남구 청담동" 형식을 그대로 사용 가능
   - 추가적인 영문 변환 로직 불필요
   - 모든 시/군/구/동 단위 검색 가능

3. **사용자 친화적인 위치 표시**

   ```typescript
   // src/shared/hooks/useGeolocation.ts
   const locationName = await fetchAddressByCoords(coords);

   // Kakao 결과: "서울특별시 강남구 청담동"
   // → 사용자에게 익숙한 한글 주소 표시
   ```

**구현:**

- 검색어 → 좌표 변환: Kakao 주소 검색 API (`/v2/local/search/address.json`)
- 좌표 → 주소 변환: Kakao 좌표→주소 변환 API (`/v2/local/geo/coord2address.json`)
- 날씨 정보 조회: OpenWeatherMap API (정확한 좌표를 받아 날씨 데이터 요청)

이러한 하이브리드 접근 방식으로 한국 주소 체계와 날씨 정보를 모두 정확하게 처리할 수 있었습니다.

### 5. LocalStorage를 활용한 즐겨찾기 저장

즐겨찾기 데이터는 별도의 백엔드 없이 LocalStorage에 저장합니다.

**선택 이유:**

- **간단한 요구사항**: 사용자당 최대 6개의 즐겨찾기만 저장
- **빠른 접근**: 별도의 네트워크 요청 없이 즉시 데이터 로드
- **과제 요구사항**: 백엔드 서버 구축이 필수 요구사항이 아님

**구현 위치:**

- `src/shared/utils/favoritesStorage.ts`

### 6. korea_districts.json 데이터 구조 활용

제공된 JSON 파일을 그대로 활용하되, 검색 효율성을 위해 정규화 로직을 추가했습니다.

**구조:**

```json
[
  "서울특별시 종로구 청운동",
  "서울특별시 종로구 신교동",
  ...
]
```

**검색 로직:**

- 공백 제거 및 소문자 변환으로 검색어 정규화
- 시/구 레벨 우선 정렬 (시/구 > 동)
- 정확히 일치하는 결과 우선 표시

**구현 위치:**

- `src/shared/utils/districtSearch.ts`

### 7. Tailwind CSS

스타일링을 위해 Tailwind CSS를 사용했습니다.

**선택 이유:**

- **과제 요구사항**: 필수 기술 스택으로 명시됨
- **반응형 디자인**: 모바일/데스크탑 대응이 용이
- **개발 속도**: 유틸리티 클래스로 빠른 UI 구현
- **일관성**: 디자인 시스템 없이도 통일된 스타일 유지

**적용 예시:**

```tsx
<div className='max-w-2xl mx-auto'>
  {/* 데스크탑: 최대 너비 제한 */}
  <div className='grid grid-cols-2 gap-3'>
    {/* 그리드 레이아웃 */}
    ...
  </div>
</div>
```

### 8. TypeScript 인터페이스 설계

모든 데이터 타입을 명확히 정의하여 타입 안정성을 확보했습니다.
유지보수 및 가독성을 위해 인터페이스의 경우 접두어로 'I'를, 타입의 경우 접미사로 'Props'를 붙였습니다.

**주요 타입:**

```typescript
// 좌표
interface ICoordinates {
  lat: number;
  lon: number;
}

// 즐겨찾기
interface IFavorite {
  id: string;
  fullName: string;
  displayName: string;
  customName?: string;
  coords: ICoordinates;
}
```

**선택 이유:**

- **타입 안정성**: 컴파일 타임에 오류 발견
- **자동완성**: IDE 지원으로 개발 생산성 향상
- **리팩토링 안전성**: 타입 변경 시 영향 범위 파악 용이

## 사용한 기술 스택

### Core

- **React 19.2.0**: UI 라이브러리
- **TypeScript 5.9.3**: 정적 타입 시스템
- **Vite 7.2.4**: 빌드 도구 및 개발 서버

### State Management & Data Fetching

- **@tanstack/react-query 5.90.16**: 서버 상태 관리 및 데이터 페칭

### Routing

- **react-router-dom 7.12.0**: 클라이언트 사이드 라우팅

### Styling

- **Tailwind CSS 4.1.18**: 유틸리티 퍼스트 CSS 프레임워크
- **lucide-react 0.562.0**: 아이콘 라이브러리

### API

- **OpenWeatherMap API**: 날씨 정보 조회
- **Kakao REST API**: 주소 검색 및 좌표 변환

## 폴더 구조

```
realteeth-weather-app/
├── src/
│   ├── app/                    # 애플리케이션 진입점 및 설정
│   │   ├── App.tsx            # 라우팅 설정
│   │   ├── index.tsx          # 앱 엔트리
│   │   └── providers/         # 전역 프로바이더
│   │       ├── QueryProvider.tsx
│   │       └── ToastProvider.tsx
│   ├── features/               # 기능 단위 모듈
│   │   └── search-location/   # 장소 검색 기능
│   │       └── SearchLocationBar.tsx
│   ├── pages/                  # 페이지 컴포넌트
│   │   ├── Main.tsx           # 메인 페이지
│   │   └── Detail.tsx         # 상세 페이지
│   ├── components/             # 공용 컴포넌트
│   │   ├── layout/
│   │   │   └── Header.tsx
│   │   └── weather/
│   │       ├── CurrentWeatherCard.tsx  # 현재 날씨 카드
│   │       ├── FavoriteCard.tsx        # 즐겨찾기 카드
│   │       └── FavoritesList.tsx       # 즐겨찾기 목록
│   └── shared/                 # 공유 리소스
│       ├── api/
│       │   └── weather.ts     # API 호출 함수
│       ├── hooks/
│       │   ├── useGeolocation.ts      # 현재 위치 훅
│       │   ├── useWeather.ts          # 날씨 조회 훅
│       │   ├── useFavorites.ts        # 즐겨찾기 관리 훅
│       │   └── useDistrictSearch.ts   # 행정구역 검색 훅
│       ├── utils/
│       │   ├── districtSearch.ts      # 행정구역 검색 로직
│       │   ├── favoritesStorage.ts    # LocalStorage 관리
│       │   ├── weatherUtils.ts        # 날씨 유틸리티
│       │   ├── parseDistrict.ts       # 행정구역 파싱
│       │   └── buildKoreanAddress.ts  # 한국 주소 조합
│       ├── types/
│       │   └── index.ts       # TypeScript 타입 정의
│       ├── config/
│       │   └── index.ts       # 환경변수 및 상수
│       ├── data/
│       │   └── korea_districts.json   # 대한민국 행정구역 데이터
│       └── ui/
│           └── toast/         # 토스트 알림 컴포넌트
├── .env.example               # 환경변수 예시
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.ts
```
