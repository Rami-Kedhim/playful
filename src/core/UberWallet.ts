
export interface UbxTransaction {
  id: string;
  amount: number;
  type: string;
  timestamp: Date;
  description: string;
  status: string;
}

export class UberWallet {
  getBalance(): number {
    return 1000; // Mock balance
  }

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

  async addFunds(amount: number): Promise<boolean> {
    console.log(`Adding ${amount} funds to wallet`);
    return true;
  }
}

export const uberWallet = new UberWallet();
