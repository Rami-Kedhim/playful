
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Ban, CheckCircle } from "lucide-react";
import { BoostEligibility } from '@/types/boost';

interface BoostEligibilityCheckProps {
  eligibility: BoostEligibility;
}

const BoostEligibilityCheck: React.FC<BoostEligibilityCheckProps> = ({ eligibility }) => {
  if (eligibility.isEligible) {
    return (
      <Alert variant="default" className="bg-green-500/10 text-green-500 border-green-500/50">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Eligible for boost</AlertTitle>
        <AlertDescription className="text-green-500/90">
          Your profile meets all requirements to be boosted
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <Alert variant="destructive" className="bg-destructive/10 text-destructive">
      <Ban className="h-4 w-4" />
      <AlertTitle>Not eligible for boost</AlertTitle>
      <AlertDescription className="text-destructive/90">
        {eligibility.reason || "Your profile does not meet the requirements for boosting"}
      </AlertDescription>
    </Alert>
  );
};

export default BoostEligibilityCheck;
