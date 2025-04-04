
import { BoostPackage } from "@/types/boost";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatBoostDuration } from "@/utils/boostCalculator";
import { History, Zap } from "lucide-react";

interface BoostHistory {
  id: string;
  startDate: Date;
  endDate: Date;
  boostPackage: BoostPackage;
  price: number;
}

interface BoostHistoryTableProps {
  history: BoostHistory[];
  loading: boolean;
}

const BoostHistoryTable = ({ history, loading }: BoostHistoryTableProps) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <History className="h-5 w-5 mr-2" />
            Boost History
          </CardTitle>
          <CardDescription>
            Loading your past profile boosts...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <div className="animate-pulse">Loading...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (history.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <History className="h-5 w-5 mr-2" />
            Boost History
          </CardTitle>
          <CardDescription>
            View your past profile boost purchases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex flex-col items-center justify-center text-center">
            <Zap className="h-12 w-12 mb-4 opacity-20" />
            <p className="text-muted-foreground">No boost history found</p>
            <p className="text-sm text-muted-foreground mt-2">
              Your boost history will appear here once you have purchased and used boosts
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <History className="h-5 w-5 mr-2" />
          Boost History
        </CardTitle>
        <CardDescription>
          Record of your past profile boost purchases
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Boost Type</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center">
                    <Badge variant="outline" className="mr-2">
                      {item.boostPackage.name}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  {item.startDate.toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell>
                  {item.endDate.toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell>{formatBoostDuration(item.boostPackage.duration)}</TableCell>
                <TableCell className="text-right font-medium">{item.price} LC</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default BoostHistoryTable;
