
import { useState, useEffect, useCallback } from 'react';
import { uberWallet } from '@/core/index';
import { UbxTransaction } from '@/core/UberWallet';
import { useToast } from '@/components/ui/use-toast';

export const useWallet = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<UbxTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const { toast } = useToast();

  const refresh = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  useEffect(() => {
    const fetchWalletData = async () => {
      setLoading(true);
      try {
        const currentBalance = uberWallet.getBalance();
        const txns = await uberWallet.getTransactions();
        
        setBalance(currentBalance);
        setTransactions(txns);
      } catch (error) {
        console.error('Error fetching wallet data:', error);
        toast({
          title: 'Error',
          description: 'Could not fetch wallet data. Please try again.',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, [refreshKey, toast]);

  const addFunds = useCallback(async (amount: number) => {
    try {
      const result = await uberWallet.addFunds(amount);
      if (result) {
        toast({
          title: 'Funds Added',
          description: `${amount} LC added to your wallet.`
        });
        refresh();
      }
      return result;
    } catch (error) {
      console.error('Error adding funds:', error);
      toast({
        title: 'Error',
        description: 'Could not add funds to wallet. Please try again.',
        variant: 'destructive'
      });
      return false;
    }
  }, [refresh, toast]);

  const purchaseUbx = useCallback(async (amount: number) => {
    try {
      const result = await uberWallet.purchaseUbx(amount);
      if (result.success) {
        toast({
          title: 'UBX Purchased',
          description: `${amount} UBX purchased successfully.`
        });
        refresh();
      }
      return result;
    } catch (error) {
      console.error('Error purchasing UBX:', error);
      toast({
        title: 'Error',
        description: 'Could not purchase UBX. Please try again.',
        variant: 'destructive'
      });
      return { success: false };
    }
  }, [refresh, toast]);

  const spend = useCallback(async (amount: number, description: string) => {
    try {
      const result = await uberWallet.spend(amount, description);
      if (result) {
        toast({
          title: 'Transaction Complete',
          description: `${amount} LC spent on ${description}.`
        });
        refresh();
      }
      return result;
    } catch (error) {
      console.error('Error spending from wallet:', error);
      toast({
        title: 'Error',
        description: 'Transaction failed. Please try again.',
        variant: 'destructive'
      });
      return false;
    }
  }, [refresh, toast]);

  return {
    balance,
    transactions,
    loading,
    refresh,
    addFunds,
    purchaseUbx,
    spend
  };
};

export default useWallet;
