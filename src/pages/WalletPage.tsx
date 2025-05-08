
import React, { useState } from 'react';
import Layout from '@/layouts/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wallet, ArrowDownRight, ArrowUpRight, Plus, RefreshCw, CreditCard } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/auth/useAuthContext';

const WalletPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useAuth();
  
  // Mock wallet data
  const [walletData, setWalletData] = useState({
    balance: 450,
    pendingTransactions: [],
    recentTransactions: [
      { id: 'tx1', type: 'deposit', amount: 100, date: '2023-10-15T14:22:00Z', status: 'completed', description: 'Account deposit' },
      { id: 'tx2', type: 'withdrawal', amount: 50, date: '2023-10-12T09:45:00Z', status: 'completed', description: 'Service payment' },
      { id: 'tx3', type: 'deposit', amount: 200, date: '2023-10-05T16:30:00Z', status: 'completed', description: 'Package purchase' }
    ]
  });
  
  const handleTopUp = () => {
    toast({
      title: "Top-up Started",
      description: "You'll be redirected to the payment page."
    });
  };

  const handleWithdraw = () => {
    toast({
      title: "Withdrawal Request",
      description: "Your withdrawal request has been submitted."
    });
  };

  return (
    <Layout
      title="Wallet"
      description="Manage your UBX digital wallet"
      showBreadcrumbs
    >
      <div className="mb-8">
        <Card className="bg-gradient-to-r from-purple-900/30 to-purple-500/20">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">UBX Balance</CardTitle>
              <Button variant="outline" size="sm" onClick={() => {}} className="bg-background/50">
                <RefreshCw className="h-4 w-4 mr-2" /> Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <p className="text-4xl font-bold">{walletData.balance} UBX</p>
                <p className="text-muted-foreground">Available Balance</p>
              </div>
              <div className="flex gap-3 mt-6 md:mt-0">
                <Button onClick={handleTopUp} className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" /> Add Funds
                </Button>
                <Button onClick={handleWithdraw} variant="outline">
                  <ArrowUpRight className="h-4 w-4 mr-2" /> Withdraw
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="packages">UBX Packages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <ArrowDownRight className="h-5 w-5 mr-2 text-green-500" />
                  Income
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">300 UBX</p>
                <p className="text-sm text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <ArrowUpRight className="h-5 w-5 mr-2 text-red-500" />
                  Expenses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">50 UBX</p>
                <p className="text-sm text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Wallet className="h-5 w-5 mr-2 text-blue-500" />
                  Net Change
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">+250 UBX</p>
                <p className="text-sm text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>Your recent wallet activity</CardDescription>
            </CardHeader>
            <CardContent>
              {walletData.recentTransactions.length > 0 ? (
                <div className="space-y-4">
                  {walletData.recentTransactions.map(transaction => (
                    <div key={transaction.id} className="flex justify-between items-center border-b pb-4">
                      <div className="flex items-center">
                        <div className={`p-2 rounded-full mr-3 ${transaction.type === 'deposit' ? 'bg-green-100' : 'bg-red-100'}`}>
                          {transaction.type === 'deposit' ? 
                            <ArrowDownRight className={`h-4 w-4 ${transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`} /> : 
                            <ArrowUpRight className={`h-4 w-4 ${transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`} />
                          }
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(transaction.date).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'}`}>
                          {transaction.type === 'deposit' ? '+' : '-'}{transaction.amount} UBX
                        </p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {transaction.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center py-4 text-muted-foreground">No recent transactions</p>
              )}
              
              <Button variant="outline" className="w-full mt-4">View All Transactions</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>Complete history of your wallet transactions</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Transaction history table would go here */}
              <div className="text-center py-12 text-muted-foreground">
                <p>Your transaction history will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="packages">
          <Card>
            <CardHeader>
              <CardTitle>UBX Packages</CardTitle>
              <CardDescription>Purchase UBX in pre-defined packages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Starter Pack</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <p className="text-3xl font-bold mb-2">100 UBX</p>
                      <p className="text-muted-foreground mb-6">$10.00 USD</p>
                      <Button variant="outline" onClick={handleTopUp} className="w-full">
                        <CreditCard className="mr-2 h-4 w-4" /> Purchase
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-primary">
                  <div className="bg-primary/90 text-primary-foreground text-center text-sm py-1">
                    MOST POPULAR
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">Standard Pack</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <p className="text-3xl font-bold mb-2">300 UBX</p>
                      <p className="text-muted-foreground mb-1">$25.00 USD</p>
                      <p className="text-xs text-green-600 mb-6">Save 16%</p>
                      <Button onClick={handleTopUp} className="w-full">
                        <CreditCard className="mr-2 h-4 w-4" /> Purchase
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Premium Pack</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <p className="text-3xl font-bold mb-2">600 UBX</p>
                      <p className="text-muted-foreground mb-1">$45.00 USD</p>
                      <p className="text-xs text-green-600 mb-6">Save 25%</p>
                      <Button variant="outline" onClick={handleTopUp} className="w-full">
                        <CreditCard className="mr-2 h-4 w-4" /> Purchase
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default WalletPage;
