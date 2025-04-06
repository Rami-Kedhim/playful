
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

// Define types for notifications
interface Notification {
  id: string;
  title: string;
  content: string;
  type: 'success' | 'error' | 'info' | 'warning';
  is_read: boolean;
  created_at: number | Date;
}

interface NotificationsContextType {
  showSuccess: (title: string, description?: string, options?: any) => void;
  showError: (title: string, description?: string, options?: any) => void;
  showInfo: (title: string, description?: string, options?: any) => void;
  showWarning: (title: string, description?: string, options?: any) => void;
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

const NotificationsContext = createContext<NotificationsContextType>({
  showSuccess: () => {},
  showError: () => {},
  showInfo: () => {},
  showWarning: () => {},
  notifications: [],
  unreadCount: 0,
  markAsRead: () => {},
  markAllAsRead: () => {},
  clearNotifications: () => {},
});

export const useNotifications = () => useContext(NotificationsContext);

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.is_read).length;

  // Load notifications from localStorage on mount
  useEffect(() => {
    try {
      console.info("Fetching notifications...");
      const storedNotifications = localStorage.getItem('uberEscortsNotifications');
      if (storedNotifications) {
        setNotifications(JSON.parse(storedNotifications));
      }
    } catch (error) {
      console.error("Error loading notifications:", error);
    }
  }, []);

  // Save notifications to localStorage when updated
  useEffect(() => {
    localStorage.setItem('uberEscortsNotifications', JSON.stringify(notifications));
  }, [notifications]);

  const showSuccess = (title: string, description?: string, options?: any) => {
    toast({
      title,
      description,
      ...options,
    });
    
    // Also add to notifications
    addNotification(title, description || '', 'success');
  };

  const showError = (title: string, description?: string, options?: any) => {
    toast({
      title,
      description,
      variant: "destructive",
      ...options,
    });
    
    // Also add to notifications
    addNotification(title, description || '', 'error');
  };

  const showInfo = (title: string, description?: string, options?: any) => {
    toast({
      title,
      description,
      ...options,
    });
    
    // Also add to notifications
    addNotification(title, description || '', 'info');
  };

  const showWarning = (title: string, description?: string, options?: any) => {
    toast({
      title,
      description,
      variant: "destructive",
      ...options,
    });
    
    // Also add to notifications
    addNotification(title, description || '', 'warning');
  };

  const addNotification = (title: string, content: string, type: 'success' | 'error' | 'info' | 'warning') => {
    const newNotification: Notification = {
      id: `notification-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      title,
      content,
      type,
      is_read: false,
      created_at: Date.now(),
    };
    
    setNotifications(prev => [newNotification, ...prev].slice(0, 50)); // Keep only the last 50 notifications
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, is_read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, is_read: true }))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
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
        clearNotifications
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
