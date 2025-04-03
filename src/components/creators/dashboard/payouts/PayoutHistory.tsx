
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import PayoutHistoryList from "./PayoutHistoryList";
import { CreatorPayout } from "@/types/creator";

interface PayoutHistoryProps {
  payouts: CreatorPayout[];
  isLoading: boolean;
}

const PayoutHistory = ({ payouts, isLoading }: PayoutHistoryProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payout History</CardTitle>
        <CardDescription>Track all your payout requests and their status</CardDescription>
      </CardHeader>
      <CardContent>
        <PayoutHistoryList payouts={payouts} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
};

export default PayoutHistory;
