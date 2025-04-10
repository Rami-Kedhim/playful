
import React from 'react';
import { X, Minus, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AICompanion } from '@/types/ai-companion';
import { Badge } from '@/components/ui/badge';

interface AICompanionChatHeaderProps {
  isLoading: boolean;
  companion: AICompanion;
  onClose: () => void;
  onMinimize: () => void;
  credits?: number;
  creditCost?: number;
  emotionalState?: string;
  brainHubConnected?: boolean;
}

const AICompanionChatHeader: React.FC<AICompanionChatHeaderProps> = ({
  companion,
  onClose,
  onMinimize,
  credits,
  creditCost = 0,
  emotionalState,
  brainHubConnected = false
}) => {
  return (
    <div className="border-b flex items-center justify-between p-3 bg-background">
      <div className="flex items-center gap-2">
        {companion.avatar_url ? (
          <div className="relative">
            <img 
              src={companion.avatar_url} 
              className="h-8 w-8 rounded-full object-cover"
              alt={companion.name}
            />
            {brainHubConnected && (
              <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-blue-500 rounded-full border-2 border-background" 
                   title="Enhanced by Brain Hub" />
            )}
          </div>
        ) : (
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
            <span className="text-xs font-bold">{companion.name[0]}</span>
          </div>
        )}
        <div>
          <div className="flex items-center">
            <span className="font-medium text-sm">{companion.name}</span>
            {companion.verification_status === 'verified' && (
              <span className="ml-1 text-blue-500">✓</span>
            )}
            {brainHubConnected && (
              <Badge variant="outline" className="ml-1 px-1 py-0 h-4 text-[10px] bg-blue-500/10">
                <Brain className="h-2 w-2 mr-1" />
                Brain
              </Badge>
            )}
          </div>
          {emotionalState && (
            <p className="text-xs text-muted-foreground">
              Feeling {emotionalState}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-1">
        {credits !== undefined && (
          <div className="text-xs px-2 py-1 rounded-full bg-muted mr-1">
            {credits} LC
          </div>
        )}
        <Button variant="ghost" size="icon" onClick={onMinimize} className="h-6 w-6">
          <Minus className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6">
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default AICompanionChatHeader;
