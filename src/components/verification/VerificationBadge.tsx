
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Shield, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { VerificationLevel } from '@/types/escort';

interface VerificationBadgeProps {
  level: VerificationLevel;
  className?: string;
  showTooltip?: boolean;
}

const VerificationBadge = ({ level, className = '', showTooltip = true }: VerificationBadgeProps) => {
  const getBadgeContent = () => {
    switch (level) {
      case 'premium':
        return {
          icon: <Shield className="h-4 w-4 mr-1" />,
          text: 'Premium Verified',
          description: 'This profile has completed our most rigorous verification process including government ID, photo verification, and background check.',
          variant: 'default' as const,
          color: 'bg-primary text-primary-foreground'
        };
      case 'enhanced':
        return {
          icon: <CheckCircle className="h-4 w-4 mr-1" />,
          text: 'Enhanced Verification',
          description: 'This profile has verified their identity with government ID and photo verification.',
          variant: 'outline' as const,
          color: 'bg-green-500/20 text-green-500 border-green-500/30'
        };
      case 'basic':
        return {
          icon: <Clock className="h-4 w-4 mr-1" />,
          text: 'Basic Verification',
          description: 'This profile has completed initial verification steps but has not completed the full process.',
          variant: 'outline' as const,
          color: 'bg-blue-500/20 text-blue-500 border-blue-500/30'
        };
      default:
        return {
          icon: <AlertTriangle className="h-4 w-4 mr-1" />,
          text: 'Not Verified',
          description: 'This profile has not been verified. Exercise caution when interacting.',
          variant: 'outline' as const,
          color: 'bg-amber-500/20 text-amber-500 border-amber-500/30'
        };
    }
  };

  const content = getBadgeContent();
  
  const badge = (
    <Badge 
      variant={content.variant} 
      className={`flex items-center ${content.color} ${className}`}
    >
      {content.icon}
      {content.text}
    </Badge>
  );

  if (!showTooltip) {
    return badge;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {badge}
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p>{content.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default VerificationBadge;
