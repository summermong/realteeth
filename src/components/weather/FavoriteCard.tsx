import { useState } from 'react';
import { MapPin, X, Edit2, Check } from 'lucide-react';

// TODO: 실제 타입 추후 정의
export interface IFavorite {
  id: string;
  displayName: string;
  customName?: string;
}

interface FavoriteCardProps {
  favorite: IFavorite;
  onRemove: (id: string) => void;
  onUpdateName: (id: string, name: string) => void;
  onClick: (location: IFavorite) => void;
}

export const FavoriteCard = ({
  favorite,
  onRemove,
  onUpdateName,
  onClick,
}: FavoriteCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(favorite.customName || favorite.displayName);

  const handleSave = () => {
    onUpdateName(favorite.id, editName);
    setIsEditing(false);
  };

  return (
    <div className="p-5 transition-shadow bg-white border border-gray-100 shadow-md dark:bg-card rounded-xl hover:shadow-lg dark:border-border">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center flex-1 gap-2">
          <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
          {isEditing ? (
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="flex-1 px-2 py-1 text-sm font-medium border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 dark:bg-input-background dark:border-border dark:text-foreground"
              autoFocus
            />
          ) : (
            <h3 className="text-sm font-medium text-gray-800 dark:text-foreground">
              {favorite.customName || favorite.displayName}
            </h3>
          )}
        </div>
        <div className="flex gap-1">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="p-1 text-green-600 transition-colors rounded dark:text-green-400 hover:bg-green-50 dark:hover:bg-accent"
            >
              <Check className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-gray-500 transition-colors rounded dark:text-muted-foreground hover:bg-gray-100 dark:hover:bg-accent"
            >
              <Edit2 className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => onRemove(favorite.id)}
            className="p-1 text-red-500 transition-colors rounded dark:text-destructive-foreground hover:bg-red-50 dark:hover:bg-destructive/20"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
      <button
        onClick={() => onClick(favorite)}
        className="w-full px-4 py-2 text-sm text-blue-700 transition-colors rounded-lg bg-blue-50 dark:bg-accent dark:text-accent-foreground hover:bg-blue-100 dark:hover:bg-accent/80"
      >
        날씨 보기
      </button>
    </div>
  );
};
