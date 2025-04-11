
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { RefreshCw, ExternalLink, Shield } from 'lucide-react';
import { getSolanaBalance, getSolanaPrice } from '@/services/solanaService';
import { useWalletConnection } from '@/hooks/useWalletConnection';

interface SolanaWalletPanelProps {
  onRecharge?: () => void;
}

const SolanaWalletPanel = ({ onRecharge }: SolanaWalletPanelProps) => {
  const { walletAddress, isConnected, connectWallet } = useWalletConnection();
  const [balance, setBalance] = useState<number | null>(null);
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Load wallet data when connected
  useEffect(() => {
    if (walletAddress) {
      loadWalletData();
    } else {
      setBalance(null);
      setPrice(null);
    }
  }, [walletAddress]);
  
  const loadWalletData = async () => {
    if (!walletAddress) return;
    
    setLoading(true);
    try {
      const [walletBalance, tokenPrice] = await Promise.all([
        getSolanaBalance(walletAddress),
        getSolanaPrice()
      ]);
      
      setBalance(walletBalance);
      setPrice(tokenPrice);
    } catch (error) {
      console.error("Error loading wallet data:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleRefresh = () => {
    loadWalletData();
  };
  
  const handleConnect = async () => {
    try {
      await connectWallet();
    } catch (error) {
      // Error handling done in the hook
    }
  };
  
  const getExplorerUrl = (address: string) => {
    return `https://explorer.solana.com/address/${address}`;
  };
  
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center">
          <Shield className="h-5 w-5 text-primary mr-2" />
          Blockchain Wallet
        </CardTitle>
        {isConnected && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleRefresh}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isConnected ? (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Address</p>
              <div className="flex items-center justify-between">
                <code className="text-xs bg-muted p-1 rounded">
                  {walletAddress?.substring(0, 8)}...{walletAddress?.substring(walletAddress.length - 8)}
                </code>
                <a 
                  href={walletAddress ? getExplorerUrl(walletAddress) : '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
            
            <div>
              <p className="text-sm text-muted-foreground">SOL Balance</p>
              {loading ? (
                <Skeleton className="h-7 w-24" />
              ) : (
                <p className="text-2xl font-medium">{balance !== null ? balance.toFixed(4) : '0.0000'}</p>
              )}
              <p className="text-xs text-muted-foreground">
                {price && balance !== null ? (
                  <>≈ ${(balance * price).toFixed(2)} USD</>
                ) : (
                  '—'
                )}
              </p>
            </div>

            {onRecharge && (
              <Button variant="default" size="sm" onClick={onRecharge} className="w-full mt-2">
                Add UBX Tokens
              </Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-4 space-y-3">
            <p className="text-muted-foreground text-sm">Connect your wallet to get started</p>
            <Button variant="outline" onClick={handleConnect}>
              Connect Wallet
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SolanaWalletPanel;
