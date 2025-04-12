
import { validateGlobalPrice, GLOBAL_UBX_RATE } from '@/utils/oxum/globalPricing';
import { OxumNotificationService } from '@/services/notifications/oxumNotificationService';

export interface OxumTransactionData {
  amount: number;
  transactionType: string;
  sender?: string;
  recipient?: string;
  metadata?: Record<string, any>;
}

export interface TransactionResult {
  success: boolean;
  message?: string;
  error?: string;
  isOxumCompliant: boolean;
}

/**
 * Oxum Rule Enforcement Service
 * 
 * Ensures all platform transactions comply with the Oxum Rule:
 * - Rule #001: Global Price Symmetry for all boost operations
 * - Meta-Rule: Zero platform fees on user-to-user transactions
 */
export class OxumRuleEnforcement {
  /**
   * Validates a transaction against the Oxum Rule
   * 
   * @returns TransactionResult with validation results
   */
  static validateTransaction(data: OxumTransactionData): TransactionResult {
    try {
      // First check: Is this a user-to-user transaction that should have zero fees?
      if (this.isUserToUserTransaction(data.transactionType)) {
        // Check if any platform fee is being applied - Oxum Rule requires ZERO fees
        if (data.metadata?.platformFee && data.metadata.platformFee > 0) {
          return {
            success: false,
            error: "CRITICAL: Oxum Rule violation - Platform fees on user-to-user transactions are strictly prohibited",
            isOxumCompliant: false
          };
        }
      }
      
      // Second check: For boost transactions, validate against global price symmetry
      if (this.isBoostTransaction(data.transactionType)) {
        try {
          // Validate the transaction amount against the global price
          validateGlobalPrice(Math.abs(data.amount));
          
          // If validation passes, the transaction is Oxum compliant
          return {
            success: true,
            message: "Transaction validated - Oxum Rule compliant",
            isOxumCompliant: true
          };
        } catch (error: any) {
          // Validation failed - price symmetry violation
          return {
            success: false,
            error: error.message || "Oxum Rule violation - Global Price Symmetry breach detected",
            isOxumCompliant: false
          };
        }
      }
      
      // For non-boost transactions that don't violate user-to-user zero-fee rule
      return {
        success: true,
        message: "Transaction validated",
        isOxumCompliant: true
      };
      
    } catch (error: any) {
      // System-level error during validation
      OxumNotificationService.getInstance().notify(error.message || "Unknown error during Oxum Rule validation", 'error');
      
      return {
        success: false,
        error: "System error during Oxum Rule validation",
        isOxumCompliant: false
      };
    }
  }
  
  /**
   * Checks if a transaction is between users (should have zero platform fees)
   */
  static isUserToUserTransaction(transactionType: string): boolean {
    const userToUserTypes = [
      'booking',
      'tip',
      'gift',
      'direct_payment',
      'content_purchase',
      'message_payment',
      'escort_service'
    ];
    
    return userToUserTypes.includes(transactionType.toLowerCase()) || 
           transactionType.includes('user_to_user') ||
           transactionType.includes('p2p');
  }
  
  /**
   * Checks if a transaction is related to boosting (subject to global price symmetry)
   */
  static isBoostTransaction(transactionType: string): boolean {
    const boostTypes = [
      'boost',
      'boost_purchase',
      'ai_boost',
      'profile_boost',
      'post_boost',
      'ad_boost'
    ];
    
    return boostTypes.includes(transactionType.toLowerCase()) || 
           transactionType.includes('boost');
  }
  
  /**
   * Gets the current global boost price (as defined by Oxum Rule #001)
   */
  static getGlobalBoostPrice(): number {
    return GLOBAL_UBX_RATE;
  }
  
  /**
   * Creates a compliant transaction descriptor for UI display
   */
  static getTransactionDescriptor(transactionType: string): {
    label: string;
    description: string;
    isUserToUser: boolean;
    isBoost: boolean;
  } {
    const isUserToUser = this.isUserToUserTransaction(transactionType);
    const isBoost = this.isBoostTransaction(transactionType);
    
    let label = transactionType.replace(/_/g, ' ');
    label = label.charAt(0).toUpperCase() + label.slice(1);
    
    let description = '';
    
    if (isUserToUser) {
      description = '100% fee-free transaction between users';
    } else if (isBoost) {
      description = 'Platform boosting service with global fixed pricing';
    } else {
      description = 'Standard platform transaction';
    }
    
    return {
      label,
      description,
      isUserToUser,
      isBoost
    };
  }
}
