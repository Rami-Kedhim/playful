
import React from 'react';
import { calculateDaysRemaining, formatDate, formatTimePeriod } from '@/utils/dateUtils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Clock, RefreshCw, Info, Coins } from 'lucide-react';

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
      <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-md text-sm border border-red-200 dark:border-red-800">
        <div className="flex flex-col">
          <span className="flex items-center text-red-600 dark:text-red-400 font-medium">
            <Clock className="h-4 w-4 mr-1" />
            Expired content
          </span>
          <span className="text-xs text-red-500 dark:text-red-400 mt-1">
            Expired on {formatDate(expiresAt)}
          </span>
        </div>
        {onRenew && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={onRenew} size="sm" className="bg-red-100 hover:bg-red-200 text-red-600 dark:bg-red-900/40 dark:hover:bg-red-900/60 dark:text-red-300">
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Renew <Coins className="h-3 w-3 mx-1" /> {lucoinCost} LC
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Restore for 180 days ({lucoinCost} LC)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    );
  }
  
  if (isExpiringSoon) {
    return (
      <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/20 rounded-md text-sm border border-amber-200 dark:border-amber-800">
        <div className="flex flex-col">
          <span className="flex items-center text-amber-600 dark:text-amber-400 font-medium">
            <Clock className="h-4 w-4 mr-1" />
            Expires in {daysRemaining} days
          </span>
          <span className="text-xs text-amber-500 dark:text-amber-400 mt-1">
            Expires on {formatDate(expiresAt)}
          </span>
        </div>
        {onRenew && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={onRenew} size="sm" className="bg-amber-100 hover:bg-amber-200 text-amber-600 dark:bg-amber-900/40 dark:hover:bg-amber-900/60 dark:text-amber-300">
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Renew <Coins className="h-3 w-3 mx-1" /> {lucoinCost} LC
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
  
  // Show a minimal info for active content that's not expiring soon
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/20 rounded-md text-sm border border-gray-200 dark:border-gray-800">
      <div className="flex flex-col">
        <span className="flex items-center text-gray-600 dark:text-gray-400">
          <Clock className="h-4 w-4 mr-1" />
          Active for {formatTimePeriod(180 - daysRemaining)}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Expires on {formatDate(expiresAt)}
        </span>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" className="px-2">
              <Info className="h-4 w-4 text-gray-400" />
            </Button>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p>Content expires automatically after 180 days of inactivity. Receive interactions or renew with Lucoins to extend.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ContentExpiryInfo;
