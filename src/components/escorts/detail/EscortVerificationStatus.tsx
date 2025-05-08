
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
import { VerificationLevel } from '@/types/verification';

interface EscortVerificationStatusProps {
  level: string;
  verifiedDate?: string;
  size?: 'sm' | 'md' | 'lg';
  showDate?: boolean;
  showLabel?: boolean;
  showTooltip?: boolean;
  className?: string;
}

// Define label map that matches the enum values
const verificationLabelMap: Record<string, string> = {
  [VerificationLevel.NONE]: 'Unverified',
  [VerificationLevel.BASIC]: 'Verified',
  [VerificationLevel.ENHANCED]: 'Premium Verified',
  [VerificationLevel.PREMIUM]: 'Gold Verified',
  [VerificationLevel.VERIFIED]: 'Verified'
};

// Define description map that matches the enum values
const verificationDescriptionMap: Record<string, string> = {
  [VerificationLevel.NONE]: 'This profile has not been verified yet.',
  [VerificationLevel.BASIC]: 'Identity verified through official documents.',
  [VerificationLevel.ENHANCED]: 'Enhanced verification including live video verification.',
  [VerificationLevel.PREMIUM]: 'Highest level of verification with physical meeting.',
  [VerificationLevel.VERIFIED]: 'Identity verified through official documents.'
};

const getVerificationIcon = (level: string, size: 'sm' | 'md' | 'lg') => {
  const iconSize = size === 'sm' ? 'h-3 w-3' : size === 'md' ? 'h-4 w-4' : 'h-5 w-5';
  
  switch (level) {
    case VerificationLevel.NONE:
      return <ShieldX className={`${iconSize} text-destructive`} />;
    case VerificationLevel.BASIC:
      return <ShieldCheck className={`${iconSize} text-green-500`} />;
    case VerificationLevel.ENHANCED:
      return <ShieldCheck className={`${iconSize} text-blue-500`} />;
    case VerificationLevel.PREMIUM:
      return <Star className={`${iconSize} text-amber-500`} />;
    default:
      return <ShieldQuestion className={`${iconSize} text-muted-foreground`} />;
  }
};

const getVerificationBadgeVariant = (level: string) => {
  switch (level) {
    case VerificationLevel.NONE:
      return 'destructive';
    case VerificationLevel.BASIC:
      return 'success';
    case VerificationLevel.ENHANCED:
      return 'secondary';
    case VerificationLevel.PREMIUM:
      return 'default';
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

  // Get label and description using our maps
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
