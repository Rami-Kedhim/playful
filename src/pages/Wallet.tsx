
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UberWallet, UbxTransaction } from '@/core/UberWallet';

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<UbxTransaction[]>([]);
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Create an instance of UberWallet
  const uberWallet = new UberWallet();
  
  // Fetch wallet data on component mount
  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        // Get balance
        const walletBalance = uberWallet.getBalance();
        setBalance(walletBalance);
        
        // Get transactions
        const walletTransactions = await uberWallet.getTransactions();
        setTransactions(walletTransactions);
      } catch (err: any) {
        console.error('Error fetching wallet data:', err);
        setError(err.message || 'Failed to load wallet data');
      }
    };
    
    fetchWalletData();
  }, []);
  
  // Handle adding funds
  const handleAddFunds = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Add funds to wallet
      const success = await uberWallet.addFunds(Number(amount));
      
      if (success) {
        // Update balance
        const updatedBalance = uberWallet.getBalance();
        setBalance(updatedBalance);
        
        // Update transactions
        const updatedTransactions = await uberWallet.getTransactions();
        setTransactions(updatedTransactions);
        
        // Reset amount
        setAmount('');
      }
    } catch (err: any) {
      console.error('Error adding funds:', err);
      setError(err.message || 'Failed to add funds');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle purchasing UBX
  const handlePurchaseUbx = async () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError('Please enter a valid amount');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Purchase UBX
      const result = await uberWallet.purchaseUbx('user-123', Number(amount));
      
      if (result.success) {
        // Update balance
        const updatedBalance = uberWallet.getBalance();
        setBalance(updatedBalance);
        
        // Update transactions
        const updatedTransactions = await uberWallet.getTransactions();
        setTransactions(updatedTransactions);
        
        // Reset amount
        setAmount('');
      }
    } catch (err: any) {
      console.error('Error purchasing UBX:', err);
      setError(err.message || 'Failed to purchase UBX');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">UBX Wallet</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline">
              <span className="text-4xl font-bold">{balance.toLocaleString()}</span>
              <span className="ml-2 text-muted-foreground">UBX</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Equivalent to approximately ${(balance * 0.1).toFixed(2)} USD
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start" onClick={() => setAmount('100')}>
                + 100 UBX
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => setAmount('500')}>
                + 500 UBX
              </Button>
              <Button variant="outline" className="w-full justify-start" onClick={() => setAmount('1000')}>
                + 1000 UBX
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Add Funds</CardTitle>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="bg-red-50 text-red-800 p-3 rounded-md mb-4 text-sm">
                  {error}
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium mb-1">
                    Amount (UBX)
                  </label>
                  <Input
                    id="amount"
                    type="number"
                    min="1"
                    step="1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>
                
                <Button
                  className="w-full"
                  onClick={handleAddFunds}
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : 'Add Funds'}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Boost Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-6">
                <div className="text-muted-foreground mb-4">
                  You currently don't have any active boosts
                </div>
                <Button>Boost Profile</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="in">In</TabsTrigger>
                  <TabsTrigger value="out">Out</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all">
                  <TransactionList transactions={transactions} />
                </TabsContent>
                
                <TabsContent value="in">
                  <TransactionList transactions={transactions.filter(t => t.type === 'purchase')} />
                </TabsContent>
                
                <TabsContent value="out">
                  <TransactionList transactions={transactions.filter(t => t.type === 'spend')} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

interface TransactionListProps {
  transactions: UbxTransaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No transactions found
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between p-3 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              transaction.type === 'purchase' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
            }`}>
              {transaction.type === 'purchase' ? '+' : '-'}
            </div>
            
            <div>
              <div className="font-medium">{transaction.description}</div>
              <div className="text-sm text-muted-foreground">
                {transaction.transactionType || transaction.type} • {
                  (transaction.createdAt ? new Date(transaction.createdAt) : transaction.timestamp).toLocaleDateString()
                }
              </div>
            </div>
          </div>
          
          <div className={`font-medium ${
            transaction.type === 'purchase' ? 'text-green-600' : 'text-red-600'
          }`}>
            {transaction.type === 'purchase' ? '+' : '-'}{transaction.amount} UBX
          </div>
        </div>
      ))}
    </div>
  );
};

export default Wallet;
