
import React, { useEffect, useState } from 'react';
import { uberWallet } from '@/core/index';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ArrowUp, ArrowDown, CreditCard, MoreVertical } from 'lucide-react';
import type { UbxTransaction } from '@/core/UberWallet';

const Wallet = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<UbxTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [addAmount, setAddAmount] = useState('');
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [activeTab, setActiveTab] = useState("overview");
  const [processingAdd, setProcessingAdd] = useState(false);
  const [processingPurchase, setProcessingPurchase] = useState(false);

  useEffect(() => {
    const fetchWalletData = async () => {
      setLoading(true);
      try {
        const balance = uberWallet.getBalance();
        setBalance(balance);
        
        const transactions = await uberWallet.getTransactions();
        setTransactions(transactions);
      } catch (error) {
        console.error("Error loading wallet data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWalletData();
  }, []);
  
  const handleAddFunds = async () => {
    if (!addAmount || isNaN(Number(addAmount))) return;
    
    setProcessingAdd(true);
    try {
      const success = await uberWallet.addFunds(Number(addAmount));
      
      if (success) {
        setBalance(uberWallet.getBalance());
        const transactions = await uberWallet.getTransactions();
        setTransactions(transactions);
        setAddAmount('');
      }
    } catch (error) {
      console.error("Error adding funds:", error);
    } finally {
      setProcessingAdd(false);
    }
  };
  
  const handlePurchaseUbx = async () => {
    if (!purchaseAmount || isNaN(Number(purchaseAmount))) return;
    
    setProcessingPurchase(true);
    try {
      const result = await uberWallet.purchaseUbx(Number(purchaseAmount));
      
      if (result.success) {
        setBalance(uberWallet.getBalance());
        const transactions = await uberWallet.getTransactions();
        setTransactions(transactions);
        setPurchaseAmount('');
      }
    } catch (error) {
      console.error("Error purchasing UBX:", error);
    } finally {
      setProcessingPurchase(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 space-y-8">
      <h1 className="text-3xl font-bold">Wallet</h1>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="add-funds">Add Funds</TabsTrigger>
          <TabsTrigger value="purchase">Purchase UBX</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {loading ? (
            <Card>
              <CardHeader>
                <div className="h-7 bg-gray-200 animate-pulse rounded w-1/3"></div>
              </CardHeader>
              <CardContent>
                <div className="h-9 bg-gray-200 animate-pulse rounded w-1/4 mb-6"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-5/6"></div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>UBX Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-6">{balance.toLocaleString()} UBX</div>
                <p className="text-muted-foreground">
                  Your UBX balance can be used for services across the platform including profile boosting,
                  content access, and more.
                </p>
              </CardContent>
            </Card>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Button
              className="py-6 flex flex-col items-center justify-center text-lg h-auto"
              onClick={() => setActiveTab("add-funds")}
            >
              <ArrowUp className="h-10 w-10 mb-2" />
              Add Funds
            </Button>
            
            <Button
              className="py-6 flex flex-col items-center justify-center text-lg h-auto"
              variant="outline"
              onClick={() => setActiveTab("purchase")}
            >
              <CreditCard className="h-10 w-10 mb-2" />
              Purchase UBX
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex justify-between py-2">
                      <div className="h-6 bg-gray-200 animate-pulse rounded w-1/3"></div>
                      <div className="h-6 bg-gray-200 animate-pulse rounded w-1/4"></div>
                    </div>
                  ))}
                </div>
              ) : transactions.length > 0 ? (
                <div className="space-y-2">
                  {transactions.slice(0, 5).map(tx => (
                    <div key={tx.id} className="flex justify-between py-2 border-b last:border-0">
                      <div className="flex items-center">
                        {tx.type === 'credit' || tx.type === 'purchase' ? (
                          <ArrowDown className="mr-2 h-4 w-4 text-green-500" />
                        ) : (
                          <ArrowUp className="mr-2 h-4 w-4 text-red-500" />
                        )}
                        <div>
                          <div className="font-medium">{tx.description}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(tx.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className={`font-medium ${tx.type === 'credit' || tx.type === 'purchase' ? 'text-green-600' : 'text-red-600'}`}>
                        {tx.type === 'credit' || tx.type === 'purchase' ? '+' : '-'}
                        {tx.amount.toLocaleString()} UBX
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No transactions yet
                </div>
              )}
              
              {transactions.length > 5 && (
                <Button 
                  variant="ghost" 
                  className="w-full mt-4"
                  onClick={() => setActiveTab("transactions")}
                >
                  View All Transactions
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="flex justify-between py-2">
                      <div className="h-6 bg-gray-200 animate-pulse rounded w-1/3"></div>
                      <div className="h-6 bg-gray-200 animate-pulse rounded w-1/4"></div>
                    </div>
                  ))}
                </div>
              ) : transactions.length > 0 ? (
                <div className="space-y-3">
                  {transactions.map(tx => (
                    <div key={tx.id} className="flex justify-between py-2 items-center border-b last:border-0">
                      <div className="flex items-center">
                        {tx.type === 'credit' || tx.type === 'purchase' ? (
                          <ArrowDown className="mr-3 h-5 w-5 text-green-500" />
                        ) : (
                          <ArrowUp className="mr-3 h-5 w-5 text-red-500" />
                        )}
                        <div>
                          <div className="font-medium">{tx.description}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(tx.createdAt).toLocaleDateString()} at {new Date(tx.createdAt).toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className={`font-medium ${tx.type === 'credit' || tx.type === 'purchase' ? 'text-green-600' : 'text-red-600'}`}>
                          {tx.type === 'credit' || tx.type === 'purchase' ? '+' : '-'}
                          {tx.amount.toLocaleString()} UBX
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  No transactions found
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="add-funds">
          <Card>
            <CardHeader>
              <CardTitle>Add Funds</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="amount" className="block text-sm font-medium">
                  Amount (UBX)
                </label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount"
                  value={addAmount}
                  onChange={e => setAddAmount(e.target.value)}
                  min="1"
                />
              </div>
              
              <Button
                className="w-full"
                onClick={handleAddFunds}
                disabled={!addAmount || processingAdd}
              >
                {processingAdd ? 'Processing...' : 'Add Funds'}
              </Button>
              
              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-2">Payment Methods</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Credit Card
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <svg 
                      className="h-4 w-4 mr-2" 
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.278 19.297c-3.409 0-6.443-2.534-6.443-5.869 0-2.711 1.823-4.668 4.344-4.668.318 0 .602.044.884.116-.211-.571-.274-1.107-.274-1.613 0-.884.116-1.722.116-1.722h3.374s-.169.838-.169 1.722c0 .507.063 1.107.275 1.613.338-.072.622-.116.949-.116 2.257 0 4.001 1.972 4.001 4.668 0 3.335-2.951 5.869-6.484 5.869h-.573zm.699-5.392c-.75 0-1.141.604-1.141 1.34 0 .736.391 1.34 1.141 1.34.766 0 1.141-.604 1.141-1.34.016-.736-.375-1.34-1.141-1.34zm-2.852-5.765c-.651 0-1.165.525-1.165 1.176 0 .65.514 1.176 1.165 1.176.652 0 1.166-.525 1.166-1.176 0-.651-.514-1.176-1.166-1.176zm5.072 0c-.652 0-1.166.525-1.166 1.176 0 .65.514 1.176 1.166 1.176s1.181-.525 1.181-1.176c0-.651-.529-1.176-1.181-1.176z" />
                    </svg>
                    Crypto
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="purchase">
          <Card>
            <CardHeader>
              <CardTitle>Purchase UBX</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="purchaseAmount" className="block text-sm font-medium">
                  Amount (UBX)
                </label>
                <Input
                  id="purchaseAmount"
                  type="number"
                  placeholder="Enter amount"
                  value={purchaseAmount}
                  onChange={e => setPurchaseAmount(e.target.value)}
                  min="1"
                />
              </div>
              
              <Button
                className="w-full"
                onClick={handlePurchaseUbx}
                disabled={!purchaseAmount || processingPurchase}
              >
                {processingPurchase ? 'Processing...' : 'Purchase UBX'}
              </Button>
              
              <div className="pt-4 border-t space-y-4">
                <h3 className="text-lg font-medium">UBX Packages</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-auto py-4 flex flex-col">
                    <span className="text-xl font-bold">500 UBX</span>
                    <span className="text-muted-foreground">$4.99</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col border-primary">
                    <span className="text-xl font-bold">1000 UBX</span>
                    <span className="text-muted-foreground">$9.99</span>
                    <span className="text-xs mt-1 bg-primary/10 text-primary px-2 py-0.5 rounded-full">Best Value</span>
                  </Button>
                  <Button variant="outline" className="h-auto py-4 flex flex-col">
                    <span className="text-xl font-bold">2500 UBX</span>
                    <span className="text-muted-foreground">$19.99</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Wallet;
