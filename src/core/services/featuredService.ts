
import { UberPersona } from '@/types/uberPersona';
import { lucie } from '@/core/Lucie';

/**
 * Service for fetching featured personas based on various criteria
 */
export class FeaturedService {
  /**
   * Load featured personas - uses Lucie's AI recommendations
   */
  public async loadFeaturedPersonas(): Promise<UberPersona[]> {
    try {
      // Use the lucie system to get featured persona recommendations
      const featuredPersonas = await lucie.loadFeaturedUsers(8);
      return featuredPersonas;
    } catch (error) {
      console.error('Error loading featured personas:', error);
      
      // Fallback to default personas if Lucie is unavailable
      return this.getFallbackFeaturedPersonas();
    }
  }

  /**
   * Fallback method when Lucie is unavailable
   */
  private getFallbackFeaturedPersonas(): UberPersona[] {
    return [
      {
        id: 'feature-1',
        name: 'Sophia',
        type: 'escort',
        displayName: 'Sophia Rose',
        avatarUrl: 'https://source.unsplash.com/random/300x400/?portrait,woman',
        location: 'New York',
        isVerified: true,
        isOnline: true,
        tags: ['premium', 'vip', 'elite']
      },
      {
        id: 'feature-2',
        name: 'Emma',
        type: 'creator',
        displayName: 'Emma Sterling',
        avatarUrl: 'https://source.unsplash.com/random/300x400/?portrait,model',
        location: 'Los Angeles',
        isVerified: true,
        isOnline: false,
        tags: ['content', 'videos', 'photos']
      },
      {
        id: 'feature-3',
        name: 'Leia',
        type: 'ai',
        displayName: 'Leia AI',
        avatarUrl: 'https://source.unsplash.com/random/300x400/?ai,digital',
        location: 'Virtual',
        isVerified: true,
        isOnline: true,
        tags: ['ai', 'companion', 'chat']
      },
      {
        id: 'feature-4',
        name: 'Jasmine',
        type: 'livecam',
        displayName: 'Jasmine Star',
        avatarUrl: 'https://source.unsplash.com/random/300x400/?portrait,studio',
        location: 'Miami',
        isVerified: true,
        isOnline: true,
        tags: ['livecam', 'interactive', 'shows']
      }
    ];
  }

  /**
   * Get persona recommendations matching user preferences
   */
  public async getPersonaRecommendations(userId: string): Promise<UberPersona[]> {
    console.log(`Fetching persona recommendations for user ${userId}`);
    // In a real implementation, this would use machine learning to get personalized recommendations
    return this.getFallbackFeaturedPersonas();
  }

  /**
   * Get trending personas
   */
  public async getTrendingPersonas(): Promise<UberPersona[]> {
    console.log('Fetching trending personas');
    // In a real implementation, this would fetch personas with rapidly increasing popularity
    return this.getFallbackFeaturedPersonas();
  }
}

// Export a singleton instance
export const featuredService = new FeaturedService();
export default featuredService;
