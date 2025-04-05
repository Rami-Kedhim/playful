
import React, { createContext, useContext } from "react";
import { toast } from "@/components/ui/use-toast";

type NotificationType = "success" | "error" | "info" | "warning";

interface NotificationsContextType {
  showSuccess?: (title: string, message: string) => void;
  showError?: (title: string, message: string) => void;
  showInfo?: (title: string, message: string) => void;
  showWarning?: (title: string, message: string) => void;
  showNotification?: (type: NotificationType, title: string, message: string) => void;
}

const NotificationsContext = createContext<NotificationsContextType>({});

export const useNotifications = () => useContext(NotificationsContext);

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const showSuccess = (title: string, message: string) => {
    toast({
      title,
      description: message,
      variant: "default",
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
    });
  };

  const showWarning = (title: string, message: string) => {
    toast({
      title,
      description: message,
      variant: "destructive",
      className: "bg-amber-500",
    });
  };

  const showNotification = (type: NotificationType, title: string, message: string) => {
    switch (type) {
      case "success":
        showSuccess(title, message);
        break;
      case "error":
        showError(title, message);
        break;
      case "info":
        showInfo(title, message);
        break;
      case "warning":
        showWarning(title, message);
        break;
    }
  };

  return (
    <NotificationsContext.Provider
      value={{ showSuccess, showError, showInfo, showWarning, showNotification }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
