
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { WalletHookReturn, WalletState, SolanaProvider } from '@/types/solana';

/**
 * Hook for managing wallet connections - abstracting the underlying blockchain implementation
 * This follows the modular architecture from the UBX Token Network Strategy
 */
export const useWalletConnection = (): WalletHookReturn => {
  const [state, setState] = useState<WalletState>({
    provider: null,
    walletAddress: null,
    connecting: false,
    disconnecting: false
  });
  const { toast } = useToast();
  
  // Check if wallet is available
  const hasWallet = typeof window !== 'undefined' && !!(window.solana || window.chainstack?.solana);

  // Initialize wallet provider on load
  useEffect(() => {
    // Priority: Chainstack provider first, then fallback to standard Solana provider
    const provider = window.chainstack?.solana || window.solana || null;
    
    if (provider) {
      setState(prev => ({
        ...prev,
        provider,
        walletAddress: provider.publicKey ? provider.publicKey.toString() : null
      }));
      
      // Listen for account changes
      provider.on('accountChanged', () => {
        const address = provider.publicKey ? provider.publicKey.toString() : null;
        setState(prev => ({ 
          ...prev, 
          walletAddress: address 
        }));
        
        console.log('Wallet account changed:', address);
      });
    }
    
    // Cleanup event listeners
    return () => {
      if (provider && provider.removeAllListeners) {
        provider.removeAllListeners();
      }
    };
  }, []);

  // Connect to wallet
  const connectWallet = useCallback(async () => {
    try {
      if (!hasWallet) {
        toast({
          title: "Wallet Not Found",
          description: "Please install a Solana wallet like Phantom or use Chainstack",
          variant: "destructive",
        });
        return;
      }
      
      setState(prev => ({ ...prev, connecting: true }));
      
      const provider = window.chainstack?.solana || window.solana;
      if (!provider) {
        throw new Error('No Solana wallet found');
      }
      
      const response = await provider.connect();
      const walletAddress = response.publicKey.toString();
      
      setState(prev => ({
        ...prev,
        provider,
        walletAddress,
        connecting: false
      }));
      
      toast({
        title: "Wallet Connected",
        description: `Connected to ${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`,
      });
      
      return walletAddress;
    } catch (error: any) {
      console.error('Error connecting to wallet:', error);
      setState(prev => ({ ...prev, connecting: false }));
      
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive",
      });
      
      throw error;
    }
  }, [hasWallet, toast]);

  // Disconnect from wallet
  const disconnectWallet = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, disconnecting: true }));
      
      if (state.provider) {
        await state.provider.disconnect();
      }
      
      setState({
        provider: null,
        walletAddress: null,
        connecting: false,
        disconnecting: false
      });
      
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected",
      });
    } catch (error: any) {
      console.error('Error disconnecting wallet:', error);
      setState(prev => ({ ...prev, disconnecting: false }));
      
      toast({
        title: "Disconnection Failed",
        description: error.message || "Failed to disconnect wallet",
        variant: "destructive",
      });
      
      throw error;
    }
  }, [state.provider, toast]);

  return {
    ...state,
    connectWallet,
    disconnectWallet,
    hasWallet,
    isConnected: !!state.walletAddress,
    isConnecting: state.connecting
  };
};

export default useWalletConnection;
