
// Create or update the transaction type definitions

export interface UBXTransaction {
  id?: string;
  userId?: string;
  user_id?: string;  // For compatibility with database
  amount: number;
  timestamp?: Date | string;
  status?: 'pending' | 'completed' | 'failed' | 'refunded';
  description?: string;
  transactionType?: 'purchase' | 'gift' | 'refund' | 'subscription' | 'tip' | 'boost' | 'aiavatar';
  transaction_type?: string; // For compatibility with database
  reference?: string;
  metadata?: Record<string, any>;
}

export interface UBXBalance {
  userId: string;
  balance: number;
  lastUpdated: Date | string;
}
