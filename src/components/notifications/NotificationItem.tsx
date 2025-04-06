
import React from 'react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Check, Bell, AlertCircle, Info, AlertTriangle } from 'lucide-react';

interface NotificationItemProps {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  isRead: boolean;
  createdAt: Date | number; // Update to accept either Date or number
  onMarkAsRead: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  id,
  title,
  message,
  type,
  isRead,
  createdAt,
  onMarkAsRead,
}) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'info':
        return <Info className="h-4 w-4 text-blue-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className={`px-4 py-3 border-b border-border ${isRead ? 'opacity-60' : ''}`}>
      <div className="flex items-start gap-3">
        <div className={`mt-0.5 p-1 rounded-full ${isRead ? 'bg-secondary' : 'bg-primary/10'}`}>
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <h5 className={`text-sm font-medium ${isRead ? '' : 'font-semibold'}`}>{title}</h5>
            {!isRead && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 px-2" 
                onClick={() => onMarkAsRead(id)}
              >
                <Check className="h-3 w-3 mr-1" />
                <span className="text-xs">Mark read</span>
              </Button>
            )}
          </div>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{message}</p>
          <p className="text-[10px] text-muted-foreground mt-1">
            {format(typeof createdAt === 'number' ? new Date(createdAt) : createdAt, 'MMM d, h:mm a')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
