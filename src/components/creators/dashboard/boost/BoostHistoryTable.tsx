
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDistance, format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Zap, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface BoostHistoryItem {
  id: string;
  packageId: string;
  packageName: string;
  startDate: Date;
  endDate: Date;
  price: number;
  status: 'active' | 'completed' | 'cancelled' | 'pending';
  boostPower?: number;
}

interface BoostHistoryTableProps {
  history: BoostHistoryItem[];
  loading?: boolean;
  formatDuration?: (duration: string) => string;
}

const BoostHistoryTable: React.FC<BoostHistoryTableProps> = ({ 
  history, 
  loading = false,
  formatDuration = (d) => d
}) => {
  
  // Get formatted status badge
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return (
          <Badge variant="default" className="bg-green-500">
            <Clock className="h-3 w-3 mr-1" />
            Active
          </Badge>
        );
      case 'completed':
        return (
          <Badge variant="secondary">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        );
      case 'cancelled':
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Cancelled
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      default:
        return null;
    }
  };

  // Calculate duration between dates in a human-readable format
  const getDuration = (start: Date, end: Date) => {
    try {
      // Calculate the difference in milliseconds
      const diffMs = end.getTime() - start.getTime();

      // Convert to hours and minutes
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      
      if (hours < 24) {
        return `${hours} hours`;
      } else {
        const days = Math.floor(hours / 24);
        return `${days} day${days !== 1 ? 's' : ''}`;
      }
    } catch (e) {
      console.error("Error calculating duration:", e);
      return "Invalid duration";
    }
  };

  if (loading) {
    return <div className="h-40 flex items-center justify-center">Loading boost history...</div>
  }

  if (!history || history.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Zap className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
        <p>No boost history available</p>
        <p className="text-sm">Purchase a boost to increase your visibility</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Boost Package</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium flex items-center">
                <Zap className="h-4 w-4 mr-2 text-amber-500" />
                {item.packageName}
              </TableCell>
              <TableCell>
                {format(new Date(item.startDate), 'MMM d, yyyy')}
                <div className="text-xs text-muted-foreground">
                  {formatDistance(new Date(item.startDate), new Date(), { addSuffix: true })}
                </div>
              </TableCell>
              <TableCell>
                {formatDuration(getDuration(new Date(item.startDate), new Date(item.endDate)))}
              </TableCell>
              <TableCell>{item.price} UBX</TableCell>
              <TableCell>{getStatusBadge(item.status)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BoostHistoryTable;
