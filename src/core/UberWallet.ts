
export interface WalletTransaction {
  id: string;
  userId: string;
  amount: number;
  currency: string;
  type: 'credit' | 'debit';
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  description: string;
  metadata?: Record<string, any>;
}

export interface WalletBalanceResponse {
  balance: number;
  currency: string;
  lastUpdated: Date;
  pendingTransactions: number;
}

export class UberWallet {
  // Mock wallet implementation
  private balances: Map<string, number> = new Map();
  private transactions: WalletTransaction[] = [];
  
  constructor() {
    // Initialize with some default values for testing
    this.balances.set('default', 1000);
  }
  
  async getBalance(userId: string = 'default'): Promise<WalletBalanceResponse> {
    const balance = this.balances.get(userId) || 0;
    
    return {
      balance,
      currency: 'UBX',
      lastUpdated: new Date(),
      pendingTransactions: 0
    };
  }
  
  async addFunds(userId: string = 'default', amount: number): Promise<boolean> {
    if (amount <= 0) return false;
    
    const currentBalance = this.balances.get(userId) || 0;
    this.balances.set(userId, currentBalance + amount);
    
    this.transactions.push({
      id: `tx-${Date.now()}`,
      userId,
      amount,
      currency: 'UBX',
      type: 'credit',
      status: 'completed',
      createdAt: new Date(),
      description: 'Added funds to wallet'
    });
    
    return true;
  }
  
  async deductFunds(userId: string = 'default', amount: number): Promise<boolean> {
    const currentBalance = this.balances.get(userId) || 0;
    if (currentBalance < amount) return false;
    
    this.balances.set(userId, currentBalance - amount);
    
    this.transactions.push({
      id: `tx-${Date.now()}`,
      userId,
      amount,
      currency: 'UBX',
      type: 'debit',
      status: 'completed',
      createdAt: new Date(),
      description: 'Deducted funds from wallet'
    });
    
    return true;
  }
  
  async getTransactionHistory(userId: string = 'default'): Promise<WalletTransaction[]> {
    return this.transactions.filter(tx => tx.userId === userId);
  }
  
  async resetWallet(userId: string = 'default'): Promise<boolean> {
    this.balances.set(userId, 0);
    this.transactions = this.transactions.filter(tx => tx.userId !== userId);
    return true;
  }
}
