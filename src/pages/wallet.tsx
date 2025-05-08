
import React from 'react';
import { Layout } from '@/layouts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UBXWallet from '@/components/wallet/UBXWallet';
import SolanaWalletPanel from '@/components/wallet/SolanaWalletPanel';
import WalletConnect from '@/components/solana/WalletConnect';
import SecureWalletSection from '@/components/wallet/SecureWalletSection';
import { useNavigate } from 'react-router-dom';
import { APP_PATHS } from '@/routes/routeConfig';

const WalletPage = () => {
  const navigate = useNavigate();
  
  const handleRechargeClick = () => {
    navigate(`${APP_PATHS.WALLET}/recharge`);
  };
  
  const handleViewTransactions = () => {
    navigate(`${APP_PATHS.WALLET}/history`);
  };
  
  return (
    <Layout 
      title="Wallet" 
      description="Manage your UBX tokens and transactions"
      showBreadcrumbs={true}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Wallet Security</CardTitle>
              <WalletConnect />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Connect your wallet to enable secure transactions and withdrawals.
              </p>
            </CardContent>
          </Card>
          
          <UBXWallet 
            compact={false}
            showRefresh={true}
            showHistory={true}
            onRecharge={handleRechargeClick}
          />
          
          <SolanaWalletPanel />
        </div>
        
        <div className="space-y-6">
          <SecureWalletSection balance={250.00} />
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="transactions">
                <TabsList className="w-full">
                  <TabsTrigger value="transactions" className="flex-1">Transactions</TabsTrigger>
                  <TabsTrigger value="earnings" className="flex-1">Earnings</TabsTrigger>
                  <TabsTrigger value="spending" className="flex-1">Spending</TabsTrigger>
                </TabsList>
                
                <TabsContent value="transactions" className="pt-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm">Boost Purchase</span>
                      <span className="text-sm text-red-500">-25 UBX</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm">Wallet Recharge</span>
                      <span className="text-sm text-green-500">+100 UBX</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-sm">Content Purchase</span>
                      <span className="text-sm text-red-500">-15 UBX</span>
                    </div>
                  </div>
                  
                  <button 
                    className="w-full text-center text-sm text-muted-foreground underline mt-4"
                    onClick={handleViewTransactions}
                  >
                    View all transactions
                  </button>
                </TabsContent>
                
                <TabsContent value="earnings" className="pt-4">
                  <p className="text-sm text-muted-foreground">No recent earnings to display.</p>
                </TabsContent>
                
                <TabsContent value="spending" className="pt-4">
                  <p className="text-sm text-muted-foreground">No recent spending to display.</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default WalletPage;
