import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { 
  X, 
  Minus, 
  BadgeCheck, 
  CreditCard, 
  Shield,
  Heart,
  Star,
  ThumbsUp
} from 'lucide-react';
import { AICompanion } from '@/types/ai-companion';
import { EmotionalState } from '@/types/ai-personality';
import EmotionalStateIndicator from './EmotionalStateIndicator';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';

interface AICompanionChatHeaderProps {
  isLoading: boolean;
  companion: AICompanion;
  onClose?: () => void;
  onMinimize?: () => void;
  credits?: number;
  creditCost?: number;
  emotionalState?: EmotionalState | null;
  onFavoriteToggle?: () => void;
  isFavorite?: boolean;
}

/**
 * Enhanced AI Companion Chat Header component
 * Displays companion information with emotional indicators and controls
 */
const EnhancedAICompanionChatHeader: React.FC<AICompanionChatHeaderProps> = ({
  isLoading,
  companion,
  onClose,
  onMinimize,
  credits,
  creditCost,
  emotionalState,
  onFavoriteToggle,
  isFavorite = false
}) => {
  if (!companion) return null;
  
  // Calculate relationship level average for display
  const relationshipLevel = companion.relationship_level ? 
    Math.round((companion.relationship_level.trust + 
                companion.relationship_level.affection + 
                companion.relationship_level.intimacy) / 3) : 0;
  
  // Verification status badge renderer
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

  // Calculate the appropriate relationship badge
  const getRelationshipBadge = () => {
    if (relationshipLevel >= 80) {
      return {
        color: "bg-pink-500/10 text-pink-500 border-pink-500/20",
        icon: <Heart className="h-3 w-3 mr-1" />,
        label: "Intimate"
      };
    } else if (relationshipLevel >= 60) {
      return {
        color: "bg-purple-500/10 text-purple-500 border-purple-500/20",
        icon: <Star className="h-3 w-3 mr-1" />,
        label: "Close"
      };
    } else if (relationshipLevel >= 40) {
      return {
        color: "bg-blue-500/10 text-blue-500 border-blue-500/20", 
        icon: <ThumbsUp className="h-3 w-3 mr-1" />,
        label: "Friendly"
      };
    }
    
    return null;
  };
  
  const relationshipBadge = getRelationshipBadge();

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
          <div className="flex items-center text-xs text-muted-foreground">
            <p className="line-clamp-1 mr-2">
              {companion.description || "AI Companion"}
            </p>
            
            {relationshipBadge && (
              <Badge
                variant="outline"
                className={cn("text-xs", relationshipBadge.color)}
              >
                {relationshipBadge.icon}
                {relationshipBadge.label}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Controls and indicators */}
      <div className="flex items-center space-x-2">
        {/* Emotional state indicator */}
        {emotionalState && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="mr-1">
                  <EmotionalStateIndicator emotionalState={emotionalState} size="sm" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Current mood: {emotionalState.dominantEmotion || emotionalState.primary || 'neutral'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        
        {/* Credits display */}
        {typeof credits !== 'undefined' && (
          <div className="flex items-center text-xs text-amber-500 bg-amber-500/10 px-2 py-1 rounded">
            <CreditCard className="h-3 w-3 mr-1" />
            <span>{credits} LC</span>
          </div>
        )}
        
        {/* Favorite toggle */}
        {onFavoriteToggle && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-7 w-7 text-muted-foreground hover:text-foreground"
            onClick={onFavoriteToggle}
          >
            <Heart 
              className="h-4 w-4" 
              fill={isFavorite ? "currentColor" : "none"} 
            />
          </Button>
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

export default EnhancedAICompanionChatHeader;
