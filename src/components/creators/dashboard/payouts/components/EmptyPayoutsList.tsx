
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

/**
 * Component to display when there are no payouts
 */
const EmptyPayoutsList = () => {
  return (
    <Alert>
      <Info className="h-4 w-4" />
      <AlertTitle>No payouts yet</AlertTitle>
      <AlertDescription>
        You haven't requested any payouts yet. Once you have earnings, you can request a payout.
      </AlertDescription>
    </Alert>
  );
};

export default EmptyPayoutsList;
