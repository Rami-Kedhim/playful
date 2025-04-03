
import { useState } from "react";
import { format } from "date-fns";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Info, CreditCard, DollarSign } from "lucide-react";
import { CreatorPayout } from "@/types/creator";

interface PayoutHistoryListProps {
  payouts: CreatorPayout[];
  isLoading: boolean;
}

const PayoutHistoryList = ({ payouts, isLoading }: PayoutHistoryListProps) => {
  const getPayoutStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPayoutMethodIcon = (method: string) => {
    switch (method) {
      case 'bank_transfer':
        return <CreditCard className="h-4 w-4" />;
      case 'paypal':
        return <DollarSign className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex justify-between p-4 border rounded-md">
            <div className="h-6 w-1/4 bg-muted animate-pulse rounded"></div>
            <div className="h-6 w-1/6 bg-muted animate-pulse rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (payouts.length === 0) {
    return (
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>No payouts yet</AlertTitle>
        <AlertDescription>
          You haven't requested any payouts yet. Once you have earnings, you can request a payout.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {payouts.map((payout) => (
        <div key={payout.id} className="flex flex-col md:flex-row justify-between p-4 border rounded-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              {getPayoutMethodIcon(payout.payout_method)}
            </div>
            <div>
              <div className="font-medium">
                Payout via {payout.payout_method.replace('_', ' ')}
              </div>
              <div className="text-sm text-muted-foreground">
                {format(new Date(payout.created_at), "MMMM d, yyyy")}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:items-end mt-2 md:mt-0">
            <div className="font-bold">${parseFloat(payout.amount).toFixed(2)}</div>
            <div>{getPayoutStatusBadge(payout.status)}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PayoutHistoryList;
