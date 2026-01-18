import type { ReactNode } from 'react';

type ToastProps = {
  message: string;
  icon?: ReactNode;
};

export function Toast({ message, icon }: ToastProps) {
  return (
    <div className='fixed z-50 -translate-x-1/2 bottom-6 left-1/2'>
      <div className='flex items-center gap-2 px-4 py-3 text-sm text-white bg-gray-900 shadow-lg rounded-xl whitespace-nowrap'>
        {icon && <span className='text-lg'>{icon}</span>}
        <span>{message}</span>
      </div>
    </div>
  );
}
