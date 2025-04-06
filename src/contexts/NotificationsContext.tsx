
import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getNotifications } from '@/services/notificationsService';

export interface Notification {
  id: string;
  title: string;
  content: string;
  type: "success" | "error" | "info" | "warning";
  is_read: boolean;
  created_at: Date;
}

export interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, "id" | "is_read" | "created_at">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  // Helper methods for common toast notifications
  showSuccess: (title: string, content: string) => void;
  showError: (title: string, content: string) => void;
  showInfo: (title: string, content: string) => void;
  showWarning: (title: string, content: string) => void;
  // Add fetchNotifications method
  fetchNotifications: () => Promise<void>;
}

const NotificationsContext = createContext<NotificationsContextType | null>(null);

export const useNotifications = (): NotificationsContextType => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};

interface NotificationsProviderProps {
  children: ReactNode;
}

export const NotificationsProvider: React.FC<NotificationsProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { toast } = useToast();

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const fetchNotifications = useCallback(async () => {
    try {
      // Mock fetching notifications
      // In a real app, this would be an API call
      console.log('Fetching notifications...');
      
      // If using the real service:
      // const userId = user?.id;
      // if (userId) {
      //   const notificationData = await getNotifications(userId);
      //   setNotifications(notificationData);
      // }
      
      // For now, we'll just refresh the current state
      setNotifications(current => [...current]);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  }, []);

  // Fetch notifications on mount
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const addNotification = useCallback((notification: Omit<Notification, "id" | "is_read" | "created_at">) => {
    const newNotification: Notification = {
      ...notification,
      id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      is_read: false,
      created_at: new Date()
    };
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast notification
    toast({
      title: notification.title,
      description: notification.content,
      variant: notification.type === 'error' ? 'destructive' : 'default'
    });
    
    return newNotification.id;
  }, [toast]);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, is_read: true } : n)
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, is_read: true }))
    );
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);
  
  // Helper methods for common toast notifications
  const showSuccess = useCallback((title: string, content: string) => {
    addNotification({
      title,
      content,
      type: "success"
    });
  }, [addNotification]);
  
  const showError = useCallback((title: string, content: string) => {
    addNotification({
      title,
      content,
      type: "error"
    });
  }, [addNotification]);
  
  const showInfo = useCallback((title: string, content: string) => {
    addNotification({
      title,
      content,
      type: "info"
    });
  }, [addNotification]);
  
  const showWarning = useCallback((title: string, content: string) => {
    addNotification({
      title,
      content,
      type: "warning"
    });
  }, [addNotification]);

  return (
    <NotificationsContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      removeNotification,
      clearNotifications,
      showSuccess,
      showError,
      showInfo,
      showWarning,
      fetchNotifications
    }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export default NotificationsProvider;
