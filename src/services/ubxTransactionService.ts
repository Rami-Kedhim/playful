
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

export interface TransactionParams {
  amount: number;
  userId?: string;
  transactionType: string;
  description?: string;
  metadata?: Record<string, any>;
}

/**
 * Process a UBX token transaction through the Supabase edge function
 * @param params Transaction parameters
 * @returns Promise resolving to the processed transaction result
 */
export const processUBXTransaction = async (params: TransactionParams): Promise<{
  success: boolean;
  newBalance?: number;
  message?: string;
  error?: string;
}> => {
  try {
    // Get current user ID if not provided
    const userId = params.userId || (await supabase.auth.getUser()).data.user?.id;
    
    if (!userId) {
      return { 
        success: false, 
        error: 'User not authenticated' 
      };
    }
    
    // Call the Supabase Edge Function to process the transaction
    const { data, error } = await supabase.functions.invoke('process-ubx-transaction', {
      body: {
        user_id: userId,
        amount: params.amount,
        transaction_type: params.transactionType,
        description: params.description,
        metadata: params.metadata || {}
      }
    });
    
    if (error) {
      console.error('UBX transaction processing error:', error);
      return { 
        success: false, 
        error: error.message || 'Failed to process transaction' 
      };
    }
    
    return { 
      success: true,
      newBalance: data.new_balance,
      message: data.message
    };
    
  } catch (error: any) {
    console.error('UBX transaction service error:', error);
    return { 
      success: false, 
      error: error.message || 'An unexpected error occurred' 
    };
  }
};
