import { Toast } from '@/shared/ui/toast/Toast';
import { createContext, useState } from 'react';
import type { ReactNode } from 'react';

type ToastOptions = {
  message: string;
  icon?: ReactNode;
  duration?: number;
};

const ToastContext = createContext<{
  showToast: (options: ToastOptions) => void;
} | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastOptions | null>(null);

  const showToast = ({ duration = 5000, ...options }: ToastOptions) => {
    setToast(options);
    setTimeout(() => setToast(null), duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && <Toast message={toast.message} icon={toast.icon} />}
    </ToastContext.Provider>
  );
}

export { ToastContext };
