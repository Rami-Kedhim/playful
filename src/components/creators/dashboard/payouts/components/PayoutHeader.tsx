
import { Button } from "@/components/ui/button";
import { CreditCard as CreditCardIcon } from "lucide-react";

interface PayoutHeaderProps {
  onRequestPayout: () => void;
}

const PayoutHeader = ({ onRequestPayout }: PayoutHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">Earnings & Payouts</h2>
      <Button onClick={onRequestPayout}>
        <CreditCardIcon className="mr-2 h-4 w-4" />
        Request Payout
      </Button>
    </div>
  );
};

export default PayoutHeader;
