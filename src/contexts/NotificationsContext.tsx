
import React, { createContext, useContext, ReactNode } from "react";
import { toast } from "@/components/ui/use-toast";

interface NotificationsContextType {
  showSuccess: (title: string, message: string) => void;
  showError: (title: string, message: string) => void;
  showInfo: (title: string, message: string) => void;
  showWarning: (title: string, message: string) => void;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationsProvider");
  }
  return context;
};

interface NotificationsProviderProps {
  children: ReactNode;
}

export const NotificationsProvider = ({ children }: NotificationsProviderProps) => {
  const showSuccess = (title: string, message: string) => {
    toast({
      title,
      description: message,
      variant: "default",
      className: "bg-green-500 text-white border-green-600",
    });
  };

  const showError = (title: string, message: string) => {
    toast({
      title,
      description: message,
      variant: "destructive",
    });
  };

  const showInfo = (title: string, message: string) => {
    toast({
      title,
      description: message,
      variant: "default",
      className: "bg-blue-500 text-white border-blue-600",
    });
  };

  const showWarning = (title: string, message: string) => {
    toast({
      title,
      description: message,
      variant: "default",
      className: "bg-amber-500 text-white border-amber-600",
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
