
import { useState, useEffect } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { fetchNotifications, markAllNotificationsAsRead } from "@/services/notificationsService";
import NotificationItem from "./NotificationItem";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

const NotificationsMenu = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch notifications
  const { data: notifications = [], isLoading, refetch } = useQuery({
    queryKey: ["notifications", user?.id],
    queryFn: () => user?.id ? fetchNotifications(user.id) : Promise.resolve([]),
    enabled: !!user?.id,
  });

  // Update unread count
  useEffect(() => {
    const count = notifications.filter((notification: any) => !notification.is_read).length;
    setUnreadCount(count);
  }, [notifications]);

  // Handle marking a notification as read
  const handleMarkAsRead = (id: string) => {
    setUnreadCount(prev => Math.max(0, prev - 1));
    // Update local state to mark as read
    const updatedNotifications = notifications.map((notification: any) =>
      notification.id === id ? { ...notification, is_read: true } : notification
    );
    // We don't need to manually update the query data, as refetching will handle that
  };

  // Handle marking all as read
  const handleMarkAllAsRead = async () => {
    if (!user?.id) return;
    
    await markAllNotificationsAsRead(user.id);
    setUnreadCount(0);
    refetch();
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-4">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        <Separator />
        <ScrollArea className="h-[300px]">
          {isLoading ? (
            <div className="space-y-4 p-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : notifications.length > 0 ? (
            notifications.map((notification: any) => (
              <NotificationItem
                key={notification.id}
                id={notification.id}
                title={notification.title}
                message={notification.message}
                type={notification.type}
                isRead={notification.is_read}
                createdAt={notification.created_at}
                onMarkAsRead={handleMarkAsRead}
              />
            ))
          ) : (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No notifications yet</p>
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsMenu;
