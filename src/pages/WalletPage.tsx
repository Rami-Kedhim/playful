
import React, { useState } from 'react';
import Layout from '@/layouts/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Wallet, ArrowUpRight, ArrowDownLeft, Clock, 
  CheckCircle, XCircle, AlertCircle, Plus
} from 'lucide-react';
import { useWallet } from '@/contexts/WalletContext';

const WalletPage = () => {
  const { balance = 0, transactions = [] } = useWallet();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock transactions for display
  const mockTransactions = [
    {
      id: '1',
      type: 'deposit',
      amount: 50,
      status: 'completed',
      date: new Date(2023, 10, 15),
      description: 'Wallet top up'
    },
    {
      id: '2',
      type: 'withdrawal',
      amount: 15,
      status: 'completed',
      date: new Date(2023, 10, 12),
      description: 'Booking payment'
    },
    {
      id: '3',
      type: 'deposit',
      amount: 100,
      status: 'pending',
      date: new Date(2023, 10, 10),
      description: 'Wallet top up'
    },
    {
      id: '4',
      type: 'withdrawal',
      amount: 35,
      status: 'failed',
      date: new Date(2023, 9, 28),
      description: 'Service fee'
    }
  ];
  
  const renderStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-amber-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };
  
  return (
    <Layout
      title="Wallet"
      description="Manage your UBX balance and transactions"
      showBreadcrumbs
    >
      <div className="container max-w-4xl">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="deposit">Deposit</TabsTrigger>
            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Balance Card */}
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle className="text-lg">Current Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Wallet className="h-8 w-8 text-primary mr-4" />
                    <span className="text-4xl font-bold">{balance.toFixed(2)} UBX</span>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <Button className="flex-1">
                      <Plus className="mr-2 h-4 w-4" /> Add Funds
                    </Button>
                    <Button variant="outline" className="flex-1">
                      View History
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Recent Transactions */}
              <Card className="lg:col-span-3">
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockTransactions.length === 0 ? (
                      <p className="text-muted-foreground text-center py-6">
                        No transactions found
                      </p>
                    ) : (
                      mockTransactions.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between border-b pb-3">
                          <div className="flex items-center">
                            <div className="bg-muted/50 p-2 rounded-full mr-3">
                              {transaction.type === 'deposit' ? (
                                <ArrowDownLeft className="h-5 w-5 text-green-500" />
                              ) : (
                                <ArrowUpRight className="h-5 w-5 text-amber-500" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{transaction.description}</p>
                              <p className="text-sm text-muted-foreground">
                                {transaction.date.toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1.5">
                              {renderStatusIcon(transaction.status)}
                              <span className="text-sm capitalize">{transaction.status}</span>
                            </div>
                            <p className={`font-medium ${
                              transaction.type === 'deposit' ? 'text-green-500' : ''
                            }`}>
                              {transaction.type === 'deposit' ? '+' : '-'}
                              {transaction.amount.toFixed(2)} UBX
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4">
                    View All Transactions
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="deposit">
            <Card>
              <CardHeader>
                <CardTitle>Deposit Funds</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-8">
                  Add UBX tokens to your wallet using one of the methods below.
                </p>
                
                {/* Deposit options would go here */}
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Deposit functionality coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="withdraw">
            <Card>
              <CardHeader>
                <CardTitle>Withdraw Funds</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-8">
                  Withdraw UBX tokens from your wallet to your preferred payment method.
                </p>
                
                {/* Withdraw options would go here */}
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Withdrawal functionality coming soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default WalletPage;
