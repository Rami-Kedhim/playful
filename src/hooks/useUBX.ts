
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface TransactionDetails {
  amount: number;
  transactionType: string;
  description: string;
  metadata?: Record<string, any>;
}

interface UBXPackage {
  id: string;
  name: string;
  price: number;
  amount: number;
  bonus_amount: number;
  is_featured: boolean;
}

export default function useUBX() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { refreshProfile } = useAuth();
  
  /**
   * Process a UBX transaction in the system
   * @param details Transaction details including amount and type
   * @returns Boolean indicating success or failure
   */
  const processTransaction = async (details: TransactionDetails): Promise<boolean> => {
    setIsProcessing(true);
    
    try {
      // Call the Supabase function to process the transaction
      const { data, error } = await supabase.rpc('process_lucoin_transaction', {
        p_user_id: supabase.auth.getUser().then(res => res.data.user?.id),
        p_amount: details.amount,
        p_transaction_type: details.transactionType,
        p_description: details.description,
        p_metadata: details.metadata || {}
      });
      
      if (error) {
        throw error;
      }
      
      // Refresh the user profile to get the updated balance
      await refreshProfile();
      
      toast({
        title: 'Transaction successful',
        description: `${details.amount} UBX ${details.transactionType === 'deposit' ? 'added to' : 'removed from'} your account.`,
      });
      
      return true;
    } catch (error: any) {
      console.error('Error processing UBX transaction:', error);
      
      toast({
        variant: 'destructive',
        title: 'Transaction failed',
        description: error.message || 'Failed to process transaction. Please try again.',
      });
      
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  /**
   * Fetches available UBX packages
   * @returns Array of UBX packages
   */
  const fetchPackages = async (): Promise<UBXPackage[]> => {
    try {
      // In a real app, this would come from an API
      const mockPackages: UBXPackage[] = [
        {
          id: 'basic',
          name: 'Basic',
          price: 9.99,
          amount: 1000,
          bonus_amount: 0,
          is_featured: false
        },
        {
          id: 'standard',
          name: 'Standard',
          price: 19.99,
          amount: 2000,
          bonus_amount: 200,
          is_featured: true
        },
        {
          id: 'premium',
          name: 'Premium',
          price: 49.99,
          amount: 5000,
          bonus_amount: 1000,
          is_featured: false
        }
      ];
      
      return mockPackages;
    } catch (error) {
      console.error('Error fetching UBX packages:', error);
      return [];
    }
  };

  /**
   * Purchase a UBX package
   * @param packageId The ID of the package to purchase
   * @returns Boolean indicating success or failure
   */
  const purchasePackage = async (packageId: string): Promise<boolean> => {
    setIsProcessing(true);
    
    try {
      // Get package details
      const packages = await fetchPackages();
      const selectedPackage = packages.find(pkg => pkg.id === packageId);
      
      if (!selectedPackage) {
        throw new Error('Package not found');
      }
      
      // Process the transaction
      return await processTransaction({
        amount: selectedPackage.amount + selectedPackage.bonus_amount,
        transactionType: 'deposit',
        description: `Purchase of ${selectedPackage.name} UBX package`,
        metadata: { packageId, price: selectedPackage.price }
      });
    } catch (error: any) {
      console.error('Error purchasing UBX package:', error);
      
      toast({
        variant: 'destructive',
        title: 'Purchase failed',
        description: error.message || 'Failed to complete purchase. Please try again.',
      });
      
      return false;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    processTransaction,
    isProcessing,
    fetchPackages,
    purchasePackage
  };
}
