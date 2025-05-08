
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UbxTransaction } from "@/core/UberWallet";
import { useWallet } from "@/hooks/useWallet";
import { Calendar, DollarSign, Clock, Plus, ArrowUp, ArrowDown } from "lucide-react";
import { format } from 'date-fns';

const WalletPage: React.FC = () => {
  const { balance, transactions, loading, addFunds, purchaseUbx, refresh } = useWallet();
  const [amount, setAmount] = useState<number>(50);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAddFunds = async () => {
    setIsProcessing(true);
    try {
      await addFunds(amount);
    } catch (error) {
      console.error('Error adding funds:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePurchaseUbx = async () => {
    setIsProcessing(true);
    try {
      const result = await purchaseUbx(amount);
      if (!result.success) {
        console.error('Failed to purchase UBX');
      }
    } catch (error) {
      console.error('Error purchasing UBX:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'credit':
        return <ArrowUp className="h-4 w-4 text-green-500" />;
      case 'debit':
        return <ArrowDown className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'credit':
        return "text-green-600";
      case 'debit':
        return "text-red-600";
      default:
        return "text-muted-foreground";
    }
  };

  const formatTransactionType = (type: string, transactionType: string) => {
    if (type === 'purchase' || transactionType === 'purchase') {
      return "Purchase";
    } else if (type === 'spend' || transactionType === 'spend') {
      return "Payment";
    } else if (type === 'credit') {
      return "Deposit";
    } else if (type === 'debit') {
      return "Withdrawal";
    } else {
      return "Transaction";
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (e) {
      return dateString;
    }
  };

  const formatTime = (dateString: string) => {
    try {
      return format(new Date(dateString), 'hh:mm a');
    } catch (e) {
      return '';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Balance Card */}
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-lg font-medium">My Wallet</CardTitle>
            <Button variant="outline" size="icon" onClick={refresh}>
              <Clock className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="text-muted-foreground text-sm">Available Balance</div>
                <div className="flex items-center">
                  <div className="text-3xl font-bold">{balance}</div>
                  <span className="ml-2 text-muted-foreground">LC</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  LC (LuCoin) can be used for all services
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Input 
                    type="number" 
                    min="10" 
                    value={amount} 
                    onChange={(e) => setAmount(Number(e.target.value))} 
                    className="flex-1" 
                    placeholder="Amount" 
                  />
                  <Button 
                    variant="outline" 
                    onClick={() => setAmount(prev => prev + 50)}
                    className="flex-none"
                  >
                    +50
                  </Button>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={handleAddFunds} 
                  disabled={isProcessing || amount <= 0}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Funds
                </Button>
                
                <Button 
                  variant="outline"
                  className="w-full" 
                  onClick={handlePurchaseUbx} 
                  disabled={isProcessing || amount <= 0}
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Purchase UBX
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Transactions Card */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="deposits">Deposits</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                {loading ? (
                  <div className="space-y-3">
                    {Array(5).fill(0).map((_, i) => (
                      <div key={i} className="h-16 bg-muted rounded-md animate-pulse" />
                    ))}
                  </div>
                ) : transactions.length > 0 ? (
                  <div className="space-y-2">
                    {transactions.map((tx) => (
                      <div 
                        key={tx.id} 
                        className="flex items-center justify-between border-b border-border py-3"
                      >
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center mr-3">
                            {getTransactionIcon(tx.type)}
                          </div>
                          <div>
                            <div className="font-medium">
                              {formatTransactionType(tx.type, tx.transactionType)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {tx.description}
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className={`text-right font-medium ${getTransactionColor(tx.type)}`}>
                            {tx.type === 'credit' ? '+' : '-'}{tx.amount} LC
                          </div>
                          <div className="text-xs text-muted-foreground text-right">
                            {formatDate(tx.createdAt)} • {formatTime(tx.createdAt)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-muted-foreground">No transactions yet</div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="deposits">
                {loading ? (
                  <div className="space-y-3">
                    {Array(3).fill(0).map((_, i) => (
                      <div key={i} className="h-16 bg-muted rounded-md animate-pulse" />
                    ))}
                  </div>
                ) : transactions.filter(tx => tx.type === 'credit').length > 0 ? (
                  <div className="space-y-2">
                    {transactions
                      .filter(tx => tx.type === 'credit')
                      .map((tx) => (
                        <div 
                          key={tx.id}
                          className="flex items-center justify-between border-b border-border py-3"
                        >
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center mr-3">
                              {getTransactionIcon(tx.type)}
                            </div>
                            <div>
                              <div className="font-medium">
                                {formatTransactionType(tx.type, tx.transactionType)}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {tx.description}
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className={`text-right font-medium ${getTransactionColor(tx.type)}`}>
                              +{tx.amount} LC
                            </div>
                            <div className="text-xs text-muted-foreground text-right">
                              {formatDate(tx.createdAt)} • {formatTime(tx.createdAt)}
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-muted-foreground">No deposits yet</div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="payments">
                {loading ? (
                  <div className="space-y-3">
                    {Array(3).fill(0).map((_, i) => (
                      <div key={i} className="h-16 bg-muted rounded-md animate-pulse" />
                    ))}
                  </div>
                ) : transactions.filter(tx => tx.type === 'debit').length > 0 ? (
                  <div className="space-y-2">
                    {transactions
                      .filter(tx => tx.type === 'debit')
                      .map((tx) => (
                        <div 
                          key={tx.id} 
                          className="flex items-center justify-between border-b border-border py-3"
                        >
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center mr-3">
                              {getTransactionIcon(tx.type)}
                            </div>
                            <div>
                              <div className="font-medium">
                                {formatTransactionType(tx.type, tx.transactionType)}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {tx.description}
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className={`text-right font-medium ${getTransactionColor(tx.type)}`}>
                              -{tx.amount} LC
                            </div>
                            <div className="text-xs text-muted-foreground text-right">
                              {formatDate(tx.createdAt)} • {formatTime(tx.createdAt)}
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-muted-foreground">No payments yet</div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WalletPage;
