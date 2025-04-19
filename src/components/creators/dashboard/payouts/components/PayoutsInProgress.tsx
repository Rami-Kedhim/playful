import { ContentCreator } from "@/types/creator";

interface PayoutsInProgressProps {
  payouts: ContentCreator[]; // fallback type
}

const PayoutsInProgress = ({ payouts }: PayoutsInProgressProps) => {
  // Display payouts with status not completed
  const inProgress = payouts.filter((payout) => (payout as any).status !== 'completed');

  return (
    <div className="space-y-4">
      {inProgress.map((payout) => (
        <div key={(payout as any).id} className="p-4 border rounded bg-yellow-50">
          <div>Amount: {(payout as any).amount || "N/A"}</div>
          <div>Status: {(payout as any).status || "N/A"}</div>
        </div>
      ))}
    </div>
  );
};

export default PayoutsInProgress;
