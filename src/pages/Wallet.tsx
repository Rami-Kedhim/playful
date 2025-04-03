
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Coins, Wallet as WalletIcon, History, Gift, Zap } from "lucide-react";
import LucoinBalance from "@/components/profile/settings/LucoinBalance";
import LucoinTransactionHistory from "@/components/profile/settings/LucoinTransactionHistory";
import LucoinPackageDialog from "@/components/profile/settings/LucoinPackageDialog";
import WalletConnect from "@/components/solana/WalletConnect";
import { useSolanaWallet } from "@/hooks/useSolanaWallet";
import { getSolanaBalance, getSolanaPrice } from "@/services/solanaService";

const Wallet = () => {
  const { user, profile } = useAuth();
  const { walletAddress } = useSolanaWallet();
  const [solBalance, setSolBalance] = useState(0);
  const [solanaPrice, setSolanaPrice] = useState(0);
  
  useEffect(() => {
    if (walletAddress) {
      loadSolanaData(walletAddress);
    }
  }, [walletAddress]);
  
  const loadSolanaData = async (address: string) => {
    const balance = await getSolanaBalance(address);
    setSolBalance(balance);
    
    const price = await getSolanaPrice();
    setSolanaPrice(price);
  };
  
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Wallet & Transactions</h1>
            <p className="text-muted-foreground">Manage your Lucoins and transactions</p>
          </div>
          <div className="flex gap-2">
            <WalletConnect />
            <LucoinPackageDialog />
          </div>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Coins className="h-5 w-5 text-yellow-500 mr-2" />
                Lucoin Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{profile?.lucoin_balance || 0} LC</div>
              <p className="text-sm text-muted-foreground mt-1">
                Virtual credits for platform features
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <WalletIcon className="h-5 w-5 text-primary mr-2" />
                Solana Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              {walletAddress ? (
                <>
                  <div className="text-3xl font-bold">{solBalance.toFixed(4)} SOL</div>
                  <p className="text-sm text-muted-foreground mt-1">
                    ≈ ${(solBalance * solanaPrice).toFixed(2)} USD
                  </p>
                </>
              ) : (
                <div className="text-muted-foreground py-1">
                  Connect wallet to view balance
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg">
                <Zap className="h-5 w-5 text-primary mr-2" />
                Profile Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-medium">
                {profile?.is_boosted ? (
                  <span className="text-green-500">Boosted</span>
                ) : (
                  <span className="text-muted-foreground">Standard</span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                {profile?.is_boosted ? "Your profile is boosted" : "Boost your profile for more visibility"}
              </p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="transactions" className="w-full">
          <TabsList className="grid w-full md:w-[400px] grid-cols-2">
            <TabsTrigger value="transactions" className="flex items-center">
              <History className="mr-2 h-4 w-4" />
              Transactions
            </TabsTrigger>
            <TabsTrigger value="gifts" className="flex items-center">
              <Gift className="mr-2 h-4 w-4" />
              Gifts
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="transactions" className="mt-6">
            <LucoinTransactionHistory />
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
    </AppLayout>
  );
};

export default Wallet;
