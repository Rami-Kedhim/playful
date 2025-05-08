
export class UberWallet {
  private balance: number = 0;
  private initialized: boolean = false;
  private transactions: Array<{
    id: string;
    type: 'deposit' | 'withdrawal' | 'transfer';
    amount: number;
    timestamp: Date;
    from?: string;
    to?: string;
  }> = [];

  constructor() {
    this.balance = 0;
    this.initialized = false;
  }

  public async initialize(initialBalance: number): Promise<boolean> {
    if (this.initialized) {
      return true;
    }
    
    this.balance = initialBalance;
    this.initialized = true;
    
    this.transactions.push({
      id: `init-${Date.now()}`,
      type: 'deposit',
      amount: initialBalance,
      timestamp: new Date()
    });
    
    return true;
  }

  public isInitialized(): boolean {
    return this.initialized;
  }

  public async getBalance(): Promise<number> {
    return this.balance;
  }

  public async transfer(destination: string, amount: number): Promise<boolean> {
    if (amount <= 0) {
      throw new Error('Transfer amount must be positive');
    }
    
    if (amount > this.balance) {
      throw new Error('Insufficient funds for transfer');
    }
    
    this.balance -= amount;
    
    this.transactions.push({
      id: `transfer-${Date.now()}`,
      type: 'transfer',
      amount: amount,
      timestamp: new Date(),
      to: destination
    });
    
    return true;
  }

  public async deposit(amount: number): Promise<boolean> {
    if (amount <= 0) {
      throw new Error('Deposit amount must be positive');
    }
    
    this.balance += amount;
    
    this.transactions.push({
      id: `deposit-${Date.now()}`,
      type: 'deposit',
      amount: amount,
      timestamp: new Date()
    });
    
    return true;
  }

  public async withdraw(amount: number): Promise<boolean> {
    if (amount <= 0) {
      throw new Error('Withdrawal amount must be positive');
    }
    
    if (amount > this.balance) {
      throw new Error('Insufficient funds for withdrawal');
    }
    
    this.balance -= amount;
    
    this.transactions.push({
      id: `withdraw-${Date.now()}`,
      type: 'withdrawal',
      amount: amount,
      timestamp: new Date()
    });
    
    return true;
  }

  public async getTransactionHistory(): Promise<any[]> {
    return [...this.transactions];
  }

  public async shutdown(): Promise<boolean> {
    console.log('UberWallet system shutting down...');
    return true;
  }
}
