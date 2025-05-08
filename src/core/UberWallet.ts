
/**
 * UberWallet System
 * Handles virtual currency and transactions for the UberEscorts ecosystem
 */

export interface UbxTransaction {
  id: string;
  type: 'credit' | 'debit' | 'transfer';
  amount: number;
  reason: string;
  timestamp: Date;
}

export class UberWallet {
  private balance: number = 0;
  private transactions: UbxTransaction[] = [];
  
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
      id: `txn-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
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
      id: `txn-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
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
  getTransactionHistory(limit: number = 10): UbxTransaction[] {
    return this.transactions.slice(-limit);
  }

  /**
   * Get transactions (alias for getTransactionHistory for compatibility)
   */
  getTransactions(limit: number = 10): UbxTransaction[] {
    return this.getTransactionHistory(limit);
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

  /**
   * Add funds to the wallet
   */
  addFunds(amount: number): boolean {
    return this.credit(amount, 'add_funds');
  }

  /**
   * Purchase UBX tokens
   */
  purchaseUbx(amount: number, paymentMethod: string): boolean {
    return this.credit(amount, `purchase_ubx_via_${paymentMethod}`);
  }
}

export default UberWallet;
