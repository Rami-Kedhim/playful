
import { supabase } from "@/integrations/supabase/client";
import { oxum } from "@/core/Oxum";
import { hermes } from "@/core/Hermes";
import { UBXTransaction } from "@/types/transaction";

/**
 * Unified UBXWalletService for managing UBX transactions across the ecosystem
 */
export class UBXWalletService {
  private static instance: UBXWalletService;
  private currentUserId: string | null = null;
  private currentBalance: number = 0;
  
  private constructor() {}
  
  public static getInstance(): UBXWalletService {
    if (!UBXWalletService.instance) {
      UBXWalletService.instance = new UBXWalletService();
    }
    return UBXWalletService.instance;
  }
  
  /**
   * Initialize the wallet service for a specific user
   */
  public async initialize(userId: string): Promise<boolean> {
    if (!userId) return false;
    
    this.currentUserId = userId;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('ubx_balance')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Failed to initialize wallet:', error);
        return false;
      }
      
      this.currentBalance = data?.ubx_balance || 0;
      return true;
    } catch (error) {
      console.error('Wallet initialization error:', error);
      return false;
    }
  }
  
  /**
   * Get the current UBX balance
   */
  public async getBalance(): Promise<number> {
    if (!this.currentUserId) {
      throw new Error('Wallet not initialized');
    }
    
    try {
      // Refresh from the database to ensure we have the latest balance
      const { data, error } = await supabase
        .from('profiles')
        .select('ubx_balance')
        .eq('id', this.currentUserId)
        .single();
      
      if (error) {
        throw error;
      }
      
      this.currentBalance = data?.ubx_balance || 0;
      return this.currentBalance;
    } catch (error) {
      console.error('Failed to get balance:', error);
      return this.currentBalance; // Return cached balance as fallback
    }
  }
  
  /**
   * Process a UBX transaction using the Edge Function
   */
  public async processTransaction(
    amount: number, 
    transactionType: string, 
    description?: string,
    metadata?: Record<string, any>
  ): Promise<{success: boolean, balance?: number, message?: string}> {
    if (!this.currentUserId) {
      return { success: false, message: 'Wallet not initialized' };
    }
    
    try {
      // Call the Edge Function to process the transaction
      const { data, error } = await supabase.functions.invoke('process-ubx-transaction', {
        body: {
          user_id: this.currentUserId,
          amount,
          transaction_type: transactionType,
          description,
          metadata
        }
      });
      
      if (error || !data.success) {
        throw new Error(error?.message || data?.error || 'Transaction failed');
      }
      
      // Update the local balance cache
      this.currentBalance = data.new_balance;
      
      // If this is a boost transaction, notify Oxum
      if (transactionType.includes('boost')) {
        oxum.recordBoostTransaction({
          userId: this.currentUserId,
          amount,
          timestamp: new Date(),
          boostType: transactionType
        });
      }
      
      // Update analytics via Hermes
      hermes.trackEvent('ubx_transaction', {
        userId: this.currentUserId,
        amount,
        transactionType,
        timestamp: new Date()
      });
      
      return {
        success: true,
        balance: this.currentBalance,
        message: data.message
      };
    } catch (error: any) {
      console.error('Transaction processing error:', error);
      return {
        success: false,
        message: error.message || 'Transaction failed'
      };
    }
  }
  
  /**
   * Get transaction history
   */
  public async getTransactionHistory(limit: number = 10): Promise<UBXTransaction[]> {
    if (!this.currentUserId) {
      return [];
    }
    
    try {
      const { data, error } = await supabase
        .from('ubx_transactions')
        .select('*')
        .eq('user_id', this.currentUserId)
        .order('created_at', { ascending: false })
        .limit(limit);
      
      if (error) {
        throw error;
      }
      
      return data || [];
    } catch (error) {
      console.error('Failed to fetch transaction history:', error);
      return [];
    }
  }
  
  /**
   * Purchase UBX with fiat currency
   */
  public async purchaseUBX(
    amount: number, 
    packageId: string
  ): Promise<{success: boolean, message?: string}> {
    if (!this.currentUserId) {
      return { success: false, message: 'Wallet not initialized' };
    }
    
    try {
      // Call payment processing logic
      // This would integrate with a payment gateway in a real app
      
      // For now, simulate a successful purchase
      const result = await this.processTransaction(
        amount,
        'purchase',
        `Purchase of ${amount} UBX`,
        { packageId }
      );
      
      return result;
    } catch (error: any) {
      console.error('UBX purchase error:', error);
      return {
        success: false,
        message: error.message || 'Purchase failed'
      };
    }
  }
}

export const ubxWalletService = UBXWalletService.getInstance();
export default ubxWalletService;
