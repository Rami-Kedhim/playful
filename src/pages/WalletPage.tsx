
import React, { useEffect, useState } from 'react';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { uberWallet, UbxTransaction } from '@/core/UberWallet';
import { useAuth } from '@/hooks/auth';

const WalletPage: React.FC = () => {
  const { user } = useAuth();
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

  return (
    <Container>
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
              <div className="space-y-4">
                {transactions.map((tx) => (
                  <div key={tx.id} className="flex justify-between items-center border-b pb-2">
                    <div>
                      <div className="font-medium">{tx.description || tx.transactionType}</div>
                      <div className="text-sm text-muted-foreground">
                        {new Date(tx.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <div className={tx.amount > 0 ? 'text-green-500' : ''}>
                      {tx.amount > 0 ? '+' : ''}{tx.amount} UBX
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};

export default WalletPage;
