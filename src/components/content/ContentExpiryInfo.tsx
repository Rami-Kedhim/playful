
import React from 'react';
import { calculateDaysRemaining } from '@/utils/dateUtils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Clock, RefreshCw } from 'lucide-react';

interface ContentExpiryInfoProps {
  createdAt: Date;
  expiresAt: Date;
  onRenew?: () => void;
  lucoinCost?: number;
}

const ContentExpiryInfo: React.FC<ContentExpiryInfoProps> = ({ 
  createdAt, 
  expiresAt, 
  onRenew,
  lucoinCost = 1 
}) => {
  const daysRemaining = calculateDaysRemaining(expiresAt);
  const isExpiringSoon = daysRemaining <= 30;
  const isExpired = daysRemaining <= 0;
  
  if (isExpired) {
    return (
      <div className="flex items-center justify-between p-2 bg-red-50 dark:bg-red-900/20 rounded-md text-sm">
        <span className="flex items-center text-red-600 dark:text-red-400">
          <Clock className="h-4 w-4 mr-1" />
          Expired content
        </span>
        {onRenew && (
          <Button onClick={onRenew} variant="outline" size="sm" className="bg-red-50 dark:bg-red-900/20">
            <RefreshCw className="h-3 w-3 mr-1" />
            Renew ({lucoinCost} LC)
          </Button>
        )}
      </div>
    );
  }
  
  if (isExpiringSoon) {
    return (
      <div className="flex items-center justify-between p-2 bg-amber-50 dark:bg-amber-900/20 rounded-md text-sm">
        <span className="flex items-center text-amber-600 dark:text-amber-400">
          <Clock className="h-4 w-4 mr-1" />
          Expires in {daysRemaining} days
        </span>
        {onRenew && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={onRenew} variant="outline" size="sm" className="bg-amber-50 dark:bg-amber-900/20">
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Renew
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Extend for 180 days ({lucoinCost} LC)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    );
  }
  
  return null;
};

export default ContentExpiryInfo;
