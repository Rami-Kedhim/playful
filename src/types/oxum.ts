
export interface OxumSystem {
  getSystemStatus(): {
    isOperational: boolean;
    performance: number;
    lastUpdate: string;
  };
  
  processPayment(amount: number, currency: string): Promise<boolean>;
  
  validateTransaction(transactionId: string): Promise<{
    isValid: boolean;
    amount: number;
    currency: string;
    timestamp: string;
  }>;
  
  getExchangeRate(from: string, to: string): number;
}

export interface OxumWallet {
  balance: number;
  currency: string;
  lastTransaction: {
    amount: number;
    timestamp: string;
    type: 'deposit' | 'withdrawal';
  };
}

export interface OxumTransaction {
  id: string;
  amount: number;
  currency: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'failed';
  type: 'deposit' | 'withdrawal' | 'transfer';
  metadata?: Record<string, any>;
}
