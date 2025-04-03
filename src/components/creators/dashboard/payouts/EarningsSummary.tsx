
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, Clock, ArrowDownCircle } from "lucide-react";

interface EarningsSummaryProps {
  earnings: {
    total: number;
    pending: number;
    available: number;
  };
  isLoading: boolean;
}

const EarningsSummary = ({ earnings, isLoading }: EarningsSummaryProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-20 mb-1" />
              <Skeleton className="h-4 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
            Total Earnings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{earnings.total.toFixed(2)} LC</div>
          <p className="text-xs text-muted-foreground">
            Lifetime earnings from content
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
            Pending Payouts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{earnings.pending.toFixed(2)} LC</div>
          <p className="text-xs text-muted-foreground">
            Amount being processed for payout
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <ArrowDownCircle className="mr-1 h-4 w-4 text-muted-foreground" />
            Available to Withdraw
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{earnings.available.toFixed(2)} LC</div>
          <p className="text-xs text-muted-foreground">
            Amount you can request for payout
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EarningsSummary;
