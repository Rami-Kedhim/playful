
import React from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { 
  ShieldCheck, 
  ShieldX, 
  ShieldQuestion, 
  Star 
} from 'lucide-react';
import { VerificationLevel, VERIFICATION_LEVELS } from '@/types/verification';

interface EscortVerificationStatusProps {
  level: VerificationLevel;
  verifiedDate?: string;
  size?: 'sm' | 'md' | 'lg';
  showDate?: boolean;
  showLabel?: boolean;
  showTooltip?: boolean;
  className?: string;
}

const verificationLabelMap: Record<VerificationLevel, string> = {
  unverified: 'Unverified',
  none: 'Unverified', // Added for compatibility
  basic: 'Verified',
  enhanced: 'Premium Verified',
  premium: 'Gold Verified'
};

const verificationDescriptionMap: Record<VerificationLevel, string> = {
  unverified: 'This profile has not been verified yet.',
  none: 'This profile has not been verified yet.', // Added for compatibility
  basic: 'Identity verified through official documents.',
  enhanced: 'Enhanced verification including live video verification.',
  premium: 'Highest level of verification with physical meeting.'
};

const getVerificationIcon = (level: VerificationLevel, size: 'sm' | 'md' | 'lg') => {
  const iconSize = size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-5 w-5';
  
  switch (level) {
    case 'unverified':
    case 'none':
      return <ShieldX className={`${iconSize} text-destructive`} />;
    case 'basic':
      return <ShieldCheck className={`${iconSize} text-green-500`} />;
    case 'enhanced':
      return <ShieldCheck className={`${iconSize} text-blue-500`} />;
    case 'premium':
      return <Star className={`${iconSize} text-amber-500`} />;
    default:
      return <ShieldQuestion className={`${iconSize} text-muted-foreground`} />;
  }
};

const getVerificationBadgeVariant = (level: VerificationLevel) => {
  switch (level) {
    case 'unverified':
    case 'none':
      return 'destructive';
    case 'basic':
      return 'success';
    case 'enhanced':
      return 'secondary';
    case 'premium':
      return 'default'; // Instead of 'gold' which doesn't exist in the Badge component
    default:
      return 'outline';
  }
};

const EscortVerificationStatus: React.FC<EscortVerificationStatusProps> = ({
  level,
  verifiedDate,
  size = 'md',
  showDate = false,
  showLabel = true,
  showTooltip = true,
  className = ''
}) => {
  const formattedDate = verifiedDate 
    ? new Date(verifiedDate).toLocaleDateString() 
    : undefined;

  const label = verificationLabelMap[level] || 'Unknown';
  const description = verificationDescriptionMap[level] || 'Verification status unknown';
  const icon = getVerificationIcon(level, size);
  const badgeVariant = getVerificationBadgeVariant(level);

  const badgeContent = (
    <div className="flex items-center gap-1.5">
      {icon}
      {showLabel && <span>{label}</span>}
      {showDate && verifiedDate && (
        <span className="text-xs opacity-70"> · {formattedDate}</span>
      )}
    </div>
  );

  // If no tooltip, just return the badge
  if (!showTooltip) {
    return (
      <Badge 
        variant={badgeVariant as any}
        className={className}
      >
        {badgeContent}
      </Badge>
    );
  }

  // With tooltip
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge 
            variant={badgeVariant as any}
            className={`cursor-help ${className}`}
          >
            {badgeContent}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <div className="max-w-[200px]">
            <p className="font-medium">{label}</p>
            <p className="text-xs opacity-90">{description}</p>
            {showDate && verifiedDate && (
              <p className="text-xs mt-1 opacity-70">Verified on {formattedDate}</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default EscortVerificationStatus;
