
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, Clock, CheckCircle } from 'lucide-react';

interface BoostEligibilityCheckProps {
  eligibility: {
    eligible: boolean;
    reason: string;
    reasons: string[];
    nextEligibleTime?: string;
  };
  onClose: () => void;
}

const BoostEligibilityCheck: React.FC<BoostEligibilityCheckProps> = ({ 
  eligibility,
  onClose
}) => {
  if (eligibility.eligible) {
    return (
      <Alert variant="success" className="mb-4 bg-green-50 dark:bg-green-950/20 border-green-500/30">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertTitle>You can boost this profile</AlertTitle>
        <AlertDescription>
          This profile is eligible for boosting. Select a package below to continue.
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>This profile cannot be boosted</AlertTitle>
      <AlertDescription className="space-y-2">
        <div>
          {eligibility.reason || "This profile is not eligible for boosting at this time."}
        </div>
        
        {eligibility.reasons && eligibility.reasons.length > 0 && (
          <ul className="list-disc pl-5 space-y-1 text-sm">
            {eligibility.reasons.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        )}
        
        {eligibility.nextEligibleTime && (
          <div className="flex items-center gap-2 mt-2 text-sm">
            <Clock className="h-4 w-4" />
            <span>You can try again in {eligibility.nextEligibleTime}</span>
          </div>
        )}
        
        <Button size="sm" variant="outline" onClick={onClose} className="mt-2">
          Close
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default BoostEligibilityCheck;
