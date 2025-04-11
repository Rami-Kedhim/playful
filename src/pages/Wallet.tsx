import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Coins, Wallet as WalletIcon, History, Gift, Zap, RefreshCw } from "lucide-react";
import LucoinBalance from "@/components/profile/settings/LucoinBalance";
import LucoinTransactionHistory from "@/components/profile/settings/LucoinTransactionHistory";
import LucoinPackageDialog from "@/components/profile/settings/LucoinPackageDialog";
import WalletConnect from "@/components/solana/WalletConnect";
import SolanaTransactionHistory from "@/components/solana/SolanaTransactionHistory";
import { useSolanaWallet } from "@/hooks/useSolanaWallet";
import { getFantomBalance, getFantomPrice } from "@/services/fantomService";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const Wallet = () => {
  const { user, profile } = useAuth();
  const { walletAddress } = useSolanaWallet();
  const [solBalance, setSolBalance] = useState<number | null>(null);
  const [solanaPrice, setSolanaPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (walletAddress) {
      loadSolanaData(walletAddress);
    } else {
      setSolBalance(null);
    }
  }, [walletAddress]);
  
  const loadSolanaData = async (address: string) => {
    setLoading(true);
    try {
      const [balance, price] = await Promise.all([
        getFantomBalance(address),
        getFantomPrice()
      ]);
      
      setSolBalance(balance);
      setSolanaPrice(price);
    } catch (error) {
      console.error("Error loading Solana data:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const refreshSolanaData = () => {
    if (walletAddress) {
      loadSolanaData(walletAddress);
    }
  };
  
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Wallet & Transactions</h1>
            <p className="text-muted-foreground">Manage your UBX and transactions</p>
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
                <Coins className="h-5 w-5 text-blue-500 mr-2" />
                UBX Balance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{profile?.lucoin_balance || profile?.lucoinsBalance || 0} UBX</div>
              <p className="text-sm text-muted-foreground mt-1">
                Virtual credits for platform features
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <CardTitle className="flex items-center text-lg">
                <WalletIcon className="h-5 w-5 text-primary mr-2" />
                Fantom Balance
              </CardTitle>
              {walletAddress && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={refreshSolanaData}
                  disabled={loading}
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {walletAddress ? (
                loading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ) : (
                  <>
                    <div className="text-3xl font-bold">{solBalance !== null ? solBalance.toFixed(4) : '0.0000'} FTM</div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {solanaPrice && solBalance !== null ? (
                        <>≈ ${(solBalance * solanaPrice).toFixed(2)} USD</>
                      ) : (
                        '—'
                      )}
                    </p>
                  </>
                )
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
            <TabsTrigger value="solana" className="flex items-center">
              <WalletIcon className="mr-2 h-4 w-4" />
              Fantom Transactions
            </TabsTrigger>
            <TabsTrigger value="gifts" className="flex items-center">
              <Gift className="mr-2 h-4 w-4" />
              Gifts
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="transactions" className="mt-6">
            <LucoinTransactionHistory />
          </TabsContent>
          
          <TabsContent value="solana" className="mt-6">
            <SolanaTransactionHistory />
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
