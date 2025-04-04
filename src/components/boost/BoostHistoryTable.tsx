
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatBoostDuration } from '@/utils/boostCalculator';
import { Loader2, History } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
  loading?: boolean;
}

const BoostHistoryTable = ({ history, loading = false }: BoostHistoryTableProps) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const isActive = (endDate: Date) => {
    return new Date() < endDate;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <History className="h-5 w-5 mr-2" />
          Boost History
        </CardTitle>
        <CardDescription>
          Your past and current boost purchases
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : history.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Package</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.boostPackage.name}</TableCell>
                  <TableCell>{formatDate(item.startDate)}</TableCell>
                  <TableCell>{formatDate(item.endDate)}</TableCell>
                  <TableCell>{formatBoostDuration(item.boostPackage.duration)}</TableCell>
                  <TableCell>{item.price} LC</TableCell>
                  <TableCell>
                    {isActive(item.endDate) ? (
                      <Badge variant="success" className="bg-green-500">Active</Badge>
                    ) : (
                      <Badge variant="outline">Expired</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No boost history found.</p>
            <p className="text-sm mt-1">Your past boost purchases will appear here.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BoostHistoryTable;
