export interface ICoordinates {
  lat: number;
  lon: number;
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
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}
