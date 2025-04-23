
import React from 'react';
import { 
  Shield, 
  ShieldCheck, 
  AlertTriangle
} from 'lucide-react';
import { VerificationLevel } from '@/types/verification';

interface VerificationBadgeProps {
  level: VerificationLevel | 'none' | 'basic' | 'enhanced' | 'premium';
}

const VerificationBadge = ({ level }: VerificationBadgeProps) => {
  // Normalize the level to ensure it matches our enum values
  const normalizedLevel = level === 'none' ? VerificationLevel.NONE : 
                          level === 'basic' ? VerificationLevel.BASIC :
                          level === 'enhanced' ? VerificationLevel.ENHANCED :
                          level === 'premium' ? VerificationLevel.PREMIUM : 
                          level;

  if (normalizedLevel === VerificationLevel.NONE) {
    return (
      <div className="flex items-start gap-3 p-4 border border-gray-700 rounded-lg">
        <AlertTriangle className="h-5 w-5 text-gray-400 mt-0.5" />
        <div>
          <h3 className="font-medium text-gray-400">Not Verified</h3>
          <p className="text-sm text-gray-500 mt-1">
            This profile has not completed any verification steps.
            We recommend caution when interacting.
          </p>
        </div>
      </div>
    );
  }

  const badges = {
    [VerificationLevel.BASIC]: {
      icon: <Shield className="h-5 w-5 text-amber-500 mt-0.5" />,
      title: "Basic Verification",
      description: "This profile has completed basic identity verification steps."
    },
    [VerificationLevel.ENHANCED]: {
      icon: <ShieldCheck className="h-5 w-5 text-blue-500 mt-0.5" />,
      title: "Enhanced Verification",
      description: "This profile has completed enhanced verification including identity and contact verification."
    },
    [VerificationLevel.PREMIUM]: {
      icon: <ShieldCheck className="h-5 w-5 text-primary mt-0.5" />,
      title: "Premium Verification",
      description: "This profile has completed our most comprehensive verification process, including in-person verification."
    }
  };

  const badge = badges[normalizedLevel as VerificationLevel] || badges[VerificationLevel.BASIC];

  return (
    <div className="flex items-start gap-3 p-4 border border-gray-700 rounded-lg">
      {badge.icon}
      <div>
        <h3 className="font-medium">{badge.title}</h3>
        <p className="text-sm text-gray-300 mt-1">
          {badge.description}
        </p>
      </div>
    </div>
  );
};

export default VerificationBadge;
