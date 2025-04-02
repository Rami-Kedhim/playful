
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface WalletContextType {
  balance: number;
  isLoading: boolean;
  error: string | null;
  refreshBalance: () => Promise<void>;
  purchaseLucoins: (packageId: string) => Promise<string | null>;
  spendLucoins: (amount: number, description: string, metadata?: any) => Promise<boolean>;
  walletAddress: string | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}

interface WalletProviderProps {
  children: ReactNode;
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [balance, setBalance] = useState<number>(0);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const refreshBalance = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data } = await supabase.functions.invoke('wallet-api/balance');
      
      if (data) {
        setBalance(data.balance);
        setWalletAddress(data.solana_wallet_address || null);
      }
    } catch (err) {
      console.error('Error fetching wallet balance:', err);
      setError('Failed to load wallet balance');
      toast({
        title: 'Error',
        description: 'Failed to load wallet balance',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const purchaseLucoins = async (packageId: string): Promise<string | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase.functions.invoke('create-payment', {
        body: { packageId }
      });

      if (error) {
        throw new Error(error.message || 'Failed to create payment');
      }

      // Return the checkout URL
      return data.url;
    } catch (err) {
      console.error('Error purchasing Lucoins:', err);
      setError('Failed to create payment');
      toast({
        title: 'Error',
        description: 'Failed to create payment',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const spendLucoins = async (amount: number, description: string, metadata: any = {}): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase.functions.invoke('wallet-api/spend', {
        body: { amount, description, metadata }
      });

      if (error) {
        throw new Error(error.message || 'Failed to spend Lucoins');
      }

      // Refresh balance after successful spend
      await refreshBalance();
      
      return true;
    } catch (err) {
      console.error('Error spending Lucoins:', err);
      setError('Failed to spend Lucoins');
      toast({
        title: 'Error',
        description: err.message || 'Failed to spend Lucoins',
        variant: 'destructive',
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Load balance on initial mount
  useEffect(() => {
    refreshBalance();
  }, []);

  const value = {
    balance,
    isLoading,
    error,
    refreshBalance,
    purchaseLucoins,
    spendLucoins,
    walletAddress,
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}
