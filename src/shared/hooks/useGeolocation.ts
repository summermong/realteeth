import { useState, useEffect } from 'react';
import type { ICoordinates } from '../types';

interface IGeolocationState {
  coords: ICoordinates | null;
  isLoading: boolean;
  error: string | null;
}

export const useGeolocation = () => {
  const [state, setState] = useState<IGeolocationState>({
    coords: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('브라우저가 위치 정보를 지원하지 않습니다.');
      setState({
        coords: null,
        isLoading: false,
        error: '브라우저가 위치 정보를 지원하지 않습니다.',
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          coords: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          isLoading: false,
          error: null,
        });
      },
      (error) => {
        console.error('Geolocation error:', error);
        let errorMessage = '위치 정보를 가져올 수 없습니다.';

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = '위치 권한이 거부되었습니다.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = '위치 정보를 사용할 수 없습니다.';
            break;
          case error.TIMEOUT:
            errorMessage = '위치 정보 요청 시간이 초과되었습니다.';
            break;
        }

        setState({
          coords: null,
          isLoading: false,
          error: errorMessage,
        });
      },
      {
        timeout: 30000,
        enableHighAccuracy: true,
        maximumAge: 0,
      }
    );
  }, []);

  return state;
};
