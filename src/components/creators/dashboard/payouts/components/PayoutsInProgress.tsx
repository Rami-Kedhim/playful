
import { Clock } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CreatorPayout } from "@/types/creator";
import PayoutItem from "./PayoutItem";

interface PayoutsInProgressProps {
  payouts: CreatorPayout[];
}

const PayoutsInProgress = ({ payouts }: PayoutsInProgressProps) => {
  // Filter only processing or pending payouts
  const inProgressPayouts = payouts.filter(
    payout => payout.status === 'processing' || payout.status === 'pending'
  );

  if (inProgressPayouts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <Alert variant="warning" className="mb-4">
        <Clock className="h-4 w-4" />
        <AlertTitle>Payouts In Progress</AlertTitle>
        <AlertDescription>
          These payouts are currently being processed. They typically take 3-5 business days to complete.
        </AlertDescription>
      </Alert>

      <div className="space-y-2">
        {inProgressPayouts.map((payout) => (
          <PayoutItem key={payout.id} payout={payout} />
        ))}
      </div>
    </div>
  );
};

export default PayoutsInProgress;
