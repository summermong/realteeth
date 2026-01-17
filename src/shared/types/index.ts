export interface ICoordinates {
  lat: number;
  lon: number;
}

export interface IFavorite {
  id: string;
  displayName: string;
  customName?: string;
  fullName: string;
  sido: string;
  si: string;
  gu: string;
  dong: string;
  coords: ICoordinates;
}

export interface IDistrict {
  sido: string;
  sigungu?: string;
  dong?: string;
  code: string;
}

export interface IWeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface IWeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IWeatherResponse {
  coord: ICoordinates;
  weather: IWeatherCondition[];
  main: IWeatherMain;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  name: string;
}

export interface IForecastItem {
  dt: number;
  main: IWeatherMain;
  weather: IWeatherCondition[];
  wind: {
    speed: number;
    deg: number;
  };
  dt_txt: string;
}

export interface IForecastResponse {
  list: IForecastItem[];
  city: {
    name: string;
    coord: ICoordinates;
  };
}

export interface IGeocodingResponse {
  name?: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export interface IKakaoGeocodingDocument {
  place_name?: string;
  address_name: string;
  road_address_name?: string;
  x: string; // longitude
  y: string; // latitude
  category_name?: string;
  category_group_code?: string;
  category_group_name?: string;
  address?: {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    region_3depth_h_name: string;
    h_code: string;
    b_code: string;
    mountain_yn: string;
    main_address_no: string;
    sub_address_no: string;
    x: string;
    y: string;
  };
  road_address?: {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    road_name: string;
    underground_yn: string;
    main_building_no: string;
    sub_building_no: string;
    building_name: string;
    zone_no: string;
    x: string;
    y: string;
  };
}

export interface IKakaoGeocodingResponse {
  documents: IKakaoGeocodingDocument[];
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
  };
}

export interface IKakaoCoord2AddressDocument {
  road_address: {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    road_name: string;
    underground_yn: string;
    main_building_no: string;
    sub_building_no: string;
    building_name: string;
    zone_no: string;
  } | null;
  address: {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    mountain_yn: string;
    main_address_no: string;
    sub_address_no: string;
  };
}

export interface IKakaoCoord2AddressResponse {
  documents: IKakaoCoord2AddressDocument[];
  meta: {
    total_count: number;
  };
}
