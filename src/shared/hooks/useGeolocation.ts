import { useState, useEffect } from 'react';
import type { ICoordinates } from '../types';
import { fetchAddressByCoords } from '../api/weather';

interface IGeolocationState {
  coords: ICoordinates | null;
  locationName: string | null;
  isLoading: boolean;
  error: string | null;
}

export const useGeolocation = () => {
  const [state, setState] = useState<IGeolocationState>({
    coords: null,
    locationName: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error('브라우저가 위치 정보를 지원하지 않습니다.');
      setState({
        coords: null,
        locationName: null,
        isLoading: false,
        error: '브라우저가 위치 정보를 지원하지 않습니다.',
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async position => {
        const coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };

        try {
          // 카카오 API를 사용해 좌표를 한글 주소로 변환
          const locationName = await fetchAddressByCoords(coords);
          setState({
            coords,
            locationName,
            isLoading: false,
            error: null,
          });
        } catch (addressError) {
          console.error('Failed to fetch address:', addressError);

          // 주소 변환 실패해도 좌표는 사용 가능하도록
          setState({
            coords,
            locationName: null,
            isLoading: false,
            error: null,
          });
        }
      },
      error => {
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
          locationName: null,
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
