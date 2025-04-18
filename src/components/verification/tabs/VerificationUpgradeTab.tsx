
// Make sure to update the VerificationUpgradeTab component to match the VerificationBadgeProps
// Add the necessary imports and update the component props
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import VerificationBadge from '../VerificationBadge';
import { VerificationLevel } from '@/types/verification';
import { useVerificationStatus } from '../hooks/useVerificationStatus';
import VerificationLevelUpgrade from '../level/VerificationLevelUpgrade';

const VerificationUpgradeTab = () => {
  const { verificationRequest } = useVerificationStatus();
  
  // Get the current level from the verification request
  const currentLevel = verificationRequest?.verificationLevel || 
                      verificationRequest?.requested_level || 
                      verificationRequest?.level ||
                      VerificationLevel.NONE;
  
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            Verification Level
            <VerificationBadge 
              level={currentLevel} 
              size="sm"
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            Upgrade your verification level to unlock more features and build greater trust with users.
          </p>
          
          <VerificationLevelUpgrade />
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationUpgradeTab;
