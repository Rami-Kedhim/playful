
import { UberPersona } from '@/types/uberPersona';
import { oxum } from '@/core/Oxum';
import { uberWallet } from '@/core/UberWallet';

export interface BoostPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // hours
  boostLevel: number;
  features: string[];
}

export class PulseBoostService {
  /**
   * Get available boost packages
   */
  getBoostPackages(): BoostPackage[] {
    return [
      {
        id: 'basic',
        name: 'Basic Boost',
        description: 'Increase your profile visibility for 24 hours',
        price: 50,
        duration: 24,
        boostLevel: 1,
        features: ['Increased visibility', 'Higher search ranking', '24-hour duration']
      },
      {
        id: 'premium',
        name: 'Premium Boost',
        description: 'Significant boost with featured placement for 72 hours',
        price: 125,
        duration: 72,
        boostLevel: 2,
        features: ['Featured section placement', 'Highlighted profile', 'Analytics dashboard', '72-hour duration']
      },
      {
        id: 'ultra',
        name: 'Ultra Boost',
        description: 'Maximum visibility across all platform sections for 1 week',
        price: 250,
        duration: 168,
        boostLevel: 3,
        features: ['Top position guarantee', 'Featured in all sections', 'Custom profile badge', 'Priority customer support', '7-day duration']
      }
    ];
  }
  
  /**
   * Purchase a boost for a persona
   */
  async purchaseBoost(personaId: string, packageId: string, userId: string): Promise<{
    success: boolean;
    message: string;
    transactionId?: string;
  }> {
    try {
      // Find the requested package
      const packages = this.getBoostPackages();
      const boostPackage = packages.find(pkg => pkg.id === packageId);
      
      if (!boostPackage) {
        return {
          success: false,
          message: 'Invalid boost package selected'
        };
      }
      
      // Process payment via UberWallet
      const paymentResult = await uberWallet.spendUbx(
        userId,
        boostPackage.price,
        `Pulse Boost: ${boostPackage.name}`
      );
      
      if (!paymentResult.success) {
        return {
          success: false,
          message: paymentResult.message || 'Payment failed'
        };
      }
      
      // Apply boost via Oxum
      const boostResult = await oxum.applyBoost(personaId, boostPackage.boostLevel);
      
      return {
        success: true,
        message: `Successfully applied ${boostPackage.name} to your profile`,
        transactionId: paymentResult.transactionId
      };
    } catch (error) {
      console.error('Error purchasing boost:', error);
      return {
        success: false,
        message: 'An unexpected error occurred while processing your boost purchase'
      };
    }
  }
  
  /**
   * Calculate recommended boost level for a persona
   */
  calculateRecommendedBoost(persona: UberPersona): string {
    // Calculate boost score via Oxum
    const boostScore = oxum.calculateBoostScore(persona.id);
    
    // Recommend package based on score
    if (boostScore > 75) {
      return 'basic';
    } else if (boostScore > 50) {
      return 'premium';
    } else {
      return 'ultra';
    }
  }
}

export const pulseBoostService = new PulseBoostService();
export default pulseBoostService;
