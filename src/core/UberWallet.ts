
/**
 * UberWallet System
 * Handles virtual currency and transactions for the UberEscorts ecosystem
 */
export class UberWallet {
  private balance: number = 0;
  private transactions: any[] = [];
  
  constructor(initialBalance: number = 0) {
    this.balance = initialBalance;
  }
  
  /**
   * Get current balance
   */
  getBalance(): number {
    return this.balance;
  }
  
  /**
   * Add funds to wallet
   */
  credit(amount: number, reason: string = 'deposit'): boolean {
    if (amount <= 0) return false;
    
    this.balance += amount;
    this.transactions.push({
      type: 'credit',
      amount,
      reason,
      timestamp: new Date()
    });
    
    return true;
  }
  
  /**
   * Remove funds from wallet
   */
  debit(amount: number, reason: string = 'withdrawal'): boolean {
    if (amount <= 0 || this.balance < amount) return false;
    
    this.balance -= amount;
    this.transactions.push({
      type: 'debit',
      amount,
      reason,
      timestamp: new Date()
    });
    
    return true;
  }
  
  /**
   * Get transaction history
   */
  getTransactionHistory(limit: number = 10): any[] {
    return this.transactions.slice(-limit);
  }
  
  /**
   * Transfer funds to another wallet
   */
  transfer(recipient: UberWallet, amount: number): boolean {
    if (amount <= 0 || this.balance < amount) return false;
    
    this.debit(amount, 'transfer_out');
    recipient.credit(amount, 'transfer_in');
    
    return true;
  }
}

export default UberWallet;
