
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Shield, AlertTriangle } from 'lucide-react';
import { VerificationLevel } from '@/types/verification';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface VerificationBadgeProps {
  level: VerificationLevel | string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showTooltip?: boolean;
}

const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  level,
  size = 'md',
  className = '',
  showTooltip = true
}) => {
  // Size configurations
  const sizeConfig = {
    sm: { icon: 'h-3 w-3 mr-0.5', text: 'text-xs px-1.5 py-0.5', badge: 'h-4' },
    md: { icon: 'h-4 w-4 mr-1', text: 'text-sm px-2 py-1', badge: 'h-5' },
    lg: { icon: 'h-5 w-5 mr-1.5', text: 'text-base px-2.5 py-1', badge: 'h-6' }
  };

  // Level configurations
  const levelConfig = {
    [VerificationLevel.PREMIUM]: {
      icon: <CheckCircle2 className={sizeConfig[size].icon} />,
      text: 'Premium',
      variant: 'success' as const,
      tooltip: 'Premium verified account with highest level of trust'
    },
    [VerificationLevel.ENHANCED]: {
      icon: <CheckCircle2 className={sizeConfig[size].icon} />,
      text: 'Enhanced',
      variant: 'ubx' as const,
      tooltip: 'Enhanced verification with additional verification steps'
    },
    [VerificationLevel.BASIC]: {
      icon: <CheckCircle2 className={sizeConfig[size].icon} />,
      text: 'Verified',
      variant: 'default' as const,
      tooltip: 'Basic verification completed'
    },
    [VerificationLevel.NONE]: {
      icon: <Shield className={sizeConfig[size].icon} />,
      text: 'Not Verified',
      variant: 'outline' as const,
      tooltip: 'This profile has not been verified'
    }
  };

  // Get configuration based on level
  const config = levelConfig[level as VerificationLevel] || levelConfig[VerificationLevel.NONE];
  
  const badge = (
    <Badge 
      variant={config.variant} 
      className={`flex items-center gap-1 ${sizeConfig[size].text} ${className}`}
    >
      {config.icon}
      <span>{config.text}</span>
    </Badge>
  );

  // Apply tooltip if requested
  if (showTooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {badge}
          </TooltipTrigger>
          <TooltipContent>
            <p>{config.tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return badge;
}

export default VerificationBadge;
