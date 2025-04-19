
// fix imports issue same as above
import { ContentCreator } from "@/types/creator";
import PayoutHistoryLoading from "./components/PayoutHistoryLoading";
import EmptyPayoutsList from "./components/EmptyPayoutsList";
import PayoutItem from "./components/PayoutItem";

interface PayoutHistoryListProps {
  payouts: ContentCreator[]; // fallback type
  isLoading: boolean;
}

/**
 * Component to display a list of payout history items
 */
const PayoutHistoryList = ({ payouts, isLoading }: PayoutHistoryListProps) => {
  if (isLoading) {
    return <PayoutHistoryLoading />;
  }

  if (payouts.length === 0) {
    return <EmptyPayoutsList />;
  }

  return (
    <div className="space-y-4">
      {payouts.map((payout) => (
        <PayoutItem key={(payout as any).id} payout={payout} />
      ))}
    </div>
  );
};

export default PayoutHistoryList;

