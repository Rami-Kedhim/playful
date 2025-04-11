
import { useState, useEffect } from 'react';
import { SolanaProvider, WalletHookReturn } from '@/types/solana';
import { useToast } from '@/components/ui/use-toast';

/**
 * Hook for managing Solana wallet connection
 */
export const useSolanaWallet = (): WalletHookReturn => {
  const [provider, setProvider] = useState<SolanaProvider | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [connecting, setConnecting] = useState<boolean>(false);
  const [disconnecting, setDisconnecting] = useState<boolean>(false);
  const { toast } = useToast();

  // Check if wallet is available in browser
  const hasWallet = typeof window !== 'undefined' && 
    (!!window.solana || (!!window.chainstack && !!window.chainstack.solana));

  // Effect to detect wallet provider and address
  useEffect(() => {
    const detectWalletProvider = () => {
      // Check for Phantom or other injected Solana providers
      if (window?.solana?.isConnected && window.solana.publicKey) {
        setProvider(window.solana);
        setWalletAddress(window.solana.publicKey.toString());
        return;
      }
      
      // Check for Chainstack provider
      if (window?.chainstack?.solana?.isConnected && window?.chainstack?.solana.publicKey) {
        setProvider(window.chainstack.solana);
        setWalletAddress(window.chainstack.solana.publicKey.toString());
        return;
      }
      
      setProvider(null);
      setWalletAddress(null);
    };

    if (typeof window !== 'undefined') {
      detectWalletProvider();
      
      // Set up event listeners for wallet changes
      if (window?.solana) {
        window.solana.on('connect', detectWalletProvider);
        window.solana.on('disconnect', detectWalletProvider);
      }
      
      if (window?.chainstack?.solana) {
        window.chainstack.solana.on('connect', detectWalletProvider);
        window.chainstack.solana.on('disconnect', detectWalletProvider);
      }
    }

    return () => {
      // Clean up listeners
      if (typeof window !== 'undefined') {
        if (window?.solana) {
          // Safely call removeAllListeners if it exists
          if (window.solana.removeAllListeners) {
            window.solana.removeAllListeners();
          }
        }
        if (window?.chainstack?.solana) {
          // Safely call removeAllListeners if it exists
          if (window.chainstack?.solana.removeAllListeners) {
            window.chainstack.solana.removeAllListeners();
          }
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

    setConnecting(true);

    try {
      const preferredProvider = window.chainstack?.solana || window.solana;
      
      if (!preferredProvider) {
        throw new Error("No wallet provider available");
      }
      
      await preferredProvider.connect();
      
      if (preferredProvider.publicKey) {
        setProvider(preferredProvider);
        setWalletAddress(preferredProvider.publicKey.toString());
        
        toast({
          title: "Wallet Connected",
          description: `Connected to ${preferredProvider.publicKey.toString().substring(0, 6)}...`,
        });
      } else {
        throw new Error("Failed to get wallet public key");
      }
    } catch (error: any) {
      console.error("Wallet connection error:", error);
      
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive",
      });
    } finally {
      setConnecting(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = async () => {
    if (!provider) return;
    
    setDisconnecting(true);
    
    try {
      await provider.disconnect();
      
      setProvider(null);
      setWalletAddress(null);
      
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
    } finally {
      setDisconnecting(false);
    }
  };

  return {
    provider,
    walletAddress,
    connecting,
    disconnecting,
    connectWallet,
    disconnectWallet,
    hasWallet,
    isConnected: !!walletAddress,
    isConnecting: connecting, // Add this property to match the interface
  };
};

export default useSolanaWallet;
