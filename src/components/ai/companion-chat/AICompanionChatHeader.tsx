
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { X, Minus, BadgeCheck, LucideIcon, CreditCard, Shield } from 'lucide-react';
import { AICompanion } from '@/types/ai-companion';
import { EmotionalState } from '@/types/ai-personality';
import EmotionalStateIndicator from './EmotionalStateIndicator';
import { cn } from '@/lib/utils';

interface AICompanionChatHeaderProps {
  isLoading: boolean;
  companion: AICompanion;
  onClose?: () => void;
  onMinimize?: () => void;
  credits?: number;
  creditCost?: number;
  emotionalState?: EmotionalState | null;
}

const AICompanionChatHeader: React.FC<AICompanionChatHeaderProps> = ({
  isLoading,
  companion,
  onClose,
  onMinimize,
  credits,
  creditCost,
  emotionalState
}) => {
  if (!companion) return null;
  
  // Get verification status badge if available
  const renderVerificationBadge = () => {
    if (!companion.verification_status) return null;
    
    return (
      <Badge
        variant="outline"
        className={cn(
          "ml-2 text-xs",
          companion.verification_status === 'verified' && "bg-green-500/10 text-green-500 border-green-500/20",
          companion.verification_status === 'pending' && "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
          companion.verification_status === 'rejected' && "bg-red-500/10 text-red-500 border-red-500/20"
        )}
      >
        {companion.verification_status === 'verified' && (
          <BadgeCheck className="h-3 w-3 mr-1" />
        )}
        {companion.verification_status.charAt(0).toUpperCase() + companion.verification_status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="border-b border-secondary/20 p-3 flex justify-between items-center relative">
      {/* Companion info */}
      <div className="flex items-center">
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage src={companion.avatar_url} alt={companion.name} />
          <AvatarFallback>
            {companion.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div>
          <div className="flex items-center">
            <span className="font-medium text-sm">
              {companion.name}
            </span>
            {renderVerificationBadge()}
          </div>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {companion.description || "AI Companion"}
          </p>
        </div>
      </div>

      {/* Controls and indicators */}
      <div className="flex items-center space-x-3">
        {/* Emotional state indicator */}
        {emotionalState && (
          <div className="mr-1">
            <EmotionalStateIndicator emotionalState={emotionalState} size="sm" />
          </div>
        )}
        
        {/* Credits display */}
        {typeof credits !== 'undefined' && (
          <div className="flex items-center text-xs text-amber-500 bg-amber-500/10 px-2 py-1 rounded">
            <CreditCard className="h-3 w-3 mr-1" />
            <span>{credits} LC</span>
          </div>
        )}
        
        {/* Minimize button */}
        {onMinimize && (
          <button
            onClick={onMinimize}
            className="text-muted-foreground hover:text-foreground transition"
          >
            <Minus className="h-4 w-4" />
          </button>
        )}
        
        {/* Close button */}
        {onClose && (
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default AICompanionChatHeader;
