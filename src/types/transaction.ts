
// Create or update the transaction type definitions

export interface UBXTransaction {
  id: string;
  userId: string;
  amount: number;
  timestamp: Date | string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  description?: string;
  transactionType: 'purchase' | 'gift' | 'refund' | 'subscription' | 'tip' | 'boost' | 'aiavatar';
  reference?: string;
}

export interface UBXBalance {
  userId: string;
  balance: number;
  lastUpdated: Date | string;
}
