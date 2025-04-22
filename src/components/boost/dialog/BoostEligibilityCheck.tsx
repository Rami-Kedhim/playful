
import React from "react";
import { BoostEligibility } from "@/types/boost";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface BoostEligibilityCheckProps {
  eligibility: BoostEligibility;
  children: React.ReactNode;
}

const BoostEligibilityCheck: React.FC<BoostEligibilityCheckProps> = ({
  eligibility,
  children,
}) => {
  if (eligibility.isEligible) {
    return <>{children}</>;
  }

  return (
    <div className="space-y-6">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Not Eligible for Boosting</AlertTitle>
        <AlertDescription>
          {eligibility.reason || "Your profile doesn't meet the requirements for boosting."}
        </AlertDescription>
      </Alert>
      {children}
    </div>
  );
};

export default BoostEligibilityCheck;
