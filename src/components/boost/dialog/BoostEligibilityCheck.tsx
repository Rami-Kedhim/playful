
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleAlert, AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';
import { BoostEligibility } from '../types';

interface BoostEligibilityCheckProps {
  eligibility: BoostEligibility;
  loading: boolean;
}

const BoostEligibilityCheck: React.FC<BoostEligibilityCheckProps> = ({ eligibility, loading }) => {
  // Use isEligible for the check, but fall back to eligible for compatibility
  const isEligible = eligibility.isEligible !== undefined ? eligibility.isEligible : eligibility.eligible;
  
  if (loading) {
    return (
      <Alert variant="default" className="bg-muted">
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        <AlertTitle>Checking eligibility</AlertTitle>
        <AlertDescription>Verifying your profile status...</AlertDescription>
      </Alert>
    );
  }
  
  if (isEligible) {
    return (
      <Alert variant="default" className="bg-green-500/10 border-green-500/20">
        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
        <AlertTitle>Eligible for Boost</AlertTitle>
        <AlertDescription>Your profile meets all requirements for boosting.</AlertDescription>
      </Alert>
    );
  }
  
  // Gather reasons - use array if available, otherwise create from single reason
  const reasons = eligibility.reasons || (eligibility.reason ? [eligibility.reason] : []);
  
  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4 mr-2" />
      <AlertTitle>Not eligible for boost</AlertTitle>
      <AlertDescription>
        {reasons.length > 0 ? (
          <ul className="list-disc list-inside mt-2 space-y-1">
            {reasons.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        ) : (
          "You do not meet the requirements to boost your profile."
        )}
      </AlertDescription>
    </Alert>
  );
};

export default BoostEligibilityCheck;
