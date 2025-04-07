import React from 'react';
import { X, Minus, Heart, Shield } from 'lucide-react';
import { AICompanion } from '@/types/ai-companion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { EmotionalState } from '@/types/ai-personality';

interface AICompanionChatHeaderProps {
  isLoading?: boolean;
  companion: AICompanion | null;
  onClose?: () => void;
  onMinimize?: () => void;
  credits?: number;
  creditCost?: number;
  emotionalState?: EmotionalState | null;
}

const AICompanionChatHeader: React.FC<AICompanionChatHeaderProps> = ({
  isLoading = false,
  companion,
  onClose,
  onMinimize,
  credits,
  creditCost = 0,
  emotionalState
}) => {
  if (!companion && isLoading) {
    return (
      <div className="bg-background/90 backdrop-blur-sm border-b border-white/10 p-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
          <div className="h-4 w-24 bg-muted animate-pulse rounded" />
        </div>
        <div className="flex items-center space-x-1">
          <button className="p-1 rounded-sm hover:bg-muted">
            <Minus className="h-4 w-4" />
          </button>
          <button className="p-1 rounded-sm hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  const getEmotionColor = () => {
    if (!emotionalState) return 'bg-neutral-400';
    
    const dominant = emotionalState.dominantEmotion || 'neutral';
    const intensity = emotionalState.intensityLevel || 50;
    
    switch(dominant) {
      case 'joy':
        return `bg-yellow-${Math.min(Math.floor(intensity / 10) * 100, 500)}`;
      case 'interest':
        return `bg-blue-${Math.min(Math.floor(intensity / 10) * 100, 500)}`;
      case 'surprise':
        return `bg-purple-${Math.min(Math.floor(intensity / 10) * 100, 500)}`;
      case 'sadness':
        return `bg-blue-${Math.min(Math.floor(intensity / 10) * 100, 900)}`;
      case 'anger':
        return `bg-red-${Math.min(Math.floor(intensity / 10) * 100, 600)}`;
      case 'fear':
        return `bg-gray-${Math.min(Math.floor(intensity / 10) * 100, 700)}`;
      case 'trust':
        return `bg-green-${Math.min(Math.floor(intensity / 10) * 100, 500)}`;
      case 'anticipation':
        return `bg-orange-${Math.min(Math.floor(intensity / 10) * 100, 500)}`;
      default:
        return 'bg-neutral-400';
    }
  };

  return (
    <div className="bg-background/90 backdrop-blur-sm border-b border-white/10 p-3 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Avatar className="h-9 w-9 border border-white/20">
            <AvatarImage src={companion?.avatar_url} />
            <AvatarFallback>
              {companion?.name?.charAt(0) || 'AI'}
            </AvatarFallback>
          </Avatar>
          {emotionalState && (
            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${getEmotionColor()} border border-background`}></div>
          )}
        </div>
        <div>
          <div className="font-medium text-sm flex items-center">
            {companion?.name}
            {companion?.verification_status === "verified" && (
              <Shield className="h-3 w-3 fill-primary text-background ml-1" />
            )}
          </div>
          {emotionalState?.dominantEmotion && (
            <div className="text-xs text-muted-foreground">
              Feeling {emotionalState.dominantEmotion}
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        {typeof credits !== 'undefined' && (
          <Badge variant="outline" className="bg-background border-amber-500 text-xs px-2 py-0 h-5">
            {credits} <span className="text-amber-500 ml-1">LC</span>
          </Badge>
        )}
        
        <button
          onClick={onMinimize}
          className="p-1 rounded-sm hover:bg-muted transition-colors"
          aria-label="Minimize"
          title="Minimize"
        >
          <Minus className="h-4 w-4" />
        </button>
        
        <button
          onClick={onClose}
          className="p-1 rounded-sm hover:bg-muted transition-colors"
          aria-label="Close"
          title="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default AICompanionChatHeader;
