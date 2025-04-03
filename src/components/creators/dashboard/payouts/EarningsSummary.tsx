
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DollarSign, CreditCard, Clock, Calendar, 
  ArrowUpRight, TrendingUp
} from "lucide-react";

interface EarningsSummaryProps {
  earnings: {
    total: number;
    available: number;
    pending: number;
    thisMonth: number;
  };
  isLoading: boolean;
}

const EarningsSummary = ({ earnings, isLoading }: EarningsSummaryProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="h-4 w-1/2 bg-muted animate-pulse rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-1/3 bg-muted animate-pulse rounded mb-2"></div>
              <div className="h-4 w-1/4 bg-muted animate-pulse rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
            <DollarSign className="h-4 w-4 mr-1" />
            Total Earnings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${earnings.total.toFixed(2)}</div>
          <div className="flex items-center text-xs text-green-500">
            <ArrowUpRight className="h-3 w-3 mr-1" />
            <span>+12% from last month</span>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
            <DollarSign className="h-4 w-4 mr-1" />
            Available Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${earnings.available.toFixed(2)}</div>
          <div className="text-xs text-muted-foreground">
            Available for withdrawal
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            Pending Earnings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${earnings.pending.toFixed(2)}</div>
          <div className="text-xs text-muted-foreground">
            Processing (1-3 days)
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            This Month
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${earnings.thisMonth.toFixed(2)}</div>
          <div className="flex items-center text-xs text-green-500">
            <TrendingUp className="h-3 w-3 mr-1" />
            <span>+8% from last month</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EarningsSummary;
