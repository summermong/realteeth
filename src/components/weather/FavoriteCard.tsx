import { useState } from 'react';
import { MapPin, X, Edit2, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCurrentWeather } from '@/shared/hooks/useWeather';
import type { IFavorite } from '@/shared/types';
import { getWeatherEmoji } from '@/shared/utils/weatherUtils';

interface IFavoriteCard {
  favorite: IFavorite;
  onRemove: (id: string) => void;
  onUpdateName: (id: string, name: string) => void;
}

export const FavoriteCard = ({
  favorite,
  onRemove,
  onUpdateName,
}: IFavoriteCard) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(
    favorite.customName || favorite.displayName
  );

  const { data: weather, isLoading: isLoadingWeather } = useCurrentWeather(
    favorite.coords
  );

  const handleSave = () => {
    onUpdateName(favorite.id, editName);
    setIsEditing(false);
  };

  const handleViewWeather = () => {
    navigate(`/detail/${favorite.id}`);
  };

  return (
    <div className='p-5 transition-shadow bg-white border border-gray-100 shadow-md dark:bg-card rounded-xl hover:shadow-lg dark:border-border'>
      <div className='flex items-start justify-between mb-3'>
        <div className='flex items-center gap-2'>
          <MapPin className='w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0' />
          {isEditing ? (
            <input
              type='text'
              value={editName}
              onChange={e => setEditName(e.target.value)}
              className='px-2 py-1 text-sm font-medium border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 dark:bg-input-background dark:border-border dark:text-foreground'
              autoFocus
            />
          ) : (
            <h3 className='text-sm font-medium text-gray-800 dark:text-foreground'>
              {favorite.customName || favorite.displayName}
            </h3>
          )}
        </div>
        <div className='flex gap-1'>
          {isEditing ? (
            <button
              onClick={handleSave}
              className='p-1 text-green-600 transition-colors rounded dark:text-green-400 hover:bg-green-50 dark:hover:bg-accent'
            >
              <Check className='w-4 h-4' />
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className='p-1 text-gray-500 transition-colors rounded dark:text-muted-foreground hover:bg-gray-100 dark:hover:bg-accent'
            >
              <Edit2 className='w-4 h-4' />
            </button>
          )}
          <button
            onClick={() => onRemove(favorite.id)}
            className='p-1 text-red-500 transition-colors rounded dark:text-destructive-foreground hover:bg-red-50 dark:hover:bg-destructive/20'
          >
            <X className='w-4 h-4' />
          </button>
        </div>
      </div>

      {isLoadingWeather ? (
        <div className='flex items-center justify-center h-24 mb-3'>
          <div className='w-6 h-6 border-4 border-blue-500 rounded-full border-t-transparent animate-spin'></div>
        </div>
      ) : weather ? (
        <div className='mb-3'>
          <div className='flex items-center justify-between mb-2'>
            <div className='flex flex-col'>
              <span className='text-3xl font-bold text-gray-800 dark:text-foreground'>
                {Math.round(weather.main.temp)}°C
              </span>
              <span className='text-xs text-gray-600 dark:text-muted-foreground'>
                {weather.weather[0]?.description}
              </span>
            </div>
            <div className='text-4xl'>
              {getWeatherEmoji(weather.weather[0]?.main)}
            </div>
          </div>
          <div className='grid grid-cols-2 gap-2 text-xs'>
            <div className='p-2 rounded bg-blue-50 dark:bg-accent'>
              <p className='text-gray-500 dark:text-muted-foreground'>최저</p>
              <p className='font-semibold text-gray-800 dark:text-foreground'>
                {Math.round(weather.main.temp_min)}°C
              </p>
            </div>
            <div className='p-2 rounded bg-blue-50 dark:bg-accent'>
              <p className='text-gray-500 dark:text-muted-foreground'>최고</p>
              <p className='font-semibold text-gray-800 dark:text-foreground'>
                {Math.round(weather.main.temp_max)}°C
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className='mb-3 text-center text-gray-400 dark:text-muted-foreground'>
          <p className='text-xs'>날씨 정보를 불러올 수 없습니다.</p>
        </div>
      )}

      <button
        onClick={handleViewWeather}
        className='w-full px-4 py-2 text-sm text-blue-700 transition-colors rounded-lg bg-blue-50 dark:bg-accent dark:text-accent-foreground hover:bg-blue-100 dark:hover:bg-accent/80'
      >
        날씨 보기
      </button>
    </div>
  );
};
