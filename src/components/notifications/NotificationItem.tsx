
import { useState } from "react";
import { Check } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { markNotificationAsRead } from "@/services/notificationsService";
import NotificationIcon from "./NotificationIcon";

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

  return (
    <div 
      className={cn(
        "flex items-start space-x-4 p-4 hover:bg-muted/50 cursor-pointer transition-colors",
        !isRead && "bg-muted/30"
      )}
    >
      <div className="mt-1">
        <NotificationIcon type={type} />
      </div>
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
