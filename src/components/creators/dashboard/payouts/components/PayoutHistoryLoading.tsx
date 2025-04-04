
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Loading state for payout history list
 */
const PayoutHistoryLoading = () => {
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
};

export default PayoutHistoryLoading;
