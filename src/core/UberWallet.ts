
import { HermesEvent } from "@/types/hermes";

export interface UbxTransaction {
  id: string;
  amount: number;
  type: 'credit' | 'debit' | 'transfer' | 'purchase' | 'spend';
  createdAt: string;
  status: 'completed' | 'pending' | 'failed';
  description: string;
  transactionType: string;
}

export class UberWallet {
  private balance: number = 0;
  private transactions: UbxTransaction[] = [];

  constructor() {
    // Initialize with some mock data
    this.balance = 1000;
    this.transactions = [
      {
        id: '1',
        amount: 500,
        type: 'credit',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        status: 'completed',
        description: 'Initial deposit',
        transactionType: 'deposit'
      },
      {
        id: '2',
        amount: 50,
        type: 'debit',
        createdAt: new Date(Date.now() - 43200000).toISOString(),
        status: 'completed',
        description: 'Purchase: Premium Content',
        transactionType: 'content'
      }
    ];
  }

  getBalance(): number {
    return this.balance;
  }

  async addFunds(amount: number): Promise<boolean> {
    if (amount <= 0) return false;

    const transaction: UbxTransaction = {
      id: `tx-${Date.now()}`,
      amount,
      type: 'credit',
      createdAt: new Date().toISOString(),
      status: 'completed',
      description: 'Deposit funds',
      transactionType: 'deposit'
    };

    this.balance += amount;
    this.transactions.push(transaction);

    return true;
  }

  async purchaseUbx(amount: number): Promise<{ success: boolean }> {
    if (amount <= 0) return { success: false };

    const transaction: UbxTransaction = {
      id: `tx-${Date.now()}`,
      amount,
      type: 'credit',
      createdAt: new Date().toISOString(),
      status: 'completed',
      description: 'Purchase UBX',
      transactionType: 'purchase'
    };

    this.balance += amount;
    this.transactions.push(transaction);

    return { success: true };
  }

  async getTransactions(): Promise<UbxTransaction[]> {
    return [...this.transactions];
  }

  async spend(amount: number, description: string): Promise<boolean> {
    if (amount <= 0 || this.balance < amount) return false;

    const transaction: UbxTransaction = {
      id: `tx-${Date.now()}`,
      amount,
      type: 'debit',
      createdAt: new Date().toISOString(),
      status: 'completed',
      description,
      transactionType: 'spend'
    };

    this.balance -= amount;
    this.transactions.push(transaction);

    return true;
  }

  // Emit events for transactions (mock implementation)
  private emitTransactionEvent(event: string, data: any): void {
    const hermesEvent: HermesEvent = {
      event,
      source: 'wallet',
      timestamp: new Date().toISOString(),
      data
    };

    console.log('Wallet event:', hermesEvent);
  }
}

export const uberWallet = new UberWallet();
export default UberWallet;
