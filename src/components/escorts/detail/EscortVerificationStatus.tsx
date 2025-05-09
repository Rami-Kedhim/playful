
import React from 'react';
import { Shield, ShieldCheck, ShieldAlert, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { VERIFICATION_LEVEL } from '@/types/verification';

interface EscortVerificationStatusProps {
  verificationLevel: string | undefined;
  size?: 'sm' | 'md' | 'lg';
  showTooltip?: boolean;
}

const EscortVerificationStatus: React.FC<EscortVerificationStatusProps> = ({
  verificationLevel,
  size = 'md',
  showTooltip = true
}) => {
  // Use appropriate sizes based on the size prop
  const badgeSizes = {
    sm: 'py-0 px-1.5 text-xs',
    md: 'py-1 px-2',
    lg: 'py-1.5 px-3'
  };
  
  const iconSizes = {
    sm: 12,
    md: 16,
    lg: 20
  };
  
  // Map verification levels to display properties
  const levelInfo = {
    [VERIFICATION_LEVEL.NONE]: {
      color: 'bg-gray-500 text-white',
      label: 'Not Verified',
      icon: Shield,
      description: 'This profile has not completed any verification steps.'
    },
    [VERIFICATION_LEVEL.BASIC]: {
      color: 'bg-blue-500 text-white',
      label: 'Basic Verification',
      icon: ShieldCheck,
      description: 'This profile has completed basic verification, confirming their identity.'
    },
    [VERIFICATION_LEVEL.ENHANCED]: {
      color: 'bg-green-500 text-white',
      label: 'Enhanced Verification',
      icon: ShieldCheck,
      description: 'This profile has completed enhanced verification with additional documentation.'
    },
    [VERIFICATION_LEVEL.PREMIUM]: {
      color: 'bg-purple-500 text-white',
      label: 'Premium Verification',
      icon: ShieldCheck,
      description: 'This profile has our highest level of verification, including in-person verification.'
    }
  };

  // Default to "Not Verified" if level is undefined
  const level = verificationLevel || VERIFICATION_LEVEL.NONE;
  const { color, label, icon: Icon, description } = levelInfo[level as keyof typeof levelInfo] || levelInfo[VERIFICATION_LEVEL.NONE];

  const badge = (
    <Badge className={`${color} ${badgeSizes[size]} flex items-center gap-1`}>
      <Icon size={iconSizes[size]} />
      {size !== 'sm' && <span>{label}</span>}
    </Badge>
  );

  // Return with or without tooltip based on props
  return showTooltip ? (
    <Tooltip>
      <TooltipTrigger asChild>
        {badge}
      </TooltipTrigger>
      <TooltipContent side="right" className="max-w-xs">
        <div className="flex flex-col gap-1">
          <span className="font-semibold">{label}</span>
          <span className="text-sm">{description}</span>
        </div>
      </TooltipContent>
    </Tooltip>
  ) : badge;
};

export default EscortVerificationStatus;
