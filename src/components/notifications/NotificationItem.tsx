
import React from 'react';
import { formatDistance } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Trash2, Check } from 'lucide-react';

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
  return (
    <div className={`p-4 border-b ${!isRead ? 'bg-muted/20' : ''}`}>
      <div className="flex justify-between gap-2">
        <div className="flex-1">
          <h4 className="font-medium text-sm">{title}</h4>
          <p className="text-sm text-muted-foreground">{message}</p>
          <span className="text-xs text-muted-foreground">
            {formatDistance(new Date(createdAt), new Date(), { addSuffix: true })}
          </span>
        </div>
        {!isRead && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6"
            onClick={() => onMarkAsRead(id)}
          >
            <Check className="h-4 w-4" />
            <span className="sr-only">Mark as read</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default NotificationItem;
