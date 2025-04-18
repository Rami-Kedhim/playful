
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VerificationLevel } from '@/types/verification';
import VerificationLevels from './VerificationLevels';
import VerificationStatus from './VerificationStatus';
import DocumentUploader from './DocumentUploader';

export interface VerificationContainerProps {
  userId: string;
  currentLevel: VerificationLevel;
  verificationStatus: 'none' | 'pending' | 'approved' | 'rejected';
}

const VerificationContainer: React.FC<VerificationContainerProps> = ({
  userId,
  currentLevel,
  verificationStatus
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Account Verification</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <VerificationStatus status={verificationStatus} level={currentLevel} />
        <VerificationLevels currentLevel={currentLevel} />
        
        {(verificationStatus === 'none' || verificationStatus === 'rejected') && (
          <DocumentUploader userId={userId} />
        )}
      </CardContent>
    </Card>
  );
};

export { VerificationContainer };
export default VerificationContainer;
