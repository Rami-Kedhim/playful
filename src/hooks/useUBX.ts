
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

  return {
    processTransaction,
    isProcessing
  };
}
