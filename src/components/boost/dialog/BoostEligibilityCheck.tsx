
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import { BoostEligibility } from "@/types/boost";

interface BoostEligibilityCheckProps {
  eligibility: BoostEligibility;
  loading: boolean;
}

const BoostEligibilityCheck = ({ 
  eligibility, 
  loading 
}: BoostEligibilityCheckProps) => {
  if (loading) {
    return (
      <Alert className="flex items-center justify-center py-2">
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        <AlertTitle className="text-sm font-medium">Checking eligibility</AlertTitle>
      </Alert>
    );
  }
  
  if (!eligibility.isEligible) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Not eligible for boost</AlertTitle>
        <AlertDescription>
          {eligibility.reason || "Your profile doesn't meet the requirements for boosting."}
        </AlertDescription>
      </Alert>
    );
  }
  
  return (
    <Alert variant="default" className="bg-green-500/10 border-green-500/30 text-green-700 dark:text-green-300">
      <CheckCircle2 className="h-4 w-4" />
      <AlertTitle>Eligible for boost</AlertTitle>
      <AlertDescription>
        Your profile meets all requirements and can be boosted
      </AlertDescription>
    </Alert>
  );
};

export default BoostEligibilityCheck;
