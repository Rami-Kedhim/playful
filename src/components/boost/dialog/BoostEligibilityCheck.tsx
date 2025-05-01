import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, ShieldAlert, AlertTriangle } from "lucide-react";
import { BoostEligibility } from "@/types/boost";

interface BoostEligibilityCheckProps {
  eligibility: BoostEligibility;
  onClose: () => void;
}

const BoostEligibilityCheck: React.FC<BoostEligibilityCheckProps> = ({
  eligibility,
  onClose
}) => {
  if (eligibility.isEligible) {
    return null;
  }

  const getReasonMessage = () => {
    if (eligibility.reason) {
      return eligibility.reason;
    }
    
    // If we have a reasons array, use the first reason
    if (eligibility.reasons && eligibility.reasons.length > 0) {
      return eligibility.reasons[0];
    }
    
    // Otherwise use a default message
    return "You are not currently eligible to boost your profile. Please try again later.";
  };

  return (
    <div className="space-y-4">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Not Eligible for Boost</AlertTitle>
        <AlertDescription>
          {getReasonMessage()}
        </AlertDescription>
      </Alert>

      {eligibility.nextEligibleTime && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Next Eligibility</AlertTitle>
          <AlertDescription>
            You will be eligible for a new boost in {eligibility.nextEligibleTime}
          </AlertDescription>
        </Alert>
      )}

      <Button onClick={onClose} className="w-full">
        Close
      </Button>
    </div>
  );
};

export default BoostEligibilityCheck;
