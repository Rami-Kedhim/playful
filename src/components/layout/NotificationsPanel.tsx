
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNotifications } from '@/hooks/useNotifications';

export const NotificationsPanel = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { 
    notifications, 
    unreadCount, 
    isLoading, 
    markAsRead, 
    markAllAsRead,
    deleteNotification,
    refreshNotifications
  } = useNotifications();

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      toast({
        title: "Success",
        description: "All notifications marked as read",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark notifications as read",
        variant: "destructive",
      });
    }
  };

  const handleReadNotification = async (id: string) => {
    try {
      await markAsRead(id);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to mark notification as read",
        variant: "destructive",
      });
    }
  };

  const handleDeleteNotification = async (id: string) => {
    try {
      await deleteNotification(id);
      toast({
        title: "Success",
        description: "Notification deleted",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete notification",
        variant: "destructive",
      });
    }
  };

  const renderNotificationItem = (notification: any) => {
    const isUnread = !notification.read;
    
    return (
      <div 
        key={notification.id}
        className={`p-4 border-b last:border-0 ${isUnread ? 'bg-muted/30' : ''}`}
        onClick={() => isUnread && handleReadNotification(notification.id)}
      >
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-medium text-sm">{notification.title}</h4>
          {isUnread && (
            <Badge variant="outline" className="bg-blue-500 text-white text-[10px] py-0 px-1.5">
              NEW
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-2">
          {notification.message}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">
            {new Date(notification.created_at).toLocaleString()}
          </span>
          <div className="flex gap-2">
            {notification.action_url && (
              <Button 
                variant="link" 
                size="sm" 
                className="h-auto p-0 text-xs"
                asChild
              >
                <a href={notification.action_url}>
                  {notification.action_text || 'View'}
                </a>
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-xs text-muted-foreground hover:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteNotification(notification.id);
              }}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge 
              className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 bg-red-500 text-white"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex justify-between items-center">
            Notifications
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleMarkAllAsRead}
              >
                Mark all as read
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">
                Unread {unreadCount > 0 && `(${unreadCount})`}
              </TabsTrigger>
              <TabsTrigger value="important">Important</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-2">
              <ScrollArea className="h-[calc(100vh-160px)]">
                {isLoading ? (
                  <div className="flex justify-center items-center h-40">
                    <p className="text-sm text-muted-foreground">Loading notifications...</p>
                  </div>
                ) : notifications.length > 0 ? (
                  notifications.map(renderNotificationItem)
                ) : (
                  <div className="flex justify-center items-center h-40">
                    <p className="text-sm text-muted-foreground">No notifications</p>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="unread" className="mt-2">
              <ScrollArea className="h-[calc(100vh-160px)]">
                {isLoading ? (
                  <div className="flex justify-center items-center h-40">
                    <p className="text-sm text-muted-foreground">Loading notifications...</p>
                  </div>
                ) : notifications.filter(n => !n.read).length > 0 ? (
                  notifications.filter(n => !n.read).map(renderNotificationItem)
                ) : (
                  <div className="flex justify-center items-center h-40">
                    <p className="text-sm text-muted-foreground">No unread notifications</p>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="important" className="mt-2">
              <ScrollArea className="h-[calc(100vh-160px)]">
                {isLoading ? (
                  <div className="flex justify-center items-center h-40">
                    <p className="text-sm text-muted-foreground">Loading notifications...</p>
                  </div>
                ) : notifications.filter(n => n.priority === 'high').length > 0 ? (
                  notifications.filter(n => n.priority === 'high').map(renderNotificationItem)
                ) : (
                  <div className="flex justify-center items-center h-40">
                    <p className="text-sm text-muted-foreground">No important notifications</p>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationsPanel;
