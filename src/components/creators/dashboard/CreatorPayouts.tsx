
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { CreditCard as CreditCardIcon } from "lucide-react";
import EarningsSummary from "./payouts/EarningsSummary";
import PayoutHistory from "./payouts/PayoutHistory";
import PayoutRequestForm from "./payouts/PayoutRequestForm";
import usePayouts from "./payouts/usePayouts";

interface CreatorPayoutsProps {
  creatorId: string;
}

const CreatorPayouts = ({ creatorId }: CreatorPayoutsProps) => {
  const {
    payouts,
    isLoading,
    dialogOpen,
    setDialogOpen,
    earnings,
    handlePayoutRequest
  } = usePayouts(creatorId);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Earnings & Payouts</h2>
        <Button onClick={() => setDialogOpen(true)}>
          <CreditCardIcon className="mr-2 h-4 w-4" />
          Request Payout
        </Button>
      </div>
      
      <EarningsSummary earnings={earnings} isLoading={isLoading} />
      
      <PayoutHistory payouts={payouts} isLoading={isLoading} />
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <PayoutRequestForm 
          earnings={earnings}
          onRequestPayout={handlePayoutRequest}
          onCancel={() => setDialogOpen(false)}
        />
      </Dialog>
    </div>
  );
};

export default CreatorPayouts;
