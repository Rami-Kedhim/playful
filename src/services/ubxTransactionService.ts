
import { supabase } from '@/integrations/supabase/client';
import { validateGlobalPrice, GLOBAL_UBX_RATE } from '@/utils/oxum/globalPricing';

export interface TransactionParams {
  userId: string;
  amount: number;
  transactionType: string;
  description?: string;
  metadata?: Record<string, any>;
}

export interface TransactionResult {
  success: boolean;
  message?: string;
  error?: string;
  newBalance?: number;
}

/**
 * Processes a UBX token transaction using the Supabase Edge Function
 */
export const processUBXTransaction = async (params: TransactionParams): Promise<TransactionResult> => {
  try {
    // Validate against Oxum price rules for boost transactions
    if (params.transactionType === 'boost_purchase' || params.transactionType === 'ai_boost') {
      try {
        // For negative amounts (spending), we need to check the absolute value
        const amountToValidate = params.amount < 0 ? Math.abs(params.amount) : params.amount;
        validateGlobalPrice(amountToValidate);
      } catch (error: any) {
        console.error('[Oxum Enforcement Error]:', error);
        return {
          success: false,
          error: `[Oxum Rule #001] ${error.message || 'Global Price Symmetry violation detected'}`
        };
      }
    }

    const { data, error } = await supabase.functions.invoke('process-ubx-transaction', {
      body: {
        user_id: params.userId,
        amount: params.amount,
        transaction_type: params.transactionType,
        description: params.description,
        metadata: params.metadata
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
    console.error('UBX transaction service error:', err);
    return {
      success: false,
      error: err.message || 'An unexpected error occurred'
    };
  }
};

/**
 * Get UBX transaction history for a user
 */
export const getUBXTransactionHistory = async (userId: string): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from('ubx_transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching UBX transactions:', error);
      throw error;
    }
    
    return data || [];
  } catch (err) {
    console.error('UBX transaction history error:', err);
    return [];
  }
};
