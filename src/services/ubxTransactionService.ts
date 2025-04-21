import { supabase } from '@/integrations/supabase/client';
import { validateGlobalPrice, validateGlobalPriceWithRetry, GLOBAL_UBX_RATE } from '@/utils/oxum/globalPricing';
import { OxumNotificationService } from '@/services/notifications/oxumNotificationService';

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
        
        // Use the resilient validation with retry for critical payment paths
        await validateGlobalPriceWithRetry(amountToValidate, {
          transaction_type: params.transactionType,
          user_id: params.userId,
          description: params.description
        });
      } catch (error: any) {
        console.error('[Oxum Enforcement Error]:', error);
        return {
          success: false,
          error: `[Oxum Rule #001] ${error.message || 'Global Price Symmetry violation detected'}`
        };
      }
    }

    // Guard against system recovery mode
    if (OxumNotificationService.isInRecoveryMode()) {
      // In recovery mode, we always enforce the exact global price
      if (params.transactionType === 'boost_purchase' || params.transactionType === 'ai_boost') {
        const amountToValidate = params.amount < 0 ? Math.abs(params.amount) : params.amount;
        if (amountToValidate !== GLOBAL_UBX_RATE) {
          return {
            success: false,
            error: `[Oxum Recovery Mode] Transactions must use the exact global price of ${GLOBAL_UBX_RATE} UBX when system is in recovery mode.`
          };
        }
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
      message: "Transaction processed successfully",
      newBalance: 0 // This should be replaced with actual balance in the real implementation
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

/**
 * Validate a transaction amount against Oxum pricing rules
 * This is a utility function that can be used by any service
 */
export const validateTransactionAmount = async (
  amount: number, 
  transactionType: string
): Promise<boolean> => {
  // Only validate for boost-related transactions
  if (transactionType === 'boost_purchase' || transactionType === 'ai_boost') {
    const amountToValidate = amount < 0 ? Math.abs(amount) : amount;
    try {
      // Use the resilient validation with retry
      await validateGlobalPriceWithRetry(amountToValidate);
      return true;
    } catch (error) {
      return false;
    }
  }
  
  // For non-boost transactions, no validation needed
  return true;
};
