
import { format } from "date-fns";
import PayoutStatusBadge from "./PayoutStatusBadge";
import PayoutMethodIcon from "./PayoutMethodIcon";
import { CreatorPayout } from "@/types/creator";

interface PayoutItemProps {
  payout: CreatorPayout;
}

/**
 * Component to display a single payout item in the history list
 */
const PayoutItem = ({ payout }: PayoutItemProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between p-4 border rounded-md">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
          <PayoutMethodIcon method={payout.payout_method} />
        </div>
        <div>
          <div className="font-medium capitalize">
            {payout.payout_method.replace('_', ' ')}
          </div>
          <div className="text-sm text-muted-foreground">
            {format(new Date(payout.created_at), "MMMM d, yyyy")}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:items-end mt-2 md:mt-0">
        <div className="font-bold">{payout.amount} LC</div>
        <div><PayoutStatusBadge status={payout.status} /></div>
      </div>
    </div>
  );
};

export default PayoutItem;
