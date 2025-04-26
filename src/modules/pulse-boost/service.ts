
import { uberWallet } from '@/core/UberWallet';
import { oxum } from '@/core/Oxum';

export interface PulseBoostPackage {
  id: string;
  name: string;
  description: string;
  duration: string | number; // Duration in hours or formatted string
  price: number;
  features: string[];
  boostPower: number;
}

export class PulseBoostService {
  /**
   * Purchase a boost package with UBX tokens
   */
  public async purchaseBoost(
    userId: string, 
    packageId: string
  ): Promise<{
    success: boolean;
    transactionId?: string;
    message?: string;
  }> {
    try {
      // Get package details to determine price
      const boostPackage = await this.getPackageById(packageId);
      
      if (!boostPackage) {
        return {
          success: false,
          message: 'Boost package not found'
        };
      }
      
      // Debit the user's wallet
      const walletResult = await uberWallet.debit(
        userId, 
        boostPackage.price, 
        `Purchase of ${boostPackage.name} boost package`
      );
      
      if (!walletResult.success) {
        return {
          success: false,
          message: 'Insufficient UBX balance'
        };
      }
      
      // Apply the boost with Oxum
      await oxum.applyBoost(userId, boostPackage.boostPower, 
        typeof boostPackage.duration === 'number' ? 
          boostPackage.duration : 
          parseInt(boostPackage.duration) || 24);
      
      return {
        success: true,
        transactionId: walletResult.transactionId,
        message: `Successfully purchased ${boostPackage.name} boost`
      };
    } catch (error) {
      console.error('Error purchasing boost:', error);
      return {
        success: false,
        message: 'An error occurred while purchasing the boost'
      };
    }
  }
  
  /**
   * Get boost package by ID
   */
  private async getPackageById(id: string): Promise<PulseBoostPackage | null> {
    // This would fetch from backend in a real implementation
    const packages = [
      {
        id: 'basic',
        name: 'Basic Boost',
        description: 'Standard visibility boost for 24 hours',
        duration: 24,
        price: 50,
        features: ['24-hour boost', 'Basic visibility increase'],
        boostPower: 1.5
      },
      {
        id: 'premium',
        name: 'Premium Boost',
        description: 'Enhanced visibility for 3 days',
        duration: 72,
        price: 120,
        features: ['72-hour boost', 'Featured in search results'],
        boostPower: 2.5
      }
    ];
    
    return packages.find(pkg => pkg.id === id) || null;
  }
}

export const pulseBoostService = new PulseBoostService();
