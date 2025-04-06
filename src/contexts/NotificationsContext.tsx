import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  timestamp: number;
  createdAt: Date;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  showInfo: (title: string, message: string) => void;
  showSuccess: (title: string, message: string) => void;
  showWarning: (title: string, message: string) => void;
  showError: (title: string, message: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  deleteNotification: (id: string) => void;
  fetchNotifications: () => void;
}

const defaultContext: NotificationsContextType = {
  notifications: [],
  unreadCount: 0,
  showInfo: () => {},
  showSuccess: () => {},
  showWarning: () => {},
  showError: () => {},
  markAsRead: () => {},
  markAllAsRead: () => {},
  clearNotifications: () => {},
  deleteNotification: () => {},
  fetchNotifications: () => {}
};

export const NotificationsContext = createContext<NotificationsContextType>(defaultContext);

export const useNotifications = () => {
  return useContext(NotificationsContext);
};

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // Load notifications from localStorage on mount
  useEffect(() => {
    const savedNotifications = localStorage.getItem("notifications");
    if (savedNotifications) {
      try {
        setNotifications(JSON.parse(savedNotifications));
      } catch (error) {
        console.error("Error parsing notifications from localStorage:", error);
      }
    }
  }, []);
  
  // Save to localStorage when notifications change
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const addNotification = (
    title: string, 
    message: string, 
    type: "info" | "success" | "warning" | "error",
    action?: { label: string; onClick: () => void }
  ) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      title,
      message,
      type,
      read: false,
      timestamp: Date.now(),
      createdAt: new Date(),
      action
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Also show as toast
    toast({
      title,
      description: message,
      variant: type === "error" ? "destructive" : "default",
      action: action ? (
        <ToastAction altText={action.label} onClick={action.onClick}>
          {action.label}
        </ToastAction>
      ) : undefined
    });
    
    return newNotification.id;
  };
  
  const showInfo = (title: string, message: string) => {
    addNotification(title, message, "info");
  };
  
  const showSuccess = (title: string, message: string) => {
    addNotification(title, message, "success");
  };
  
  const showWarning = (title: string, message: string) => {
    addNotification(title, message, "warning");
  };
  
  const showError = (title: string, message: string) => {
    addNotification(title, message, "error");
  };
  
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };
  
  const clearNotifications = () => {
    setNotifications([]);
  };
  
  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Mock fetch notifications function
  const fetchNotifications = () => {
    // In a real app, this would be an API call
    console.log("Fetching notifications...");
    // For demo purposes, we could add a mock notification
    if (notifications.length === 0) {
      showInfo("Welcome", "Thanks for using our app!");
    }
  };
  
  const value = {
    notifications,
    unreadCount,
    showInfo,
    showSuccess,
    showWarning,
    showError,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    deleteNotification,
    fetchNotifications
  };
  
  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsContext;
