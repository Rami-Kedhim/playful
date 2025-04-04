
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import usePayouts from "./payouts/usePayouts";
import EarningsSummary from "./payouts/EarningsSummary";
import PayoutHistory from "./payouts/PayoutHistory";
import PayoutRequestManager from "./payouts/components/PayoutRequestManager";

interface CreatorPayoutsProps {
  creatorId: string;
}

const CreatorPayouts = ({ creatorId }: CreatorPayoutsProps) => {
  const {
    payouts,
    isLoading,
    earnings,
    handlePayoutRequest,
    isSubmitting
  } = usePayouts(creatorId);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Earnings & Payouts</h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Earnings Summary Card */}
        <EarningsSummary 
          earnings={{
            total: earnings.total,
            pending: earnings.pending,
            available: earnings.available
          }}
          isLoading={isLoading}
        />
        
        {/* Payout Request Card */}
        <Card>
          <CardHeader>
            <CardTitle>Request Payout</CardTitle>
            <CardDescription>
              Withdraw your earnings to your preferred payment method
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PayoutRequestManager
              availableAmount={earnings.available}
              onRequestPayout={handlePayoutRequest}
              isSubmitting={isSubmitting}
            />
          </CardContent>
        </Card>
      </div>
      
      {/* Payout History Section */}
      <PayoutHistory payouts={payouts} isLoading={isLoading} />
    </div>
  );
};

export default CreatorPayouts;
