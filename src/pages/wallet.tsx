
import React from 'react';
import { Layout } from '@/layouts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Wallet } from 'lucide-react';
import { orus } from '@/core/Orus';
import SecureRouteWrapper from '@/components/security/SecureRouteWrapper';

const WalletPage = () => {
  const [balance, setBalance] = React.useState(2500);
  const [activeTab, setActiveTab] = React.useState('overview');
  
  React.useEffect(() => {
    // Security validation with Orus
    const validateSession = async () => {
      try {
        const token = localStorage.getItem('session_token') || '';
        await orus.validateSession(token);
      } catch (err) {
        console.error('Session validation error:', err);
      }
    };
    
    validateSession();
  }, []);
  
  return (
    <Layout 
      title="UBX Wallet" 
      description="Manage your UBX tokens and transactions"
      showBreadcrumbs
    >
      <SecureRouteWrapper minimumSecurityLevel="enhanced">
        <div className="space-y-6">
          <Card className="border-t-4 border-t-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                UBX Balance
              </CardTitle>
              <CardDescription>Your current UberEscorts token balance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{balance.toLocaleString()} UBX</div>
              <div className="mt-4 flex gap-2">
                <Button>Recharge Wallet</Button>
                <Button variant="outline">View Transactions</Button>
              </div>
            </CardContent>
          </Card>
          
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="packages">UBX Packages</TabsTrigger>
              <TabsTrigger value="history">Transaction History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="mt-4 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button className="h-auto py-4 flex flex-col items-center">
                    <span>Buy Boost</span>
                    <span className="text-xs opacity-70 mt-1">Increase Visibility</span>
                  </Button>
                  <Button className="h-auto py-4 flex flex-col items-center" variant="outline">
                    <span>Purchase Credits</span>
                    <span className="text-xs opacity-70 mt-1">Add to Wallet</span>
                  </Button>
                  <Button className="h-auto py-4 flex flex-col items-center" variant="outline">
                    <span>Transfer UBX</span>
                    <span className="text-xs opacity-70 mt-1">Send to Others</span>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="packages" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>UBX Packages</CardTitle>
                  <CardDescription>Purchase UBX tokens in packages</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: 'Starter', amount: 1000, price: 10, popular: false },
                    { name: 'Standard', amount: 5000, price: 45, popular: true },
                    { name: 'Premium', amount: 10000, price: 85, popular: false }
                  ].map((pkg) => (
                    <Card key={pkg.name} className={pkg.popular ? 'border-primary' : ''}>
                      <CardHeader className={pkg.popular ? 'bg-primary/10' : ''}>
                        <CardTitle>{pkg.name}</CardTitle>
                        {pkg.popular && <span className="text-xs font-medium text-primary">Most Popular</span>}
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{pkg.amount} UBX</div>
                        <div className="mt-2 text-sm text-muted-foreground">
                          ${pkg.price} USD
                        </div>
                        <Button className="mt-4 w-full">Purchase</Button>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { type: 'Purchase', amount: 5000, date: '2025-05-07', status: 'completed' },
                      { type: 'Boost', amount: -1000, date: '2025-05-06', status: 'completed' },
                      { type: 'Credit', amount: 500, date: '2025-05-05', status: 'completed' },
                    ].map((tx, i) => (
                      <div key={i} className="flex justify-between items-center border-b pb-3">
                        <div>
                          <div className="font-medium">{tx.type}</div>
                          <div className="text-sm text-muted-foreground">{tx.date}</div>
                        </div>
                        <div className={tx.amount > 0 ? 'text-green-500' : 'text-red-500'}>
                          {tx.amount > 0 ? `+${tx.amount}` : tx.amount} UBX
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SecureRouteWrapper>
    </Layout>
  );
};

export default WalletPage;
