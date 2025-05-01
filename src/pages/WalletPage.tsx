
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollRevealGroup } from '@/components/ui/scroll-reveal-group';
import { Badge } from '@/components/ui/badge';
import { uberWallet, UbxTransaction } from '@/core/UberWallet';
import {
  Wallet,
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  History,
  Plus,
  RefreshCcw
} from 'lucide-react';

const WalletPage: React.FC = () => {
  const [balance, setBalance] = useState({ 
    available: 0, 
    pending: 0, 
    reserved: 0, 
    total: 0 
  });
  const [transactions, setTransactions] = useState<UbxTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Demo user ID - would come from auth context in a real app
  const demoUserId = 'demo-user-123';
  
  useEffect(() => {
    const loadWalletData = async () => {
      try {
        // Get wallet balance
        const balanceData = await uberWallet.getBalance(demoUserId);
        setBalance(balanceData);
        
        // Get transaction history
        const transactionData = await uberWallet.getTransactionHistory(demoUserId);
        setTransactions(transactionData);
      } catch (error) {
        console.error('Error loading wallet data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadWalletData();
  }, []);
  
  const handlePurchaseUbx = async () => {
    try {
      const result = await uberWallet.purchaseUbx(demoUserId, {
        amount: 100,
        paymentMethod: 'card'
      });
      
      if (result.success) {
        // In a real app, you would refresh the balance and transactions here
        console.log('UBX purchase successful:', result);
      }
    } catch (error) {
      console.error('Error purchasing UBX:', error);
    }
  };
  
  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      const balanceData = await uberWallet.getBalance(demoUserId);
      setBalance(balanceData);
      
      const transactionData = await uberWallet.getTransactionHistory(demoUserId);
      setTransactions(transactionData);
    } catch (error) {
      console.error('Error refreshing wallet data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'purchase': return <ArrowDownLeft className="h-4 w-4 text-green-500" />;
      case 'spend': return <ArrowUpRight className="h-4 w-4 text-red-500" />;
      case 'earn': return <ArrowDownLeft className="h-4 w-4 text-blue-500" />;
      case 'refund': return <ArrowDownLeft className="h-4 w-4 text-yellow-500" />;
      default: return <History className="h-4 w-4" />;
    }
  };
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <PageLayout 
      title="UBX Wallet" 
      subtitle="Manage your UBX tokens and transaction history"
    >
      <div className="space-y-6">
        <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-background">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wallet className="h-6 w-6 text-purple-400" />
                <CardTitle>Your UBX Balance</CardTitle>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleRefresh}
                disabled={isLoading}
              >
                <RefreshCcw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
            <CardDescription>
              UBX tokens power all interactions on the UberEscorts platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-6">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Available</span>
                <span className="text-3xl font-bold">{balance.available} UBX</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Pending</span>
                <span className="text-xl font-medium">{balance.pending} UBX</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Reserved</span>
                <span className="text-xl font-medium">{balance.reserved} UBX</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="text-xl font-medium">{balance.total} UBX</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 mt-6">
              <Button 
                onClick={handlePurchaseUbx}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600"
              >
                <Plus className="h-4 w-4" />
                <span>Purchase UBX</span>
              </Button>
              
              <Button 
                variant="outline"
                className="flex items-center gap-2"
              >
                <CreditCard className="h-4 w-4" />
                <span>Payment Methods</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="transactions" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="boost-history">Boost History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="transactions" className="space-y-4">
            <ScrollRevealGroup animation="fade-up" staggerDelay={0.05}>
              {transactions.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-6">
                    <History className="h-12 w-12 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No transaction history found</p>
                  </CardContent>
                </Card>
              ) : (
                transactions.map((transaction) => (
                  <Card key={transaction.id} className="overflow-hidden">
                    <div className="flex items-center p-4">
                      <div className="mr-4 rounded-full bg-background p-2">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{transaction.description}</div>
                        <div className="text-sm text-muted-foreground">
                          {formatDate(transaction.timestamp)}
                        </div>
                      </div>
                      <div className={`text-right ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                        <div className="font-medium">{transaction.amount > 0 ? '+' : ''}{transaction.amount} UBX</div>
                        <Badge variant="outline" className="text-xs">
                          {transaction.type}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </ScrollRevealGroup>
          </TabsContent>
          
          <TabsContent value="boost-history">
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-6">
                <History className="h-12 w-12 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">Boost history will be available soon</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default WalletPage;
