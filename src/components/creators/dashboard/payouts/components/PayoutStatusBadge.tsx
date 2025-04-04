
import { Badge } from "@/components/ui/badge";

interface PayoutStatusBadgeProps {
  status: string;
}

/**
 * Component to display payout status as a badge with appropriate styling
 */
const PayoutStatusBadge = ({ status }: PayoutStatusBadgeProps) => {
  switch (status) {
    case 'completed':
      return <Badge variant="default">Completed</Badge>;
    case 'pending':
      return <Badge variant="outline">Pending</Badge>;
    case 'processing':
      return <Badge variant="secondary">Processing</Badge>;
    case 'failed':
      return <Badge variant="destructive">Failed</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export default PayoutStatusBadge;
