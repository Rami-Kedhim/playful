import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Wallet = () => {
  const { user, profile } = useAuth();
  const [rechargeDialogOpen, setRechargeDialogOpen] = useState(false);
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Wallet & Transactions</h1>
            <p className="text-muted-foreground">Manage your UBX tokens and transactions</p>
          </div>
          <div className="flex gap-2">
            <WalletConnect />
            <Button variant="outline" size="sm" onClick={() => setRechargeDialogOpen(true)}>
              Add UBX
            </Button>
            <UBXRechargeDialog open={rechargeDialogOpen} onClose={() => setRechargeDialogOpen(false)} />
            <UBXPackageDialog />
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <UBXBalance onRecharge={() => setRechargeDialogOpen(true)} />
          
          <SolanaWalletPanel onRecharge={() => setRechargeDialogOpen(true)} />
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Zap className="h-5 w-5 text-primary mr-2" />
                Profile Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-medium">
                {profile?.is_boosted || profile?.isBoosted ? (
                  <span className="text-green-500">Boosted</span>
                ) : (
                  <span className="text-muted-foreground">Standard</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {profile?.is_boosted || profile?.isBoosted ? "Your profile is boosted" : "Boost your profile for more visibility"}
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="transactions" className="w-full">
          <TabsList className="grid w-full md:w-[600px] grid-cols-3">
            <TabsTrigger value="transactions" className="flex items-center">
              <History className="mr-2 h-4 w-4" />
              UBX Transactions
            </TabsTrigger>
            <TabsTrigger value="iota" className="flex items-center">
              <Shield className="mr-2 h-4 w-4" />
              IOTA Privacy
            </TabsTrigger>
            <TabsTrigger value="gifts" className="flex items-center">
              <Gift className="mr-2 h-4 w-4" />
              Gifts
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="transactions" className="mt-6">
            <UBXTransactionHistory />
          </TabsContent>
          
          <TabsContent value="iota" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Privacy with IOTA</CardTitle>
                <CardDescription>Secure, feeless UBX recharge with IOTA blockchain</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <Shield className="h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Private Transactions</h3>
                  <p className="text-muted-foreground max-w-md">
                    {NETWORK_CONFIG.displayName} transactions are handled with the highest level of privacy. 
                    Each recharge generates a new one-time address to maximize your anonymity.
                  </p>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                  <h4 className="font-medium flex items-center">
                    <Shield className="h-4 w-4 mr-2 text-green-500" />
                    Key Privacy Benefits
                  </h4>
                  <ul className="mt-2 space-y-1 text-sm list-disc pl-5">
                    <li>No transaction fees, ever</li>
                    <li>One-time addresses for each recharge</li>
                    <li>No linking between your identity and blockchain activity</li>
                    <li>Fast confirmations ({NETWORK_CONFIG.confirmationTime})</li>
                    <li>Simple QR code scanning from any IOTA wallet</li>
                  </ul>
                </div>
                
                <div className="pt-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-2" asChild>
                    <a href="https://explorer.iota.org/mainnet" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      IOTA Explorer
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="gifts" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Gifts History</CardTitle>
                <CardDescription>View gifts you've sent and received</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Gift className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No gifts yet</h3>
                  <p className="text-muted-foreground max-w-md">
                    When you send or receive gifts, they will appear here. Gifts are a great way to show appreciation to creators and escorts.
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

export default Wallet;
