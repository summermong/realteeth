import type { ReactNode } from 'react';
import { QueryProvider } from './QueryProvider';

interface IAppProviders {
  children: ReactNode;
}

export const AppProviders = ({ children }: IAppProviders) => {
  return (
    <QueryProvider>
      {children}
    </QueryProvider>
  );
};
