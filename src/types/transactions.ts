
export interface UBXTransaction {
  id?: string;
  user_id: string;
  amount: number;
  transactionType?: string;
  transaction_type?: string; // Added for backward compatibility
  description?: string;
  created_at?: string;
  metadata?: Record<string, any>;
  status?: string;
}
