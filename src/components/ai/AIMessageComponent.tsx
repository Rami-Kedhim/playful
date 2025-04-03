
import React, { useState } from 'react';
import { AIMessage } from '@/types/ai-profile';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { unlockPaidMessage } from '@/services/ai/aiMessagesService';
import { Coins, Lock } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface AIMessageComponentProps {
  message: AIMessage;
  isLoading?: boolean;
  onMessageUnlocked?: () => void;
}

const AIMessageComponent: React.FC<AIMessageComponentProps> = ({ 
  message, 
  isLoading = false, 
  onMessageUnlocked 
}) => {
  const { user } = useAuth();
  const [unlocking, setUnlocking] = useState(false);
  
  const isLocked = message.requires_payment && message.payment_status === 'pending';
  const isUserMessage = !message.is_ai;
  
  const handleUnlock = async () => {
    if (!user) return;
    
    setUnlocking(true);
    try {
      const success = await unlockPaidMessage(user.id, message.id);
      if (success && onMessageUnlocked) {
        onMessageUnlocked();
      }
    } finally {
      setUnlocking(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className={`flex max-w-[80%] ${isUserMessage ? 'ml-auto' : 'mr-auto'}`}>
        <div className={`rounded-lg p-3 ${isUserMessage ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
          <Skeleton className="h-4 w-[250px] mb-2" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }
  
  return (
    <div className={`flex max-w-[80%] ${isUserMessage ? 'ml-auto' : 'mr-auto'} mb-4`}>
      <div className={`rounded-lg p-3 ${isUserMessage ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
        {isLocked ? (
          <div className="flex flex-col items-center gap-2">
            <Lock className="h-5 w-5 text-yellow-500" />
            <p className="text-sm text-center">This premium message requires payment to view</p>
            <p className="text-sm font-semibold flex items-center gap-1 mb-2">
              <Coins className="h-4 w-4 text-yellow-500" />
              {message.price} Lucoins
            </p>
            <Button 
              size="sm" 
              onClick={handleUnlock} 
              disabled={unlocking}
              className="mt-1"
            >
              {unlocking ? 'Processing...' : 'Unlock Message'}
            </Button>
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{message.content}</p>
        )}
      </div>
    </div>
  );
};

export default AIMessageComponent;
