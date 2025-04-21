
import React, { createContext, useContext, ReactNode } from 'react';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  timestamp: Date;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'timestamp'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const notificationValue: NotificationContextType = {
    notifications: [],
    unreadCount: 0,
    addNotification: (notification) => {
      console.log('Adding notification', notification);
    },
    markAsRead: (id) => {
      console.log(`Marking notification ${id} as read`);
    },
    markAllAsRead: () => {
      console.log('Marking all notifications as read');
    },
    clearNotifications: () => {
      console.log('Clearing all notifications');
    }
  };

  return (
    <NotificationContext.Provider value={notificationValue}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}
