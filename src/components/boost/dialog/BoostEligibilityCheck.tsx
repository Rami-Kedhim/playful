
import React from 'react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { BoostEligibility } from '@/types/boost';

interface BoostEligibilityCheckProps {
  eligibility: BoostEligibility;
  loading?: boolean;
}

const BoostEligibilityCheck: React.FC<BoostEligibilityCheckProps> = ({
  eligibility,
  loading = false
}) => {
  if (loading) {
    return (
      <Alert className="bg-muted/50">
        <Info className="h-4 w-4" />
        <AlertTitle>Checking eligibility...</AlertTitle>
        <AlertDescription>Please wait while we check your boost eligibility.</AlertDescription>
      </Alert>
    );
  }

  if (!eligibility.isEligible && eligibility.reasons && eligibility.reasons.length > 0) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Not eligible for boosting</AlertTitle>
        <AlertDescription>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            {eligibility.reasons.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
          {eligibility.minimumProfileCompleteness && (
            <div className="mt-2 text-sm">
              <p>Required profile completeness: {eligibility.minimumProfileCompleteness}%</p>
              {eligibility.missingFields && eligibility.missingFields.length > 0 && (
                <div className="mt-1">
                  <p>Missing fields:</p>
                  <ul className="list-disc pl-5">
                    {eligibility.missingFields.map((field, index) => (
                      <li key={index}>{field}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  if (eligibility.isEligible) {
    return (
      <Alert className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
        <AlertTitle>Eligible for boosting</AlertTitle>
        <AlertDescription>
          Your profile meets all requirements for boosting.
        </AlertDescription>
      </Alert>
    );
  }

  return null;
};

export default BoostEligibilityCheck;
