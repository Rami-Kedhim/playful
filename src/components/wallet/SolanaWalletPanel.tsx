
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, RefreshCw, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSolanaWallet } from "@/hooks/useSolanaWallet";
import { getFantomBalance, getFantomPrice } from "@/services/fantomService";

interface SolanaWalletPanelProps {
  onRecharge?: () => void;
}

const SolanaWalletPanel: React.FC<SolanaWalletPanelProps> = ({ onRecharge }) => {
  const { walletAddress } = useSolanaWallet();
  const [ftmBalance, setFtmBalance] = useState<number | null>(null);
  const [ftmPrice, setFtmPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (walletAddress) {
      loadFantomData(walletAddress);
    } else {
      setFtmBalance(null);
    }
  }, [walletAddress]);

  const loadFantomData = async (address: string) => {
    setLoading(true);
    try {
      const [balance, price] = await Promise.all([
        getFantomBalance(address),
        getFantomPrice()
      ]);
      
      setFtmBalance(balance);
      setFtmPrice(price);
    } catch (error) {
      console.error("Error loading Fantom data:", error);
    } finally {
      setLoading(false);
    }
  };

  const refreshFantomData = () => {
    if (walletAddress) {
      loadFantomData(walletAddress);
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="flex items-center text-lg">
          <Shield className="h-5 w-5 text-primary mr-2" />
          IOTA Wallet
        </CardTitle>
        {walletAddress && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={refreshFantomData}
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
              <div className="text-3xl font-bold">{ftmBalance !== null ? ftmBalance.toFixed(4) : '0.0000'} MIOTA</div>
              <p className="text-sm text-muted-foreground mt-1">
                {ftmPrice && ftmBalance !== null ? (
                  <>≈ ${(ftmBalance * ftmPrice).toFixed(2)} USD</>
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
        
        <div className="mt-2 text-xs flex items-center text-muted-foreground">
          <ExternalLink className="h-3 w-3 mr-1" />
          <a href="https://firefly.iota.org/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
            Download IOTA Firefly wallet
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default SolanaWalletPanel;
