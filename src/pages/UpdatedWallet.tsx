
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ArrowUpRightFromCircle, 
  ArrowDownLeftFromCircle, 
  Plus, 
  CreditCard, 
  Wallet, 
  History,
  BarChart
} from 'lucide-react';
import { uberWallet, UbxTransaction } from '@/core/UberWallet';

const UpdatedWallet = () => {
  const [balance, setBalance] = useState<number>(1000);
  const [transactions, setTransactions] = useState<UbxTransaction[]>([]);

  React.useEffect(() => {
    const fetchWalletData = async () => {
      try {
        // Fetch the user's balance
        const userBalance = await uberWallet.getBalance('current-user');
        setBalance(userBalance);
        
        // Fetch transaction history
        const txHistory = await uberWallet.getTransactionHistory('current-user');
        setTransactions(txHistory);
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      }
    };
    
    fetchWalletData();
  }, []);

  return (
    <MainLayout
      title="UBX Wallet"
      description="Manage your UBX balance and transactions"
      showBreadcrumbs
    >
      <div className="py-6">
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-primary/90 to-primary">
            <CardContent className="p-6 text-white">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Wallet className="h-6 w-6 mr-2" />
                  <span className="text-xl font-semibold">UBX Wallet</span>
                </div>
                <span className="text-sm opacity-80">Secure • Anonymous</span>
              </div>
              <div>
                <div className="text-sm opacity-80 mb-1">Available Balance</div>
                <div className="text-3xl font-bold">{balance.toLocaleString()} UBX</div>
              </div>
              <div className="flex gap-3 mt-6">
                <Button size="sm" variant="secondary" className="flex-1">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Funds
                </Button>
                <Button size="sm" variant="secondary" className="flex-1">
                  <ArrowUpRightFromCircle className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="transactions" className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="transactions">
              <History className="h-4 w-4 mr-2" />
              Transactions
            </TabsTrigger>
            <TabsTrigger value="payment-methods">
              <CreditCard className="h-4 w-4 mr-2" />
              Payment Methods
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>View your recent UBX transactions</CardDescription>
              </CardHeader>
              <CardContent>
                {transactions.length > 0 ? (
                  <div className="space-y-4">
                    {transactions.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center">
                          {tx.amount > 0 ? (
                            <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                              <ArrowDownLeftFromCircle className="h-5 w-5 text-green-600" />
                            </div>
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                              <ArrowUpRightFromCircle className="h-5 w-5 text-blue-600" />
                            </div>
                          )}
                          <div>
                            <div className="font-medium">{tx.transactionType}</div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(tx.createdAt).toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <div className={`font-semibold ${tx.amount > 0 ? 'text-green-600' : 'text-blue-600'}`}>
                          {tx.amount > 0 ? '+' : ''}{tx.amount} UBX
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No transactions to display
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="payment-methods">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Manage your payment methods for adding funds</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Visa •••• 4242</div>
                        <div className="text-xs text-muted-foreground">
                          Expires 12/25
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                  
                  <Button className="w-full" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Spending Analytics</CardTitle>
                <CardDescription>Insights into your UBX usage patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <BarChart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium">Analytics Dashboard</h3>
                  <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                    Detailed spending analysis will be available after you have more transactions
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default UpdatedWallet;
