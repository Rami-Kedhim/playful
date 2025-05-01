
import React from 'react';
import { Card } from '@/components/ui/card';
import { useVerificationStatus } from '@/hooks/verification/useVerificationStatus';
import { Loader2 } from 'lucide-react';
import { VerificationLevel } from '@/types/verification';
import VerificationLevelUpgrade from '../level/VerificationLevelUpgrade';

interface VerificationUpgradeTabProps {
  userId?: string;
  currentLevel?: VerificationLevel;
}

const VerificationUpgradeTab: React.FC<VerificationUpgradeTabProps> = ({
  userId,
  currentLevel = VerificationLevel.NONE
}) => {
  const { loading, verificationRequest } = useVerificationStatus();

  // Use the provided current level or get it from the verification request
  const effectiveLevel = currentLevel || 
                       verificationRequest?.verificationLevel || 
                       verificationRequest?.requested_level || 
                       VerificationLevel.NONE;

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card className="p-4">
      <VerificationLevelUpgrade />
    </Card>
  );
};

export default VerificationUpgradeTab;
