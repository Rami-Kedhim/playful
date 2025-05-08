
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTitle } from '@/hooks/useTitle';
import { useAuth } from '@/hooks/auth/useAuth';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout';
import { Loader2, Plus, ArrowDownUp, CreditCard, Wallet, History, TrendingUp, ExternalLink } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'purchase' | 'spend' | 'receive' | 'withdraw';
  amount: number;
  description: string;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
}

const WalletPage: React.FC = () => {
  useTitle('Wallet | UberEscorts');
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [balance, setBalance] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [purchaseAmount, setPurchaseAmount] = useState<number>(100);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth', { replace: true });
      return;
    }
    
    // Simulate fetching wallet data
    const fetchWalletData = async () => {
      try {
        setIsLoading(true);
        // In a real app, this would be an API call to fetch the user's wallet data
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data
        setBalance(1250);
        setTransactions([
          {
            id: 'tx-1',
            type: 'purchase',
            amount: 500,
            description: 'UBX Token Purchase',
            date: new Date(Date.now() - 86400000 * 2), // 2 days ago
            status: 'completed'
          },
          {
            id: 'tx-2',
            type: 'spend',
            amount: -50,
            description: 'Profile Boost',
            date: new Date(Date.now() - 86400000), // 1 day ago
            status: 'completed'
          },
          {
            id: 'tx-3',
            type: 'receive',
            amount: 100,
            description: 'Creator Tip Received',
            date: new Date(Date.now() - 43200000), // 12 hours ago
            status: 'completed'
          },
          {
            id: 'tx-4',
            type: 'withdraw',
            amount: -300,
            description: 'Withdrawal to Bank Account',
            date: new Date(Date.now() - 3600000), // 1 hour ago
            status: 'pending'
          }
        ]);
      } catch (error) {
        console.error('Error fetching wallet data:', error);
        toast({
          variant: "destructive",
          title: "Failed to load wallet data",
          description: "Please try again later."
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchWalletData();
  }, [isAuthenticated, navigate, toast]);
  
  const handlePurchaseUbx = async () => {
    if (purchaseAmount <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid amount",
        description: "Please enter a positive amount."
      });
      return;
    }
    
    try {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update balance
      setBalance(prevBalance => prevBalance + purchaseAmount);
      
      // Add transaction
      const newTransaction: Transaction = {
        id: `tx-${Date.now()}`,
        type: 'purchase',
        amount: purchaseAmount,
        description: 'UBX Token Purchase',
        date: new Date(),
        status: 'completed'
      };
      
      setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);
      
      toast({
        title: "Purchase Successful",
        description: `You purchased ${purchaseAmount} UBX tokens.`
      });
      
      // Reset purchase amount
      setPurchaseAmount(100);
    } catch (error) {
      console.error('Error purchasing UBX tokens:', error);
      toast({
        variant: "destructive",
        title: "Purchase Failed",
        description: "An error occurred while processing your purchase."
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isLoading && transactions.length === 0) {
    return (
      <AppLayout title="Wallet">
        <div className="flex justify-center items-center h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AppLayout>
    );
  }
  
  return (
    <AppLayout title="Wallet" requireAuth>
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">UBX Wallet</CardTitle>
                <CardDescription>Manage your UBX tokens</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-4xl font-bold mb-2">
                  {balance.toLocaleString()} <span className="text-sm font-normal text-muted-foreground">UBX</span>
                </div>
                <p className="text-muted-foreground mb-6">Approximate value: ${(balance * 0.10).toFixed(2)} USD</p>
                
                <div className="flex flex-wrap gap-3">
                  <Button className="flex gap-2">
                    <Plus size={16} />
                    Add Funds
                  </Button>
                  <Button variant="outline" className="flex gap-2">
                    <ArrowDownUp size={16} />
                    Transfer
                  </Button>
                  <Button variant="outline" className="flex gap-2">
                    <ExternalLink size={16} />
                    Withdraw
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                {transactions.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No transactions yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {transactions.map(transaction => (
                      <div key={transaction.id} className="flex justify-between items-center border-b pb-3">
                        <div className="flex gap-3">
                          {transaction.type === 'purchase' && <CreditCard className="h-5 w-5 text-blue-500" />}
                          {transaction.type === 'spend' && <Wallet className="h-5 w-5 text-red-500" />}
                          {transaction.type === 'receive' && <TrendingUp className="h-5 w-5 text-green-500" />}
                          {transaction.type === 'withdraw' && <ArrowDownUp className="h-5 w-5 text-amber-500" />}
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-sm text-muted-foreground">
                              {transaction.date.toLocaleDateString()} {transaction.date.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {transaction.amount >= 0 ? '+' : ''}{transaction.amount} UBX
                          </p>
                          <p className="text-xs">
                            {transaction.status === 'completed' && <span className="text-green-600">Completed</span>}
                            {transaction.status === 'pending' && <span className="text-amber-600">Pending</span>}
                            {transaction.status === 'failed' && <span className="text-red-600">Failed</span>}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Purchase UBX Tokens</CardTitle>
                <CardDescription>Add funds to your wallet</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="ubx">
                  <TabsList className="mb-4 w-full">
                    <TabsTrigger value="ubx" className="flex-1">Buy UBX</TabsTrigger>
                    <TabsTrigger value="packages" className="flex-1">Packages</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="ubx">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount">Amount (UBX)</Label>
                        <Input 
                          id="amount" 
                          type="number" 
                          value={purchaseAmount} 
                          onChange={(e) => setPurchaseAmount(Number(e.target.value))}
                          min="1"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Cost: ${(purchaseAmount * 0.10).toFixed(2)} USD
                      </p>
                      <Button onClick={handlePurchaseUbx} className="w-full">
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>Purchase</>
                        )}
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="packages">
                    <div className="space-y-3">
                      <div className="border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Starter Package</p>
                            <p className="text-sm text-muted-foreground">100 UBX Tokens</p>
                          </div>
                          <p className="font-medium">$9.99</p>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Standard Package</p>
                            <p className="text-sm text-muted-foreground">500 UBX Tokens</p>
                          </div>
                          <p className="font-medium">$45.99</p>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-3 cursor-pointer hover:bg-muted/50 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-primary text-white text-xs px-2 py-1">
                          BEST VALUE
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Premium Package</p>
                            <p className="text-sm text-muted-foreground">1200 UBX Tokens</p>
                          </div>
                          <p className="font-medium">$99.99</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex-col">
                <p className="text-xs text-muted-foreground">
                  UBX tokens are used for all transactions within the UberEscorts platform, including
                  tipping creators, booking services, and purchasing premium content.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default WalletPage;
