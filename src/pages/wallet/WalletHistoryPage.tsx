
import React from 'react';
import { UnifiedLayout } from '@/layouts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const WalletHistoryPage = () => {
  // Sample transaction data
  const transactions = [
    {
      id: '1',
      date: '2025-05-01',
      type: 'Recharge',
      amount: 100,
      status: 'Completed'
    },
    {
      id: '2',
      date: '2025-05-02',
      type: 'Payment',
      amount: -50,
      status: 'Completed'
    },
    {
      id: '3',
      date: '2025-05-04',
      type: 'Boost',
      amount: -25,
      status: 'Completed'
    }
  ];

  return (
    <UnifiedLayout
      title="Transaction History"
      description="View your wallet transaction history"
      showBreadcrumbs
    >
      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount (UBX)</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell className={transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}>
                    {transaction.amount > 0 ? `+${transaction.amount}` : transaction.amount}
                  </TableCell>
                  <TableCell>{transaction.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </UnifiedLayout>
  );
};

export default WalletHistoryPage;
