
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { uberWallet, UbxTransaction } from '@/core/UberWallet';
import { useAuth } from '@/hooks/auth';

const UpdatedWalletPage: React.FC = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const userId = user?.id || 'anonymous';
  
  const [transactions, setTransactions] = useState<UbxTransaction[]>([]);
  const [balance, setBalance] = useState({
    available: 0,
    pending: 0,
    reserved: 0,
    total: 0
  });

  const loadData = async () => {
    try {
      // Get balance
      if (userId) {
        const balanceAmount = await uberWallet.getBalance(userId);
        
        // Create a structured balance object
        setBalance({
          available: balanceAmount * 0.8,
          pending: balanceAmount * 0.1,
          reserved: balanceAmount * 0.1,
          total: balanceAmount
        });
        
        // Get transaction history
        const history = await uberWallet.getTransactionHistory(userId);
        setTransactions(history);
      }
    } catch (error) {
      console.error('Error loading wallet data:', error);
    }
  };

  const handleAddFunds = async () => {
    try {
      // In a real app, this would open a payment flow
      // For demo, just add 100 UBX
      const amount = 100;
      
      const result = await uberWallet.purchaseUbx(userId, amount);
      
      if (result.success) {
        // Update balance (in a real app, we would fetch the new balance)
        const newTotal = balance.total + amount;
        setBalance({
          available: newTotal * 0.8,
          pending: newTotal * 0.1,
          reserved: newTotal * 0.1,
          total: newTotal
        });
        
        // Refresh transaction history
        const history = await uberWallet.getTransactionHistory(userId);
        setTransactions(history);
      }
    } catch (error) {
      console.error('Error adding funds:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, [userId]);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Check for boosted status with fallbacks
  const isBoostedProfile = profile?.isBoosted || profile?.is_boosted;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Wallet</h1>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{balance.total} UBX</div>
            <div className="text-sm text-muted-foreground mt-2">
              Available: {balance.available.toFixed(2)} UBX
            </div>
            
            <Button className="mt-4" onClick={handleAddFunds}>
              Add Funds
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <p className="text-muted-foreground">No transactions yet</p>
            ) : (
              <Table>
                <TableCaption>A history of your recent transactions</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell className="font-medium">{tx.description || tx.transactionType}</TableCell>
                      <TableCell>{new Date(tx.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className={tx.amount > 0 ? 'text-green-500' : ''}>
                        {tx.amount > 0 ? '+' : ''}{tx.amount} UBX
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UpdatedWalletPage;
