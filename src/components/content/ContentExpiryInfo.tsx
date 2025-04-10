
import React from 'react';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { useContentBrainHub } from '@/hooks/useContentBrainHub';

interface ContentExpiryInfoProps {
  createdAt: Date;
  expiresAt: Date;
  onRenew: () => void;
  lucoinCost: number;
}

const ContentExpiryInfo: React.FC<ContentExpiryInfoProps> = ({
  createdAt,
  expiresAt,
  onRenew,
  lucoinCost
}) => {
  const { recordInteraction } = useContentBrainHub();
  
  // Record content view interaction
  React.useEffect(() => {
    // Since we're viewing content details, record this interaction
    recordInteraction(createdAt.toString(), 'view');
  }, [createdAt, recordInteraction]);
  
  return (
    <div className="border rounded-md p-3 bg-secondary/10 text-sm space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center text-muted-foreground">
          <CalendarIcon className="h-3.5 w-3.5 mr-1.5" />
          Created: {format(createdAt, 'MMM d, yyyy')}
        </div>
        <div className="flex items-center text-amber-500">
          <Clock className="h-3.5 w-3.5 mr-1.5" />
          Expires: {format(expiresAt, 'MMM d, yyyy')}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground">
          Renewal cost: <span className="font-medium">{lucoinCost} LC</span>
        </span>
        <Button variant="outline" size="sm" onClick={onRenew}>
          Renew Content
        </Button>
      </div>
    </div>
  );
};

export default ContentExpiryInfo;
