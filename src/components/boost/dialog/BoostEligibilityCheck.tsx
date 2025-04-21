
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { BoostEligibility } from '@/types/boost';

interface BoostEligibilityCheckProps {
  eligibility: BoostEligibility;
  loading: boolean;
}

const BoostEligibilityCheck: React.FC<BoostEligibilityCheckProps> = ({ eligibility, loading }) => {
  if (loading) {
    return (
      <div className="p-4 flex items-center justify-center">
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        <span className="text-sm text-muted-foreground">Checking eligibility...</span>
      </div>
    );
  }
  
  // Use either isEligible or eligible property
  const isEligible = eligibility.isEligible || eligibility.eligible || false;
  
  if (isEligible) {
    return null; // Don't show anything if eligible
  }
  
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>You are not eligible for a boost</AlertTitle>
      <AlertDescription>
        {eligibility.reasons && eligibility.reasons.length > 0 ? (
          <ul className="mt-2 list-disc pl-5 space-y-1">
            {eligibility.reasons.map((reason, i) => (
              <li key={i} className="text-sm">{reason}</li>
            ))}
          </ul>
        ) : (
          <p>Please complete your profile or contact support for assistance.</p>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default BoostEligibilityCheck;
