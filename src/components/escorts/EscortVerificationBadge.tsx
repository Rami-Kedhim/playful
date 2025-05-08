
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield, ShieldCheck, Award } from 'lucide-react';
import { VerificationLevel } from '@/services/escorts/verificationService';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface EscortVerificationBadgeProps {
  level: VerificationLevel;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const EscortVerificationBadge: React.FC<EscortVerificationBadgeProps> = ({
  level,
  size = 'md',
  showLabel = true,
  className = ''
}) => {
  const getBadgeContent = () => {
    switch (level) {
      case VerificationLevel.NONE:
        return {
          icon: <Shield className={`${getIconSize()} text-muted-foreground`} />,
          label: 'Unverified',
          variant: 'outline',
          tooltipText: 'This profile has not been verified'
        };
      case VerificationLevel.BASIC:
        return {
          icon: <Shield className={`${getIconSize()} text-blue-500`} />,
          label: 'Basic',
          variant: 'outline',
          tooltipText: 'This profile has basic verification'
        };
      case VerificationLevel.VERIFIED:
        return {
          icon: <ShieldCheck className={`${getIconSize()} text-green-500`} />,
          label: 'Verified',
          variant: 'default',
          tooltipText: 'This profile is verified with ID check'
        };
      case VerificationLevel.PREMIUM:
        return {
          icon: <ShieldCheck className={`${getIconSize()} fill-purple-100 text-purple-500`} />,
          label: 'Premium',
          variant: 'premium',
          tooltipText: 'Premium verified profile with background check'
        };
      case VerificationLevel.ELITE:
        return {
          icon: <Award className={`${getIconSize()} text-amber-500 fill-amber-100`} />,
          label: 'Elite',
          variant: 'gold',
          tooltipText: 'Elite verified with the highest level of verification'
        };
      default:
        return {
          icon: <Shield className={`${getIconSize()} text-muted-foreground`} />,
          label: 'Unverified',
          variant: 'outline',
          tooltipText: 'This profile has not been verified'
        };
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 'h-3 w-3';
      case 'md':
        return 'h-4 w-4';
      case 'lg':
        return 'h-5 w-5';
      default:
        return 'h-4 w-4';
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'sm':
        return 'text-xs';
      case 'md':
        return 'text-sm';
      case 'lg':
        return 'text-base';
      default:
        return 'text-sm';
    }
  };

  const getPaddingSize = () => {
    switch (size) {
      case 'sm':
        return 'py-0 px-1.5';
      case 'md':
        return 'py-0.5 px-2';
      case 'lg':
        return 'py-1 px-2.5';
      default:
        return 'py-0.5 px-2';
    }
  };

  const badgeContent = getBadgeContent();

  const getBadgeClassName = () => {
    let baseClass = `flex items-center gap-1 ${getPaddingSize()} ${getTextSize()} font-medium whitespace-nowrap ${className}`;
    
    switch (badgeContent.variant) {
      case 'default':
        return `${baseClass} bg-green-100 text-green-800 border-green-200`;
      case 'outline':
        return `${baseClass} bg-muted/50 text-muted-foreground border-muted-foreground/20`;
      case 'premium':
        return `${baseClass} bg-purple-100 text-purple-800 border-purple-200`;
      case 'gold':
        return `${baseClass} bg-amber-100 text-amber-800 border-amber-200`;
      default:
        return `${baseClass} bg-muted/50 text-muted-foreground border-muted-foreground/20`;
    }
  };

  if (level === VerificationLevel.NONE) {
    return null; // Don't show badge for unverified profiles
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge className={getBadgeClassName()} variant="outline">
            {badgeContent.icon}
            {showLabel && <span>{badgeContent.label}</span>}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{badgeContent.tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default EscortVerificationBadge;
