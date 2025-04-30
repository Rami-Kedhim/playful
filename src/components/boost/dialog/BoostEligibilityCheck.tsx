
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { BoostEligibility } from "@/types/boost";
import { Button } from "@/components/ui/button";

interface BoostEligibilityCheckProps {
  eligibility: BoostEligibility;
  onClose: () => void;
}

const BoostEligibilityCheck = ({ eligibility, onClose }: BoostEligibilityCheckProps) => {
  if (!eligibility) return null;
  
  if (eligibility.eligible) {
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
    <div className="space-y-4">
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
      
      <Button variant="outline" className="w-full" onClick={onClose}>
        Close
      </Button>
    </div>
  );
};

export default BoostEligibilityCheck;
