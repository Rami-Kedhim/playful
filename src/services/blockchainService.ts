
import { supabase } from '@/integrations/supabase/client';

// Types for service responses
interface IOTARechargeSession {
  id: string;
  address: string;
  expires_at: string;
  status: string;
  amount_received: number;
  ubx_credited: number;
}

interface SolanaTransactionResult {
  success: boolean;
  txHash?: string;
  error?: string;
}

/**
 * Service to handle blockchain interactions for the application
 * Supports both Solana and IOTA integration
 */
export const blockchainService = {
  /**
   * Create a new IOTA recharge session for the user
   * @param userId The ID of the user
   * @returns The created recharge session details
   */
  createIOTARechargeSession: async (userId: string): Promise<IOTARechargeSession> => {
    try {
      const { data, error } = await supabase.functions.invoke('create-iota-session', {
        body: { user_id: userId }
      });

      if (error) throw new Error(error.message);
      return data;
    } catch (error: any) {
      console.error('Error creating IOTA session:', error);
      throw new Error(`Failed to create IOTA session: ${error.message}`);
    }
  },

  /**
   * Check the status of an IOTA recharge session
   * @param sessionId The ID of the recharge session to check
   * @returns The updated session details
   */
  checkIOTASessionStatus: async (sessionId: string): Promise<IOTARechargeSession> => {
    try {
      const { data, error } = await supabase.functions.invoke('check-iota-session', {
        body: { session_id: sessionId }
      });

      if (error) throw new Error(error.message);
      return data;
    } catch (error: any) {
      console.error('Error checking IOTA session status:', error);
      throw new Error(`Failed to check IOTA session: ${error.message}`);
    }
  },

  /**
   * Send Solana for UBX tokens
   * @param amount Amount of Solana to send
   * @param packageId ID of the UBX package to purchase
   * @param walletAddress User's Solana wallet address
   * @returns Result of the transaction
   */
  purchaseUBXWithSolana: async (
    amount: number,
    packageId: string,
    walletAddress: string
  ): Promise<SolanaTransactionResult> => {
    try {
      const { data, error } = await supabase.functions.invoke('process-solana-payment', {
        body: { 
          amount,
          package_id: packageId,
          wallet_address: walletAddress
        }
      });

      if (error) throw new Error(error.message);
      return data;
    } catch (error: any) {
      console.error('Error processing Solana payment:', error);
      return {
        success: false,
        error: `Transaction failed: ${error.message}`
      };
    }
  }
};

export default blockchainService;
