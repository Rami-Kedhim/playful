
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle } from "lucide-react";

interface BoostEligibilityCheckProps {
  eligibility: {
    isEligible: boolean;
    reason?: string;
  };
}

const BoostEligibilityCheck: React.FC<BoostEligibilityCheckProps> = ({ eligibility }) => {
  if (eligibility.isEligible) {
    return (
      <Alert className="bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-900 dark:text-green-400 mb-4">
        <CheckCircle className="h-4 w-4" />
        <AlertTitle>Eligible for Boost</AlertTitle>
        <AlertDescription>Your profile can be boosted.</AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Not Eligible</AlertTitle>
      <AlertDescription>{eligibility.reason || "You're not eligible to boost at this time."}</AlertDescription>
    </Alert>
  );
};

export default BoostEligibilityCheck;
