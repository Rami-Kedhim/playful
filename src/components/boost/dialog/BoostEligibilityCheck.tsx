
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { BoostEligibility } from "@/types/boost";

interface BoostEligibilityCheckProps {
  eligibility: BoostEligibility;
}

const BoostEligibilityCheck = ({ eligibility }: BoostEligibilityCheckProps) => {
  if (!eligibility) return null;
  
  if (eligibility.isEligible) {
    return (
      <Alert variant="default" className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900/50">
        <CheckCircle2 className="h-4 w-4 text-green-500" />
        <AlertTitle>Eligible for boost</AlertTitle>
        <AlertDescription>
          Your profile meets all requirements for boosting
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Not eligible for boost</AlertTitle>
      <AlertDescription>
        {eligibility.reason || "Your profile does not meet the requirements for boosting"}
        {eligibility.reasons && eligibility.reasons.length > 0 && (
          <ul className="list-disc pl-5 mt-2 space-y-1">
            {eligibility.reasons.map((reason, index) => (
              <li key={index} className="text-sm">{reason}</li>
            ))}
          </ul>
        )}
      </AlertDescription>
    </Alert>
  );
};

export default BoostEligibilityCheck;
