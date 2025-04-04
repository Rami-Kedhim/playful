
import { useState } from "react";
import EarningsSummary from "./payouts/EarningsSummary";
import PayoutHistory from "./payouts/PayoutHistory";
import PayoutDialogWrapper from "./payouts/PayoutDialogWrapper";
import PayoutHeader from "./payouts/components/PayoutHeader";
import usePayouts from "./payouts/usePayouts";

interface CreatorPayoutsProps {
  creatorId: string;
}

const CreatorPayouts = ({ creatorId }: CreatorPayoutsProps) => {
  const {
    payouts,
    isLoading,
    earnings,
    handlePayoutRequest
  } = usePayouts(creatorId);
  
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <PayoutHeader onRequestPayout={() => setDialogOpen(true)} />
      
      <EarningsSummary earnings={earnings} isLoading={isLoading} />
      
      <PayoutHistory payouts={payouts} isLoading={isLoading} />
      
      <PayoutDialogWrapper 
        isOpen={dialogOpen}
        onOpenChange={setDialogOpen}
        earnings={earnings}
        onRequestPayout={handlePayoutRequest}
      />
    </div>
  );
};

export default CreatorPayouts;
