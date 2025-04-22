
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Check, Info } from 'lucide-react';
import { BoostEligibility } from '@/types/boost';

interface BoostEligibilityCheckProps {
  eligibility: BoostEligibility;
  onResolve?: () => void;
  showSuccessAlert?: boolean;
}

export const BoostEligibilityCheck: React.FC<BoostEligibilityCheckProps> = ({
  eligibility,
  onResolve,
  showSuccessAlert = false
}) => {
  if (!eligibility) {
    return null;
  }

  if (eligibility.isEligible) {
    // Only show success message if explicitly requested
    if (!showSuccessAlert) {
      return null;
    }

    return (
      <Alert className="mb-6 border-green-200 bg-green-50 text-green-800">
        <Check className="h-5 w-5 text-green-600" />
        <AlertTitle>Ready to Boost</AlertTitle>
        <AlertDescription>
          Your profile is eligible for boosting. Choose a package to get started!
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="mb-6" variant="destructive">
      <AlertCircle className="h-5 w-5" />
      <AlertTitle>Profile Not Eligible</AlertTitle>
      <AlertDescription>
        <div className="space-y-2">
          <p>{eligibility.reason}</p>
          {onResolve && (
            <button
              className="text-sm font-medium underline hover:no-underline"
              onClick={onResolve}
            >
              Resolve Issue
            </button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
};

export default BoostEligibilityCheck;
