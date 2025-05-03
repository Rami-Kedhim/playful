
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Wallet, CreditCard, Plus, History, ArrowUpRight } from 'lucide-react';
import { useAuth } from '@/hooks/auth';

// Mocked transaction data
const mockTransactions = [
  { id: '1', date: '2023-05-01', type: 'Deposit', amount: 100, status: 'Completed' },
  { id: '2', date: '2023-05-05', type: 'Transfer', amount: -50, status: 'Completed' },
  { id: '3', date: '2023-05-10', type: 'Purchase', amount: -30, status: 'Completed' },
  { id: '4', date: '2023-05-15', type: 'Deposit', amount: 200, status: 'Completed' },
];

const UpdatedWallet = () => {
  const [balance, setBalance] = useState(220);
  const [transactions, setTransactions] = useState(mockTransactions);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // In a real app, you would fetch the user's balance and transactions here
    if (user?.ubxBalance) {
      setBalance(user.ubxBalance);
    }
    // For demo purposes, we'll use the mock data
  }, [user]);

  const handleAddFunds = () => {
    // In a real app, this would navigate to a payment page
    console.log('Navigate to add funds page');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Wallet</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Current Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Wallet className="mr-2 h-5 w-5 text-primary" />
              <span className="text-2xl font-bold">{balance} UBX</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Add Funds</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-muted-foreground text-sm">Top up your wallet with UBX tokens</p>
          </CardContent>
          <CardFooter>
            <Button onClick={handleAddFunds} className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Add Funds
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Payment Methods</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-muted-foreground" />
              <span>Manage payment options</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <History className="mr-2 h-4 w-4" /> Payment Settings
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      <div className="bg-card rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold flex items-center">
            <History className="mr-2 h-5 w-5" /> Transaction History
          </h2>
        </div>
        
        <div className="p-6">
          <Table>
            <TableCaption>Your recent transactions</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.type}</TableCell>
                  <TableCell className={transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount} UBX
                  </TableCell>
                  <TableCell>{transaction.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default UpdatedWallet;
