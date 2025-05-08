
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/hooks/useWallet';
import { Zap, Check } from 'lucide-react';

export interface CreatorSubscriptionCardProps {
  creatorId: string;
  isSubscribed: boolean;
  canSubscribe: boolean;
  subscriptionPrice?: number;
  onSubscribe: () => Promise<void>;
  onSendTip: () => Promise<void>;
}

const CreatorSubscriptionCard: React.FC<CreatorSubscriptionCardProps> = ({
  creatorId,
  isSubscribed,
  canSubscribe,
  subscriptionPrice = 9.99,
  onSubscribe,
  onSendTip
}) => {
  const { balance } = useWallet();

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        {isSubscribed ? (
          <div className="mb-4 rounded-md bg-green-50 dark:bg-green-900/20 p-3 text-green-800 dark:text-green-200">
            <div className="flex items-center">
              <Check className="h-5 w-5 mr-2" />
              <p className="text-sm font-medium">You are subscribed to this creator</p>
            </div>
          </div>
        ) : (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Subscribe for Premium Content</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mt-1 mr-2" />
                <span className="text-sm">Exclusive photo and video content</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mt-1 mr-2" />
                <span className="text-sm">Private messaging with creator</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-green-500 mt-1 mr-2" />
                <span className="text-sm">Live stream access</span>
              </li>
            </ul>
            <div className="mt-4 py-3 border-t border-b">
              <div className="flex justify-between items-center">
                <span>Price per month</span>
                <span className="font-bold">${subscriptionPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        {isSubscribed ? (
          <Button 
            className="w-full" 
            variant="outline" 
            onClick={onSendTip}
          >
            <Zap className="mr-2 h-4 w-4" />
            Send Tip
          </Button>
        ) : (
          <Button 
            className="w-full" 
            onClick={onSubscribe} 
            disabled={!canSubscribe}
            variant="default"
          >
            {canSubscribe ? (
              <>Subscribe ${subscriptionPrice.toFixed(2)}/month</>
            ) : (
              <>Insufficient Balance</>
            )}
          </Button>
        )}
        {!isSubscribed && (
          <Button 
            className="w-full" 
            variant="outline"
            onClick={onSendTip}
          >
            <Zap className="mr-2 h-4 w-4" />
            Send Tip
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CreatorSubscriptionCard;
