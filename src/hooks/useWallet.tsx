
import { useState, useEffect } from 'react';
import { WalletHookReturn, WalletState } from '@/types/solana';
import { getWalletProvider } from '@/utils/walletProviderUtils';
import { useToast } from '@/components/ui/use-toast';

const defaultWalletState: WalletState = {
  provider: null,
  walletAddress: null,
  connecting: false,
  disconnecting: false,
};

export default function useWallet(): WalletHookReturn {
  const [walletState, setWalletState] = useState<WalletState>(defaultWalletState);
  const { toast } = useToast();

  // Check if wallet is available in browser
  const hasWallet = typeof window !== 'undefined' && 
    (!!window.solana || (!!window.chainstack && !!window.chainstack.solana));

  // Effect to detect wallet changes
  useEffect(() => {
    const detectChanges = () => {
      const provider = getWalletProvider();
      if (provider) {
        setWalletState(prev => ({
          ...prev,
          provider,
          walletAddress: provider.publicKey ? provider.publicKey.toString() : null,
        }));
      } else {
        setWalletState(defaultWalletState);
      }
    };

    // Detect on load
    detectChanges();

    // Set up listeners for wallet events
    if (typeof window !== 'undefined') {
      if (window.solana) {
        window.solana.on('connect', detectChanges);
        window.solana.on('disconnect', detectChanges);
      }
      if (window.chainstack?.solana) {
        window.chainstack.solana.on('connect', detectChanges);
        window.chainstack.solana.on('disconnect', detectChanges);
      }
    }

    return () => {
      // Clean up listeners
      if (typeof window !== 'undefined') {
        if (window.solana) {
          window.solana.removeAllListeners?.();
        }
        if (window.chainstack?.solana) {
          window.chainstack.solana.removeAllListeners?.();
        }
      }
    };
  }, []);

  // Connect wallet
  const connectWallet = async () => {
    if (!hasWallet) {
      toast({
        title: "Wallet Not Found",
        description: "Please install a Solana wallet extension like Phantom or use Chainstack.",
        variant: "destructive",
      });
      return;
    }

    setWalletState(prev => ({ ...prev, connecting: true }));

    try {
      // Try Chainstack first, then fall back to default Solana wallet
      const provider = window.chainstack?.solana || window.solana;
      
      if (provider) {
        await provider.connect();
        
        const address = provider.publicKey?.toString() || null;
        
        setWalletState({
          provider,
          walletAddress: address,
          connecting: false,
          disconnecting: false,
        });
        
        toast({
          title: "Wallet Connected",
          description: `Connected to ${address?.substring(0, 6)}...${address?.substring(address.length - 4)}`,
        });
      } else {
        throw new Error("No wallet provider found");
      }
    } catch (error: any) {
      console.error("Wallet connection error:", error);
      
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive",
      });
      
      setWalletState(prev => ({ ...prev, connecting: false }));
    }
  };

  // Disconnect wallet
  const disconnectWallet = async () => {
    if (!walletState.provider) return;
    
    setWalletState(prev => ({ ...prev, disconnecting: true }));
    
    try {
      await walletState.provider.disconnect();
      
      setWalletState(defaultWalletState);
      
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected",
      });
    } catch (error: any) {
      console.error("Wallet disconnection error:", error);
      
      toast({
        title: "Disconnection Failed",
        description: error.message || "Failed to disconnect wallet",
        variant: "destructive",
      });
      
      setWalletState(prev => ({ ...prev, disconnecting: false }));
    }
  };

  return {
    ...walletState,
    connectWallet,
    disconnectWallet,
    hasWallet,
    isConnected: !!walletState.walletAddress,
  };
}
