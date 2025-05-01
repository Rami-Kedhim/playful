
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, AlertTriangle, FileText, Lock } from 'lucide-react';
import { getVerificationRequirements } from '@/utils/verification/statusCheck';
import { VerificationLevel } from '@/types/verification';

interface VerificationLevelRequirementsProps {
  currentLevel: VerificationLevel;
  targetLevel: VerificationLevel;
  onComplete: () => void;
}

const VerificationLevelRequirements: React.FC<VerificationLevelRequirementsProps> = ({
  currentLevel,
  targetLevel,
  onComplete
}) => {
  const requirements = getVerificationRequirements(targetLevel);
  
  // Check if the current level is sufficient for upgrade
  const canUpgrade = VerificationLevel[currentLevel] < VerificationLevel[targetLevel];
  
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Requirements for {targetLevel} Verification</h2>
        <p className="text-muted-foreground">
          Please review the requirements before proceeding with your verification upgrade.
        </p>
      </div>
      
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Document Requirements</h3>
            
            <div className="grid gap-2">
              {requirements.documents.map((doc, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Valid {doc.replace('_', ' ')}</span>
                </div>
              ))}
              
              {requirements.needsSelfie && (
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Selfie with your document</span>
                </div>
              )}
              
              {requirements.needsAddress && (
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Proof of address (utility bill, bank statement)</span>
                </div>
              )}
              
              {requirements.needsVideoCall && (
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Brief video call verification</span>
                </div>
              )}
            </div>
          </div>
          
          {requirements.fee > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Verification Fee</h3>
              <p className="font-semibold">${requirements.fee.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">
                This one-time fee covers the cost of processing your verification.
              </p>
            </div>
          )}
          
          {!canUpgrade && (
            <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-md p-4 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-yellow-800 dark:text-yellow-300">Already Verified</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                  You already have the {currentLevel} verification level, which is equivalent or higher than the requested level.
                </p>
              </div>
            </div>
          )}
          
          <div className="flex justify-end mt-4">
            <Button onClick={onComplete} disabled={!canUpgrade}>
              {!canUpgrade ? 'Already Verified' : 'Continue to Payment'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationLevelRequirements;
