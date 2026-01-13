import { useEffect, useRef, useState } from 'react';
import type { IDistrictLocation } from '@/shared/hooks/useDistrictSearch';
import { MapPin, Search } from 'lucide-react';

interface ISearchBar {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  searchResults: IDistrictLocation[];
  onLocationSelect: (location: IDistrictLocation) => void;
  isLoading: boolean;
}

export const SearchLocationBar = ({
  searchQuery,
  setSearchQuery,
  searchResults,
  onLocationSelect,
  isLoading,
}: ISearchBar) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative w-full mx-auto mb-8' ref={dropdownRef}>
      <div className='relative'>
        <Search className='absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-4 top-1/2' />
        <input
          type='text'
          value={searchQuery}
          onChange={e => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder='지역 이름 입력 (ex. 정자동, 강남구)'
          className='w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl shadow-sm border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all'
        />
      </div>

      {isOpen && searchQuery.trim() !== '' && (
        <div className='absolute z-50 w-full mt-2 overflow-hidden bg-white border border-gray-100 shadow-xl rounded-2xl'>
          {searchResults.length > 0 ? (
            <ul className='overflow-y-auto max-h-64'>
              {searchResults.map((result, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => {
                      onLocationSelect(result);
                      setIsOpen(false);
                    }}
                    className='w-full px-5 py-3.5 flex items-center gap-3 hover:bg-gray-50 active:bg-blue-50 transition-colors text-left'
                  >
                    <MapPin className='w-4 h-4 text-blue-500' />
                    <div>
                      <p className='text-sm font-medium text-gray-800'>
                        {result.displayName}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            !isLoading && (
              <div className='p-5 text-sm text-center text-gray-500'>
                해당 장소의 정보가 제공되지 않습니다.
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default SearchLocationBar;
