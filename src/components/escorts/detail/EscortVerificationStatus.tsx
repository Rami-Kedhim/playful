
import React from 'react';
import { Shield, ShieldCheck, ShieldX } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { VerificationLevel, VERIFICATION_LEVEL } from '@/types/verification';

interface EscortVerificationStatusProps {
  verificationLevel: string;
  className?: string;
}

const EscortVerificationStatus: React.FC<EscortVerificationStatusProps> = ({
  verificationLevel,
  className = ''
}) => {
  const getLevelDisplay = () => {
    switch (verificationLevel) {
      case VerificationLevel.VERIFIED:
      case VERIFICATION_LEVEL.VERIFIED:
        return {
          color: 'bg-green-100 text-green-800',
          icon: <ShieldCheck className="w-4 h-4 mr-1" />,
          text: 'Verified',
          tooltip: 'This escort has completed identity verification'
        };
      case VerificationLevel.PREMIUM:
      case VERIFICATION_LEVEL.PREMIUM:
        return {
          color: 'bg-purple-100 text-purple-800',
          icon: <ShieldCheck className="w-4 h-4 mr-1" />,
          text: 'Premium Verified',
          tooltip: 'This escort has completed premium level verification'
        };
      case VerificationLevel.ENHANCED:
      case VERIFICATION_LEVEL.ENHANCED:
        return {
          color: 'bg-blue-100 text-blue-800',
          icon: <ShieldCheck className="w-4 h-4 mr-1" />,
          text: 'Enhanced Verified',
          tooltip: 'This escort has completed enhanced verification'
        };
      case VerificationLevel.BASIC:
      case VERIFICATION_LEVEL.BASIC:
        return {
          color: 'bg-yellow-100 text-yellow-800',
          icon: <Shield className="w-4 h-4 mr-1" />,
          text: 'Basic Verification',
          tooltip: 'This escort has completed basic verification'
        };
      case VerificationLevel.NONE:
      case VERIFICATION_LEVEL.NONE:
      default:
        return {
          color: 'bg-gray-100 text-gray-800',
          icon: <ShieldX className="w-4 h-4 mr-1" />,
          text: 'Unverified',
          tooltip: 'This escort has not been verified yet'
        };
    }
  };

  const display = getLevelDisplay();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className={`${display.color} flex items-center ${className}`}>
            {display.icon}
            {display.text}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>{display.tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default EscortVerificationStatus;
