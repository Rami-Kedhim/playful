
import { UberPersona } from '@/types/uberPersona';

export class PulseBoostService {
  async getEligibility(persona: UberPersona): Promise<boolean> {
    if (!persona) return false;
    
    // Check if persona is active
    if (!persona.isActive) {
      return false;
    }
    
    // Check when the persona was last active
    if (persona.updatedAt) {
      const lastActive = new Date(persona.updatedAt);
      const now = new Date();
      const daysSinceActive = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));
      
      // If not active in last 30 days, not eligible
      if (daysSinceActive > 30) {
        return false;
      }
    }
    
    return true;
  }
}

export default PulseBoostService;
