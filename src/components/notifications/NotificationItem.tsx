
import { useState } from "react";
import { Check, Bell } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { markNotificationAsRead } from "@/services/notificationsService";

interface NotificationItemProps {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  onMarkAsRead: (id: string) => void;
}

const NotificationItem = ({
  id,
  title,
  message,
  type,
  isRead,
  createdAt,
  onMarkAsRead,
}: NotificationItemProps) => {
  const [loading, setLoading] = useState(false);

  const handleMarkAsRead = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isRead) return;
    
    setLoading(true);
    await markNotificationAsRead(id);
    onMarkAsRead(id);
    setLoading(false);
  };

  // Determine icon based on notification type
  const getIcon = () => {
    switch (type) {
      case "message":
        return <Bell className="h-4 w-4 text-blue-500" />;
      case "booking":
        return <Bell className="h-4 w-4 text-green-500" />;
      case "payment":
        return <Bell className="h-4 w-4 text-amber-500" />;
      case "system":
        return <Bell className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div 
      className={cn(
        "flex items-start space-x-4 p-4 hover:bg-muted/50 cursor-pointer transition-colors",
        !isRead && "bg-muted/30"
      )}
    >
      <div className="mt-1">{getIcon()}</div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className={cn("text-sm font-medium", !isRead && "font-semibold")}>{title}</p>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </p>
        </div>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
      {!isRead && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="shrink-0" 
          onClick={handleMarkAsRead}
          disabled={loading}
        >
          <Check className="h-4 w-4" />
          <span className="sr-only">Mark as read</span>
        </Button>
      )}
    </div>
  );
};

export default NotificationItem;
