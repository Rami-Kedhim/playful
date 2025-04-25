
import { UberPersona } from '@/types/UberPersona';

export class FeaturedService {
  public async loadFeaturedPersonas(count: number = 6): Promise<UberPersona[]> {
    try {
      return Array(count).fill(null).map((_, index) => ({
        id: `featured-${index}`,
        name: `Featured Persona ${index}`,
        type: index % 2 === 0 ? 'escort' : 'creator',
        displayName: `Featured Persona ${index}`,
        avatarUrl: 'https://example.com/avatar.jpg',
        location: ['New York', 'Los Angeles', 'Miami', 'Las Vegas'][Math.floor(Math.random() * 4)],
        isVerified: Math.random() > 0.2,
        isOnline: Math.random() > 0.3,
        isPremium: Math.random() > 0.7,
        tags: ['premium', 'featured', 'recommended'],
        availability: {
          nextAvailable: new Date(Date.now() + Math.random() * 1000000).toISOString(),
          schedule: {}
        },
        systemMetadata: {
          source: 'manual' as const,
          lastSynced: new Date(),
          tagsGeneratedByAI: false,
          hilbertSpaceVector: []
        }
      }));
    } catch (error) {
      console.error('Error loading featured personas:', error);
      return [];
    }
  }
}

export const featuredService = new FeaturedService();
