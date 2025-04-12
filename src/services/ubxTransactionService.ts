import { supabase } from '@/integrations/supabase/client';
import { validateGlobalPriceWithRetry, validateGlobalPrice, GLOBAL_UBX_RATE } from '@/utils/oxum/globalPricing';
import { OxumNotificationService } from '@/services/notifications/oxumNotificationService';
import { OxumRuleEnforcement, OxumTransactionData } from '@/services/oxum/OxumRuleEnforcement';

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
 * with Oxum Rule enforcement
 */
export const processUBXTransaction = async (params: TransactionParams): Promise<TransactionResult> => {
  try {
    // First, validate against Oxum Rules
    const oxumValidation = OxumRuleEnforcement.validateTransaction({
      amount: params.amount,
      transactionType: params.transactionType,
      sender: params.userId,
      recipient: params.metadata?.recipientId,
      metadata: params.metadata
    });
    
    // If the transaction violates Oxum Rules, reject it immediately
    if (!oxumValidation.success || !oxumValidation.isOxumCompliant) {
      console.error('[Oxum Rule Violation]:', oxumValidation.error);
      return {
        success: false,
        error: oxumValidation.error || 'Transaction violates the Oxum Rule'
      };
    }

    // For boost transactions, explicitly validate against Oxum price rules
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

    // Check for any user-to-user transaction attempt to add platform fees
    if (OxumRuleEnforcement.isUserToUserTransaction(params.transactionType)) {
      if (params.metadata?.platformFee && params.metadata.platformFee > 0) {
        return {
          success: false,
          error: 'Oxum Rule Violation: Platform fees on user-to-user transactions are strictly prohibited'
        };
      }
    }

    // Proceed with the transaction after all validations pass
    const { data, error } = await supabase.functions.invoke('process-ubx-transaction', {
      body: {
        user_id: params.userId,
        amount: params.amount,
        transaction_type: params.transactionType,
        description: params.description,
        metadata: {
          ...params.metadata,
          oxum_compliant: true // Mark transaction as Oxum compliant
        }
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

/**
 * Validate a transaction amount against Oxum pricing rules
 * This is a utility function that can be used by any service
 */
export const validateTransactionAmount = async (
  amount: number, 
  transactionType: string
): Promise<boolean> => {
  // First check against the broader Oxum rule
  const oxumValidation = OxumRuleEnforcement.validateTransaction({
    amount,
    transactionType
  });
  
  if (!oxumValidation.success || !oxumValidation.isOxumCompliant) {
    return false;
  }
  
  // Only validate boost transactions against the global price symmetry rule
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
  
  // For non-boost transactions, no price validation needed
  return true;
};

/**
 * Get the appropriate UBX price for a transaction type
 * based on Oxum Rules
 */
export const getTransactionPrice = (transactionType: string): number => {
  // If it's a boost transaction, get the global price
  if (OxumRuleEnforcement.isBoostTransaction(transactionType)) {
    return GLOBAL_UBX_RATE;
  }
  
  // Other transaction types don't have fixed prices
  return 0;
};

/**
 * Check if a transaction type requires a platform fee
 * According to the Oxum Rule, user-to-user transactions must have zero fees
 */
export const doesTransactionRequirePlatformFee = (transactionType: string): boolean => {
  // User-to-user transactions never have fees (per Oxum Rule)
  if (OxumRuleEnforcement.isUserToUserTransaction(transactionType)) {
    return false;
  }
  
  // Currently only boost transactions are monetized
  return OxumRuleEnforcement.isBoostTransaction(transactionType);
};
