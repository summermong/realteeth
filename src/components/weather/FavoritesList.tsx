import { FavoriteCard } from './FavoriteCard';
import type { IFavorite } from '@/shared/types';

interface IFavoritesList {
  favorites: IFavorite[];
  onRemove: (id: string) => void;
  onUpdateName: (id: string, name: string) => void;
}

export const FavoritesList = ({
  favorites,
  onRemove,
  onUpdateName,
}: IFavoritesList) => {
  return (
    <div>
      <h2 className='mb-4 text-2xl font-bold text-gray-800 dark:text-foreground'>
        즐겨찾기 ({favorites.length}/6)
      </h2>

      {favorites.length === 0 ? (
        <div className='p-6 text-center bg-white border border-gray-100 shadow-lg dark:bg-card rounded-2xl dark:border-border'>
          <p className='text-gray-500 dark:text-muted-foreground'>
            장소를 검색하고 즐겨찾기에 추가해보세요.
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2'>
          {favorites.map(favorite => (
            <FavoriteCard
              key={favorite.id}
              favorite={favorite}
              onRemove={onRemove}
              onUpdateName={onUpdateName}
            />
          ))}
        </div>
      )}
    </div>
  );
};
