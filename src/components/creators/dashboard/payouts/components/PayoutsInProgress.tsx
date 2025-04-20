
import { CreatorPayout } from "@/types/creator";

interface PayoutsInProgressProps {
  payouts: CreatorPayout[];
}

const PayoutsInProgress = ({ payouts }: PayoutsInProgressProps) => {
  // Display payouts with status not 'completed'
  const inProgress = payouts.filter(payout => payout.status !== 'completed');

  return (
    <div className="space-y-4">
      {inProgress.map(payout => (
        <div key={payout.id} className="p-4 border rounded bg-yellow-50">
          <div>Amount: {payout.amount || "N/A"}</div>
          <div>Status: {payout.status || "N/A"}</div>
        </div>
      ))}
    </div>
  );
};

export default PayoutsInProgress;
