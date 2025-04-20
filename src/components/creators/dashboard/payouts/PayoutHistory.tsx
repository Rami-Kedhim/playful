
// Fix imports and typing for payouts to use CreatorPayout[] not ContentCreator[]

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreatorPayout } from "@/types/creator";
import PayoutHistoryList from "./PayoutHistoryList";
import PayoutHistoryLoading from "./components/PayoutHistoryLoading";
import EmptyPayoutsList from "./components/EmptyPayoutsList";
import PayoutsInProgress from "./components/PayoutsInProgress";

interface PayoutHistoryProps {
  payouts: CreatorPayout[];
  isLoading: boolean;
}

const PayoutHistory = ({ payouts, isLoading }: PayoutHistoryProps) => {
  // Filter completed payouts
  const completedPayouts = payouts.filter(payout => payout.status === 'completed');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payout History</CardTitle>
        <CardDescription>
          View your past and pending payout requests
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <PayoutHistoryLoading />
        ) : payouts.length === 0 ? (
          <EmptyPayoutsList />
        ) : (
          <div className="space-y-6">
            <PayoutsInProgress payouts={payouts} />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Completed Payouts</h3>
              {completedPayouts.length > 0 ? (
                <PayoutHistoryList
                  payouts={completedPayouts}
                  isLoading={false}
                />
              ) : (
                <p className="text-sm text-muted-foreground">No completed payouts yet.</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PayoutHistory;

