
import React from 'react';
import { X, Minus, CreditCard, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AICompanion } from '@/types/ai-companion';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

interface AICompanionChatHeaderProps {
  companion?: AICompanion;
  isLoading: boolean;
  onClose: () => void;
  onMinimize?: () => void;
  credits?: number;
  creditCost?: number;
}

const AICompanionChatHeader: React.FC<AICompanionChatHeaderProps> = ({
  companion,
  isLoading,
  onClose,
  onMinimize,
  credits,
  creditCost = 0
}) => {
  // Render a default header or loading state if no companion or still loading
  if (isLoading && !companion) {
    return (
      <div className="flex items-center justify-between p-3 border-b bg-background/80 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16 mt-1" />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-3 border-b bg-background/80 backdrop-blur-sm">
      <div className="flex items-center space-x-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={companion?.avatar_url || ''} alt={companion?.name || 'AI'} />
          <AvatarFallback>
            <Bot className="h-4 w-4" />
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-sm">
              {companion?.name || 'AI Companion'}
            </h3>
            <Badge variant="outline" className="text-xs">
              AI
            </Badge>
          </div>
          {companion?.personality_traits && companion.personality_traits.length > 0 && (
            <p className="text-xs text-muted-foreground">
              {companion.personality_traits.join(', ')}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        {credits !== undefined && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                <CreditCard className="h-3 w-3" />
                {credits}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              Your credit balance
              {creditCost > 0 && ` (${creditCost} per message)`}
            </TooltipContent>
          </Tooltip>
        )}
        
        {onMinimize && (
          <Button variant="ghost" size="icon" onClick={onMinimize} className="h-8 w-8">
            <Minus className="h-4 w-4" />
          </Button>
        )}
        
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AICompanionChatHeader;
