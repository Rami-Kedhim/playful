
import { useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

// Define types for Solana wallet providers based on their API
interface SolanaProvider {
  isConnected: boolean;
  connect: (opts?: { onlyIfTrusted?: boolean }) => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
  on: (event: string, callback: () => void) => void;
  publicKey: { toString: () => string } | null;
}

// Chainstack connection type
interface ChainstackConnection {
  rpcUrl: string;
  authenticate: () => Promise<void>;
  isAuthenticated: boolean;
}

declare global {
  interface Window {
    chainstack?: {
      solana?: SolanaProvider;
      connection?: ChainstackConnection;
    };
    solana?: SolanaProvider;
  }
}

export const useSolanaWallet = () => {
  const [provider, setProvider] = useState<SolanaProvider | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);
  const { user, refreshProfile } = useAuth();

  // Check if Solana provider is installed
  useEffect(() => {
    const getProvider = (): SolanaProvider | null => {
      if ('chainstack' in window && window.chainstack?.solana) {
        const provider = window.chainstack.solana;
        if (provider.isConnected) {
          return provider;
        }
      }

      // Fallback for other Solana wallets
      if ('solana' in window) {
        const provider = window.solana;
        if (provider?.isConnected) {
          return provider;
        }
      }
      
      return null;
    };

    const provider = getProvider();
    setProvider(provider);

    // If the wallet is already connected, set the address
    if (provider?.publicKey) {
      setWalletAddress(provider.publicKey.toString());
    }

    // Listen for wallet connection events
    if (provider) {
      provider.on('connect', () => {
        if (provider.publicKey) {
          setWalletAddress(provider.publicKey.toString());
        }
      });

      provider.on('disconnect', () => {
        setWalletAddress(null);
      });
    }
  }, []);

  // Connect to Solana wallet via Chainstack
  const connectWallet = async () => {
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
      setConnecting(true);
      const { publicKey } = await provider.connect();
      const address = publicKey.toString();
      setWalletAddress(address);

      // If user is logged in, save the wallet address to the database
      if (user) {
        await saveSolanaWallet(address);
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
      setConnecting(false);
    }
  };

  // Disconnect from wallet
  const disconnectWallet = async () => {
    if (provider) {
      try {
        setDisconnecting(true);
        await provider.disconnect();
        setWalletAddress(null);
        
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
        setDisconnecting(false);
      }
    }
  };

  // Save wallet address to user profile
  const saveSolanaWallet = async (address: string) => {
    if (!user) return;

    try {
      // First, check if this wallet is already saved
      const { data: existingWallet, error: checkError } = await supabase
        .from('solana_wallets' as any)
        .select('*')
        .eq('user_id', user.id)
        .eq('wallet_address', address)
        .single();

      // Handle potential error from the single() call
      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      // If wallet is already saved, just update last_used_at
      if (existingWallet) {
        const { error: updateError } = await supabase
          .from('solana_wallets' as any)
          .update({ last_used_at: new Date().toISOString() })
          .eq('id', existingWallet.id);

        if (updateError) throw updateError;
      } else {
        // Insert new wallet - don't access returned data
        const { error: insertError } = await supabase
          .from('solana_wallets' as any)
          .insert({
            user_id: user.id,
            wallet_address: address,
            is_primary: true
          });

        if (insertError) throw insertError;
      }

      // Refresh user profile to get updated data
      await refreshProfile();
    } catch (error: any) {
      console.error("Error saving wallet address:", error);
      toast({
        title: "Failed to save wallet",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return {
    provider,
    walletAddress,
    connecting,
    disconnecting,
    connectWallet,
    disconnectWallet,
    hasWallet: !!provider,
    isConnected: !!walletAddress
  };
};
