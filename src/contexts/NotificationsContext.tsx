
import React, { createContext, useContext } from 'react';
import { toast, ToastOptions } from '@/components/ui/use-toast';

interface NotificationsContextType {
  showSuccess: (title: string, description?: string, options?: ToastOptions) => void;
  showError: (title: string, description?: string, options?: ToastOptions) => void;
  showInfo: (title: string, description?: string, options?: ToastOptions) => void;
  showWarning: (title: string, description?: string, options?: ToastOptions) => void;
}

const NotificationsContext = createContext<NotificationsContextType>({
  showSuccess: () => {},
  showError: () => {},
  showInfo: () => {},
  showWarning: () => {},
});

export const useNotifications = () => useContext(NotificationsContext);

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const showSuccess = (title: string, description?: string, options?: ToastOptions) => {
    toast({
      title,
      description,
      ...options,
    });
  };

  const showError = (title: string, description?: string, options?: ToastOptions) => {
    toast({
      title,
      description,
      variant: "destructive",
      ...options,
    });
  };

  const showInfo = (title: string, description?: string, options?: ToastOptions) => {
    toast({
      title,
      description,
      ...options,
    });
  };

  const showWarning = (title: string, description?: string, options?: ToastOptions) => {
    toast({
      title,
      description,
      variant: "destructive",
      ...options,
    });
  };

  return (
    <NotificationsContext.Provider
      value={{
        showSuccess,
        showError,
        showInfo,
        showWarning,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
