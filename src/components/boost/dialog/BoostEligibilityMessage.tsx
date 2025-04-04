
import { Zap } from "lucide-react";

interface BoostEligibilityMessageProps {
  reason?: string;
}

const BoostEligibilityMessage = ({ reason }: BoostEligibilityMessageProps) => {
  return (
    <div className="text-center py-8">
      <div className="mb-4">
        <Zap className="h-12 w-12 mx-auto text-destructive opacity-50" />
      </div>
      <h3 className="text-lg font-medium mb-2">Not Eligible for Boosting</h3>
      <p className="text-muted-foreground mb-4">
        {reason || "Your profile is not eligible for boosting at this time."}
      </p>
    </div>
  );
};

export default BoostEligibilityMessage;
