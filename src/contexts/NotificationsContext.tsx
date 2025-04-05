
import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  read: boolean;
  createdAt: Date;
}

interface NotificationsContextType {
  showSuccess: (title: string, message: string) => void;
  showError: (title: string, message: string) => void;
  showInfo: (title: string, message: string) => void;
  showWarning: (title: string, message: string) => void;
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  fetchNotifications: () => void;
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
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const unreadCount = notifications.filter(notification => !notification.read).length;

  // Mock fetch notifications - in a real app, this would come from an API
  const fetchNotifications = () => {
    // This is a mock implementation, would be replaced with actual API call
    const mockNotifications: Notification[] = [
      {
        id: "1",
        title: "Welcome to LuCent!",
        message: "Thank you for joining our community.",
        type: "success",
        read: false,
        createdAt: new Date()
      }
    ];
    
    setNotifications(prev => {
      // Only add if not already present
      const existingIds = prev.map(n => n.id);
      const newNotifications = mockNotifications.filter(n => !existingIds.includes(n.id));
      return [...prev, ...newNotifications];
    });
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const showSuccess = (title: string, message: string) => {
    toast({
      title,
      description: message,
      variant: "default",
      className: "bg-green-500 text-white border-green-600",
    });
    
    // Also add to our notifications list
    addNotification(title, message, "success");
  };

  const showError = (title: string, message: string) => {
    toast({
      title,
      description: message,
      variant: "destructive",
    });
    
    addNotification(title, message, "error");
  };

  const showInfo = (title: string, message: string) => {
    toast({
      title,
      description: message,
      variant: "default",
      className: "bg-blue-500 text-white border-blue-600",
    });
    
    addNotification(title, message, "info");
  };

  const showWarning = (title: string, message: string) => {
    toast({
      title,
      description: message,
      variant: "default",
      className: "bg-amber-500 text-white border-amber-600",
    });
    
    addNotification(title, message, "warning");
  };

  const addNotification = (title: string, message: string, type: "success" | "error" | "info" | "warning") => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      title,
      message,
      type,
      read: false,
      createdAt: new Date()
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  return (
    <NotificationsContext.Provider
      value={{
        showSuccess,
        showError,
        showInfo,
        showWarning,
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        fetchNotifications
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
