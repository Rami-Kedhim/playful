
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatBoostDuration } from "@/utils/boostCalculator";
import { format } from "date-fns";
import { Loader2 } from "lucide-react";

interface BoostHistoryItem {
  id: string;
  startDate: Date;
  endDate: Date;
  boostPackage: {
    id: string;
    name: string;
    duration: string;
    price_lucoin: number;
  };
  price: number;
}

interface BoostHistoryTableProps {
  history: BoostHistoryItem[];
  loading: boolean;
}

const BoostHistoryTable = ({ history, loading }: BoostHistoryTableProps) => {
  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No boost history found.</p>
        <p className="text-sm text-muted-foreground mt-2">
          When you purchase boosts, they will appear here.
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableCaption>Your boost history</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Boost Package</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>End Date</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {history.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.boostPackage.name}</TableCell>
            <TableCell>{formatBoostDuration(item.boostPackage.duration)}</TableCell>
            <TableCell>{format(item.startDate, 'MMM d, yyyy')}</TableCell>
            <TableCell>{format(item.endDate, 'MMM d, yyyy')}</TableCell>
            <TableCell className="text-right">{item.price} LC</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BoostHistoryTable;
