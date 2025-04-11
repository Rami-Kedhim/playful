
import { supabase } from '@/integrations/supabase/client';

/**
 * Service for handling UBX token operations
 */
export const ubxService = {
  /**
   * Get UBX balance for a user
   * @param userId - The ID of the user
   */
  getUserBalance: async (userId: string): Promise<number> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('lucoin_balance')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching UBX balance:', error);
        return 0;
      }
      
      return data?.lucoin_balance || 0;
    } catch (err) {
      console.error('Failed to get user UBX balance:', err);
      return 0;
    }
  },

  /**
   * Get UBX package options
   */
  getUBXPackages: async () => {
    try {
      const { data, error } = await supabase
        .from('lucoin_package_options')
        .select('*')
        .eq('is_active', true)
        .order('amount', { ascending: true });
      
      if (error) {
        console.error('Error fetching UBX packages:', error);
        return [];
      }
      
      return data;
    } catch (err) {
      console.error('Failed to get UBX packages:', err);
      return [];
    }
  },

  /**
   * Get transaction history for a user
   * @param userId - The ID of the user
   * @param limit - Optional limit on number of transactions to return
   */
  getTransactionHistory: async (userId: string, limit?: number) => {
    try {
      let query = supabase
        .from('lucoin_transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      
      if (limit) {
        query = query.limit(limit);
      }
      
      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching UBX transactions:', error);
        return [];
      }
      
      return data;
    } catch (err) {
      console.error('Failed to get UBX transaction history:', err);
      return [];
    }
  },

  /**
   * Process a UBX transaction using the Supabase Edge Function
   * @param userId - The ID of the user
   * @param amount - Amount of UBX to add/subtract
   * @param transactionType - Type of transaction
   * @param description - Optional description
   * @param metadata - Optional metadata
   */
  processTransaction: async (
    userId: string,
    amount: number,
    transactionType: string,
    description?: string,
    metadata?: Record<string, any>
  ) => {
    try {
      const { data, error } = await supabase.functions.invoke('process-ubx-transaction', {
        body: {
          user_id: userId,
          amount,
          transaction_type: transactionType,
          description,
          metadata
        }
      });
      
      if (error) {
        console.error('UBX transaction error:', error);
        return {
          success: false,
          error: error.message || 'Transaction failed'
        };
      }
      
      return {
        success: true,
        message: data.message,
        newBalance: data.new_balance
      };
    } catch (err: any) {
      console.error('UBX service error:', err);
      return {
        success: false,
        error: err.message || 'An unexpected error occurred'
      };
    }
  }
};

export default ubxService;
