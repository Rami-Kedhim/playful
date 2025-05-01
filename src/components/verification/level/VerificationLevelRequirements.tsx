
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, AlertCircle } from 'lucide-react';
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
  onComplete,
}) => {
  const requirements = getVerificationRequirements(targetLevel);
  
  // Mock data - in a real app, you would check the user's actual verification status
  const userHasValidId = currentLevel !== VerificationLevel.NONE;
  const userHasAddress = currentLevel === VerificationLevel.ENHANCED || currentLevel === VerificationLevel.PREMIUM;
  const userHasVideoVerification = currentLevel === VerificationLevel.PREMIUM;
  
  const isReadyToUpgrade = (targetLevel === VerificationLevel.BASIC) ||
    (targetLevel === VerificationLevel.ENHANCED && userHasValidId) ||
    (targetLevel === VerificationLevel.PREMIUM && userHasValidId && userHasAddress);

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">Requirements for {targetLevel} Level</h3>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-center">
            {userHasValidId ? (
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground mr-2" />
            )}
            <span>Valid ID Document</span>
          </div>

          {(targetLevel === VerificationLevel.ENHANCED || targetLevel === VerificationLevel.PREMIUM) && (
            <div className="flex items-center">
              {userHasAddress ? (
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground mr-2" />
              )}
              <span>Address Verification</span>
            </div>
          )}
          
          {targetLevel === VerificationLevel.PREMIUM && (
            <div className="flex items-center">
              {userHasVideoVerification ? (
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground mr-2" />
              )}
              <span>Video Call Verification</span>
            </div>
          )}
          
          {requirements.fee > 0 && (
            <div className="flex items-center">
              <Circle className="h-5 w-5 text-muted-foreground mr-2" />
              <span>Payment of ${requirements.fee}</span>
            </div>
          )}
        </div>
        
        {!isReadyToUpgrade && (
          <div className="flex items-center text-amber-500 mb-4 p-2 bg-amber-50 rounded-md">
            <AlertCircle className="h-4 w-4 mr-2" />
            <p className="text-sm">You need to complete the required verifications before upgrading</p>
          </div>
        )}

        {isReadyToUpgrade && requirements.fee > 0 && (
          <div className="bg-muted p-3 rounded-md mb-4">
            <p className="text-sm">A fee of ${requirements.fee} is required for this level upgrade</p>
          </div>
        )}
        
        <Button 
          onClick={onComplete} 
          className="w-full"
          disabled={!isReadyToUpgrade}
        >
          {isReadyToUpgrade ? 'Proceed to Payment' : 'Complete Requirements'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default VerificationLevelRequirements;
