
/**
 * UberWallet system implementation
 */
export class UberWallet {
  private balances: Map<string, number> = new Map();

  constructor() {
    // Initialize with some sample balances for testing
    this.balances.set('demo-user', 1000);
  }

  getBalance(userId: string): number {
    return this.balances.get(userId) || 0;
  }

  deposit(userId: string, amount: number): boolean {
    if (amount <= 0) return false;
    
    const currentBalance = this.getBalance(userId);
    this.balances.set(userId, currentBalance + amount);
    return true;
  }

  withdraw(userId: string, amount: number): boolean {
    if (amount <= 0) return false;
    
    const currentBalance = this.getBalance(userId);
    if (currentBalance < amount) return false;
    
    this.balances.set(userId, currentBalance - amount);
    return true;
  }

  transfer(fromUserId: string, toUserId: string, amount: number): boolean {
    if (amount <= 0) return false;
    
    const fromBalance = this.getBalance(fromUserId);
    if (fromBalance < amount) return false;
    
    this.balances.set(fromUserId, fromBalance - amount);
    const toBalance = this.getBalance(toUserId);
    this.balances.set(toUserId, toBalance + amount);
    
    return true;
  }
}

// Export a singleton instance for easy access
export const uberWallet = new UberWallet();
export default uberWallet;
