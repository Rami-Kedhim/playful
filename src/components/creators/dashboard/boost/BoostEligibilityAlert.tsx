
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface BoostEligibilityAlertProps {
  eligible: boolean;
  reason?: string;
}

const BoostEligibilityAlert = ({ eligible, reason }: BoostEligibilityAlertProps) => {
  if (eligible) return null;
  
  return (
    <Alert variant="warning" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Not Eligible for Boosting</AlertTitle>
      <AlertDescription>
        {reason || "Your profile doesn't meet the requirements for boosting."}
      </AlertDescription>
    </Alert>
  );
};

export default BoostEligibilityAlert;
