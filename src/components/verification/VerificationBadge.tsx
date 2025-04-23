
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Shield, AlertTriangle } from 'lucide-react';
import { VerificationLevel } from '@/types/verification';

interface VerificationBadgeProps {
  level: VerificationLevel;
  className?: string;
}

const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  level,
  className = ''
}) => {
  // Configure badge based on verification level
  const getBadgeConfig = () => {
    switch (level) {
      case VerificationLevel.PREMIUM:
        return {
          icon: <CheckCircle2 className="h-4 w-4 mr-1" />,
          text: 'Premium Verified',
          variant: 'success' as const
        };
      case VerificationLevel.ENHANCED:
        return {
          icon: <CheckCircle2 className="h-4 w-4 mr-1" />,
          text: 'Enhanced Verified',
          variant: 'ubx' as const
        };
      case VerificationLevel.BASIC:
        return {
          icon: <CheckCircle2 className="h-4 w-4 mr-1" />,
          text: 'Verified',
          variant: 'default' as const
        };
      default:
        return {
          icon: <Shield className="h-4 w-4 mr-1" />,
          text: 'Not Verified',
          variant: 'outline' as const
        };
    }
  };

  const config = getBadgeConfig();

  return (
    <Badge variant={config.variant} className={`flex items-center gap-1 ${className}`}>
      {config.icon}
      <span>{config.text}</span>
    </Badge>
  );
};

export default VerificationBadge;
