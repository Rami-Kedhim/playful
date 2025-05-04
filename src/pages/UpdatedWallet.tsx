
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/auth';
import { UnifiedLayout } from '@/layouts';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { uberWallet, UbxTransaction } from '@/core/UberWallet';
import WalletConnect from '@/components/solana/WalletConnect';
import { ArrowUpRight, ArrowDownLeft, Plus, History, ChevronDown, Loader2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

const UpdatedWallet = () => {
  const { user } = useAuth();
  const userId = user?.id || 'anonymous';
  
  const [activeTab, setActiveTab] = useState('balance');
  const [transactions, setTransactions] = useState<UbxTransaction[]>([]);
  const [balance, setBalance] = useState({
    available: 0,
    pending: 0,
    reserved: 0,
    total: 0
  });
  const [packageOptions, setPackageOptions] = useState([
    { id: 'basic', name: 'Basic', amount: 100, price: 10, featured: false },
    { id: 'standard', name: 'Standard', amount: 300, price: 25, featured: true },
    { id: 'premium', name: 'Premium', amount: 600, price: 45, featured: false },
    { id: 'vip', name: 'VIP', amount: 1500, price: 100, featured: false },
  ]);
  const [selectedPackage, setSelectedPackage] = useState(packageOptions[1]);
  const [isLoading, setIsLoading] = useState(false);
  const [receiveAddress, setReceiveAddress] = useState('');
  const [sendAddress, setSendAddress] = useState('');
  const [sendAmount, setSendAmount] = useState(0);

  const loadData = async () => {
    try {
      setIsLoading(true);
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
      toast({
        title: "Failed to load wallet data",
        description: "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [userId]);

  const handleAddFunds = async () => {
    try {
      setIsLoading(true);
      // In a real app, this would open a payment flow
      const result = await uberWallet.purchaseUbx(userId, selectedPackage.amount);
      
      if (result.success) {
        // Update balance (in a real app, we would fetch the new balance)
        const newTotal = balance.total + selectedPackage.amount;
        setBalance({
          available: newTotal * 0.8,
          pending: newTotal * 0.1,
          reserved: newTotal * 0.1,
          total: newTotal
        });
        
        // Refresh transaction history
        const history = await uberWallet.getTransactionHistory(userId);
        setTransactions(history);
        
        toast({
          title: "Purchase successful",
          description: `Added ${selectedPackage.amount} UBX to your wallet`,
        });
      }
    } catch (error) {
      console.error('Error adding funds:', error);
      toast({
        title: "Transaction Failed",
        description: "There was a problem processing your purchase",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendUbx = async () => {
    try {
      setIsLoading(true);
      
      // Validate address and amount
      if (!sendAddress) {
        toast({
          title: "Invalid Address",
          description: "Please enter a valid recipient address",
          variant: "destructive"
        });
        return;
      }
      
      if (sendAmount <= 0 || sendAmount > balance.available) {
        toast({
          title: "Invalid Amount",
          description: "Please enter a valid amount to send",
          variant: "destructive"
        });
        return;
      }
      
      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update balance
      const newTotal = balance.total - sendAmount;
      setBalance({
        available: newTotal * 0.8,
        pending: newTotal * 0.1,
        reserved: newTotal * 0.1,
        total: newTotal
      });
      
      toast({
        title: "Transfer Successful",
        description: `Sent ${sendAmount} UBX to ${sendAddress.slice(0, 6)}...${sendAddress.slice(-4)}`,
      });
      
      setSendAddress('');
      setSendAmount(0);
      
    } catch (error) {
      console.error('Error sending UBX:', error);
      toast({
        title: "Transfer Failed",
        description: "There was a problem sending UBX",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Format the date for display
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <UnifiedLayout title="UBX Wallet" description="Manage your UBX tokens" requireAuth={true}>
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="md:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>UBX Balance</CardTitle>
              <CardDescription>Your current UBX token balance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold">{balance.total.toLocaleString()} UBX</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Available: {balance.available.toFixed(2)} UBX
                  </p>
                </div>
                <Button onClick={() => setActiveTab('addFunds')} className="flex items-center">
                  <Plus className="mr-1 h-4 w-4" /> Add Funds
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Wallet</CardTitle>
              <CardDescription>Connect external wallet</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <WalletConnect />
                <p className="text-xs text-muted-foreground text-center">
                  Connect your Solana wallet for transactions
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="balance">
              Balance
            </TabsTrigger>
            <TabsTrigger value="addFunds">
              Add Funds
            </TabsTrigger>
            <TabsTrigger value="send">
              Send UBX
            </TabsTrigger>
            <TabsTrigger value="history">
              History
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="balance" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Balance Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground">Available Balance</div>
                      <div className="text-2xl font-semibold mt-1">{balance.available.toFixed(2)} UBX</div>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground">Total Balance</div>
                      <div className="text-2xl font-semibold mt-1">{balance.total.toFixed(2)} UBX</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground">Pending</div>
                      <div className="text-2xl font-semibold mt-1">{balance.pending.toFixed(2)} UBX</div>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground">Reserved</div>
                      <div className="text-2xl font-semibold mt-1">{balance.reserved.toFixed(2)} UBX</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Latest Transactions */}
            <Card>
              <CardHeader>
                <CardTitle>Latest Transactions</CardTitle>
                <CardDescription>Your recent UBX activity</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : transactions.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No transactions yet
                  </div>
                ) : (
                  <div className="space-y-4">
                    {transactions.slice(0, 3).map((tx) => (
                      <div key={tx.id} className="flex justify-between items-center border-b pb-3">
                        <div className="flex items-center">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center ${tx.amount >= 0 ? 'bg-green-100' : 'bg-red-100'} mr-3`}>
                            {tx.amount >= 0 ? 
                              <ArrowDownLeft className={`h-4 w-4 ${tx.amount >= 0 ? 'text-green-600' : 'text-red-600'}`} /> : 
                              <ArrowUpRight className={`h-4 w-4 ${tx.amount >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                            }
                          </div>
                          <div>
                            <div className="font-medium">{tx.description || tx.transactionType}</div>
                            <div className="text-xs text-muted-foreground">
                              {formatDate(new Date(tx.createdAt))}
                            </div>
                          </div>
                        </div>
                        <div className={`${tx.amount > 0 ? 'text-green-600' : ''} font-semibold`}>
                          {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()} UBX
                        </div>
                      </div>
                    ))}
                    
                    <Button 
                      variant="ghost" 
                      className="w-full text-center text-muted-foreground"
                      onClick={() => setActiveTab('history')}
                    >
                      View all transactions
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="addFunds" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Add UBX Tokens</CardTitle>
                <CardDescription>Purchase UBX to use across the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    <p className="text-muted-foreground">Select a package:</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {packageOptions.map((pkg) => (
                        <div 
                          key={pkg.id}
                          className={`border rounded-lg p-4 cursor-pointer relative ${
                            selectedPackage.id === pkg.id ? 'border-primary ring-2 ring-primary/20' : ''
                          }`}
                          onClick={() => setSelectedPackage(pkg)}
                        >
                          {pkg.featured && (
                            <Badge className="absolute -top-2 -right-2 bg-primary">Best Value</Badge>
                          )}
                          <div className="font-semibold">{pkg.name}</div>
                          <div className="text-2xl font-bold mt-2">{pkg.amount} UBX</div>
                          <div className="text-muted-foreground">${pkg.price.toFixed(2)}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm text-muted-foreground">Selected Package</div>
                        <div className="font-semibold">{selectedPackage.name}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground text-right">Price</div>
                        <div className="font-semibold">${selectedPackage.price.toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                  
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Payment Information</AlertTitle>
                    <AlertDescription>
                      Payments are processed securely. UBX tokens will be instantly added to your wallet once payment is complete.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  size="lg" 
                  onClick={handleAddFunds}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>Purchase {selectedPackage.amount} UBX</>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="send" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Send UBX</CardTitle>
                <CardDescription>Transfer UBX to another user or wallet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted/30 p-4 rounded-lg flex justify-between items-center">
                    <div>
                      <div className="text-sm text-muted-foreground">Available Balance</div>
                      <div className="text-2xl font-semibold mt-1">{balance.available.toFixed(2)} UBX</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Recipient Address</label>
                      <Input
                        placeholder="Enter UBX address or username"
                        value={sendAddress}
                        onChange={(e) => setSendAddress(e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Amount to Send</label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={sendAmount || ''}
                        onChange={(e) => setSendAmount(Number(e.target.value))}
                      />
                      <p className="text-xs text-muted-foreground">
                        Min: 1 UBX | Max: {balance.available.toFixed(2)} UBX
                      </p>
                    </div>
                  </div>
                  
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Transaction Information</AlertTitle>
                    <AlertDescription>
                      Please verify the recipient address carefully. Transactions cannot be reversed once confirmed.
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  size="lg" 
                  onClick={handleSendUbx}
                  disabled={isLoading || sendAmount <= 0 || sendAmount > balance.available || !sendAddress}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>Send {sendAmount > 0 ? sendAmount : 0} UBX</>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="history" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>Your UBX transaction history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center mb-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-[180px] justify-between">
                          All Transactions
                          <ChevronDown className="h-4 w-4 ml-2" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>All Transactions</DropdownMenuItem>
                        <DropdownMenuItem>Received</DropdownMenuItem>
                        <DropdownMenuItem>Sent</DropdownMenuItem>
                        <DropdownMenuItem>Purchases</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    
                    <Button variant="outline" size="icon">
                      <History className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {isLoading ? (
                    <div className="flex justify-center items-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : transactions.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No transactions yet
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {transactions.map((tx) => (
                        <div key={tx.id} className="flex justify-between items-center border-b pb-3">
                          <div className="flex items-center">
                            <div className={`h-10 w-10 rounded-full flex items-center justify-center ${tx.amount >= 0 ? 'bg-green-100' : 'bg-red-100'} mr-3`}>
                              {tx.amount >= 0 ? 
                                <ArrowDownLeft className={`h-5 w-5 ${tx.amount >= 0 ? 'text-green-600' : 'text-red-600'}`} /> : 
                                <ArrowUpRight className={`h-5 w-5 ${tx.amount >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                              }
                            </div>
                            <div>
                              <div className="font-medium">{tx.description || tx.transactionType}</div>
                              <div className="text-xs text-muted-foreground">
                                {formatDate(new Date(tx.createdAt))}
                              </div>
                            </div>
                          </div>
                          <div className={`${tx.amount > 0 ? 'text-green-600' : ''} font-semibold`}>
                            {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()} UBX
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </UnifiedLayout>
  );
};

export default UpdatedWallet;
