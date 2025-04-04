
import { CreditCard, DollarSign, Bitcoin } from "lucide-react";

interface PayoutMethodIconProps {
  method: string;
}

/**
 * Component to display appropriate icon based on payout method
 */
const PayoutMethodIcon = ({ method }: PayoutMethodIconProps) => {
  switch (method) {
    case 'bank_transfer':
      return <CreditCard className="h-4 w-4" />;
    case 'paypal':
      return <DollarSign className="h-4 w-4" />;
    case 'crypto':
      return <Bitcoin className="h-4 w-4" />;
    default:
      return <CreditCard className="h-4 w-4" />;
  }
};

export default PayoutMethodIcon;
