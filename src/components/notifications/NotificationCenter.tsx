
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Bell, Check, Trash2 } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const NotificationCenter: React.FC = () => {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification 
  } = useNotifications();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return '💬';
      case 'booking':
        return '📅';
      case 'payment':
        return '💰';
      case 'system':
        return '🔔';
      default:
        return '📣';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 text-xs"
              onClick={() => markAllAsRead()}
            >
              Mark all as read
            </Button>
          )}
        </div>

        <ScrollArea className="h-[400px]">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              <p>No notifications</p>
              <p className="text-sm">You're all caught up!</p>
            </div>
          ) : (
            notifications.map(notification => (
              <div
                key={notification.id}
                className={`p-4 border-b hover:bg-muted/50 ${!notification.read ? 'bg-muted/20' : ''}`}
              >
                <div className="flex gap-3">
                  <div className="text-xl">{getNotificationIcon(notification.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-medium">{notification.title}</h4>
                      <div className="flex items-center space-x-1">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check size={14} />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-muted-foreground"
                          onClick={() => deleteNotification(notification.id)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(notification.created_at), 'MMM d, h:mm a')}
                      </span>
                      
                      {notification.action_url && notification.action_text && (
                        <Link
                          to={notification.action_url}
                          className="text-xs font-medium text-primary hover:underline"
                          onClick={() => markAsRead(notification.id)}
                        >
                          {notification.action_text}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </ScrollArea>
        
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/notifications" className="w-full cursor-pointer justify-center">
            See all notifications
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationCenter;
