export interface UbxTransaction {
  id: string;
  amount: number;
  type: string;
  timestamp: Date;
  description: string;
  status: string;
  transactionType?: string;
  createdAt?: Date;
}

export class UberWallet {
  getBalance(): number {
    return 1000; // Mock balance
  }

  // Method signature updated to not require userId parameter
  async getTransactions(): Promise<UbxTransaction[]> {
    return [
      {
        id: 'tx-1',
        amount: 100,
        type: 'purchase',
        timestamp: new Date(),
        description: 'Boost purchase',
        status: 'completed'
      },
      {
        id: 'tx-2',
        amount: 50,
        type: 'spend',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
        description: 'Content access',
        status: 'completed'
      }
    ];
  }

  // Alias for getTransactions to keep compatibility
  async getTransactionHistory(): Promise<UbxTransaction[]> {
    return this.getTransactions();
  }

  async addFunds(amount: number): Promise<boolean> {
    console.log(`Adding ${amount} funds to wallet`);
    return true;
  }

  // Add purchaseUbx method
  async purchaseUbx(userId: string, amount: number): Promise<{ success: boolean }> {
    console.log(`User ${userId} purchased ${amount} UBX`);
    return { success: true };
  }
}

export const uberWallet = new UberWallet();
