
import React, { useState } from 'react';
import { Bell, Check, Trash2, X } from 'lucide-react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  useNotifications, 
  Notification as NotificationType 
} from '@/hooks/useNotifications';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/auth/useAuth';

const NotificationItem = ({ 
  notification, 
  onRead, 
  onDelete 
}: { 
  notification: NotificationType, 
  onRead: () => void,
  onDelete: () => void 
}) => {
  const timeAgo = (date: string) => {
    const now = new Date();
    const past = new Date(date);
    const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);
    
    if (seconds < 60) return 'just now';
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    
    return past.toLocaleDateString();
  };
  
  return (
    <div className={cn(
      "flex flex-col gap-1 p-3 hover:bg-accent/50 rounded-md transition-colors",
      !notification.read && "bg-accent/30"
    )}>
      <div className="flex justify-between items-start">
        <h4 className="font-medium text-sm">{notification.title}</h4>
        <div className="flex gap-1">
          {!notification.read && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-5 w-5 text-muted-foreground hover:text-foreground"
              onClick={onRead}
            >
              <Check className="h-3 w-3" />
              <span className="sr-only">Mark as read</span>
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-5 w-5 text-muted-foreground hover:text-destructive"
            onClick={onDelete}
          >
            <Trash2 className="h-3 w-3" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">{notification.message}</p>
      <div className="flex justify-between items-center mt-1">
        <span className="text-xs text-muted-foreground">{timeAgo(notification.created_at)}</span>
        
        {notification.action_url && (
          <Button 
            variant="link" 
            className="text-xs p-0 h-auto" 
            asChild
          >
            <Link to={notification.action_url}>
              {notification.action_text || 'View'}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export const NotificationsPanel = () => {
  const { isAuthenticated } = useAuth();
  const [open, setOpen] = useState(false);
  const { 
    notifications, 
    unreadCount, 
    loading, 
    markAsRead, 
    markAllAsRead,
    deleteNotification
  } = useNotifications();
  
  if (!isAuthenticated) return null;
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 px-1 min-w-[1.2rem] h-5"
              variant="destructive"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-3">
          <h3 className="font-medium">Notifications</h3>
          <div className="flex gap-1">
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs h-8"
                onClick={markAllAsRead}
              >
                Mark all as read
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </div>
        <Separator />
        
        <ScrollArea className="h-[400px] p-1">
          {loading ? (
            <div className="flex justify-center items-center p-8">
              <span className="text-sm text-muted-foreground">Loading...</span>
            </div>
          ) : notifications.length > 0 ? (
            <div className="flex flex-col gap-1">
              {notifications.map(notification => (
                <NotificationItem 
                  key={notification.id}
                  notification={notification}
                  onRead={() => markAsRead(notification.id)}
                  onDelete={() => deleteNotification(notification.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center p-8">
              <span className="text-sm text-muted-foreground">No notifications</span>
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
