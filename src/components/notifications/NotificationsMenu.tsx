
import { useState, useEffect } from "react";
import { 
  Bell, Check, ChevronRight, MessageSquare, DollarSign,
  CalendarClock, Info, AlertTriangle, Clock, BookOpen
} from "lucide-react";
import { 
  Popover, PopoverContent, PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/contexts/AuthContext";
import { 
  fetchNotifications, 
  markNotificationAsRead, 
  markAllNotificationsAsRead 
} from "@/services/notificationsService";
import { formatDistanceToNow } from "date-fns";

const NotificationsMenu = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    if (open && user) {
      loadNotifications();
    }
  }, [open, user]);
  
  const loadNotifications = async () => {
    if (!user) return;
    
    setIsLoading(true);
    const data = await fetchNotifications(user.id);
    setNotifications(data);
    setIsLoading(false);
  };
  
  const handleMarkAsRead = async (notificationId: string) => {
    if (await markNotificationAsRead(notificationId)) {
      setNotifications(prev => prev.map(n => 
        n.id === notificationId ? { ...n, is_read: true } : n
      ));
    }
  };
  
  const handleMarkAllAsRead = async () => {
    if (!user) return;
    
    if (await markAllNotificationsAsRead(user.id)) {
      setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
    }
  };
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'booking':
        return <CalendarClock className="h-5 w-5 text-green-500" />;
      case 'payment':
        return <DollarSign className="h-5 w-5 text-emerald-500" />;
      case 'system':
        return <Info className="h-5 w-5 text-purple-500" />;
      case 'alert':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const unreadCount = notifications.filter(n => !n.is_read).length;
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="font-semibold">Notifications</h4>
          {notifications.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleMarkAllAsRead}
              className="h-8 text-xs"
            >
              <Check className="h-3.5 w-3.5 mr-1" />
              Mark all as read
            </Button>
          )}
        </div>
        
        <ScrollArea className="h-[300px]">
          {isLoading ? (
            <div className="p-4 space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-start gap-3">
                  <Skeleton className="h-9 w-9 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
              <Bell className="h-10 w-10 mb-2 text-muted-foreground/50" />
              <h4 className="text-sm font-medium mb-1">No notifications</h4>
              <p className="text-xs">You're all caught up!</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`flex gap-3 p-4 hover:bg-muted/50 ${!notification.is_read ? 'bg-muted/20' : ''}`}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <p className="text-sm font-medium line-clamp-2">
                        {notification.title}
                      </p>
                      {!notification.is_read && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="flex-shrink-0 rounded-full p-1 hover:bg-muted"
                        >
                          <Check className="h-3.5 w-3.5 text-primary" />
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {notification.message}
                    </p>
                    <div className="flex items-center text-xs text-muted-foreground mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        
        <div className="p-2 border-t">
          <Button variant="ghost" size="sm" className="w-full justify-between" asChild>
            <a href="/notifications">
              <span>View all notifications</span>
              <ChevronRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsMenu;
