
import { toast } from "@/hooks/use-toast";

/**
 * UBX Wallet Transaction Types
 */
export type UBXTransactionType = 
  'deposit' | 'withdrawal' | 'transfer' | 'booking' | 
  'content_purchase' | 'subscription' | 'tip' | 'boost' | 
  'service_fee';

/**
 * UBX Transaction
 */
export interface UBXTransaction {
  id: string;
  userId: string;
  amount: number;
  type: UBXTransactionType;
  description?: string;
  metadata?: Record<string, any>;
  createdAt: Date;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  receiverId?: string;
}

/**
 * UBX Wallet
 */
export interface UBXWallet {
  userId: string;
  balance: number;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * UBX Wallet Service
 * Central service for managing UBX transactions across the platform
 */
export class UBXWalletService {
  private static instance: UBXWalletService;

  private constructor() {}

  public static getInstance(): UBXWalletService {
    if (!UBXWalletService.instance) {
      UBXWalletService.instance = new UBXWalletService();
    }
    return UBXWalletService.instance;
  }

  /**
   * Get wallet balance for a user
   */
  public async getBalance(userId: string): Promise<number> {
    try {
      // This would call the backend API to get the wallet balance
      const response = await fetch(`/api/ubx/wallet/${userId}/balance`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch wallet balance');
      }
      
      const data = await response.json();
      return data.balance;
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
      toast({
        title: "Error",
        description: "Failed to fetch your wallet balance",
        variant: "destructive",
      });
      return 0;
    }
  }

  /**
   * Process a transaction
   */
  public async processTransaction(
    userId: string,
    amount: number,
    type: UBXTransactionType,
    description: string,
    metadata?: Record<string, any>
  ): Promise<UBXTransaction | null> {
    try {
      // This would call the backend API to process the transaction
      const response = await fetch('/api/ubx/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          amount,
          type,
          description,
          metadata
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to process transaction');
      }
      
      const data = await response.json();
      
      toast({
        title: "Transaction Successful",
        description: `Your ${type} transaction was successful`,
      });
      
      return data.transaction;
    } catch (error) {
      console.error('Error processing transaction:', error);
      toast({
        title: "Transaction Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      return null;
    }
  }

  /**
   * Transfer UBX between users
   */
  public async transferUBX(
    senderId: string,
    receiverId: string,
    amount: number,
    description: string,
    metadata?: Record<string, any>
  ): Promise<boolean> {
    try {
      // This would call the backend API to transfer UBX
      const response = await fetch('/api/ubx/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderId,
          receiverId,
          amount,
          description,
          metadata
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to transfer UBX');
      }
      
      toast({
        title: "Transfer Successful",
        description: `You successfully transferred ${amount} UBX`,
      });
      
      return true;
    } catch (error) {
      console.error('Error transferring UBX:', error);
      toast({
        title: "Transfer Failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
      return false;
    }
  }

  /**
   * Get transaction history for a user
   */
  public async getTransactionHistory(
    userId: string,
    limit: number = 10,
    offset: number = 0,
    type?: UBXTransactionType
  ): Promise<UBXTransaction[]> {
    try {
      // Build query string
      const queryParams = new URLSearchParams();
      queryParams.append('limit', limit.toString());
      queryParams.append('offset', offset.toString());
      if (type) queryParams.append('type', type);
      
      // This would call the backend API to get transaction history
      const response = await fetch(`/api/ubx/transactions/${userId}?${queryParams}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch transaction history');
      }
      
      const data = await response.json();
      return data.transactions;
    } catch (error) {
      console.error('Error fetching transaction history:', error);
      toast({
        title: "Error",
        description: "Failed to fetch your transaction history",
        variant: "destructive",
      });
      return [];
    }
  }

  /**
   * Check if user has sufficient balance
   */
  public async hasSufficientBalance(userId: string, amount: number): Promise<boolean> {
    const balance = await this.getBalance(userId);
    return balance >= amount;
  }
}

export const ubxWalletService = UBXWalletService.getInstance();
export default ubxWalletService;
