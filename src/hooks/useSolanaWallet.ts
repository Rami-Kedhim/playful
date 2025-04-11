
import { useState, useEffect, useCallback } from 'react';
import { WalletHookReturn, WalletState } from '@/types/solana';

/**
 * Hook for accessing a user's Solana wallet
 */
export const useSolanaWallet = (): WalletHookReturn => {
  const [state, setState] = useState<WalletState>({
    provider: null,
    walletAddress: null,
    connecting: false,
    disconnecting: false
  });
  
  // Check if wallet is available
  const hasWallet = typeof window !== 'undefined' && !!(window.solana || window.chainstack?.solana);

  // Initialize wallet provider
  useEffect(() => {
    const provider = window.solana || window.chainstack?.solana || null;
    
    if (provider) {
      setState(prev => ({
        ...prev,
        provider,
        walletAddress: provider.publicKey ? provider.publicKey.toString() : null
      }));
      
      // Listen for account changes
      provider.on('accountChanged', () => {
        const address = provider.publicKey ? provider.publicKey.toString() : null;
        setState(prev => ({ ...prev, walletAddress: address }));
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
      setState(prev => ({ ...prev, connecting: true }));
      
      const provider = window.solana || window.chainstack?.solana;
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
      
      return walletAddress;
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      setState(prev => ({ ...prev, connecting: false }));
      throw error;
    }
  }, []);

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
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      setState(prev => ({ ...prev, disconnecting: false }));
      throw error;
    }
  }, [state.provider]);

  return {
    ...state,
    connectWallet: connectWallet as () => Promise<void>, // Fix the type mismatch
    disconnectWallet,
    hasWallet,
    isConnected: !!state.walletAddress,
    isConnecting: state.connecting
  };
};

export default useSolanaWallet;
