
// UberWallet core module - manages UBX currency and transactions

export interface TransactionRecord {
  id: string;
  userId: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  timestamp: string;
}

export class UberWallet {
  private balances: Record<string, number> = {};
  private transactions: TransactionRecord[] = [];

  // Get UBX balance or zero if no balance exists
  public getBalance(userId: string): number {
    return this.balances[userId] || 0;
  }

  // Credit user wallet
  public credit(userId: string, amount: number, description: string): void {
    if (amount <= 0) throw new Error('Credit amount must be positive');
    this.balances[userId] = this.getBalance(userId) + amount;
    this.recordTransaction(userId, amount, 'credit', description);
  }

  // Debit user wallet if sufficient balance
  public debit(userId: string, amount: number, description: string): boolean {
    if (amount <= 0) throw new Error('Debit amount must be positive');
    const currentBalance = this.getBalance(userId);
    if (currentBalance < amount) {
      return false; // insufficient funds
    }
    this.balances[userId] = currentBalance - amount;
    this.recordTransaction(userId, amount, 'debit', description);
    return true;
  }

  // Record a transaction
  private recordTransaction(userId: string, amount: number, type: 'credit' | 'debit', description: string): void {
    const record: TransactionRecord = {
      id: crypto.randomUUID(),
      userId,
      amount,
      type,
      description,
      timestamp: new Date().toISOString()
    };
    this.transactions.push(record);
    console.debug(`[UberWallet] Transaction recorded:`, record);
  }

  // Get transaction history for a user
  public getTransactionHistory(userId: string): TransactionRecord[] {
    return this.transactions.filter(tx => tx.userId === userId).sort((a, b) => b.timestamp.localeCompare(a.timestamp));
  }
}

export const uberWallet = new UberWallet();

