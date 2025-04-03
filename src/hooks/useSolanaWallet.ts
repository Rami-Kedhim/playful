
import { useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { WalletHookReturn, WalletState } from "@/types/solana";
import { getWalletProvider } from "@/utils/walletProviderUtils";
import { saveSolanaWallet } from "@/services/walletDbService";

export const useSolanaWallet = (): WalletHookReturn => {
  const [state, setState] = useState<WalletState>({
    provider: null,
    walletAddress: null,
    connecting: false,
    disconnecting: false
  });
  
  const { user, refreshProfile } = useAuth();

  // Check if Solana provider is installed
  useEffect(() => {
    const provider = getWalletProvider();
    
    setState(prev => ({
      ...prev,
      provider
    }));

    // If the wallet is already connected, set the address
    if (provider?.publicKey) {
      setState(prev => ({
        ...prev,
        walletAddress: provider.publicKey?.toString() || null
      }));
    }

    // Listen for wallet connection events
    if (provider) {
      provider.on('connect', () => {
        if (provider.publicKey) {
          setState(prev => ({
            ...prev,
            walletAddress: provider.publicKey?.toString() || null
          }));
        }
      });

      provider.on('disconnect', () => {
        setState(prev => ({
          ...prev,
          walletAddress: null
        }));
      });
    }
  }, []);

  // Connect to Solana wallet via Chainstack
  const connectWallet = async () => {
    const { provider } = state;
    
    if (!provider) {
      window.open('https://chainstack.com/build-better-with-solana/', '_blank');
      toast({
        title: "Solana wallet not found",
        description: "Please install a compatible Solana wallet to continue.",
        variant: "destructive",
      });
      return;
    }

    try {
      setState(prev => ({ ...prev, connecting: true }));
      const { publicKey } = await provider.connect();
      const address = publicKey.toString();
      
      setState(prev => ({
        ...prev,
        walletAddress: address
      }));

      // If user is logged in, save the wallet address to the database
      if (user) {
        await saveSolanaWallet(address, user.id, refreshProfile);
      }

      toast({
        title: "Wallet connected",
        description: "Your Solana wallet has been connected successfully.",
      });
    } catch (error: any) {
      console.error("Error connecting wallet:", error);
      toast({
        title: "Connection failed",
        description: error.message || "Failed to connect to wallet",
        variant: "destructive",
      });
    } finally {
      setState(prev => ({ ...prev, connecting: false }));
    }
  };

  // Disconnect from wallet
  const disconnectWallet = async () => {
    const { provider } = state;
    
    if (provider) {
      try {
        setState(prev => ({ ...prev, disconnecting: true }));
        await provider.disconnect();
        
        setState(prev => ({
          ...prev,
          walletAddress: null
        }));
        
        toast({
          title: "Wallet disconnected",
          description: "Your Solana wallet has been disconnected.",
        });
      } catch (error: any) {
        console.error("Error disconnecting wallet:", error);
        toast({
          title: "Disconnection failed",
          description: error.message || "Failed to disconnect wallet",
          variant: "destructive",
        });
      } finally {
        setState(prev => ({ ...prev, disconnecting: false }));
      }
    }
  };

  return {
    ...state,
    connectWallet,
    disconnectWallet,
    hasWallet: !!state.provider,
    isConnected: !!state.walletAddress
  };
};
