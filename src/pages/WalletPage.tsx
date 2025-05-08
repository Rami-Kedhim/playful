
import React, { useState } from 'react';
import Layout from '@/layouts/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Banknote, Clock, CreditCard, DollarSign, AlertCircle, ArrowDownRight, ArrowUpRight, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useWallet } from '@/contexts/WalletContext';

// Sample transaction history data
const sampleTransactions = [
  { id: 't1', type: 'deposit', amount: 100, date: '2023-05-08T14:30:00Z', status: 'completed' },
  { id: 't2', type: 'purchase', amount: -50, date: '2023-05-07T10:15:00Z', status: 'completed' },
  { id: 't3', type: 'withdrawal', amount: -30, date: '2023-05-05T16:45:00Z', status: 'processing' },
  { id: 't4', type: 'deposit', amount: 200, date: '2023-05-03T09:20:00Z', status: 'completed' },
  { id: 't5', type: 'purchase', amount: -75, date: '2023-05-01T12:00:00Z', status: 'completed' },
];

const WalletPage = () => {
  const { toast } = useToast();
  const { balance, addFunds, withdraw } = useWallet();
  
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDeposit = async () => {
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: 'Invalid amount',
        description: 'Please enter a valid amount greater than 0',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      await addFunds(amount);
      setDepositAmount('');
      toast({
        title: 'Deposit successful',
        description: `$${amount.toFixed(2)} has been added to your wallet`,
      });
    } catch (error) {
      toast({
        title: 'Deposit failed',
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: 'Invalid amount',
        description: 'Please enter a valid amount greater than 0',
        variant: 'destructive',
      });
      return;
    }

    if (amount > balance) {
      toast({
        title: 'Insufficient funds',
        description: 'You do not have enough funds to withdraw this amount',
        variant: 'destructive',
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      await withdraw(amount);
      setWithdrawAmount('');
      toast({
        title: 'Withdrawal initiated',
        description: `$${amount.toFixed(2)} withdrawal is being processed`,
      });
    } catch (error) {
      toast({
        title: 'Withdrawal failed',
        description: error instanceof Error ? error.message : 'An unexpected error occurred',
        variant: 'destructive',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Layout
      title="Wallet"
      description="Manage your funds and transactions"
      showBreadcrumbs
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Balance Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Available Balance</CardTitle>
            <CardDescription>Your current wallet balance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-6">
              <DollarSign className="h-8 w-8 text-primary mr-2" />
              <span className="text-4xl font-bold">{balance.toFixed(2)}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <Button className="w-full flex items-center justify-center">
                <CreditCard className="h-4 w-4 mr-2" />
                Add Funds
              </Button>
              <Button variant="outline" className="w-full flex items-center justify-center">
                <Banknote className="h-4 w-4 mr-2" />
                Withdraw
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Actions Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Money Operations</CardTitle>
            <CardDescription>Deposit or withdraw funds</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="deposit">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="deposit">Deposit</TabsTrigger>
                <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
              </TabsList>
              <TabsContent value="deposit" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Amount to deposit</label>
                  <div className="flex space-x-2">
                    <Input 
                      type="number"
                      placeholder="Enter amount"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                    />
                    <Button 
                      onClick={handleDeposit} 
                      disabled={isProcessing || !depositAmount}
                    >
                      {isProcessing ? 'Processing...' : 'Deposit'}
                    </Button>
                  </div>
                </div>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription>
                    Deposits are typically processed within minutes but may take up to 24 hours.
                  </AlertDescription>
                </Alert>
              </TabsContent>
              <TabsContent value="withdraw" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Amount to withdraw</label>
                  <div className="flex space-x-2">
                    <Input 
                      type="number"
                      placeholder="Enter amount"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                    />
                    <Button 
                      onClick={handleWithdraw} 
                      disabled={isProcessing || !withdrawAmount || parseFloat(withdrawAmount) > balance}
                    >
                      {isProcessing ? 'Processing...' : 'Withdraw'}
                    </Button>
                  </div>
                </div>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Important</AlertTitle>
                  <AlertDescription>
                    Withdrawals are processed within 1-3 business days depending on your payment method.
                  </AlertDescription>
                </Alert>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Recent transactions in your wallet</CardDescription>
        </CardHeader>
        <CardContent>
          {sampleTransactions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No transactions yet</p>
              <p className="text-sm">Your transaction history will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sampleTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${transaction.amount > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {transaction.amount > 0 ? <ArrowDownRight className="h-5 w-5" /> : <ArrowUpRight className="h-5 w-5" />}
                    </div>
                    <div>
                      <p className="font-medium capitalize">{transaction.type}</p>
                      <p className="text-sm text-muted-foreground">{formatDate(transaction.date)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}
                    </p>
                    <div className="flex items-center text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      <span className={`
                        ${transaction.status === 'completed' ? 'text-green-600' : ''}
                        ${transaction.status === 'processing' ? 'text-amber-600' : ''}
                        ${transaction.status === 'failed' ? 'text-red-600' : ''}
                        capitalize
                      `}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Layout>
  );
};

export default WalletPage;
