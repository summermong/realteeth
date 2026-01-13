import { Cloud } from 'lucide-react';

export const Header = () => {
  return (
    <div className="flex items-center gap-3 mb-6">
      <Cloud className="w-10 h-10 text-blue-600 dark:text-blue-400" />
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">날씨 정보</h1>
    </div>
  );
};
