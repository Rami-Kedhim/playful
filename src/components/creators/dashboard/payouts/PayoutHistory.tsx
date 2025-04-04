
import { useState } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreatorPayout } from "@/types/creator";
import PayoutHistoryList from "./PayoutHistoryList";

interface PayoutHistoryProps {
  payouts: CreatorPayout[];
  isLoading: boolean;
}

const PayoutHistory = ({ payouts, isLoading }: PayoutHistoryProps) => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  
  const filteredPayouts = statusFilter === "all" 
    ? payouts 
    : payouts.filter(payout => payout.status === statusFilter);
    
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Payout History</CardTitle>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <PayoutHistoryList 
          payouts={filteredPayouts} 
          isLoading={isLoading} 
        />
      </CardContent>
    </Card>
  );
};

export default PayoutHistory;
