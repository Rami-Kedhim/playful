
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface BoostEligibilityAlertProps {
  eligible: boolean;
  reason?: string;
}

const BoostEligibilityAlert: React.FC<BoostEligibilityAlertProps> = ({
  eligible,
  reason
}) => {
  if (eligible) {
    return (
      <Alert className="bg-green-50 border-green-200 text-green-800 mb-4">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertTitle>Eligible for Boost</AlertTitle>
        <AlertDescription>
          Your profile meets all the requirements to be boosted.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="bg-red-50 border-red-200 text-red-800 mb-4">
      <AlertCircle className="h-4 w-4 text-red-600" />
      <AlertTitle>Not Eligible for Boost</AlertTitle>
      <AlertDescription>
        {reason || 'Your profile does not meet the requirements to be boosted.'}
      </AlertDescription>
    </Alert>
  );
};

export default BoostEligibilityAlert;
