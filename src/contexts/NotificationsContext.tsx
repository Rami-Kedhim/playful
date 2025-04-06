
import React, { createContext, useContext, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/auth/useAuth';
import { toast } from '@/hooks/use-toast';

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  content: string; // Using content instead of message
  is_read: boolean; // Using is_read instead of read
  created_at: string; // Using created_at instead of timestamp
}

interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  markAsRead: (notificationId: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  // Add these methods for showing notifications via toast
  showSuccess: (title: string, message: string) => void;
  showError: (title: string, message: string) => void;
  showInfo: (title: string, message: string) => void; 
  showWarning: (title: string, message: string) => void;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = useCallback(async () => {
    if (!user) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50);

      if (fetchError) throw new Error(fetchError.message);

      setNotifications(data || []);
      setUnreadCount(data?.filter(n => !n.is_read).length || 0);
    } catch (err: any) {
      console.error('Error fetching notifications:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const markAsRead = useCallback(async (notificationId: string) => {
    if (!user) return;

    try {
      setIsLoading(true);

      const { error: updateError } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId)
        .eq('user_id', user.id);

      if (updateError) throw new Error(updateError.message);

      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, is_read: true } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err: any) {
      console.error('Error marking notification as read:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const markAllAsRead = useCallback(async () => {
    if (!user || unreadCount === 0) return;

    try {
      setIsLoading(true);

      const { error: updateError } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', user.id)
        .eq('is_read', false);

      if (updateError) throw new Error(updateError.message);

      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch (err: any) {
      console.error('Error marking all notifications as read:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [user, unreadCount]);

  // Add toast notification helpers
  const showSuccess = useCallback((title: string, message: string) => {
    toast({
      title,
      description: message,
      variant: "default"
    });
  }, []);

  const showError = useCallback((title: string, message: string) => {
    toast({
      title,
      description: message,
      variant: "destructive"
    });
  }, []);

  const showInfo = useCallback((title: string, message: string) => {
    toast({
      title,
      description: message,
      variant: "default"
    });
  }, []);

  const showWarning = useCallback((title: string, message: string) => {
    toast({
      title,
      description: message,
      variant: "destructive"
    });
  }, []);

  // Initial fetch
  React.useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user, fetchNotifications]);

  const value = {
    notifications,
    unreadCount,
    isLoading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    showSuccess,
    showError,
    showInfo,
    showWarning
  };

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationsProvider');
  }
  return context;
};
