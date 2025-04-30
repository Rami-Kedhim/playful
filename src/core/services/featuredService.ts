
import { UberPersona } from '@/types/uberPersona';
import { oxum } from '../Oxum';

export const featuredService = {
  /**
   * Load featured personas, boosted by the Oxum algorithm
   */
  async loadFeaturedPersonas(count: number = 4): Promise<UberPersona[]> {
    // This would fetch from backend in a real implementation
    // Here we generate some sample personas
    const sampleTypes: ('escort' | 'creator' | 'livecam' | 'ai')[] = [
      'escort', 'creator', 'livecam', 'ai'
    ];
    
    const featuredPersonas: UberPersona[] = Array.from({ length: count }).map((_, i) => {
      const type = sampleTypes[i % sampleTypes.length];
      
      return {
        id: `featured-${i}`,
        name: `Featured ${type.charAt(0).toUpperCase() + type.slice(1)} ${i}`,
        displayName: `Featured ${type.charAt(0).toUpperCase() + type.slice(1)} ${i}`,
        type: type,
        avatarUrl: `https://picsum.photos/seed/persona${i}/400/600`,
        location: ['New York', 'Los Angeles', 'Miami', 'Virtual'][i % 4],
        isVerified: true,
        isOnline: Math.random() > 0.3,
        tags: ['featured', 'premium', 'top-rated']
      };
    });
    
    // Apply boosting via Oxum
    for (const persona of featuredPersonas) {
      (persona as any).boostScore = oxum.calculateBoostScore(persona.id);
    }
    
    return featuredPersonas;
  }
};
