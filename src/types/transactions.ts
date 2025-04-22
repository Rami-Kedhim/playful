
export interface UBXTransaction {
  id?: string;
  user_id: string;
  amount: number;
  transactionType?: string;
  transaction_type?: string;
  description?: string;
  created_at?: string;
  metadata?: Record<string, any>;
  status?: string;
}
